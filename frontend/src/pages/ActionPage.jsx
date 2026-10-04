import { ArrowLeft, ClipboardList } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function ActionPage() {
  const { action } = useParams()
  const title = action?.replace(/-/g, ' ') || 'Action'

  return (
    <main className="standalone-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Back to dashboard</Link>
      <div className="standalone-card">
        <span className="standalone-icon"><ClipboardList size={25} /></span>
        <p className="eyebrow">Coming soon</p>
        <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        <p>This area is ready for its future data and features.</p>
        <div className="example-list">
          <strong>Planned content</strong>
          <span>Overview</span><span>Search and filters</span><span>Detailed records</span>
        </div>
      </div>
    </main>
  )
}
