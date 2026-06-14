'use client';

/**
 * ProceduralCover
 * 
 * Deterministic generative SVG cover for blog posts.
 * Given the same `seed` (typically post.slug), always renders the same composition.
 * 
 * Patterns: flow-field | network | topology | tessellation
 * All rendered on cream (#F5F2EC) with indigo (#2C3E80) ink — paleta swaraya.
 */

// ---------- Deterministic PRNG ----------
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- Pattern: Flow Field ----------
function renderFlowField(rng) {
  const W = 800, H = 500;
  const paths = [];
  const numCurves = 70 + Math.floor(rng() * 30);
  for (let i = 0; i < numCurves; i++) {
    let x = rng() * W;
    let y = rng() * H;
    const steps = 60 + Math.floor(rng() * 60);
    const points = [`M${x.toFixed(1)},${y.toFixed(1)}`];
    const phaseA = rng() * Math.PI * 2;
    const phaseB = rng() * Math.PI * 2;
    for (let s = 0; s < steps; s++) {
      const angle =
        Math.sin(x * 0.008 + phaseA) * 1.6 +
        Math.cos(y * 0.012 + phaseB) * 1.2;
      x += Math.cos(angle) * 4;
      y += Math.sin(angle) * 4;
      if (x < 0 || x > W || y < 0 || y > H) break;
      points.push(`L${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const op = 0.12 + rng() * 0.35;
    paths.push(
      <path
        key={i}
        d={points.join(' ')}
        stroke="#2C3E80"
        strokeWidth={0.6 + rng() * 1.2}
        strokeOpacity={op}
        fill="none"
        strokeLinecap="round"
      />,
    );
  }
  return paths;
}

// ---------- Pattern: Network Graph ----------
function renderNetwork(rng) {
  const W = 800, H = 500;
  const N = 26 + Math.floor(rng() * 8);
  const nodes = [];
  for (let i = 0; i < N; i++) {
    nodes.push({ x: 40 + rng() * (W - 80), y: 40 + rng() * (H - 80), r: 2 + rng() * 3 });
  }
  const lines = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 145) {
        const op = (1 - d / 145) * 0.55;
        lines.push(
          <line
            key={`${i}-${j}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="#2C3E80"
            strokeWidth={0.7}
            strokeOpacity={op}
          />,
        );
      }
    }
  }
  const dots = nodes.map((n, i) => (
    <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r} fill="#2C3E80" fillOpacity={0.85} />
  ));
  return [...lines, ...dots];
}

// ---------- Pattern: Topology (contour lines) ----------
function renderTopology(rng) {
  const W = 800, H = 500;
  const cx = W / 2 + (rng() - 0.5) * 180;
  const cy = H / 2 + (rng() - 0.5) * 100;
  const levels = 10 + Math.floor(rng() * 6);
  const harmonics = 3 + Math.floor(rng() * 4);
  const phase = rng() * Math.PI * 2;
  const paths = [];
  for (let L = 0; L < levels; L++) {
    const baseR = 40 + L * (22 + rng() * 8);
    const amp = 12 + rng() * 18;
    const pts = [];
    const steps = 120;
    for (let s = 0; s <= steps; s++) {
      const theta = (s / steps) * Math.PI * 2;
      const r =
        baseR +
        Math.sin(theta * harmonics + phase) * amp +
        Math.cos(theta * (harmonics + 2) + phase * 0.7) * amp * 0.4;
      const x = cx + Math.cos(theta) * r;
      const y = cy + Math.sin(theta) * r;
      pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    pts.push('Z');
    const op = 0.18 + (L / levels) * 0.5;
    paths.push(
      <path
        key={L}
        d={pts.join(' ')}
        stroke="#2C3E80"
        strokeOpacity={op}
        strokeWidth={0.9}
        fill="none"
      />,
    );
  }
  return paths;
}

// ---------- Pattern: Tessellation (triangular field) ----------
function renderTessellation(rng) {
  const W = 800, H = 500;
  const cols = 12;
  const rows = 8;
  const cellW = W / cols;
  const cellH = H / rows;
  const tris = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + (rng() - 0.5) * 6;
      const y = r * cellH + (rng() - 0.5) * 6;
      const x2 = x + cellW;
      const y2 = y + cellH;
      // diagonal direction varies
      const dir = rng() < 0.5;
      const o1 = 0.04 + rng() * 0.20;
      const o2 = 0.04 + rng() * 0.20;
      if (dir) {
        tris.push(
          <polygon key={`a${k}`} points={`${x},${y} ${x2},${y} ${x2},${y2}`} fill="#2C3E80" fillOpacity={o1} />,
          <polygon key={`b${k}`} points={`${x},${y} ${x2},${y2} ${x},${y2}`} fill="#2C3E80" fillOpacity={o2} />,
        );
      } else {
        tris.push(
          <polygon key={`a${k}`} points={`${x},${y} ${x2},${y} ${x},${y2}`} fill="#2C3E80" fillOpacity={o1} />,
          <polygon key={`b${k}`} points={`${x2},${y} ${x2},${y2} ${x},${y2}`} fill="#2C3E80" fillOpacity={o2} />,
        );
      }
      k++;
    }
  }
  return tris;
}

// ---------- Main component ----------
const PATTERN_FAMILIES = ['flow-field', 'network', 'topology', 'tessellation'];

export default function ProceduralCover({ seed = 'swaraya', family, className = '', aspect = '16/9' }) {
  const seedHash = hashSeed(String(seed));
  const rng = mulberry32(seedHash);
  // Choose family deterministically if not forced
  const chosen = family || PATTERN_FAMILIES[seedHash % PATTERN_FAMILIES.length];

  let content;
  switch (chosen) {
    case 'flow-field':  content = renderFlowField(rng);  break;
    case 'network':     content = renderNetwork(rng);    break;
    case 'topology':    content = renderTopology(rng);   break;
    case 'tessellation':content = renderTessellation(rng);break;
    default:            content = renderFlowField(rng);
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: aspect, background: '#F5F2EC' }}
    >
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      >
        {/* Very subtle grid texture */}
        <defs>
          <pattern id={`grid-${seedHash}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" stroke="#2C3E80" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#grid-${seedHash})`} />
        {content}
      </svg>

      {/* Corner tag — pattern family + seed (sutil, editorial) */}
      <div
        className="absolute bottom-3 right-3 text-[9px] tracking-[0.24em] uppercase"
        style={{
          color: 'rgba(44,62,128,0.45)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        }}
      >
        {chosen} · {String(seed).slice(0, 14)}
      </div>
    </div>
  );
}

export { PATTERN_FAMILIES };
