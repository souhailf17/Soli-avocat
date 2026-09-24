import { ChevronDown, ChevronsLeft, ChevronsRight, Plus, Search } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { useState } from 'react'

export default function Sidebar({ collapsed, onToggle }) {
  const [openSection, setOpenSection] = useState(null)

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__brand">
        <div className="brand-mark">SA</div>
        {!collapsed && (
          <div>
            <strong>Solution</strong>
            <span>Avocat</span>
          </div>
        )}
      </div>

      <button className="new-case-button" type="button">
        <Plus size={18} />
        {!collapsed && <span>Nouveau dossier</span>}
      </button>

      {!collapsed && <p className="sidebar__label">Navigation</p>}
      <nav className="sidebar__nav" aria-label="Navigation principale">
        {navigation.map(({ label, icon: Icon, items, href }) => (
          <div className="nav-group" key={label}>
            <button className={`nav-item ${label === 'Accueil' ? 'nav-item--active' : ''}`} type="button" onClick={() => {
              if (items) setOpenSection(openSection === label ? null : label)
            }}>
              <Icon size={19} strokeWidth={1.8} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && items && <ChevronDown className="nav-item__chevron" size={15} />}
            </button>
            {!collapsed && openSection === label && (
              <div className="nav-subitems">
                {[1, 2, 3, 4, 5].map((item) => <a href={`#${label}-exemple-${item}`} key={item}>Exemple {item}</a>)}
              </div>
            )}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar__footer-card">
          <div className="footer-card__icon"><Search size={17} /></div>
          <strong>Besoin d'aide ?</strong>
          <span>Consultez le centre d'aide</span>
          <a href="#aide">Ouvrir le centre d'aide →</a>
        </div>
      )}

      <button className="sidebar__toggle" type="button" onClick={onToggle} aria-label="Réduire la navigation">
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>
    </aside>
  )
}
