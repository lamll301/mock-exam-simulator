import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Stars                                                               */
/* ------------------------------------------------------------------ */

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
};

// Deterministic pseudo-random so stars don't jump between re-renders
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// white (50%) / purple-300 (25%) / indigo-300 (25%)
const STAR_COLORS = [
  "#ffffff", "#ffffff", "#ffffff", "#ffffff",
  "#d8b4fe", "#d8b4fe",
  "#a5b4fc", "#a5b4fc",
];
// peak opacities ≈ opacity-20 / 50 / 80 (80 is a bit more common)
const STAR_OPACITIES = [0.2, 0.5, 0.5, 0.8, 0.8];

const generateStars = (
  count: number,
  seed: number,
  sizeMin: number,
  sizeMax: number
): Star[] => {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, id) => {
    const duration = rand() * 3.5 + 1.5;
    return {
      id,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * (sizeMax - sizeMin) + sizeMin,
      opacity: STAR_OPACITIES[Math.floor(rand() * STAR_OPACITIES.length)],
      // negative delay => each star starts at a random point of its cycle
      delay: -rand() * duration,
      duration,
      color: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
    };
  });
};

const StarLayer = ({ stars, depth }: { stars: Star[]; depth: number }) => (
  <div
    aria-hidden="true"
    className="nf-layer pointer-events-none absolute -inset-10 z-0"
    style={{ "--depth": depth } as CSSProperties}
  >
    {stars.map((s) => (
      <span
        key={s.id}
        className="nf-twinkle absolute rounded-full"
        style={
          {
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            animationDelay: `${s.delay}s`,
            "--nf-o": s.opacity,
            "--nf-d": `${s.duration}s`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Illustration                                                        */
/* ------------------------------------------------------------------ */

// Blocky rounded digits, all drawn in the same 158 × 196 box.
// (stroke-linejoin: round gives the soft corners; evenodd cuts the hole in the 0)
const DIGIT_PATHS: Record<string, string> = {
  "0": "M8 8 H150 V188 H8 Z M44 44 V152 H114 V44 Z",
  "3": "M8 8 H150 V188 H8 V152 H114 V116 H44 V80 H114 V44 H8 Z",
  "4": "M8 8 H62 V96 H96 V8 H150 V188 H96 V150 H8 Z",
  "5": "M8 8 H150 V44 H44 V80 H150 V188 H8 V152 H114 V116 H8 Z",
};

const Digit = ({ char, x }: { char: string; x: number }) => (
  <g transform={`translate(${x} 140)`}>
    <path
      d={DIGIT_PATHS[char]}
      fillRule="evenodd"
      fill="#fff"
      stroke="#fff"
      strokeWidth="16"
      strokeLinejoin="round"
    />
  </g>
);

const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#fff" strokeWidth="3" strokeLinecap="round">
    <line x1="-6" y1="0" x2="6" y2="0" />
    <line x1="0" y1="-6" x2="0" y2="6" />
  </g>
);

const Astronaut = () => (
  <g transform="translate(258 227) rotate(20) scale(1.4)">
    {/* Antenna */}
    <line x1="-18" y1="-122" x2="-30" y2="-150" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
    <circle cx="-30" cy="-152" r="5" fill="#fff" />

    {/* Legs */}
    <g strokeLinecap="round">
      <line x1="-14" y1="40" x2="-30" y2="100" stroke="#fff" strokeWidth="24" />
      <line x1="16" y1="40" x2="34" y2="100" stroke="#fff" strokeWidth="24" />
      <line x1="-24" y1="76" x2="-27" y2="86" stroke="#e5e7eb" strokeWidth="26" />
      <line x1="28" y1="76" x2="31" y2="86" stroke="#e5e7eb" strokeWidth="26" />
    </g>
    <ellipse cx="-34" cy="112" rx="18" ry="9" fill="#e5e7eb" transform="rotate(-18 -34 112)" />
    <ellipse cx="38" cy="112" rx="18" ry="9" fill="#e5e7eb" transform="rotate(-18 38 112)" />

    {/* Arms */}
    <g strokeLinecap="round" fill="none">
      <line x1="-22" y1="-18" x2="-80" y2="-2" stroke="#fff" strokeWidth="16" />
      <line x1="-80" y1="-2" x2="-100" y2="2" stroke="#e5e7eb" strokeWidth="8" />
      <line x1="22" y1="-18" x2="62" y2="22" stroke="#fff" strokeWidth="16" />
      <line x1="62" y1="22" x2="80" y2="-6" stroke="#e5e7eb" strokeWidth="12" />
    </g>

    {/* Torso */}
    <rect x="-30" y="-40" width="60" height="90" rx="22" fill="#fff" />
    <rect x="-16" y="-12" width="32" height="30" rx="4" fill="#f3f4f6" />
    <g stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round">
      <line x1="-9" y1="-5" x2="9" y2="-5" />
      <line x1="-9" y1="3" x2="9" y2="3" />
      <line x1="-9" y1="11" x2="9" y2="11" />
    </g>

    {/* Neck ring */}
    <path d="M-26 -44 Q0 -34 26 -44" stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" />

    {/* Helmet */}
    <circle cx="0" cy="-82" r="50" fill="#fff" />
    <rect x="-58" y="-92" width="14" height="26" rx="6" fill="#e5e7eb" />
    <circle cx="2" cy="-80" r="38" fill="#3f3f46" />
    <ellipse cx="-14" cy="-98" rx="14" ry="9" fill="#fff" transform="rotate(-30 -14 -98)" />
    <circle cx="-26" cy="-82" r="4" fill="#fff" opacity="0.9" />
  </g>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Error content                                                       */
/* ------------------------------------------------------------------ */

export type ErrorCode = 403 | 404 | 405 | 500 | 503;

type ErrorContent = {
  title: string;
  subtitle: string;
  description: string;
  /** "home" = single "Back to home page" button, "retry" = "Try again" + home link */
  action: "home" | "retry";
};

const ERROR_CONTENT: Record<ErrorCode, ErrorContent> = {
  403: {
    title: "Hold on!",
    subtitle: "Restricted Zone",
    description:
      "You don't have permission to access this page, try another account or head back home.",
    action: "home",
  },
  404: {
    title: "Oops!",
    subtitle: "Lost in Space",
    description: "The page you\u2019re looking for isn\u2019t found, we suggest you back to home.",
    action: "home",
  },
  405: {
    title: "Not so fast!",
    subtitle: "Wrong Maneuver",
    description:
      "This page doesn't accept that kind of request, go back and try a different route.",
    action: "home",
  },
  500: {
    title: "Mayday!",
    subtitle: "Something Went Wrong",
    description:
      "An unexpected error happened on our side, please try again in a moment.",
    action: "retry",
  },
  503: {
    title: "Be right back!",
    subtitle: "Service Unavailable",
    description:
      "Our servers are taking a short break or being upgraded, please check back in a few minutes.",
    action: "retry",
  },
};

export type ErrorPageProps = {
  code: ErrorCode;
  /** Optional overrides for the default copy */
  title?: string;
  subtitle?: string;
  description?: string;
};

const PRIMARY_BTN =
  "nf-pulse inline-flex items-center rounded-lg border border-violet-400/60 bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(108,92,231,0.5)] transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(108,92,231,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1829]";

const GHOST_BTN =
  "inline-flex items-center rounded-lg border border-violet-400/40 px-6 py-3 text-base font-medium text-violet-200 transition duration-200 hover:-translate-y-1 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1829]";

export function ErrorPage({ code, title, subtitle, description }: ErrorPageProps) {
  const content = ERROR_CONTENT[code];
  const finalTitle = title ?? content.title;
  const finalSubtitle = subtitle ?? content.subtitle;
  const finalDescription = description ?? content.description;
  // Every supported code is "x0y": the astronaut takes the place of the 0
  const [left, , right] = String(code).split("");

  useEffect(() => {
    const previous = document.title;
    document.title = `${code} · ${finalSubtitle}`;
    return () => {
      document.title = previous;
    };
  }, [code, finalSubtitle]);

  const rootRef = useRef<HTMLDivElement>(null);

  // Three star layers = three depths (far / mid / near)
  const farStars = useMemo(() => generateStars(280, 11, 1, 1.6), []);
  const midStars = useMemo(() => generateStars(130, 42, 1.4, 2.4), []);
  const nearStars = useMemo(() => generateStars(40, 77, 2, 3), []);

  // Mouse parallax: writes --px / --py (-1..1) straight to the DOM,
  // so mouse movement never triggers a React re-render.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      root.style.setProperty("--px", current.x.toFixed(4));
      root.style.setProperty("--py", current.y.toFixed(4));

      const settled =
        Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 py-6 text-center"
      style={
        {
          "--px": 0,
          "--py": 0,
          height: "100dvh",
          background:
            "radial-gradient(ellipse at 50% 45%, #1E1C2E 0%, #1A1829 40%, #0F0E17 100%)",
        } as CSSProperties
      }
    >
      <style>{`
        /* Parallax: each layer shifts opposite to the cursor, scaled by --depth (px) */
        .nf-layer {
          transform: translate3d(
            calc(var(--px, 0) * var(--depth, 0) * -1px),
            calc(var(--py, 0) * var(--depth, 0) * -1px),
            0
          );
          will-change: transform;
        }
        /* Same idea for groups inside the SVG (units = SVG user units) */
        .nf-svg-layer {
          transform: translate(
            calc(var(--px, 0) * var(--depth, 0) * -1px),
            calc(var(--py, 0) * var(--depth, 0) * -1px)
          );
        }

        @keyframes nf-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes nf-twinkle {
          0%, 100% { opacity: var(--nf-o, 0.6); }
          50%      { opacity: calc(var(--nf-o, 0.6) * 0.2); }
        }
        @keyframes nf-comet {
          0%   { transform: rotate(35deg) translateX(0);     opacity: 0; }
          2%   { opacity: 1; }
          11%  { transform: rotate(35deg) translateX(75vw);  opacity: 0; }
          100% { transform: rotate(35deg) translateX(75vw);  opacity: 0; }
        }
        .nf-comet {
          position: absolute;
          width: 160px;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9));
          opacity: 0;
          transform-origin: left center;
          animation: nf-comet var(--nf-cd, 10s) linear infinite;
          animation-delay: var(--nf-cdelay, 0s);
        }
        .nf-comet::after {
          content: "";
          position: absolute;
          right: -2px;
          top: 50%;
          width: 5px;
          height: 5px;
          margin-top: -2.5px;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 0 8px 2px rgba(196,181,253,0.8);
        }
        @keyframes nf-pulse {
          0%, 100% { box-shadow: 0 0 16px rgba(108,92,231,0.35); }
          50%      { box-shadow: 0 0 30px rgba(108,92,231,0.6); }
        }
        .nf-pulse { animation: nf-pulse 3s ease-in-out infinite; }
        .nf-pulse:hover { animation: none; }
        .nf-float   { animation: nf-float 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .nf-twinkle { animation: nf-twinkle var(--nf-d, 3s) ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .nf-float, .nf-twinkle, .nf-pulse { animation: none; }
          .nf-comet { display: none; }
        }
      `}</style>

      {/* Nebula dust: soft blurred clouds sunk under everything */}
      <div
        aria-hidden="true"
        className="nf-layer pointer-events-none absolute inset-0 z-0"
        style={{ "--depth": 10 } as CSSProperties}
      >
        <div className="absolute -left-24 top-[5%] h-[420px] w-[520px] rounded-full bg-violet-700/20 blur-[140px]" />
        <div className="absolute -bottom-32 right-[-6%] h-[460px] w-[560px] rounded-full bg-indigo-900/40 blur-[140px]" />
      </div>
      <div
        aria-hidden="true"
        className="nf-layer pointer-events-none absolute inset-0 z-0"
        style={{ "--depth": 16 } as CSSProperties}
      >
        <div className="absolute right-[8%] top-[2%] h-[320px] w-[420px] rounded-full bg-sky-900/25 blur-[140px]" />
        <div className="absolute bottom-[8%] left-[18%] h-[300px] w-[460px] rounded-full bg-slate-800/40 blur-[140px]" />
      </div>

      {/* Twinkling stars, three depths */}
      <StarLayer stars={farStars} depth={6} />
      <StarLayer stars={midStars} depth={14} />
      <StarLayer stars={nearStars} depth={28} />

      {/* Decorative planets: static, with banded surface, crescent shadow and a breathing halo */}
      <div
        aria-hidden="true"
        className="nf-layer pointer-events-none absolute left-[5%] top-[8%] z-0"
        style={{ "--depth": 18 } as CSSProperties}
      >
        <div className="relative w-24 sm:w-28">
          {/* Atmosphere */}
          <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-violet-400/30 blur-xl [animation-duration:6s] motion-reduce:animate-none" />
          <svg viewBox="0 0 120 120" className="relative block w-full overflow-visible opacity-60">
            <defs>
              <radialGradient id="nf-saturn" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#4c1d95" />
              </radialGradient>
              <clipPath id="nf-saturn-clip">
                <circle cx="60" cy="60" r="28" />
              </clipPath>
              <filter id="nf-saturn-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
              <mask id="nf-saturn-mask">
                <circle cx="60" cy="60" r="28" fill="#fff" />
                <circle cx="49" cy="49" r="27" fill="#000" filter="url(#nf-saturn-soft)" />
              </mask>
            </defs>

            {/* Ring, back half */}
            <g transform="rotate(-20 60 60)">
              <ellipse cx="60" cy="60" rx="54" ry="14" fill="none" stroke="#a78bfa" strokeWidth="4" />
            </g>

            {/* Planet + static bands */}
            <circle cx="60" cy="60" r="28" fill="url(#nf-saturn)" />
            <g clipPath="url(#nf-saturn-clip)" fill="none" strokeLinecap="round">
              <path d="M30 50 Q60 44 90 52" stroke="#ddd6fe" strokeOpacity="0.28" strokeWidth="3.5" />
              <path d="M30 62 Q60 56 90 64" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="2.5" />
              <path d="M30 73 Q60 68 90 75" stroke="#ddd6fe" strokeOpacity="0.2" strokeWidth="3" />
            </g>

            {/* Crescent shadow on the side facing away from the light */}
            <circle cx="60" cy="60" r="28" fill="#0f0e17" fillOpacity="0.6" mask="url(#nf-saturn-mask)" />

            {/* Ring, front half */}
            <g transform="rotate(-20 60 60)">
              <path d="M6 60 A54 14 0 0 0 114 60" fill="none" stroke="#ddd6fe" strokeWidth="4" />
            </g>
          </svg>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="nf-layer pointer-events-none absolute bottom-[6%] right-[4%] z-0"
        style={{ "--depth": 24 } as CSSProperties}
      >
        <div className="relative w-28 sm:w-36">
          {/* Atmosphere */}
          <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-indigo-500/30 blur-xl [animation-duration:8s] motion-reduce:animate-none" />
          <svg viewBox="0 0 160 160" className="relative block w-full overflow-visible opacity-55">
            <defs>
              <radialGradient id="nf-planet" cx="32%" cy="28%" r="85%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="55%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </radialGradient>
              <clipPath id="nf-planet-clip">
                <circle cx="80" cy="80" r="62" />
              </clipPath>
              <filter id="nf-planet-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <mask id="nf-planet-mask">
                <circle cx="80" cy="80" r="62" fill="#fff" />
                <circle cx="58" cy="60" r="60" fill="#000" filter="url(#nf-planet-soft)" />
              </mask>
            </defs>

            <circle cx="80" cy="80" r="62" fill="url(#nf-planet)" />

            {/* Static surface: colour bands + craters */}
            <g clipPath="url(#nf-planet-clip)">
              <path d="M24 70 Q80 52 136 72" fill="none" stroke="#a5b4fc" strokeOpacity="0.35" strokeWidth="6" strokeLinecap="round" />
              <path d="M20 96 Q80 80 140 98" fill="none" stroke="#a5b4fc" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
              <path d="M24 116 Q80 104 138 118" fill="none" stroke="#c7d2fe" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
              <circle cx="104" cy="112" r="9" fill="#1e1b4b" fillOpacity="0.5" />
              <circle cx="58" cy="106" r="5" fill="#1e1b4b" fillOpacity="0.4" />
            </g>

            {/* Crescent shadow on the side facing away from the light */}
            <circle cx="80" cy="80" r="62" fill="#0f0e17" fillOpacity="0.6" mask="url(#nf-planet-mask)" />
          </svg>
        </div>
      </div>

      {/* Shooting stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span
          className="nf-comet"
          style={{ top: "6%", left: "12%", "--nf-cd": "11s", "--nf-cdelay": "2s" } as CSSProperties}
        />
        <span
          className="nf-comet"
          style={{ top: "-2%", left: "52%", "--nf-cd": "17s", "--nf-cdelay": "9s" } as CSSProperties}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center">
        <div className="relative w-full max-w-[520px]">
          {/* Glow behind 404 + astronaut */}
          <div
            aria-hidden="true"
            className="nf-layer pointer-events-none absolute inset-0 -z-10"
            style={{ "--depth": 12 } as CSSProperties}
          >
            <div className="absolute left-1/2 top-1/2 h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500 to-sky-400 opacity-25 blur-[120px]" />
          </div>
          <svg
            viewBox="0 0 520 410"
            role="img"
            aria-label={`Error ${code} with an astronaut floating between the numbers`}
            className="h-[min(410px,46vh)] w-full overflow-visible"
          >
            {/* 4 · 4 — middle depth */}
            <g className="nf-svg-layer" style={{ "--depth": 8 } as CSSProperties}>
              <Digit char={left} x={0} />
              <Digit char={right} x={362} />
            </g>

            {/* Sparkles — slightly nearer than the numbers */}
            <g className="nf-svg-layer" style={{ "--depth": 14 } as CSSProperties}>
              <Sparkle x={150} y={114} s={1.3} />
              <Sparkle x={402} y={74} s={1.6} />
              <Sparkle x={121} y={51} s={0.8} />
              <Sparkle x={414} y={8} s={0.8} />
              <Sparkle x={34} y={356} s={1.6} />
              <Sparkle x={450} y={395} s={0.8} />
              <Sparkle x={524} y={139} s={0.8} />
              <circle cx="-40" cy="68" r="3.5" fill="#fff" />
              <circle cx="-33" cy="252" r="3.5" fill="#fff" />
              <circle cx="552" cy="273" r="2" fill="#fff" />
              <circle cx="36" cy="136" r="2" fill="#fff" />
            </g>

            {/* Astronaut — closest to the viewer, moves the most */}
            <g className="nf-svg-layer" style={{ "--depth": 22 } as CSSProperties}>
              <g className="nf-float">
                <Astronaut />
              </g>
            </g>
          </svg>
        </div>

        <h1 className="mt-6 text-6xl font-semibold tracking-tight text-white">{finalTitle}</h1>
        <h2 className="mt-5 text-4xl font-semibold text-gray-100">{finalSubtitle}</h2>
        <p className="mt-2 max-w-3xl text-lg text-gray-400">{finalDescription}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {content.action === "retry" ? (
            <>
              <button type="button" onClick={() => window.location.reload()} className={PRIMARY_BTN}>
                Try again
              </button>
              <Link to="/" className={GHOST_BTN}>
                Back to home page
              </Link>
            </>
          ) : (
            <Link to="/" className={PRIMARY_BTN}>
              Back to home page
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ready-made pages                                                    */
/* ------------------------------------------------------------------ */

export const Forbidden = () => <ErrorPage code={403} />;
export const NotFound = () => <ErrorPage code={404} />;
export const MethodNotAllowed = () => <ErrorPage code={405} />;
export const ServerError = () => <ErrorPage code={500} />;
export const ServiceUnavailable = () => <ErrorPage code={503} />;

export default ErrorPage;
