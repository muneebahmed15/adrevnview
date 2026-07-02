import { defineConfig, type ViteDevServer } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function seoAuditApi() {
  return {
    name: 'seo-audit-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url?.startsWith('/api/seo-audit')) return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        try {
          const body = await readBody(req)
          const { url } = JSON.parse(body || '{}') as { url?: string }
          if (!url) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Missing url' }))
            return
          }
          const mod = await server.ssrLoadModule('/src/lib/seo/report/runAudit.ts')
          const report = await mod.runFullAudit(url, { maxPages: 8 })
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(report))
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: e instanceof Error ? e.message : 'Audit failed' }))
        }
      })
    },
  }
}


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    seoAuditApi(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
