import { ArrowUpRight } from 'lucide-react'
import { dashboardActions } from '../../data/navigation'

function slugify(label) {
  return label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function ActionGrid({ onAction }) {
  return (
    <section className="section-block action-section">
      <div className="section-heading">
        <div><h2>Accès directs</h2><p>Les fonctionnalités principales de votre cabinet</p></div>
      </div>
      <div className="action-grid">
        {dashboardActions.map(([label, Icon]) => (
          <button className="dashboard-action" type="button" key={label} onClick={() => onAction(label, slugify(label))}>
            <span className="dashboard-action__icon"><Icon size={23} /></span>
            <span>{label}</span>
            <ArrowUpRight className="dashboard-action__arrow" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}
