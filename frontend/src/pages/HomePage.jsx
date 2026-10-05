import { BriefcaseBusiness, Clock3, FileText, FolderOpen, Gavel, ReceiptText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import StatCard from '../components/dashboard/StatCard'
import CategoryCard from '../components/dashboard/CategoryCard'
import CalendarWidget from '../components/dashboard/CalendarWidget'
import AttentionWidget from '../components/dashboard/AttentionWidget'
import ActionGrid from '../components/dashboard/ActionGrid'
import { categoryCards } from '../data/navigation'
import { useState } from 'react'

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      {mobileOpen && <button className="mobile-overlay" type="button" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)} />}
      <div className={`main-area ${collapsed ? 'main-area--expanded' : ''}`}>
        <Topbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="main-content">
          <div className="breadcrumb"><span>Home</span><b>/</b><strong>Dashboard</strong></div>
          <div className="page-intro"><div><p className="eyebrow">Monday, September 21, 2026</p><h1>Hello Marie <span>👋</span></h1><p>Here is a clear overview of your legal work.</p></div><button className="outline-button" type="button"><BriefcaseBusiness size={17} />My activity</button></div>
          <section className="stats-grid">
            <StatCard label="Active cases" value="248" change="+12%" note="this month" icon={FolderOpen} tone="indigo" />
            <StatCard label="Overdue tasks" value="12" change="-3" note="since yesterday" icon={Clock3} tone="orange" />
            <StatCard label="Hearings this week" value="8" change="+2" note="from last week" icon={Gavel} tone="violet" />
            <StatCard label="Unpaid invoices" value="5" change="-1" note="from last week" icon={ReceiptText} tone="red" />
          </section>
          <ActionGrid onAction={(href) => navigate(href)} />
          <section className="section-block"><div className="section-heading"><div><h2>Work areas</h2><p>Browse the main parts of the application</p></div><button className="text-button" type="button">Customize <FileText size={15} /></button></div><div className="category-grid">{categoryCards.map((card) => <CategoryCard {...card} key={card.title} />)}</div></section>
          <section className="widgets-grid"><CalendarWidget /><AttentionWidget /></section>
        </main>
      </div>
    </div>
  )
}
