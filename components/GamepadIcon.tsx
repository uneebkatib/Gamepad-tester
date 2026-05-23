import React from 'react'

interface GamepadIconProps {
  className?: string
  size?: number
}

export default function GamepadIcon({ className = 'inline-block', size = 24 }: GamepadIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff7a00"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Outer shell contour */}
      <rect x="2" y="6" width="20" height="12" rx="4" fill="rgba(255, 122, 0, 0.12)" />
      
      {/* D-Pad cross */}
      <path d="M6 12h4M8 10v4" stroke="#ff7a00" strokeWidth="2.2" />
      
      {/* Action buttons (4-button diamond layout) */}
      <circle cx="16" cy="10" r="1" fill="#ff7a00" stroke="none" />
      <circle cx="18" cy="12" r="1" fill="#ff7a00" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="#ff7a00" stroke="none" />
      <circle cx="14" cy="12" r="1" fill="#ff7a00" stroke="none" />

      {/* Menu / Options buttons in the center */}
      <line x1="11" y1="11" x2="11.5" y2="11.5" stroke="#ff7a00" strokeWidth="1.5" />
      <line x1="13" y1="11" x2="12.5" y2="11.5" stroke="#ff7a00" strokeWidth="1.5" />
    </svg>
  )
}
