import { ArrowUpRight, Pin } from 'lucide-react'
import { quickActions } from '../../data/navigation'

export default function QuickActions() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div><h2>Accès rapides</h2><p>Vos actions les plus utilisées</p></div>
        <button className="text-button" type="button">Gérer les favoris <ArrowUpRight size={15} /></button>
      </div>
      <div className="quick-actions">
        {quickActions.map(({ label, icon: Icon, tone }) => (
          <button className="quick-action" type="button" key={label}>
            <span className={`quick-action__icon quick-action__icon--${tone}`}><Icon size={21} /></span>
            <span>{label}</span>
            <Pin className="quick-action__pin" size={14} />
          </button>
        ))}
      </div>
    </section>
  )
}
