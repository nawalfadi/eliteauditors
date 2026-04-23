/**
 * Zakat & Tax — 3-node hub: one pill on the left (vertically centered), two on the right (stacked).
 * Data order [returns, consulting, objections] → zbr (returns), ztl (consulting), ztr (objections).
 */

function IconConsulting() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v14a2 2 0 002 2h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="17" cy="17" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 15.25v3.5M15.25 17h3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconObjections() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="8" r="2.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 14.5c0.7-1.6 2-2.3 2.5-2.3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="12" cy="7" r="2.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 14.5c0.9-1.9 2.7-2.8 3.5-2.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="18.5" cy="8" r="2.15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 14.5c0.7-1.6 2-2.3 2.5-2.3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconReturns() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M18 11.5l3 3-1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const BRANCH_CONFIG = [
  { slot: 'ztl', itemIndex: 1, Icon: IconConsulting },
  { slot: 'ztr', itemIndex: 2, Icon: IconObjections },
  { slot: 'zbr', itemIndex: 0, Icon: IconReturns },
]

function iconTowardHub(slot) {
  return slot === 'ztr' || slot === 'zbr'
}

export function ZakatTaxOrgChart({ items, hubTitle, lang }) {
  const branches = BRANCH_CONFIG.map(({ slot, itemIndex, Icon }) => ({
    slot,
    text: items[itemIndex],
    Icon,
  })).filter((b) => b.text)

  const summaryLabel = branches.map((b) => b.text).join('; ')
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="audit-org-chart-wrap">
      <div className="audit-org-chart zakat-tax-org-chart" dir="ltr" role="region" aria-label={summaryLabel}>
        <svg
          className="audit-org-chart__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="zakat-tax-org-chart-line"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="50"
              x2="100"
              y2="50"
            >
              <stop offset="0%" stopColor="#123b6d" />
              <stop offset="100%" stopColor="#0b1f3a" />
            </linearGradient>
          </defs>
          {/* Left: horizontal spoke to mid-height pill */}
          <path
            d="M 50 50 L 38 50 L 10 50"
            fill="none"
            stroke="url(#zakat-tax-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="38" cy="50" r="2" />
          {/* Right column: top */}
          <path
            d="M 50 50 L 63 37 L 88 20"
            fill="none"
            stroke="url(#zakat-tax-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="63" cy="37" r="2" />
          {/* Right column: bottom */}
          <path
            d="M 50 50 L 63 63 L 88 80"
            fill="none"
            stroke="url(#zakat-tax-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="63" cy="63" r="2" />
        </svg>

        {branches.map(({ slot, text, Icon }) => {
          const toward = iconTowardHub(slot)
          return (
            <div key={slot} className={`audit-org-chart__cell audit-org-chart__cell--${slot}`}>
              <div className={`audit-org-chart__capsule audit-org-chart__capsule--${slot}`}>
                {toward ? (
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
