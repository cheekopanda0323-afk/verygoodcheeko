"use client"

export function GamemodeIcon({ name }: { name: string }) {
  const iconProps = {
    className: "w-8 h-8 sm:w-10 sm:h-10",
    viewBox: "0 0 24 24",
    fill: "currentColor",
  }

  switch (name) {
    case "UHC":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8H21L16.5 12L18 18L12 14.5L6 18L7.5 12L3 8H9L12 2Z" fill="currentColor" />
        </svg>
      )
    case "Crystal":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" fill="currentColor" />
        </svg>
      )
    case "Sword":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L14 8H14L12 18L10 8H10L12 2M11 18V22M13 18V22M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      )
    case "Nethpot":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="12" height="12" rx="1" fill="currentColor" />
          <path d="M10 6L10 8M14 6L14 8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case "SMP":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H20M4 12H20M4 16H20M8 4V20M12 4V20M16 4V20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case "DiaSMP":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L16 10L12 14L8 10L12 2M12 10L16 18L12 22L8 18L12 10" fill="currentColor" />
        </svg>
      )
    case "Mace PvP":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="2" width="4" height="12" fill="currentColor" />
          <circle cx="12" cy="16" r="4" fill="currentColor" />
          <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case "AxePvP":
      return (
        <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
          <path d="M7 2L8 8L12 5L16 8L17 2M10 8L10 22M14 8L14 22M8 20H16" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
