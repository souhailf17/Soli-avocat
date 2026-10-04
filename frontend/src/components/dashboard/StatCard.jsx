export default function StatCard({ label, value, change, icon: Icon, tone, note }) {
  return (
    <article className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${tone}`}><Icon size={20} /></div>
      <div className="stat-card__content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={change.startsWith('+') ? 'positive' : 'warning'}>{change} <em>{note}</em></small>
      </div>
      <span className="stat-card__menu">•••</span>
    </article>
  )
}
