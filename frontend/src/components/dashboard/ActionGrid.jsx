import { ArrowUpRight } from 'lucide-react'
import { dashboardActions } from '../../data/navigation'

export default function ActionGrid({ onAction }) {
  return (
    <section className="section-block action-section">
      <div className="section-heading">
        <div><h2>Quick actions</h2><p>Start with the tasks you use most often</p></div>
      </div>
      <div className="action-grid">
        {dashboardActions.map(({ label, icon: Icon, href }) => (
          <button className="dashboard-action" type="button" key={label} onClick={() => onAction(href)}>
            <span className="dashboard-action__icon"><Icon size={23} /></span>
            <span>{label}</span>
            <ArrowUpRight className="dashboard-action__arrow" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}
