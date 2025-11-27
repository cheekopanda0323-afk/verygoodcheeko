"use client"

export function Dragon3D() {
  return (
    <div className="w-full h-full min-h-[350px] bg-[#050505] rounded-xl overflow-hidden relative shadow-xl border border-white/10 flex items-center justify-center">
      
      {/* Floating Dragon */}
      <div className="animate-[float_4s_ease-in-out_infinite]">
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          className="opacity-90 drop-shadow-[0_0_12px_rgba(255,0,0,0.6)]"
        >
          <path
            d="M100 30 C55 50 55 130 100 150 C145 130 145 50 100 30 Z"
            stroke="#ff2a2a"
            strokeWidth="3"
            fill="#0d0d0d"
          />

          {/* Eyes */}
          <circle cx="80" cy="90" r="5" fill="#ff3b3b">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="90" r="5" fill="#ff3b3b">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Subtle hologram text */}
      <div className="absolute bottom-4 left-5 text-red-500/60 text-[10px] font-mono tracking-widest pointer-events-none">
        <span className="animate-pulse">DRAGON_CORE_ONLINE</span>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  )
}
