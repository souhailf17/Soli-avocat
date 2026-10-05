import { ArrowUpRight } from 'lucide-react'
import { dashboardActions } from '../../data/navigation'
import { useLocale } from '../../i18n/LocaleContext'

export default function ActionGrid({ onAction }) {
  const { t } = useLocale()

  return (
    <section className="section-block action-section">
      <div className="section-heading">
        <div><h2>{t('Accès directs')}</h2><p>{t('Accédez aux tâches que vous utilisez le plus souvent')}</p></div>
      </div>
      <div className="action-grid">
        {dashboardActions.map(({ label, icon: Icon, href }) => (
          <button className="dashboard-action" type="button" key={label} onClick={() => onAction(href)}>
            <span className="dashboard-action__icon"><Icon size={23} /></span>
            <span>{t(label)}</span>
            <ArrowUpRight className="dashboard-action__arrow" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}
