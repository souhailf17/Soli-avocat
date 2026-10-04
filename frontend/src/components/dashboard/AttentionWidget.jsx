import { ArrowRight, CircleAlert, Clock3, CheckCircle2 } from 'lucide-react'

export default function AttentionWidget() {
  return (
    <article className="widget-card attention-widget">
      <div className="widget-heading"><div><h3>Tasks needing attention</h3><p>Your most urgent work</p></div><button className="text-button" type="button">View all</button></div>
      <div className="attention-list">
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--red"><CircleAlert size={17} /></span><div><strong>4</strong><span>Overdue deadlines</span></div><ArrowRight size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--orange"><Clock3 size={17} /></span><div><strong>8</strong><span>Due this week</span></div><ArrowRight size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--green"><CheckCircle2 size={17} /></span><div><strong>16</strong><span>Upcoming deadlines</span></div><ArrowRight size={16} /></div>
      </div>
      <button className="attention-button" type="button">Review urgent tasks</button>
    </article>
  )
}
