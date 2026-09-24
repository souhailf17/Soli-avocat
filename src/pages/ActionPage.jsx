import { ArrowLeft, ClipboardList } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function ActionPage() {
  const { action } = useParams()
  const title = action?.replace(/-/g, ' ') || 'Action'

  return (
    <main className="standalone-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Retour au tableau de bord</Link>
      <div className="standalone-card">
        <span className="standalone-icon"><ClipboardList size={25} /></span>
        <p className="eyebrow">Module en préparation</p>
        <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        <p>Cette page est prête à recevoir les données et les fonctionnalités de ce module.</p>
        <div className="example-list">
          <strong>Exemples de données</strong>
          <span>Exemple 1</span><span>Exemple 2</span><span>Exemple 3</span><span>Exemple 4</span><span>Exemple 5</span>
        </div>
      </div>
    </main>
  )
}
