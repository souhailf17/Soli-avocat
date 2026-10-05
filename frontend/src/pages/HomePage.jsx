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
import { useLocale } from '../i18n/LocaleContext'
import { useState } from 'react'

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { formatLongDate, t } = useLocale()

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      {mobileOpen && <button className="mobile-overlay" type="button" aria-label={t('Fermer le menu')} onClick={() => setMobileOpen(false)} />}
      <div className={`main-area ${collapsed ? 'main-area--expanded' : ''}`}>
        <Topbar onMobileMenu={() => setMobileOpen(true)} />
        <main className="main-content">
          <div className="breadcrumb"><span>{t('Accueil')}</span><b>/</b><strong>{t('Tableau de bord')}</strong></div>
          <div className="page-intro"><div><p className="eyebrow">{formatLongDate()}</p><h1>{t('Bonjour Marie')} <span>👋</span></h1><p>{t('Voici un aperçu de votre activité juridique.')}</p></div><button className="outline-button" type="button"><BriefcaseBusiness size={17} />{t('Mon activité')}</button></div>
          <section className="stats-grid">
            <StatCard label={t('Dossiers actifs')} value="248" change="+12%" note={t('ce mois-ci')} icon={FolderOpen} tone="indigo" />
            <StatCard label={t('Tâches en retard')} value="12" change="-3" note={t('depuis hier')} icon={Clock3} tone="orange" />
            <StatCard label={t('Audiences cette semaine')} value="8" change="+2" note={t('depuis la semaine dernière')} icon={Gavel} tone="violet" />
            <StatCard label={t('Factures impayées')} value="5" change="-1" note={t('depuis la semaine dernière')} icon={ReceiptText} tone="red" />
          </section>
          <ActionGrid onAction={(href) => navigate(href)} />
          <section className="section-block"><div className="section-heading"><div><h2>{t('Espaces de travail')}</h2><p>{t('Parcourez les principales fonctions de l’application')}</p></div><button className="text-button" type="button">{t('Personnaliser')} <FileText size={15} /></button></div><div className="category-grid">{categoryCards.map((card) => <CategoryCard {...card} key={card.title} />)}</div></section>
          <section className="widgets-grid"><CalendarWidget /><AttentionWidget /></section>
        </main>
      </div>
    </div>
  )
}
