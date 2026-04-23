/**
 * Other services — four-corner hub layout (same geometry as Audit org chart).
 * TL=contractor classification, TR=off-plan, BL=zakat/tax & admin consulting, BR=company formation.
 */

function IconOffplan() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 21V5l8-2v18M8 21h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M11 9h2M11 13h2M11 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconFormation() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 16v-5M12 16V8M17 16V4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function IconContractors() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 9.5l4 6M16.5 9.5l-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconZakatReview() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h8a2 2 0 012 2v10H6V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17.5 19.5L21 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const BRANCH_CONFIG = [
  { slot: 'tl', itemIndex: 2, Icon: IconContractors },
  { slot: 'tr', itemIndex: 0, Icon: IconOffplan },
  { slot: 'bl', itemIndex: 3, Icon: IconZakatReview },
  { slot: 'br', itemIndex: 1, Icon: IconFormation },
]

export function OtherServicesOrgChart({ items, hubTitle, lang }) {
  const branches = BRANCH_CONFIG.map(({ slot, itemIndex, Icon }) => ({
    slot,
    text: items[itemIndex],
    Icon,
  })).filter((b) => b.text)

  const summaryLabel = branches.map((b) => b.text).join('; ')
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="audit-org-chart-wrap">
      <div className="audit-org-chart other-services-org-chart" dir="ltr" role="region" aria-label={summaryLabel}>
        <svg
          className="audit-org-chart__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="other-services-org-chart-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#123b6d" />
              <stop offset="100%" stopColor="#0b1f3a" />
            </linearGradient>
          </defs>
          <path
            d="M 50 50 L 36 40 L 14 24"
            fill="none"
            stroke="url(#other-services-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="36" cy="40" r="2" />
          <path
            d="M 50 50 L 64 40 L 86 24"
            fill="none"
            stroke="url(#other-services-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="64" cy="40" r="2" />
          <path
            d="M 50 50 L 36 60 L 14 76"
            fill="none"
            stroke="url(#other-services-org-chart-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="audit-org-chart__joint" cx="36" cy="60" r="2" />
          <path
            d="M 50 50 L 64 60 L 86 76"
            fill="none"
            stroke="url(#other-services-org-chart-line)"
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
