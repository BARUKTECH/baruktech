type BarukUnitProps = {
  className?: string;
  idPrefix?: string;
};

/**
 * BARUK-01 — desenho original da unidade.
 * Armadura grafite, detalhes em violeta/azul e visor técnico.
 */
export function BarukUnit({ className, idPrefix = "baruk" }: BarukUnitProps) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <svg
      viewBox="0 0 360 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={id("armor")} x1="180" y1="70" x2="180" y2="390">
          <stop offset="0" stopColor="#3A3E50" />
          <stop offset="0.42" stopColor="#20242F" />
          <stop offset="1" stopColor="#0C0E14" />
        </linearGradient>
        <linearGradient id={id("armor-2")} x1="180" y1="260" x2="180" y2="400">
          <stop offset="0" stopColor="#2C3040" />
          <stop offset="1" stopColor="#101219" />
        </linearGradient>
        <linearGradient id={id("visor")} x1="126" y1="142" x2="234" y2="170">
          <stop offset="0" stopColor="#A5F3FF" />
          <stop offset="0.36" stopColor="#00CFFF" />
          <stop offset="0.72" stopColor="#087BFF" />
          <stop offset="1" stopColor="#7900FF" />
        </linearGradient>
        <linearGradient id={id("accent")} x1="100" y1="300" x2="260" y2="300">
          <stop offset="0" stopColor="#7900FF" />
          <stop offset="1" stopColor="#087BFF" />
        </linearGradient>
        <radialGradient id={id("core")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#00CFFF" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#087BFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7900FF" stopOpacity="0" />
        </radialGradient>
        <filter id={id("glow")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={id("visor-clip")}>
          <rect x="126" y="142" width="108" height="28" rx="14" />
        </clipPath>
      </defs>

      {/* Antenna */}
      <path
        d="M180 64V38"
        stroke="rgba(245,245,255,0.22)"
        strokeWidth="1.5"
      />
      <circle cx="180" cy="33" r="9" fill="#00CFFF" opacity="0.12" />
      <circle
        cx="180"
        cy="33"
        r="3.4"
        fill="#00CFFF"
        className="robot-core"
      />

      {/* Helmet */}
      <path
        d="M108 94C116 74 140 62 180 62C220 62 244 74 252 94L262 168C265 204 248 230 222 244L206 252H154L138 244C112 230 95 204 98 168L108 94Z"
        fill={`url(#${id("armor")})`}
        stroke="rgba(245,245,255,0.16)"
        strokeWidth="1.4"
      />
      <path
        d="M112 116H248"
        stroke="rgba(245,245,255,0.08)"
        strokeWidth="1"
      />
      <path
        d="M124 74C138 66 158 62 180 62C202 62 222 66 236 74"
        stroke="rgba(245,245,255,0.14)"
        strokeWidth="1"
      />

      {/* Side pods */}
      <rect
        x="82"
        y="146"
        width="20"
        height="64"
        rx="10"
        fill="#101219"
        stroke="rgba(245,245,255,0.18)"
        strokeWidth="1.2"
      />
      <path d="M92 160V196" stroke="#7900FF" strokeWidth="2" strokeLinecap="round" />
      <rect
        x="258"
        y="146"
        width="20"
        height="64"
        rx="10"
        fill="#101219"
        stroke="rgba(245,245,255,0.18)"
        strokeWidth="1.2"
      />
      <path d="M268 160V196" stroke="#087BFF" strokeWidth="2" strokeLinecap="round" />

      {/* Visor recess */}
      <rect
        x="112"
        y="128"
        width="136"
        height="56"
        rx="28"
        fill="#05060A"
        stroke="rgba(0,207,255,0.24)"
        strokeWidth="1.4"
      />
      <g clipPath={`url(#${id("visor-clip")})`}>
        <rect x="126" y="142" width="108" height="28" rx="14" fill={`url(#${id("visor")})`} opacity="0.88" />
        <rect
          x="126"
          y="143"
          width="108"
          height="4"
          fill="#F5F5FF"
          opacity="0.55"
          className="robot-scan"
        />
      </g>
      <rect
        x="118"
        y="134"
        width="124"
        height="44"
        rx="22"
        stroke="rgba(0,207,255,0.18)"
        strokeWidth="1"
      />
      <circle cx="118" cy="156" r="2" fill="#00CFFF" filter={`url(#${id("glow")})`} />
      <circle cx="242" cy="156" r="2" fill="#B98CFF" filter={`url(#${id("glow")})`} />

      {/* Jaw grill */}
      <rect
        x="162"
        y="196"
        width="36"
        height="8"
        rx="4"
        fill="#05060A"
        stroke="rgba(245,245,255,0.16)"
        strokeWidth="1"
      />
      <path d="M172 197V203M180 197V203M188 197V203" stroke="rgba(0,207,255,0.5)" strokeWidth="1" />

      {/* Helmet seams */}
      <path d="M140 214L146 244" stroke="rgba(245,245,255,0.08)" strokeWidth="1" />
      <path d="M220 214L214 244" stroke="rgba(245,245,255,0.08)" strokeWidth="1" />

      {/* Neck */}
      <rect x="154" y="248" width="52" height="28" rx="9" fill="#0D0F15" stroke="rgba(245,245,255,0.12)" />
      <path d="M162 256H198M162 266H198" stroke="rgba(245,245,255,0.1)" strokeWidth="1" />

      {/* Shoulders */}
      <path
        d="M112 300C104 282 88 276 66 280C50 283 42 296 40 316L36 356L92 372L112 330V300Z"
        fill={`url(#${id("armor-2")})`}
        stroke="rgba(245,245,255,0.14)"
        strokeWidth="1.3"
      />
      <path
        d="M248 300C256 282 272 276 294 280C310 283 318 296 320 316L324 356L268 372L248 330V300Z"
        fill={`url(#${id("armor-2")})`}
        stroke="rgba(245,245,255,0.14)"
        strokeWidth="1.3"
      />
      <rect x="58" y="306" width="30" height="4" rx="2" fill={`url(#${id("accent")})`} opacity="0.75" transform="rotate(-8 58 306)" />
      <rect x="272" y="306" width="30" height="4" rx="2" fill={`url(#${id("accent")})`} opacity="0.75" transform="rotate(8 272 306)" />

      {/* Chest */}
      <path
        d="M132 268H228L252 306L240 392H120L108 306L132 268Z"
        fill={`url(#${id("armor")})`}
        stroke="rgba(245,245,255,0.16)"
        strokeWidth="1.4"
      />
      <path
        d="M132 268L120 392M228 268L240 392"
        stroke="rgba(245,245,255,0.08)"
        strokeWidth="1"
      />
      <path d="M180 270V392" stroke="rgba(245,245,255,0.08)" strokeWidth="1" />
      <path d="M124 336H236" stroke="rgba(245,245,255,0.06)" strokeWidth="1" />

      {/* Core */}
      <circle cx="180" cy="316" r="34" fill={`url(#${id("core")})`} opacity="0.55" />
      <path
        d="M180 294L199 305V327L180 338L161 327V305L180 294Z"
        fill="#07080D"
        stroke="#7900FF"
        strokeWidth="1.4"
      />
      <path
        d="M180 302L191 308.5V321.5L180 328L169 321.5V308.5L180 302Z"
        fill={`url(#${id("accent")})`}
        opacity="0.85"
        className="robot-core"
      />
      <circle cx="180" cy="315" r="3" fill="#F5F5FF" />

      {/* Chest serial */}
      <text
        x="180"
        y="366"
        textAnchor="middle"
        fill="rgba(245,245,255,0.5)"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontSize="8"
        letterSpacing="3"
      >
        01
      </text>
      <path d="M150 378H210" stroke="rgba(245,245,255,0.12)" strokeWidth="1" />
    </svg>
  );
}
