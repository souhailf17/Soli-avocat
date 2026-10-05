import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'solution-avocat-language'
const DEFAULT_LANGUAGE = 'fr'
const SUPPORTED_LANGUAGES = ['fr', 'ar']

const LocaleContext = createContext(null)

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem(STORAGE_KEY)
    return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  const t = useCallback((key, replacements = {}) => {
    const value = translations[language]?.[key] ?? translations.fr[key] ?? key
    return Object.entries(replacements).reduce(
      (result, [name, replacement]) => result.replaceAll(`{${name}}`, replacement),
      value,
    )
  }, [language])

  const changeLanguage = useCallback((nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return
    setLanguage(nextLanguage)
    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // The selected language still applies for this session when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    document.documentElement.dir = direction
    document.body.dir = direction
    document.title = t('appTitle')
  }, [language, t])

  const formatLongDate = useCallback((date = new Date()) => {
    const locale = language === 'ar' ? 'ar-MA' : 'fr-FR'
    const formattedDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)

    return language === 'fr'
      ? formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      : formattedDate
  }, [language])

  const value = useMemo(() => ({
    language,
    direction: language === 'ar' ? 'rtl' : 'ltr',
    changeLanguage,
    formatLongDate,
    t,
  }), [changeLanguage, formatLongDate, language, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}
