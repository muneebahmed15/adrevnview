import { ArrowRight, Check, Zap } from "lucide-react";
import { NfcTapDemo } from "./NfcTapDemo";
import "./nfc-animations.css";

export function GoogleNfcSection() {
  return (
    <section className="py-28 px-6 bg-[#0d1128] border-y border-violet-900/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-700/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-900/20 text-violet-300 text-xs font-medium mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              <Zap className="w-3.5 h-3.5" /> New Product · $99 one-time
            </div>

            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Google NFC Review Card
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
              Turn Every Happy Customer Into a{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                5-Star Review
              </span>
            </h2>

            <p className="text-slate-400 text-base leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              One tap on our smart NFC card sends customers straight to your Google review page. No app, no friction — just more reviews on autopilot. Try the interactive demo.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "NFC tap + QR code fallback",
                "Pre-programmed to your Google Business",
                "Works with all modern smartphones",
                "Lifetime guarantee · Free shipping",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/googlenfc#buy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl shadow-violet-900/50"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Get Your Card — $99 <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/googlenfc"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-violet-500/30 text-white font-semibold text-base hover:bg-violet-900/20 transition-all"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                View Full Product Page
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <NfcTapDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
