import { companyInfo } from '../data/companyData'
import { translations } from '../translations'

export function SiteFooter({ lang }) {
  const t = translations[lang]

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="services">{companyInfo.services.join(' - ')}</p>
        <p className="copyright">
          {t.copyright} {new Date().getFullYear()} {companyInfo.arabicName} | {companyInfo.englishName}
        </p>
      </div>
    </footer>
  )
}
