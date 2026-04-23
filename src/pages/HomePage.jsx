import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { companyInfo, companyProfile, teamMembers } from '../data/companyData'
import { translations } from '../translations'
import { PhoneLink } from '../components/PhoneLink'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { SERVICE_KEY_ORDER, serviceKeyToSlug } from '../serviceRoutes'

function Section({ id, title, children, className }) {
  return (
    <section className={['section', className].filter(Boolean).join(' ')} id={id}>
      <div className="section-head" data-sr="float">
        <h3 className="section-title">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function ExternalLink({ href, children, className = 'inline-link', withIcon = false, icon = 'external' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      style={withIcon ? { display: 'inline-flex', alignItems: 'center', gap: 8 } : undefined}
    >
      {withIcon && icon === 'location' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ) : null}
      {children}
    </a>
  )
}

function GmailComposeLink({ email, children, className = 'inline-link', withIcon = false }) {
  const href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {withIcon ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      ) : null}
      {children ?? email}
    </a>
  )
}

export function HomePage({ lang, activeSection, setActiveSection }) {
  const t = translations[lang]
  const location = useLocation()

  /** SPA navigation updates the hash but does not scroll like a native fragment link; align with that behavior. */
  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id || location.pathname !== '/') return

    const scrollToSection = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const tId = window.setTimeout(scrollToSection, 0)
    return () => window.clearTimeout(tId)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const h = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (h) setActiveSection(h)
  }, [setActiveSection])

  useEffect(() => {
    const ids = [
      'about',
      'values',
      'strategic-goals',
      'strategic-pillars',
      'services',
      'methodology',
      'position',
      'team',
      'contact',
    ]
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target?.id) setActiveSection(visible.target.id)
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] },
    )

    nodes.forEach((n) => observer.observe(n))

    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setActiveSection(hash)
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      observer.disconnect()
    }
  }, [setActiveSection])

  return (
    <>
      <header className="header">
        <SiteHeader lang={lang} activeSection={activeSection} />

        <div className="hero">
          <div className="hero-copy">
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-chips" aria-label="Services">
              {companyInfo.services.map((s, idx) => (
                <span key={s} className="chip">
                  {s}
                  {idx < companyInfo.services.length - 1 ? <span className="chip-dot">&nbsp;•&nbsp;</span> : null}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              {/* Removed per request: top hero phone/email quick actions */}
            </div>
          </div>
        </div>
      </header>

      <div className="main-shell">
        <main className="main">
          <Section id="about" title={t.sections.about}>
            <p className="prose" data-sr="float" style={{ '--sr-delay': '70ms' }}>
              {lang === 'ar' ? companyProfile.about.ar : companyProfile.about.en}
            </p>
          </Section>

          <Section id="values" title={t.sections.values}>
            <div className="grid cards">
              {companyProfile.values.map((v, idx) => (
                <div key={v.key} className="card value-card" data-sr="float" style={{ '--sr-delay': `${idx * 80}ms` }}>
                  <div className="value-media">
                    <img src={v.image} alt="" className="value-image" loading="lazy" />
                  </div>
                  <div className="value-row">
                    <div className="value-badge" aria-hidden="true">
                      <img src="/icons/value-icon.png" alt="" className="value-icon" />
                    </div>
                    <div className="value-content">
                      <div className="card-title">{lang === 'ar' ? v.titleAr : v.titleEn}</div>
                      <div className="card-body">{lang === 'ar' ? v.bodyAr : v.bodyEn}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="strategic-goals" title={t.sections.strategicGoals} className="section--bg section--bg-methodology">
            <div className="strategy-goals-layout">
              <div className="strategy-goals__cards">
                {companyProfile.strategicGoals.lanes.map((lane, idx) => (
                  <div
                    key={lane.num}
                    className="strategy-goal-card"
                    data-sr="float"
                    style={{ '--sr-delay': `${idx * 70}ms` }}
                  >
                    <span className="strategy-goal-card__num" aria-hidden="true">
                      {lane.num}
                    </span>
                    <p className="strategy-goal-card__text">
                      {lang === 'ar' ? lane.bodyAr : lane.bodyEn}
                    </p>
                  </div>
                ))}
              </div>
              <aside className="strategy-goals__aside" aria-label={t.sections.strategicGoals} data-sr="float" style={{ '--sr-delay': '210ms' }}>
                <div
                  className="strategy-goals__photo"
                  style={{ backgroundImage: `url(${companyProfile.strategicGoals.visualSrc})` }}
                  role="img"
                  aria-hidden="true"
                />
                <ul className="strategy-goals__track">
                  {companyProfile.strategicGoals.lanes.map((lane) => (
                    <li key={lane.num} className="strategy-goals__track-row" data-sr="float" style={{ '--sr-delay': '260ms' }}>
                      <span className="strategy-index">{lane.num}</span>
                      <span className="strategy-goals__track-label">
                        {lang === 'ar' ? lane.tagAr : lane.tagEn}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </Section>

          <Section id="strategic-pillars" title={t.sections.strategicPillars} className="section--bg section--bg-about">
            <div className="strategy-pillars-layout">
              <div className="strategy-pillars__cards">
                {companyProfile.strategicPillars.pillars.map((p, idx) => (
                  <div
                    key={p.num}
                    className="strategy-pillar-row"
                    data-sr="float"
                    style={{ '--sr-delay': `${idx * 70}ms` }}
                  >
                    <div className="strategy-pillar-num" aria-hidden="true">
                      {p.num}
                    </div>
                    <div className="strategy-pillar-box">
                      {(lang === 'ar' ? p.linesAr : p.linesEn).map((line, i) => (
                        <p key={i} className="strategy-pillar-box__line">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="strategy-pillars__visual" aria-hidden="true" data-sr="float" style={{ '--sr-delay': '210ms' }}>
                <div className="strategy-pillars__orbit">
                  <div
                    className="strategy-pillars__hero-circle"
                    style={{ backgroundImage: `url(${companyProfile.strategicPillars.visualSrc})` }}
                  />
                  <div className="strategy-pillars__bubbles">
                    {companyProfile.strategicPillars.stackLabels.map((b) => (
                      <div key={b.key} className="strategy-pillar-bubble" data-sr="float" style={{ '--sr-delay': '260ms' }}>
                        {lang === 'ar' ? b.titleAr : b.titleEn}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="services" title={t.sections.services} className="section--bg section--bg-services">
            <div className="grid service-grid service-grid--tiles">
              {SERVICE_KEY_ORDER.map((key) => {
                const group = companyProfile.services[key]
                return (
                  <Link
                    key={key}
                    to={`/services/${serviceKeyToSlug(key)}`}
                    className="service service--tile"
                    data-sr="float"
                  >
                    <span className="service-title">{lang === 'ar' ? group.titleAr : group.titleEn}</span>
                  </Link>
                )
              })}
            </div>
          </Section>

          <Section id="methodology" title={t.sections.methodology} className="section--bg section--bg-methodology">
            <div className="methodology-layout">
              <div className="methodology-media" aria-hidden="true">
                <img src="/methodology-photo.png" alt="" loading="lazy" />
              </div>

              <div className="methodology-cards" aria-label={t.sections.methodology}>
                {companyProfile.methodology.map((m, idx) => (
                  <div key={m.key} className="card card-muted" data-sr="float" style={{ '--sr-delay': `${idx * 70}ms` }}>
                    <div className="card-title">{lang === 'ar' ? m.titleAr : m.titleEn}</div>
                    <div className="card-body">{lang === 'ar' ? m.bodyAr : m.bodyEn}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="position" title={t.sections.position} className="section--bg section--bg-position">
            <p className="prose" data-sr="float" style={{ '--sr-delay': '70ms' }}>
              {lang === 'ar' ? companyProfile.position.ar.headline : companyProfile.position.en.headline}
            </p>
            {(() => {
              const pillars = lang === 'ar' ? companyProfile.position.ar.pillars : companyProfile.position.en.pillars
              const byKey = Object.fromEntries(pillars.map((p) => [p.key, p]))
              const isRtl = lang === 'ar'

              const topItems = [
                { col: 1, key: 'flex' },
                { col: 3, key: 'globalLocal' },
                { col: 5, key: 'expertise' },
              ].map(({ col, key }) => ({ col, ...(byKey[key] || pillars.find((p) => p.key === key) || {}) }))

              const bottomItems = [
                { col: 2, key: 'tailored' },
                { col: 4, key: 'client' },
              ].map(({ col, key }) => ({ col, ...(byKey[key] || pillars.find((p) => p.key === key) || {}) }))

              return (
                <div
                  className="position-strips"
                  dir={isRtl ? 'rtl' : 'ltr'}
                  aria-label={t.sections.position}
                  data-sr="float"
                  style={{ '--sr-delay': '140ms' }}
                >
                  <svg className="position-strips__bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <g transform={isRtl ? undefined : 'scale(-1, 1) translate(-100, 0)'}>
                      <path
                        d="M 0 50
                           C 5 50, 5 38, 10 38
                           C 15 38, 25 62, 30 62
                           C 35 62, 45 38, 50 38
                           C 55 38, 65 62, 70 62
                           C 75 62, 85 38, 90 38
                           C 95 38, 95 50, 100 50"
                        fill="none"
                        stroke="#0b1f3a"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />

                      <line x1="10" y1="14" x2="10" y2="38" stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3.5 6" strokeLinecap="round" />
                      <line x1="30" y1="62" x2="30" y2="86" stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3.5 6" strokeLinecap="round" />
                      <line x1="50" y1="14" x2="50" y2="38" stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3.5 6" strokeLinecap="round" />
                      <line x1="70" y1="62" x2="70" y2="86" stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3.5 6" strokeLinecap="round" />
                      <line x1="90" y1="14" x2="90" y2="38" stroke="#cbd5e1" strokeWidth="1.4" strokeDasharray="3.5 6" strokeLinecap="round" />
                    </g>
                  </svg>

                  <div className="position-strips__top" aria-label={isRtl ? 'الأعلى' : 'Top'}>
                    {topItems.map((p) =>
                      p?.title ? (
                        <div
                          key={p.key}
                          className="position-strips__cell"
                          data-sr="float"
                          style={{ gridColumn: p.col, '--sr-delay': '190ms' }}
                        >
                          <div className="position-strips__capsule" dir={isRtl ? 'rtl' : 'ltr'}>
                            {p.title}
                          </div>
                          <div className="position-strips__desc" dir={isRtl ? 'rtl' : 'ltr'}>
                            {p.body}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="position-strips__mid-spacer" aria-hidden="true" />

                  <div className="position-strips__bottom" aria-label={isRtl ? 'الأسفل' : 'Bottom'}>
                    {bottomItems.map((p) =>
                      p?.title ? (
                        <div
                          key={p.key}
                          className="position-strips__cell"
                          data-sr="float"
                          style={{ gridColumn: p.col, '--sr-delay': '240ms' }}
                        >
                          <div className="position-strips__capsule" dir={isRtl ? 'rtl' : 'ltr'}>
                            {p.title}
                          </div>
                          <div className="position-strips__desc" dir={isRtl ? 'rtl' : 'ltr'}>
                            {p.body}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )
            })()}
          </Section>

          <Section id="team" title={t.team}>
            <div className="team">
              {teamMembers.map((member, idx) => (
                <div key={member.id} className="team-card" data-sr="float" style={{ '--sr-delay': `${idx * 70}ms` }}>
                  <div className="team-name">
                    <div className="name-ar">{member.arabicName}</div>
                    <div className="name-en">{member.englishName}</div>
                  </div>
                  <div className="team-role">
                    <div className="job-ar">{member.jobTitleArabic}</div>
                    <div className="job-en">{member.jobTitleEnglish}</div>
                  </div>
                  <div className="team-links">
                    <GmailComposeLink email={member.email} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" title={t.sections.contact}>
            <div className="contact contact--plain">
              <div className="contact-item" data-sr="float" style={{ '--sr-delay': '0ms' }}>
                <div className="contact-k">{t.contact.phone}</div>
                <div className="contact-v">
                  <PhoneLink phone={companyInfo.officeMobile} variant="on-light" />
                </div>
              </div>
              <div className="contact-item" data-sr="float" style={{ '--sr-delay': '70ms' }}>
                <div className="contact-k">{t.contact.email}</div>
                <div className="contact-v">
                  <GmailComposeLink email={companyInfo.officeEmail} />
                </div>
              </div>
              <div className="contact-item" data-sr="float" style={{ '--sr-delay': '140ms' }}>
                <div className="contact-k">{t.contact.website}</div>
                <div className="contact-v">
                  <ExternalLink href="https://eliteaudit.sa/">https://eliteaudit.sa/</ExternalLink>
                </div>
              </div>
              <div className="contact-item" data-sr="float" style={{ '--sr-delay': '210ms' }}>
                <div className="contact-k">{t.contact.address}</div>
                <div className="contact-v">
                  <ExternalLink href="https://maps.google.com/?q=24.753628,46.675545" withIcon icon="location">
                    {companyInfo.address}
                  </ExternalLink>
                </div>
              </div>
            </div>
          </Section>
        </main>
      </div>

      <SiteFooter lang={lang} />
    </>
  )
}
