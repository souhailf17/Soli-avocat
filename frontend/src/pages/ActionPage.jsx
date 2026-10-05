import { ArrowLeft, ClipboardList } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { serviceCatalog } from '../data/navigation'

export default function ActionPage() {
  const { action } = useParams()
  const service = serviceCatalog.find(({ href }) => href === `/actions/${action}`)
  const title = service?.label || 'Action'

  return (
    <main className="standalone-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Retour au tableau de bord</Link>
      <div className="standalone-card">
        <span className="standalone-icon"><ClipboardList size={25} /></span>
        <p className="eyebrow">Bientôt disponible</p>
        <h1>{title}</h1>
        <p>Cet espace est prêt à accueillir ses futures données et fonctionnalités.</p>
        <div className="example-list">
          <strong>Contenu prévu</strong>
          <span>Vue d’ensemble</span><span>Recherche et filtres</span><span>Fiches détaillées</span>
        </div>
      </div>
    </main>
  )
}
