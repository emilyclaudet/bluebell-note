export default function BluebellIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stem */}
      <path
        d="M32 58V28"
        stroke="#6A9B7B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M32 45C36 41 42 40 42 40C42 40 38 46 32 45Z"
        fill="#6A9B7B"
        opacity="0.7"
      />
      {/* Bell flowers */}
      <ellipse cx="24" cy="20" rx="7" ry="10" fill="#5B6AAF" opacity="0.85" transform="rotate(-15 24 20)" />
      <ellipse cx="32" cy="16" rx="7" ry="11" fill="#5B6AAF" opacity="0.9" />
      <ellipse cx="40" cy="20" rx="7" ry="10" fill="#5B6AAF" opacity="0.85" transform="rotate(15 40 20)" />
      {/* Bell tips */}
      <ellipse cx="23" cy="28" rx="3.5" ry="2" fill="#E8EAF6" opacity="0.6" transform="rotate(-15 23 28)" />
      <ellipse cx="32" cy="26" rx="3.5" ry="2" fill="#E8EAF6" opacity="0.6" />
      <ellipse cx="41" cy="28" rx="3.5" ry="2" fill="#E8EAF6" opacity="0.6" transform="rotate(15 41 28)" />
    </svg>
  );
}
