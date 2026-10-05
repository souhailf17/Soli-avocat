import { ChevronDown } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLocale()

  return (
    <label className="language-switcher" aria-label={t('Choisir la langue')}>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label={t('Choisir la langue')}>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
      <ChevronDown size={13} aria-hidden="true" />
    </label>
  )
}
