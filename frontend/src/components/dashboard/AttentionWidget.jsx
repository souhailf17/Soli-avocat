import { ArrowRight, CircleAlert, Clock3, CheckCircle2 } from 'lucide-react'

export default function AttentionWidget() {
  return (
    <article className="widget-card attention-widget">
      <div className="widget-heading"><div><h3>Éléments à traiter</h3><p>Vos tâches les plus urgentes</p></div><button className="text-button" type="button">Voir tout</button></div>
      <div className="attention-list">
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--red"><CircleAlert size={17} /></span><div><strong>4</strong><span>Échéances dépassées</span></div><ArrowRight size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--orange"><Clock3 size={17} /></span><div><strong>8</strong><span>À traiter cette semaine</span></div><ArrowRight size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--green"><CheckCircle2 size={17} /></span><div><strong>16</strong><span>Échéances à venir</span></div><ArrowRight size={16} /></div>
      </div>
      <button className="attention-button" type="button">Traiter les éléments urgents</button>
    </article>
  )
}
