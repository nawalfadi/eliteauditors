function PlaceholderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l7.5 4.3v8.6L12 23 4.5 14.9V6.3L12 2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

function splitLines(text) {
  const s = typeof text === 'string' ? text : ''
  return s.split('\n').map((t) => t.trim()).filter(Boolean)
}

function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3h6l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

function CalculatorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8 7h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <path d="M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9.2 12.3l2 2 3.6-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M21 21l-3.7-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 6v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M15 12v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M11 18v0" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

const DEFAULT_ICONS = [CalculatorIcon, SlidersIcon, SearchIcon, ShieldCheckIcon, DocIcon]

/**
 * 5-node circular hub-and-spoke diagram.
 * - Center: circular hub (same styling as ServiceHubDiagram)
 * - Outer: 5 cards placed around an orbit (pentagon layout)
 * - Connectors: clean radial lines via SVG overlay
 */
export function ServiceHubDiagramFive({ hubTitle, nodes, lang, connectorMode = 'segmented', variant = 'card' }) {
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  const normalized = (Array.isArray(nodes) ? nodes : [])
    .slice(0, 5)
    .map((n, idx) => ({
      title: n?.title ?? '',
      Icon: n?.Icon ?? DEFAULT_ICONS[idx] ?? PlaceholderIcon,
    }))

  while (normalized.length < 5) normalized.push({ title: '', Icon: PlaceholderIcon })

  const center = { x: 50, y: 50 }
  // Slightly larger orbit so cards don't touch the hub (≈ +10px at 560px canvas).
  const radius = 40
  const startDeg = -90
  const step = 360 / 5

  const vectors = normalized.map((_, i) => {
    const a = ((startDeg + i * step) * Math.PI) / 180
    return { ux: Math.cos(a), uy: Math.sin(a) }
  })

  const nodePositions = vectors.map(({ ux, uy }) => ({
    x: center.x + radius * ux,
    y: center.y + radius * uy,
  }))

  // Whichever node is visually the highest (smallest y) is treated as the "top" card.
  const topIdx = nodePositions.reduce((bestIdx, p, i) => (p.y < nodePositions[bestIdx].y ? i : bestIdx), 0)

  // Approximate the pill/card half-size in SVG viewBox units (0–100).
  // This lets us stop the line at the *inner edge* of the box, not at its center.
  // These values are tuned to match our CSS sizing and keep lines consistent visually.
  const boxHalf = variant === 'pill' ? { w: 18.5, h: 4.8 } : { w: 13.5, h: 6.2 }

  const clamp01 = (v) => Math.max(0, Math.min(100, v))
  const connectorStroke = 'url(#service-hub-line)'
  const connectorStrokeWidth = 1.25
  // Icon center, measured from the card's left edge, as a fraction of the card half-width.
  // (Card center is x; left edge is x - boxHalf.w.)
  // Tuned to visually land on the icon center across responsive sizes.
  const iconCenterFromLeft = boxHalf.w * 0.32

  const points = vectors.map(({ ux, uy }, i) => {
    const node = nodePositions[i]
    const start = center

    const title = normalized[i]?.title ?? ''
    const isFinanceOrAccounting = /finance|accounting/i.test(title)

    const anchor =
      connectorMode === 'simple'
        ? (() => {
            // Advisory requirement: land exactly at the center of the icon inside each card.
            // Icon center is a fixed offset from the card's left edge (in our 0–100 coordinate approximation).
            const iconCenterX = node.x - boxHalf.w + iconCenterFromLeft
            // Make Finance (left) + Accounting (right) lines longer in a *visibly* meaningful way:
            // extend along the hub→icon direction (not the orbit unit vector), while keeping Y locked.
            const extend = isFinanceOrAccounting ? 22.0 : 0
            const vx = iconCenterX - center.x
            const vy = node.y - center.y
            const vLen = Math.max(1e-6, Math.hypot(vx, vy))
            const uxLine = vx / vLen
            const uyLine = vy / vLen
            return {
              x: clamp01(iconCenterX + uxLine * extend),
              // Masking effect: lock Finance + Accounting to the icon center line
              // so connectors don't appear to drift toward corners.
              y: clamp01(isFinanceOrAccounting ? node.y : node.y + uyLine * extend),
            }
          })()
        : (() => {
            // Exact intersection with the box boundary (axis-aligned rect in viewBox units).
            // This makes each connector land precisely on the pill/card surface.
            const eps = 1e-6
            const ax = Math.max(Math.abs(ux), eps)
            const ay = Math.max(Math.abs(uy), eps)
            const tEdge = Math.min(boxHalf.w / ax, boxHalf.h / ay)

            // Use a tiny overlap so the connector visually meets the card border.
            const overlap = 0.1
            const t = Math.max(0, tEdge - overlap)
            return {
              x: clamp01(node.x - ux * t),
              y: clamp01(node.y - uy * t),
            }
          })()

    // Joint dot placement.
    // For Advisory ("simple"): a single dot on the straight connector, near the hub.
    // For "segmented": keep the mid dot.
    // Move the dot closer to the Finance/Accounting cards so the connector *reads* longer visually.
    const jointT = connectorMode === 'simple' ? (isFinanceOrAccounting ? 0.76 : 0.5) : 0.55
    const joint = {
      x: start.x + (anchor.x - start.x) * jointT,
      y: start.y + (anchor.y - start.y) * jointT,
    }

    return { node, anchor, joint, start, isFinanceOrAccounting }
  })

  const ariaLabel = normalized
    .map((n) => n.title)
    .filter(Boolean)
    .join('; ')

  const hubLines = splitLines(hubTitle)

  return (
    <div className="service-hub-wrap service-hub-wrap--five">
      <div
        className={['service-orbit', variant === 'pill' ? 'service-orbit--pill' : null].filter(Boolean).join(' ')}
        dir="ltr"
        role="region"
        aria-label={ariaLabel || hubTitle}
      >
        <svg className="service-orbit__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="service-hub-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(18, 59, 109, 0.75)" />
              <stop offset="100%" stopColor="rgba(11, 31, 58, 0.95)" />
            </linearGradient>
          </defs>
          {points.map((p, i) => (
            <path
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              d={
                connectorMode === 'simple'
                  ? `M ${p.start.x} ${p.start.y} L ${p.anchor.x} ${p.anchor.y}`
                  : `M ${center.x} ${center.y} L ${p.joint.x} ${p.joint.y} L ${p.anchor.x} ${p.anchor.y}`
              }
              fill="none"
              stroke={connectorStroke}
              strokeWidth={connectorStrokeWidth}
              strokeLinecap="butt"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {connectorMode === 'simple'
            ? points.map((p, i) => (
                <circle
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="service-hub__joint"
                  cx={p.joint.x}
                  cy={p.joint.y}
                  r="2"
                />
              ))
            : points.map((p, i) => (
                <g key={i}>
                  <circle className="service-hub__joint" cx={p.joint.x} cy={p.joint.y} r="2" />
                  <circle className="service-hub__joint" cx={p.anchor.x} cy={p.anchor.y} r="2" />
                </g>
              ))}
        </svg>

        {normalized.map(({ title, Icon }, i) => {
          const p = points[i].node
          const shouldMask = typeof title === 'string' && /finance|accounting/i.test(title)
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div
              key={i}
              className={['service-orbit__node', shouldMask ? 'service-orbit__node--mask' : null].filter(Boolean).join(' ')}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="service-hub__card service-card">
                <span className="service-hub__card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="service-hub__card-title" dir={textDir}>
                  {title}
                </div>
              </div>
            </div>
          )
        })}

        <div className="service-orbit__hub">
          <div className="service-hub__hub-ring">
            <div className="service-hub__hub-inner">
              <span className="service-hub__hub-title" dir={textDir}>
                {hubLines.length <= 1
                  ? hubTitle
                  : hubLines.map((line, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={idx}>
                        {line}
                        {idx < hubLines.length - 1 ? <br /> : null}
                      </span>
                    ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

