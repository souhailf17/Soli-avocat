import { ArrowUpRight, Pin } from 'lucide-react'
import { dashboardActions } from '../../data/navigation'
import { useLocale } from '../../i18n/LocaleContext'

export default function QuickActions({ onAction }) {
  const { t } = useLocale()

  return (
    <section className="section-block">
      <div className="section-heading">
        <div><h2>{t('Favoris')}</h2><p>{t('Vos services les plus utilisés')}</p></div>
        <button className="text-button" type="button">{t('Gérer les favoris')} <ArrowUpRight size={15} /></button>
      </div>
      <div className="quick-actions">
        {dashboardActions.slice(0, 4).map(({ label, icon: Icon, href }) => (
          <button className="quick-action" type="button" key={href} onClick={() => onAction?.(href)}>
            <span className="quick-action__icon quick-action__icon--indigo"><Icon size={21} /></span>
            <span>{t(label)}</span>
            <Pin className="quick-action__pin" size={14} />
          </button>
        ))}
      </div>
    </section>
  )
}
