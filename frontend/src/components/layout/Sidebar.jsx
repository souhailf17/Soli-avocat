import { ChevronDown, ChevronsLeft, ChevronsRight, Plus, Search } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '../../i18n/LocaleContext'

export default function Sidebar({ collapsed, onToggle }) {
  const [openSection, setOpenSection] = useState(null)
  const { pathname } = useLocation()
  const { direction, t } = useLocale()

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__brand">
        <div className="brand-mark">SA</div>
        {!collapsed && (
          <div>
            <strong>Solution</strong>
          <span>{t('Espace juridique')}</span>
          </div>
        )}
      </div>

      <Link className="new-case-button" to="/actions/create-case">
        <Plus size={18} />
        {!collapsed && <span>{t('Nouveau dossier')}</span>}
      </Link>

      {!collapsed && <p className="sidebar__label">{t('Espace de travail')}</p>}
      <nav className="sidebar__nav" aria-label={t('Navigation principale')}>
        {navigation.map(({ label, icon: Icon, items, href }) => (
          <div className="nav-group" key={label}>
            {href ? <Link className={`nav-item ${pathname === href ? 'nav-item--active' : ''}`} to={href}>
              <Icon size={19} strokeWidth={1.8} />
              {!collapsed && <span>{t(label)}</span>}
            </Link> : <button className={`nav-item ${items?.some((item) => pathname === item.href) ? 'nav-item--active' : ''}`} type="button" onClick={() => setOpenSection(openSection === label ? null : label)}>
              <Icon size={19} strokeWidth={1.8} />
              {!collapsed && <span>{t(label)}</span>}
              {!collapsed && <ChevronDown className="nav-item__chevron" size={15} />}
            </button>}
            {!collapsed && openSection === label && (
              <div className="nav-subitems">
                {items.map((item) => <Link to={item.href} key={item.href}><span>{t(item.label)}</span>{item.status === 'planned' && <small>{t('Bientôt')}</small>}</Link>)}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar__footer-card">
          <div className="footer-card__icon"><Search size={17} /></div>
          <strong>{t('Besoin d’aide ?')}</strong>
          <span>{t('Consultez le guide du produit')}</span>
          <a href="#help">{t('Ouvrir le centre d’aide →')}</a>
        </div>
      )}

      <button className="sidebar__toggle" type="button" onClick={onToggle} aria-label={t(collapsed ? 'Développer la navigation' : 'Réduire la navigation')}>
        {collapsed
          ? (direction === 'rtl' ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />)
          : (direction === 'rtl' ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />)}
      </button>
    </aside>
  )
}
