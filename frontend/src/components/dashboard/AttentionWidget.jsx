import { ArrowLeft, ArrowRight, CircleAlert, Clock3, CheckCircle2 } from 'lucide-react'
import { useLocale } from '../../i18n/LocaleContext'

export default function AttentionWidget() {
  const { direction, t } = useLocale()
  const DirectionArrow = direction === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <article className="widget-card attention-widget">
      <div className="widget-heading"><div><h3>{t('Éléments à traiter')}</h3><p>{t('Vos tâches les plus urgentes')}</p></div><button className="text-button" type="button">{t('Voir tout')}</button></div>
      <div className="attention-list">
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--red"><CircleAlert size={17} /></span><div><strong>4</strong><span>{t('Échéances dépassées')}</span></div><DirectionArrow size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--orange"><Clock3 size={17} /></span><div><strong>8</strong><span>{t('À traiter cette semaine')}</span></div><DirectionArrow size={16} /></div>
        <div className="attention-row"><span className="attention-row__icon attention-row__icon--green"><CheckCircle2 size={17} /></span><div><strong>16</strong><span>{t('Échéances à venir')}</span></div><DirectionArrow size={16} /></div>
      </div>
      <button className="attention-button" type="button">{t('Traiter les éléments urgents')}</button>
    </article>
  )
}
