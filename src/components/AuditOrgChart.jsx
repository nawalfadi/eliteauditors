/**
 * Hub-and-spoke layout for Audit & Assurance items (organizational chart style).
 * Branch mapping matches reference artwork: TL=special, TR=financial, BL=analysis, BR=agreed.
 */

function IconFinancial() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M17 11l2 2-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconAgreed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M4 6h5v14H5a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.85"
      />
    </svg>
  )
}

function IconSpecial() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="15" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M6 18c1.2-2.5 3.7-4 6-4s4.8 1.5 6 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconAnalysis() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 14V10l4 3 3-5 3 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18h4M13 18h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const BRANCH_CONFIG = [
  { slot: 'tl', itemIndex: 2, Icon: IconSpecial },
  { slot: 'tr', itemIndex: 0, Icon: IconFinancial },
  { slot: 'bl', itemIndex: 3, Icon: IconAnalysis },
  { slot: 'br', itemIndex: 1, Icon: IconAgreed },
]

export function AuditOrgChart({ items, hubTitle, lang }) {
  const branches = BRANCH_CONFIG.map(({ slot, itemIndex, Icon }) => ({
    slot,
    text: items[itemIndex],
    Icon,
  })).filter((b) => b.text)

  const summaryLabel = branches.map((b) => b.text).join('; ')
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="audit-org-chart-wrap">
      <div className="audit-org-chart" dir="ltr" role="region" aria-label={summaryLabel}>
        <svg
          className="audit-org-chart__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="audit-org-chart-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#123b6d" />
              <stop offset="100%" stopColor="#0b1f3a" />
            </linearGradient>
          </defs>
          <path
            d="M 50 50 L 36 40 L 14 24"
            fill="none"
            stroke="url(#audit-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="36" cy="40" r="2" />
          <path
            d="M 50 50 L 64 40 L 86 24"
            fill="none"
            stroke="url(#audit-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="64" cy="40" r="2" />
          <path
            d="M 50 50 L 36 60 L 14 76"
            fill="none"
            stroke="url(#audit-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="36" cy="60" r="2" />
          <path
            d="M 50 50 L 64 60 L 86 76"
            fill="none"
            stroke="url(#audit-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="64" cy="60" r="2" />
        </svg>

        {branches.map(({ slot, text, Icon }) => {
          const iconTowardHub = slot === 'tr' || slot === 'br'
          return (
            <div key={slot} className={`audit-org-chart__cell audit-org-chart__cell--${slot}`}>
              <div className={`audit-org-chart__capsule audit-org-chart__capsule--${slot}`}>
                {iconTowardHub ? (
                  <>
                    <span className="audit-org-chart__capsule-icon">
                      <Icon />
                    </span>
                    <p className="audit-org-chart__capsule-text" dir={textDir}>
                      {text}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="audit-org-chart__capsule-text" dir={textDir}>
                      {text}
                    </p>
                    <span className="audit-org-chart__capsule-icon">
                      <Icon />
                    </span>
                  </>
                )}
              </div>
            </div>
          )
        })}

        <div className="audit-org-chart__cell audit-org-chart__cell--hub">
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
