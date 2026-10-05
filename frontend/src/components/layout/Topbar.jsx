import { Bell, ChevronDown, Command, HelpCircle, Menu, Search, Sun } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Topbar({ onMobileMenu }) {
  const { t } = useLocale()

  return (
    <header className="topbar">
      <button className="mobile-menu" type="button" onClick={onMobileMenu} aria-label={t('Ouvrir le menu')}>
        <Menu size={21} />
      </button>
      <div className="global-search">
        <Search size={18} />
        <input type="search" placeholder={t('Rechercher un dossier ou un client…')} aria-label={t('Recherche globale')} />
        <span className="search-shortcut"><Command size={12} /> K</span>
      </div>
      <div className="topbar__actions">
        <LanguageSwitcher />
        <button className="icon-button" type="button" aria-label={t('Changer de thème')}><Sun size={19} /></button>
        <button className="icon-button notification-button" type="button" aria-label={t('Notifications')}><Bell size={19} /><span>3</span></button>
        <button className="icon-button" type="button" aria-label={t('Aide')}><HelpCircle size={19} /></button>
        <div className="profile">
          <div className="avatar">ML</div>
          <div className="profile__text"><strong>Marie Laurent</strong><span>{t('Administratrice')}</span></div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  )
}
