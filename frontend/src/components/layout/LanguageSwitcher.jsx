import { Languages } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLocale()

  return (
    <div className="language-switcher" role="group" aria-label={t('Choisir la langue')}>
      <Languages className="language-switcher__icon" size={15} aria-hidden="true" />
      <button className={language === 'fr' ? 'language-switcher__option language-switcher__option--active' : 'language-switcher__option'} type="button" onClick={() => changeLanguage('fr')} aria-pressed={language === 'fr'}>
        <span className="language-switcher__short">FR</span>
        <span className="language-switcher__long">Français</span>
      </button>
      <span className="language-switcher__divider" aria-hidden="true" />
      <button className={language === 'ar' ? 'language-switcher__option language-switcher__option--active' : 'language-switcher__option'} type="button" onClick={() => changeLanguage('ar')} aria-pressed={language === 'ar'}>
        العربية
      </button>
    </div>
  )
}
