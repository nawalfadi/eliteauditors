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

const SLOTS = /** @type {const} */ (['tl', 'tr', 'bl', 'br'])

/**
 * 4-node hub-and-spoke diagram.
 * - Center: primary circular node
 * - Outer: 4 identical rectangular cards (TL/TR/BL/BR)
 * - Connectors: clean diagonal lines via an SVG overlay
 */
export function ServiceHubDiagram({ hubTitle, cards, lang }) {
  const textDir = lang === 'ar' ? 'rtl' : 'ltr'

  const normalized = SLOTS.map((slot, idx) => {
    const c = cards?.[idx] ?? {}
    return {
      slot,
      title: c.title ?? '',
      Icon: c.Icon ?? PlaceholderIcon,
    }
  })

  const ariaLabel = normalized
    .map((c) => c.title)
    .filter(Boolean)
    .join('; ')

  return (
    <div className="service-hub-wrap">
      <div className="service-hub" dir="ltr" role="region" aria-label={ariaLabel || hubTitle}>
        <svg className="service-hub__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="service-hub-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(18, 59, 109, 0.75)" />
              <stop offset="100%" stopColor="rgba(11, 31, 58, 0.95)" />
            </linearGradient>
          </defs>
          <path
            d="M 50 50 L 37 39 L 15 23"
            fill="none"
            stroke="url(#service-hub-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 50 50 L 63 39 L 85 23"
            fill="none"
            stroke="url(#service-hub-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 50 50 L 37 61 L 15 77"
            fill="none"
            stroke="url(#service-hub-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 50 50 L 63 61 L 85 77"
            fill="none"
            stroke="url(#service-hub-line)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="service-hub__joint" cx="37" cy="39" r="2" />
          <circle className="service-hub__joint" cx="63" cy="39" r="2" />
          <circle className="service-hub__joint" cx="37" cy="61" r="2" />
          <circle className="service-hub__joint" cx="63" cy="61" r="2" />
        </svg>

        {normalized.map(({ slot, title, Icon }) => (
          <div key={slot} className={`service-hub__cell service-hub__cell--${slot}`}>
            <div className="service-hub__card">
              <span className="service-hub__card-icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="service-hub__card-title" dir={textDir}>
                {title}
              </div>
            </div>
          </div>
        ))}

        <div className="service-hub__cell service-hub__cell--hub">
          <div className="service-hub__hub-ring">
            <div className="service-hub__hub-inner">
              <span className="service-hub__hub-title" dir={textDir}>
                {hubTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

