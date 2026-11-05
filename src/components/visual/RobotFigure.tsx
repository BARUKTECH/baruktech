/**
 * BARUK UNIT — ilustração vetorial original.
 *
 * Não usa modelos, imagens ou assets de terceiros. As camadas (armadura,
 * viseira, núcleo, circuitos) recebem animação via CSS em globals.css e são
 * inclinadas pelo componente pai conforme o ponteiro.
 */
export function RobotFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 900"
      fill="none"
      aria-hidden="true"
      className={`robot-svg h-full w-full ${className ?? ""}`}
    >
      <defs>
        <linearGradient id="bx-armor" x1="0.18" y1="0" x2="0.82" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#e6ebff" />
          <stop offset="0.72" stopColor="#b9c3ea" />
          <stop offset="1" stopColor="#7f89b8" />
        </linearGradient>

        <linearGradient id="bx-armor-side" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#c9d2f2" />
          <stop offset="1" stopColor="#8d97c6" />
        </linearGradient>

        <linearGradient id="bx-graphite" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#222c52" />
          <stop offset="0.5" stopColor="#0b1128" />
          <stop offset="1" stopColor="#04060f" />
        </linearGradient>

        <linearGradient id="bx-plate" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#151d3d" />
          <stop offset="0.55" stopColor="#0a0f24" />
          <stop offset="1" stopColor="#05070f" />
        </linearGradient>

        <linearGradient id="bx-visor" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#05060e" />
          <stop offset="0.52" stopColor="#0c1428" />
          <stop offset="1" stopColor="#04060c" />
        </linearGradient>

        <linearGradient id="bx-eye" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00cfff" stopOpacity="0.15" />
          <stop offset="0.3" stopColor="#8df3ff" />
          <stop offset="0.7" stopColor="#ffffff" />
          <stop offset="1" stopColor="#00cfff" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="bx-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2c8ff" />
          <stop offset="0.4" stopColor="#a020f0" />
          <stop offset="1" stopColor="#5c00c4" />
        </linearGradient>

        <linearGradient id="bx-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fe6ff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#9fe6ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#087bff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="bx-rim-violet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c79bff" stopOpacity="0" />
          <stop offset="0.4" stopColor="#a020f0" stopOpacity="0.8" />
          <stop offset="1" stopColor="#7900ff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="bx-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#8df3ff" />
          <stop offset="0.7" stopColor="#00cfff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7900ff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bx-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7900ff" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#087bff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#03040b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bx-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#00cfff" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#087bff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#03040b" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="bx-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00cfff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#bff6ff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#00cfff" stopOpacity="0" />
        </linearGradient>

        <filter id="bx-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="bx-glow-md" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="bx-visor-clip">
          <path d="M282 226 C310 214 410 214 438 226 L433 296 C430 320 404 334 360 334 C316 334 290 320 287 296 Z" />
        </clipPath>

        <clipPath id="bx-body-clip">
          <path d="M286 420 H434 L462 462 L486 560 L500 900 H220 L234 560 L258 462 Z" />
        </clipPath>
      </defs>

      {/* ambient halo + floor */}
      <ellipse cx="360" cy="330" rx="300" ry="330" fill="url(#bx-halo)" />
      <ellipse cx="360" cy="846" rx="250" ry="42" fill="url(#bx-floor)" />

      {/* orbital rings */}
      <g opacity="0.55">
        <ellipse
          className="rx-orbit"
          cx="360"
          cy="400"
          rx="298"
          ry="76"
          stroke="#6fb6ff"
          strokeOpacity="0.22"
          strokeDasharray="2 12"
          transform="rotate(-13 360 400)"
        />
        <ellipse
          className="rx-orbit-reverse"
          cx="360"
          cy="430"
          rx="336"
          ry="96"
          stroke="#a020f0"
          strokeOpacity="0.2"
          strokeDasharray="1 16"
          transform="rotate(11 360 430)"
        />
      </g>

      {/* circuit traces */}
      <g
        stroke="#087bff"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      >
        <path d="M96 300 H150 L186 264 H228" />
        <path d="M624 300 H570 L534 264 H492" />
        <path d="M120 620 H168 L204 584" />
        <path d="M600 620 H552 L516 584" />
      </g>
      <g stroke="#00cfff" strokeWidth="2" fill="none">
        <path className="energy-line" d="M96 300 H150 L186 264 H228" />
        <path className="energy-line" d="M624 300 H570 L534 264 H492" />
      </g>

      {/* ---------------- torso ---------------- */}
      <g className="rx-torso">
        {/* arms (upper, fading into the frame) */}
        <path
          d="M206 596 C186 648 178 712 184 764 L212 900 H266 L252 700 Z"
          fill="url(#bx-graphite)"
          stroke="#1b2547"
        />
        <path
          d="M514 596 C534 648 542 712 536 764 L508 900 H454 L468 700 Z"
          fill="url(#bx-graphite)"
          stroke="#1b2547"
        />
        <path
          d="M196 660 C204 712 208 762 206 812"
          stroke="#6fb6ff"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <path
          d="M524 660 C516 712 512 762 514 812"
          stroke="#a020f0"
          strokeOpacity="0.3"
          strokeWidth="2"
        />

        {/* chest base */}
        <path
          d="M286 420 H434 L462 462 L486 560 L500 900 H220 L234 560 L258 462 Z"
          fill="url(#bx-plate)"
          stroke="#1c2648"
          strokeWidth="1.5"
        />

        {/* shoulder pauldrons */}
        <path
          d="M286 428 C240 431 200 446 176 474 L148 548 C138 574 148 596 174 604 L232 620 L250 470 Z"
          fill="url(#bx-armor)"
          stroke="#8e98c8"
          strokeOpacity="0.45"
        />
        <path
          d="M434 428 C480 431 520 446 544 474 L572 548 C582 574 572 596 546 604 L488 620 L470 470 Z"
          fill="url(#bx-armor-side)"
          stroke="#7d87b8"
          strokeOpacity="0.45"
        />

        {/* pauldron neon slits */}
        <path
          d="M178 522 L232 502 L228 518 L176 540 Z"
          fill="url(#bx-violet)"
          opacity="0.85"
          filter="url(#bx-glow-sm)"
        />
        <path
          d="M542 522 L488 502 L492 518 L544 540 Z"
          fill="#087bff"
          opacity="0.7"
          filter="url(#bx-glow-sm)"
        />
        <path
          d="M166 566 L212 550"
          stroke="#00cfff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path
          d="M554 566 L508 550"
          stroke="#00cfff"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />

        {/* collar */}
        <path
          d="M300 418 H420 L438 452 H282 Z"
          fill="url(#bx-graphite)"
          stroke="#25305a"
        />
        <path
          d="M318 424 H402 L410 440 H310 Z"
          fill="#04060f"
        />

        {/* central armor plate */}
        <path
          d="M302 452 H418 L436 492 L420 612 L406 702 H314 L300 612 L284 492 Z"
          fill="url(#bx-armor)"
          stroke="#96a1d2"
          strokeOpacity="0.4"
          strokeWidth="1.4"
        />

        {/* chest recess */}
        <path
          d="M324 478 H396 L408 524 L398 622 H322 L312 524 Z"
          fill="url(#bx-graphite)"
          stroke="#2a3766"
          strokeWidth="1.2"
        />

        {/* core */}
        <circle
          cx="360"
          cy="548"
          r="46"
          stroke="#00cfff"
          strokeOpacity="0.22"
          strokeDasharray="2 7"
        />
        <circle
          cx="360"
          cy="548"
          r="34"
          fill="#050a18"
          stroke="url(#bx-eye)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <circle
          className="rx-core"
          cx="360"
          cy="548"
          r="22"
          fill="url(#bx-core)"
          filter="url(#bx-glow-md)"
        />
        <circle cx="360" cy="548" r="6" fill="#ffffff" opacity="0.9" />

        {/* chest vents */}
        <g stroke="#00cfff" strokeOpacity="0.3" strokeWidth="2">
          <path d="M246 668 H296" />
          <path d="M246 686 H296" />
          <path d="M424 668 H474" />
          <path d="M424 686 H474" />
        </g>

        {/* abdomen segments */}
        <g stroke="#1e2a52" strokeWidth="1.4">
          <path d="M244 724 H476" />
          <path d="M238 768 H482" />
          <path d="M232 812 H488" />
        </g>
        <g fill="url(#bx-plate)" stroke="#243058" strokeWidth="1.2">
          <path d="M286 704 H434 L440 744 H280 Z" />
          <path d="M280 752 H440 L446 794 H274 Z" />
        </g>

        {/* side rim lights */}
        <path
          d="M252 470 L238 560 L226 700"
          stroke="url(#bx-rim)"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <path
          d="M468 470 L482 560 L494 700"
          stroke="url(#bx-rim-violet)"
          strokeWidth="2.5"
          opacity="0.7"
        />

        {/* panel lines */}
        <g stroke="#0a1124" strokeOpacity="0.9" strokeWidth="1.2">
          <path d="M302 612 H340" />
          <path d="M380 612 H418" />
          <path d="M314 640 H406" />
          <path d="M316 668 H404" />
        </g>
      </g>

      {/* ---------------- head ---------------- */}
      <g className="rx-head">
        {/* antenna fins */}
        <path d="M300 106 L282 66 L310 84 Z" fill="url(#bx-graphite)" />
        <path d="M420 106 L438 66 L410 84 Z" fill="url(#bx-graphite)" />
        <circle cx="282" cy="66" r="3" fill="#00cfff" filter="url(#bx-glow-sm)" />
        <circle cx="438" cy="66" r="3" fill="#a020f0" filter="url(#bx-glow-sm)" />

        {/* neck */}
        <path
          d="M318 372 H402 V420 Q402 438 382 442 H338 Q318 438 318 420 Z"
          fill="url(#bx-graphite)"
          stroke="#25305a"
        />
        <path d="M324 392 H396" stroke="#00cfff" strokeOpacity="0.3" />
        <path d="M326 414 H394" stroke="#087bff" strokeOpacity="0.35" />

        {/* helmet shell */}
        <path
          d="M360 92 C300 92 252 126 240 190 C232 236 238 292 254 330 C270 368 306 392 360 392 C414 392 450 368 466 330 C482 292 488 236 480 190 C468 126 420 92 360 92 Z"
          fill="url(#bx-armor)"
          stroke="#95a0cf"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />

        {/* crown panel */}
        <path
          d="M360 100 C334 100 312 108 296 120 L312 212 H408 L424 120 C408 108 386 100 360 100 Z"
          fill="url(#bx-armor)"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <path
          d="M360 104 V206"
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <path
          d="M318 128 H402"
          stroke="#9aa5d4"
          strokeOpacity="0.55"
        />

        {/* temple plates */}
        <path
          d="M244 200 L218 216 L210 266 L240 288 L252 238 Z"
          fill="url(#bx-graphite)"
          stroke="#2a3766"
          strokeWidth="1.2"
        />
        <path
          d="M476 200 L502 216 L510 266 L480 288 L468 238 Z"
          fill="url(#bx-graphite)"
          stroke="#2a3766"
          strokeWidth="1.2"
        />
        <path d="M226 230 L240 246" stroke="#00cfff" strokeOpacity="0.5" />
        <path d="M494 230 L480 246" stroke="#a020f0" strokeOpacity="0.6" />

        {/* ear pods */}
        <circle cx="232" cy="262" r="20" fill="url(#bx-plate)" stroke="#2c3968" />
        <circle
          className="rx-core"
          cx="232"
          cy="262"
          r="7"
          fill="url(#bx-violet)"
          filter="url(#bx-glow-sm)"
        />
        <circle cx="488" cy="262" r="20" fill="url(#bx-plate)" stroke="#2c3968" />
        <circle
          className="rx-core"
          cx="488"
          cy="262"
          r="7"
          fill="#087bff"
          filter="url(#bx-glow-sm)"
        />

        {/* visor recess */}
        <path
          d="M268 214 C300 196 420 196 452 214 L447 302 C443 334 412 350 360 350 C308 350 277 334 273 302 Z"
          fill="url(#bx-visor)"
          stroke="#5f7bd4"
          strokeOpacity="0.45"
          strokeWidth="1.6"
        />

        {/* visor bezel */}
        <path
          d="M282 226 C310 214 410 214 438 226 L433 296 C430 320 404 334 360 334 C316 334 290 320 287 296 Z"
          fill="#04060e"
          stroke="#143b6e"
          strokeWidth="1.2"
        />

        {/* eye light */}
        <g
          className="rx-visor"
          filter="url(#bx-glow-sm)"
          clipPath="url(#bx-visor-clip)"
        >
          <rect x="300" y="252" width="52" height="12" rx="6" fill="url(#bx-eye)" />
          <rect x="368" y="252" width="52" height="12" rx="6" fill="url(#bx-eye)" />
          <rect x="306" y="256" width="40" height="4" rx="2" fill="#ffffff" opacity="0.9" />
          <rect x="374" y="256" width="40" height="4" rx="2" fill="#ffffff" opacity="0.9" />
        </g>

        {/* visor scan */}
        <g clipPath="url(#bx-visor-clip)">
          <rect
            className="rx-scan"
            x="282"
            y="222"
            width="156"
            height="26"
            fill="url(#bx-scan)"
            opacity="0.5"
          />
        </g>

        {/* visor glass highlight */}
        <path
          d="M286 244 L322 216 L352 216 L300 274 Z"
          fill="#ffffff"
          opacity="0.06"
        />

        {/* jaw */}
        <path
          d="M298 344 C320 364 400 364 422 344 L410 374 C392 390 328 390 310 374 Z"
          fill="url(#bx-graphite)"
          stroke="#2a3766"
          strokeWidth="1.2"
        />
        <g stroke="#00cfff" strokeOpacity="0.35" strokeWidth="1.5">
          <path d="M330 362 H390" />
          <path d="M334 374 H386" />
        </g>

        {/* head rim lights */}
        <path
          d="M248 196 C240 236 242 286 254 322"
          stroke="url(#bx-rim)"
          strokeWidth="2.5"
          opacity="0.75"
        />
        <path
          d="M472 196 C480 236 478 286 466 322"
          stroke="url(#bx-rim-violet)"
          strokeWidth="2.5"
          opacity="0.75"
        />

        {/* chin sensor */}
        <circle
          cx="360"
          cy="382"
          r="4"
          fill="#00cfff"
          filter="url(#bx-glow-sm)"
          opacity="0.9"
        />
      </g>

      {/* foreground light sweep */}
      <path
        d="M262 470 L360 900 L458 470"
        stroke="#6fb6ff"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
    </svg>
  );
}
