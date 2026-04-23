function normalizeKsaPhone(phone) {
  const raw = String(phone ?? '').trim()
  if (!raw) return { e164: '', digits: '' }

  // Keep digits only; if number already includes country code, preserve it.
  const digitsOnly = raw.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '').replace(/\D/g, '')

  // If it's a local KSA mobile like 05xxxxxxxx, convert to +9665xxxxxxxx
  if (raw.startsWith('05') || digitsOnly.startsWith('05')) {
    const local = (digitsOnly.startsWith('05') ? digitsOnly : raw.replace(/\D/g, '')).replace(/^0/, '')
    const digits = `966${local}`
    return { e164: `+${digits}`, digits }
  }

  // If it already starts with 966, treat as KSA international without plus
  if (digitsOnly.startsWith('966')) return { e164: `+${digitsOnly}`, digits: digitsOnly }

  // If it was provided as +<country><number>, just re-add plus
  if (raw.startsWith('+')) return { e164: `+${digitsOnly}`, digits: digitsOnly }

  // Fallback: assume KSA and prefix 966
  const digits = `966${digitsOnly.replace(/^0/, '')}`
  return { e164: `+${digits}`, digits }
}

export function PhoneLink({ phone, variant = 'on-dark', showWhatsAppIcon = true, showSmsIcon = true }) {
  const { e164, digits } = normalizeKsaPhone(phone)
  const whatsappHref = digits ? `https://wa.me/${digits}` : '#'
  const smsHref = e164 ? `sms:${e164}` : '#'

  return (
    <span className={`phone-link ${variant}`} role="group" aria-label="Phone actions">
      <a href={whatsappHref} target="_blank" rel="noreferrer" className="phone-link__item" aria-label="WhatsApp">
        {showWhatsAppIcon ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.49 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.33-1.66a11.85 11.85 0 0 0 5.73 1.46h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42z" />
          </svg>
        ) : null}
        {phone}
      </a>
      {showSmsIcon ? (
        <a href={smsHref} className="phone-link__item phone-link__item--icon" aria-label="Text message (SMS)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </a>
      ) : null}
    </span>
  )
}
