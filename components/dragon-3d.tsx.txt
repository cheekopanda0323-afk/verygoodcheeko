"use client"

export function Dragon3D() {
  return (
    <div className="w-full h-full min-h-[260px] bg-[#050505] rounded-xl relative flex items-center justify-center border border-red-900/20 shadow-[0_0_20px_rgba(255,0,0,0.25)] overflow-hidden">

      {/* Deadly Dragon Icon */}
      <div className="animate-[float_3s_ease-in-out_infinite] opacity-95">
        <svg
          width="150"
          height="150"
          viewBox="0 0 200 200"
          className="drop-shadow-[0_0_18px_rgba(255,0,0,0.7)]"
        >
          {/* Sharp, demonic dragon head */}
          <path
            d="
              M100 35 
              C60 60 55 120 100 145
              C145 120 140 60 100 35
              L115 60 
              L140 75 
              L120 85 
              L135 100
              L115 105
              C110 120 90 120 85 105
              L65 100 
              L80 85 
              L60 75 
              L85 60 
              Z
            "
            stroke="#ff0000"
            strokeWidth="3"
            fill="#0a0a0a"
          />

          {/* Eyes - deadly glow */}
          <circle cx="85" cy="92" r="5" fill="#ff1a1a">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite" />
          </circle>

          <circle cx="115" cy="92" r="5" fill="#ff1a1a">
            <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Deadly message */}
      <div className="absolute bottom-3 left-4 text-red-600/80 text-[11px] font-mono tracking-widest pointer-events-none">
        <span className="animate-pulse">
          CHEEKO IS WATCHING YOU…
        </span>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  )
}
