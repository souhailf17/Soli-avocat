import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const weeks = [
  ['31', '1', '2', '3', '4', '5', '6'],
  ['7', '8', '9', '10', '11', '12', '13'],
  ['14', '15', '16', '17', '18', '19', '20'],
  ['21', '22', '23', '24', '25', '26', '27'],
  ['28', '29', '30', '1', '2', '3', '4'],
]

export default function CalendarWidget() {
  return (
    <article className="widget-card calendar-widget">
      <div className="widget-heading"><div><h3>Calendrier</h3><p>Vos prochains rendez-vous</p></div><button className="icon-button icon-button--soft" type="button"><Plus size={17} /></button></div>
      <div className="calendar-toolbar"><button type="button"><ChevronLeft size={16} /></button><strong>Septembre 2026</strong><button type="button"><ChevronRight size={16} /></button></div>
      <div className="calendar-grid calendar-grid--header">{['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid">{weeks.flatMap((week, weekIndex) => week.map((day, dayIndex) => <span className={`${day === '21' && weekIndex === 3 ? 'today' : ''} ${dayIndex > 4 ? 'weekend' : ''}`} key={`${weekIndex}-${dayIndex}`}>{day}</span>))}</div>
      <div className="calendar-legend"><span><i className="dot dot--indigo" />Audience</span><span><i className="dot dot--orange" />Échéance</span></div>
    </article>
  )
}
