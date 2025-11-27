"use client"

export function Dragon3D() {
  return (
    <div className="w-full h-full min-h-[500px] bg-black rounded-xl overflow-hidden relative shadow-2xl border border-white/5 flex items-center justify-center">
      
      {/* Animated SVG Dragon */}
      <svg 
        width="280" 
        height="280" 
        viewBox="0 0 200 200"
        className="animate-pulse-slow opacity-90"
      >
        <path
          d="M100 20 C40 40 40 140 100 160 C160 140 160 40 100 20 Z"
          stroke="#ff0000"
          strokeWidth="4"
          fill="#1a1a1a"
        />
        <circle cx="75" cy="90" r="6" fill="#ff0000">
          <animate 
            attributeName="opacity" 
            values="1;0.3;1" 
            dur="1.5s" 
            repeatCount="indefinite" 
          />
        </circle>
        <circle cx="125" cy="90" r="6" fill="#ff0000">
          <animate 
            attributeName="opacity" 
            values="1;0.3;1" 
            dur="1.5s" 
            repeatCount="indefinite" 
          />
        </circle>
      </svg>

      {/* Overlay Text */}
      <div className="absolute bottom-6 left-6 text-red-500/80 text-xs font-mono tracking-widest pointer-events-none">
        /// SYSTEM_GUARDIAN_ACTIVE
      </div>
    </div>
  )
}
