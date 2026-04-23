import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'
import './App.css'

function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('elite-auditors-lang')
    return saved === 'en' ? 'en' : 'ar'
  })
  const [activeSection, setActiveSection] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    return hash || 'about'
  })

  const isRtl = lang === 'ar'
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.body.classList.toggle('rtl', isRtl)
    document.body.classList.toggle('ltr', !isRtl)
    localStorage.setItem('elite-auditors-lang', lang)
  }, [lang, isRtl])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-sr]'))
    if (elements.length === 0) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    // Only run scroll-reveal on the Home page.
    if (location.pathname !== '/') {
      document.documentElement.classList.remove('sr-on')
      document.documentElement.classList.remove('sr-init')
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Arm reveal styles and force a paint of the hidden state first
    // so the transition is actually visible.
    document.documentElement.classList.add('sr-on')
    document.documentElement.classList.add('sr-init')
    elements.forEach((el) => el.classList.remove('is-visible'))

    // Batch class adds into a single frame to reduce main-thread churn.
    const pending = new Set()
    let flushRaf = 0
    const queueVisible = (el) => {
      pending.add(el)
      if (flushRaf) return
      flushRaf = window.requestAnimationFrame(() => {
        flushRaf = 0
        pending.forEach((node) => node.classList.add('is-visible'))
        pending.clear()
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target
          queueVisible(el)
          observer.unobserve(el)
        }
      },
      // Trigger when the element is actually entering the viewport
      // (so the user sees the "float in" during scroll, not off-screen).
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' },
    )

    // 1st frame: hidden state paints (sr-init on, transitions off)
    // 2nd frame: enable transitions and start observing
    const raf1 = window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('sr-init')
      const raf2 = window.requestAnimationFrame(() => {
        // Anything already above-the-fold should be revealed immediately
        // (e.g. the nav tabs), otherwise it can look like it's "missing".
        const vh = window.innerHeight || 0
        const inViewNow = []
        const toObserve = []

        for (const el of elements) {
          const r = el.getBoundingClientRect()
          const inView = r.bottom > 0 && r.top < vh
          if (inView) inViewNow.push(el)
          else toObserve.push(el)
        }

        inViewNow.forEach((el) => queueVisible(el))

        // Observe in chunks to avoid long tasks on pages with many nodes.
        let i = 0
        const chunkSize = 30
        const observeChunk = () => {
          const end = Math.min(i + chunkSize, toObserve.length)
          for (; i < end; i += 1) observer.observe(toObserve[i])
          if (i < toObserve.length) window.setTimeout(observeChunk, 0)
        }
        observeChunk()
      })
      // eslint-disable-next-line no-use-before-define
      raf2Id = raf2
    })

    let raf2Id = 0
    return () => {
      window.cancelAnimationFrame(raf1)
      if (raf2Id) window.cancelAnimationFrame(raf2Id)
      if (flushRaf) window.cancelAnimationFrame(flushRaf)
      observer.disconnect()
    }
  }, [location.pathname, location.hash])

  return (
    <div className={`app ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="lang-toggle">
        <button
          type="button"
          className={lang === 'ar' ? 'active' : ''}
          onClick={() => setLang('ar')}
          aria-label="العربية"
        >
          العربية
        </button>
        <button
          type="button"
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
          aria-label="English"
        >
          English
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={<HomePage lang={lang} activeSection={activeSection} setActiveSection={setActiveSection} />}
        />
        <Route
          path="/services/:slug"
          element={<ServiceDetailPage lang={lang} activeSection={activeSection} setActiveSection={setActiveSection} />}
        />
      </Routes>
    </div>
  )
}

export default App
