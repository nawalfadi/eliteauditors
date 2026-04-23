/** URL slug → key in companyProfile.services */
export const SERVICE_SLUG_TO_KEY = {
  audit: 'audit',
  advisory: 'advisory',
  other: 'other',
  'zakat-tax': 'zakatTax',
}

export const SERVICE_KEY_ORDER = ['audit', 'advisory', 'zakatTax', 'other']

export function serviceKeyToSlug(key) {
  return key === 'zakatTax' ? 'zakat-tax' : key
}
