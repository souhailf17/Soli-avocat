import { ArrowLeft, ClipboardList } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { serviceCatalog } from '../data/navigation'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

export default function ActionPage() {
  const { action } = useParams()
  const service = serviceCatalog.find(({ href }) => href === `/actions/${action}`)
  const title = service?.label || 'Action'
  const { t } = useLocale()

  return (
    <main className="standalone-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/"><ArrowLeft size={16} />{t('Retour au tableau de bord')}</Link><LanguageSwitcher /></div>
      <div className="standalone-card">
        <span className="standalone-icon"><ClipboardList size={25} /></span>
        <p className="eyebrow">{t('Bientôt disponible')}</p>
        <h1>{t(title)}</h1>
        <p>{t('Cet espace est prêt à accueillir ses futures données et fonctionnalités.')}</p>
        <div className="example-list">
          <strong>{t('Contenu prévu')}</strong>
          <span>{t('Vue d’ensemble')}</span><span>{t('Recherche et filtres')}</span><span>{t('Fiches détaillées')}</span>
        </div>
      </div>
    </main>
  )
}
