import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { companyProfile } from '../data/companyData'
import { translations } from '../translations'
import { SERVICE_SLUG_TO_KEY, SERVICE_KEY_ORDER, serviceKeyToSlug } from '../serviceRoutes'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { ServiceHubDiagram } from '../components/ServiceHubDiagram'
import { ServiceHubDiagramFive } from '../components/ServiceHubDiagramFive'
import { ZakatTaxOrgChart } from '../components/ZakatTaxOrgChart'

function fillToFour(items, lang) {
  const out = Array.isArray(items) ? items.slice(0, 4) : []
  // If a service has <4 items, repeat the last real item instead of showing filler text.
  while (out.length < 4 && out.length > 0) out.push(out[out.length - 1])
  return out
}

function fillToFive(items) {
  const out = Array.isArray(items) ? items.slice(0, 5) : []
  while (out.length < 5 && out.length > 0) out.push(out[out.length - 1])
  return out
}

function ChevronPrev() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronNext() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ServiceDetailPage({ lang, activeSection, setActiveSection }) {
  const { slug } = useParams()
  const t = translations[lang]

  useEffect(() => {
    setActiveSection('services')
  }, [slug, setActiveSection])

  const serviceKey = SERVICE_SLUG_TO_KEY[slug || '']
  const group = serviceKey ? companyProfile.services[serviceKey] : null

  if (!group) {
    return <Navigate to={{ pathname: '/', hash: 'services' }} replace />
  }

  const title = lang === 'ar' ? group.titleAr : group.titleEn
  const items = lang === 'ar' ? group.itemsAr : group.itemsEn
  const cards = fillToFour(items, lang).map((t) => ({ title: t }))
  const nodes = fillToFive(items).map((t) => ({ title: t }))

  const idx = SERVICE_KEY_ORDER.indexOf(serviceKey)
  const n = SERVICE_KEY_ORDER.length
  const prevKey = SERVICE_KEY_ORDER[(idx - 1 + n) % n]
  const nextKey = SERVICE_KEY_ORDER[(idx + 1) % n]
  const prevSlug = serviceKeyToSlug(prevKey)
  const nextSlug = serviceKeyToSlug(nextKey)

  return (
    <>
      <header className="service-page-header">
        <SiteHeader lang={lang} activeSection={activeSection} />
        <div className="header-service-hero">
          <div className="header-service-hero__cluster">
            <Link
              className="header-service-hero__arrow"
              to={`/services/${prevSlug}`}
              aria-label={t.serviceDetail.prevService}
            >
              <ChevronPrev />
            </Link>
            <h1 className="header-service-hero__title" dir={lang === 'ar' ? 'rtl' : 'ltr'} data-sr="float">
              {title}
            </h1>
            <Link
              className="header-service-hero__arrow"
              to={`/services/${nextSlug}`}
              aria-label={t.serviceDetail.nextService}
            >
              <ChevronNext />
            </Link>
          </div>
        </div>
      </header>

      <div className="service-page">
        <div className="main-shell service-page__shell">
          <main className="main service-page__main service-page__main--org-chart">
            <p className="service-page__crumb" data-sr="float" style={{ '--sr-delay': '60ms' }}>
              <Link to={{ pathname: '/', hash: 'services' }}>{t.serviceDetail.backHome}</Link>
            </p>
            {serviceKey === 'zakatTax' ? (
              <div data-sr="float" style={{ '--sr-delay': '110ms' }}>
                <ZakatTaxOrgChart items={items} hubTitle={title} lang={lang} />
              </div>
            ) : serviceKey === 'advisory' ? (
              <div data-sr="float" style={{ '--sr-delay': '110ms' }}>
                <ServiceHubDiagramFive hubTitle={title} nodes={nodes} lang={lang} connectorMode="simple" />
              </div>
            ) : (
              <div data-sr="float" style={{ '--sr-delay': '110ms' }}>
                <ServiceHubDiagram hubTitle={title} cards={cards} lang={lang} />
              </div>
            )}
          </main>
        </div>
      </div>

      <SiteFooter lang={lang} />
    </>
  )
}
