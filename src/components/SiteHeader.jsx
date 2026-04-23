import { Link } from 'react-router-dom'
import { translations } from '../translations'

const hashTo = (id) => ({ pathname: '/', hash: `#${id}` })

export function SiteHeader({ lang, activeSection }) {
  const t = translations[lang]

  return (
    <div className="topbar">
      <div className="brand">
        <Link to="/" aria-label="Elite Auditors home">
          <img src="/header-logo.png" alt="Elite Auditors" className="logo" />
        </Link>
      </div>

      <nav className="nav">
        <Link to={hashTo('about')} className={activeSection === 'about' ? 'active' : ''}>
          {t.nav.about}
        </Link>
        <Link to={hashTo('values')} className={activeSection === 'values' ? 'active' : ''}>
          {t.nav.values}
        </Link>
        <Link
          to={hashTo('strategic-goals')}
          className={activeSection === 'strategic-goals' ? 'active' : ''}
        >
          {t.nav.strategicGoals}
        </Link>
        <Link
          to={hashTo('strategic-pillars')}
          className={activeSection === 'strategic-pillars' ? 'active' : ''}
        >
          {t.nav.strategicPillars}
        </Link>
        <Link to={hashTo('services')} className={activeSection === 'services' ? 'active' : ''}>
          {t.nav.services}
        </Link>
        <Link to={hashTo('methodology')} className={activeSection === 'methodology' ? 'active' : ''}>
          {t.nav.methodology}
        </Link>
        <Link to={hashTo('position')} className={activeSection === 'position' ? 'active' : ''}>
          {t.nav.position}
        </Link>
        <Link to={hashTo('team')} className={activeSection === 'team' ? 'active' : ''}>
          {t.nav.team}
        </Link>
        <Link to={hashTo('contact')} className={activeSection === 'contact' ? 'active' : ''}>
          {t.nav.contact}
        </Link>
      </nav>
    </div>
  )
}
