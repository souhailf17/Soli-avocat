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
          <div className="breadcrumb"><span>Accueil</span><b>/</b><strong>Tableau de bord</strong></div>
          <div className="page-intro"><div><p className="eyebrow">Lundi 21 septembre 2026</p><h1>Bonjour Marie <span>👋</span></h1><p>Voici les éléments nécessitant votre attention aujourd'hui.</p></div><button className="outline-button" type="button"><BriefcaseBusiness size={17} />Mon activité</button></div>
          <section className="stats-grid">
            <StatCard label="Dossiers actifs" value="248" change="+12%" note="ce mois-ci" icon={FolderOpen} tone="indigo" />
            <StatCard label="Retards à traiter" value="12" change="-3" note="depuis hier" icon={Clock3} tone="orange" />
            <StatCard label="Audiences cette semaine" value="8" change="+2" note="vs semaine dernière" icon={Gavel} tone="violet" />
            <StatCard label="Factures impayées" value="5" change="-1" note="depuis la semaine dernière" icon={ReceiptText} tone="red" />
          </section>
          <ActionGrid onAction={(label, slug) => navigate(label === 'Liste Dossiers' ? '/actions/liste-dossiers' : `/actions/${slug}`)} />
          <section className="section-block"><div className="section-heading"><div><h2>Vos espaces de travail</h2><p>Accédez à toutes les fonctionnalités du cabinet</p></div><button className="text-button" type="button">Personnaliser <FileText size={15} /></button></div><div className="category-grid">{categoryCards.map((card) => <CategoryCard {...card} key={card.title} />)}</div></section>
          <section className="widgets-grid"><CalendarWidget /><AttentionWidget /></section>
        </main>
      </div>
    </div>
  )
}
