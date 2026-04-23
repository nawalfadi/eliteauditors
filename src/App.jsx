import { useState, useEffect } from 'react'
import { companyInfo, teamMembers } from './data/companyData'
import { translations } from './translations'
import './App.css'

function PhoneLink({ phone }) {
  const tel = phone.startsWith('+') ? phone : `+966${phone.replace(/^0/, '')}`
  return (
    <a href={`tel:${tel}`} className="phone-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      {phone}
    </a>
  )
}

function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('elite-auditors-lang')
    return saved === 'en' ? 'en' : 'ar'
  })

  const t = translations[lang]
  const isRtl = lang === 'ar'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.body.classList.toggle('rtl', isRtl)
    document.body.classList.toggle('ltr', !isRtl)
    localStorage.setItem('elite-auditors-lang', lang)
  }, [lang, isRtl])

  const infoRows = [
    { label: t.labels.companyNameAr, value: companyInfo.arabicName },
    { label: t.labels.companyNameEn, value: companyInfo.englishName },
    { label: t.labels.officeMobile, value: companyInfo.officeMobile, isPhone: true },
    { label: t.labels.website, value: companyInfo.website },
    { label: t.labels.officeEmail, value: companyInfo.officeEmail },
    { label: t.labels.commercialRegistration, value: companyInfo.commercialRegistration },
    { label: t.labels.licenseNumber, value: companyInfo.licenseNumber },
    { label: t.labels.address, value: companyInfo.address },
    { label: t.labels.cpa, value: companyInfo.cpa },
  ]

  return (
    <div className={`app ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="lang-toggle">
        <button
          className={lang === 'ar' ? 'active' : ''}
          onClick={() => setLang('ar')}
          aria-label="العربية"
        >
          العربية
        </button>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
          aria-label="English"
        >
          English
        </button>
      </div>

      <header className="header">
        <img
          src="/logo.png"
          alt="شركة نخبة المراجعين - Elite Auditors"
          className="logo"
        />
        <div className="header-text">
          <h1 className="company-title-ar">{companyInfo.arabicName}</h1>
          <h2 className="company-title-en">{companyInfo.englishName}</h2>
          <p className="tagline">{companyInfo.services.join(' - ')}</p>
        </div>
      </header>

      <main className="main">
        <section className="section company-info">
          <h3 className="section-title">{t.companyInfo}</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>{t.number}</th>
                <th>{t.field}</th>
              </tr>
            </thead>
            <tbody>
              {infoRows.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <span className="label">{row.label}</span>
                    {row.isPhone ? (
                      <PhoneLink phone={row.value} />
                    ) : (
                      <span className="value">{row.value}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section team-section">
          <h3 className="section-title">{t.team}</h3>
          <table className="team-table">
            <thead>
              <tr>
                <th>{t.tableHeaders.number}</th>
                <th>{t.tableHeaders.name}</th>
                <th>{t.tableHeaders.jobTitle}</th>
                <th>{t.tableHeaders.mobile}</th>
                <th>{t.tableHeaders.email}</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, i) => (
                <tr key={member.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="member-name">
                      <span className="name-ar">{member.arabicName}</span>
                      <span className="name-en">{member.englishName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="job-title">
                      <span className="job-ar">{member.jobTitleArabic}</span>
                      <span className="job-en">{member.jobTitleEnglish}</span>
                    </div>
                  </td>
                  <td>
                    <PhoneLink phone={member.mobile} />
                  </td>
                  <td>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="services">{companyInfo.services.join(' - ')}</p>
          <p className="copyright">{t.copyright} {new Date().getFullYear()} {companyInfo.arabicName} | {companyInfo.englishName}</p>
        </div>
        <img
          src="/qr-code.png"
          alt="QR Code"
          className="footer-qr"
        />
      </footer>
    </div>
  )
}

export default App
