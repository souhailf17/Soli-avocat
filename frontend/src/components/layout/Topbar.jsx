import { Bell, ChevronDown, Command, HelpCircle, Menu, Search, Sun } from 'lucide-react'

export default function Topbar({ onMobileMenu }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" type="button" onClick={onMobileMenu} aria-label="Open menu">
        <Menu size={21} />
      </button>
      <div className="global-search">
        <Search size={18} />
        <input type="search" placeholder="Search cases or clients..." aria-label="Global search" />
        <span className="search-shortcut"><Command size={12} /> K</span>
      </div>
      <div className="topbar__actions">
        <button className="icon-button" type="button" aria-label="Change theme"><Sun size={19} /></button>
        <button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell size={19} /><span>3</span></button>
        <button className="icon-button" type="button" aria-label="Help"><HelpCircle size={19} /></button>
        <div className="profile">
          <div className="avatar">ML</div>
          <div className="profile__text"><strong>Marie Laurent</strong><span>Administrator</span></div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  )
}
