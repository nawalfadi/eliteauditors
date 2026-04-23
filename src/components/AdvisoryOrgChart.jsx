/**
 * Advisory services — rebuilt from scratch (isolated styles/classes).
 * 5 nodes: TL, TR, ML, MR, BC (bottom-center).
 */

function IconPolicies() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19h16v2H4v-2zM6 3h12v14H6V3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M9 7h6M9 11h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M14 17l4-4M14 17v4M14 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconIfrs() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9a2 2 0 104 0 2 2 0 00-4 0zM14 7a2 2 0 104 0 2 2 0 00-4 0zM10 15a2 2 0 104 0 2 2 0 00-4 0z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 10l2 3M14 9l-2 4M10 15l4-2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconGrc() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l7 4v5c0 5-3 9-7 11-4-2-7-6-7-11V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function IconInternalAudit() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconRestructure() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19l4-14M15 5l-4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="8" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const BRANCH_CONFIG = [
  { slot: 'tl', itemIndex: 1, Icon: IconIfrs },
  { slot: 'tr', itemIndex: 0, Icon: IconPolicies },
  { slot: 'ml', itemIndex: 4, Icon: IconRestructure },
  { slot: 'mr', itemIndex: 2, Icon: IconGrc },
  { slot: 'bc', itemIndex: 3, Icon: IconInternalAudit },
]

const SPOKES = [
  { slot: 'tl', d: 'M 50 50 L 40 38 L 20 20', joint: { cx: 40, cy: 38 } },
  { slot: 'tr', d: 'M 50 50 L 60 38 L 80 20', joint: { cx: 60, cy: 38 } },
  { slot: 'ml', d: 'M 50 50 L 36 50 L 14 50', joint: { cx: 36, cy: 50 } },
  { slot: 'mr', d: 'M 50 50 L 64 50 L 86 50', joint: { cx: 64, cy: 50 } },
  { slot: 'bc', d: 'M 50 50 L 50 60 L 50 78', joint: { cx: 50, cy: 60 } },
]

export function AdvisoryOrgChart({ items, hubTitle, lang }) {
  const branches = BRANCH_CONFIG.map(({ slot, itemIndex, Icon }) => ({
    slot,
    text: items?.[itemIndex],
    Icon,
  })).filter((b) => b.text)

  const summaryLabel = branches.map((b) => b.text).join('; ')
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="advisory-hub-wrap">
      <div className="advisory-hub" dir="ltr" role="region" aria-label={summaryLabel}>
        <svg className="advisory-hub__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="advisory-hub-line" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="100" y2="50">
              <stop offset="0%" stopColor="#123b6d" />
              <stop offset="100%" stopColor="#0b1f3a" />
            </linearGradient>
          </defs>
          {SPOKES.map(({ slot, d, joint }) => (
            <g key={slot}>
              <path
                d={d}
                fill="none"
                stroke="url(#advisory-hub-line)"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle className="advisory-hub__joint" cx={joint.cx} cy={joint.cy} r="2.25" />
            </g>
          ))}
        </svg>

        {branches.map(({ slot, text, Icon }) => (
          <div key={slot} className={`advisory-hub__node advisory-hub__node--${slot}`}>
            <div className="advisory-hub__pill">
              <span className="advisory-hub__icon" aria-hidden="true">
                <Icon />
              </span>
              <p className="advisory-hub__text" dir={textDir}>
                {text}
              </p>
            </div>
          </div>
        ))}

        <div className="advisory-hub__node advisory-hub__node--hub">
          <div className="audit-org-chart__hub-ring">
            <div className="audit-org-chart__hub-inner">
              <span className="audit-org-chart__hub-title" dir={textDir}>
                {hubTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
