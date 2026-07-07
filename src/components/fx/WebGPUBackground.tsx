import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type WebGPUBackgroundProps = {
  className?: string;
  onFallback?: () => void;
};

const WGSL = `
struct Uniforms {
  time: f32,
  width: f32,
  height: f32,
  isDark: f32,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
};

@vertex fn vs(@builtin(vertex_index) i: u32) -> VSOut {
  var p = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var out: VSOut;
  out.pos = vec4f(p[i], 0.0, 1.0);
  out.uv = p[i] * 0.5 + 0.5;
  return out;
}

@fragment fn fs(input: VSOut) -> @location(0) vec4f {
  let uv = input.uv;
  let t = u.time * 0.35;
  let wave1 = sin(uv.x * 8.0 + t) * 0.5 + 0.5;
  let wave2 = cos(uv.y * 6.0 - t * 0.8) * 0.5 + 0.5;
  let mixv = wave1 * wave2;
  let sky = mix(vec3f(0.02, 0.08, 0.14), vec3f(0.88, 0.96, 1.0), 1.0 - u.isDark);
  let accent = mix(vec3f(0.05, 0.45, 0.72), vec3f(0.22, 0.74, 0.98), 1.0 - u.isDark);
  let col = mix(sky, accent, mixv * 0.55);
  let alpha = 0.22 + mixv * 0.18;
  return vec4f(col, alpha);
}
`;

export function WebGPUBackground({ className = "", onFallback }: WebGPUBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !("gpu" in navigator)) {
      onFallback?.();
      return;
    }

    let disposed = false;
    let raf = 0;
    let device: GPUDevice | null = null;

    const init = async () => {
      try {
        const adapter = await navigator.gpu.requestAdapter({ powerPreference: "low-power" });
        if (!adapter || disposed) {
          onFallback?.();
          return;
        }

        device = await adapter.requestDevice();
        if (disposed) return;

        const context = canvas.getContext("webgpu");
        if (!context) {
          onFallback?.();
          return;
        }

        const format = navigator.gpu.getPreferredCanvasFormat();
        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          canvas.width = Math.max(1, w * dpr);
          canvas.height = Math.max(1, h * dpr);
          context.configure({ device, format, alphaMode: "premultiplied" });
        };

        const uniformBuffer = device.createBuffer({
          size: 16,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        const shader = device.createShaderModule({ code: WGSL });
        const pipeline = device.createRenderPipeline({
          layout: "auto",
          vertex: { module: shader, entryPoint: "vs" },
          fragment: {
            module: shader,
            entryPoint: "fs",
            targets: [{ format, blend: { color: { srcFactor: "src-alpha", dstFactor: "one-minus-src-alpha" }, alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" } } }],
          },
          primitive: { topology: "triangle-list" },
        });

        const bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const start = performance.now();
        const isDark = resolvedTheme === "dark" ? 1 : 0;

        const frame = () => {
          if (disposed || !device) return;
          resize();
          const time = (performance.now() - start) / 1000;
          device.queue.writeBuffer(
            uniformBuffer,
            0,
            new Float32Array([time, canvas.width, canvas.height, isDark]),
          );

          const encoder = device.createCommandEncoder();
          const view = context.getCurrentTexture().createView();
          const pass = encoder.beginRenderPass({
            colorAttachments: [
              {
                view,
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp: "clear",
                storeOp: "store",
              },
            ],
          });
          pass.setPipeline(pipeline);
          pass.setBindGroup(0, bindGroup);
          pass.draw(3);
          pass.end();
          device.queue.submit([encoder.finish()]);
          raf = requestAnimationFrame(frame);
        };

        setActive(true);
        frame();
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
      } catch {
        onFallback?.();
      }
    };

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      device?.destroy();
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [onFallback, resolvedTheme]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
