export const DEFAULT_LANGUAGE = 'fr'
export const DEFAULT_LOCALE = 'fr-FR'

export function formatLongDate(date = new Date()) {
  const formattedDate = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
