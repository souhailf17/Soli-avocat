import { ArrowLeft, FileSearch } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

const criteriaLabels = {
  client: 'Client',
  opponent: 'Adversaire',
  clientReference: 'Référence client',
  identityNumber: 'Numéro d’identité',
  documentType: 'Type de document',
  judgmentNumber: 'N° de jugement',
  notificationNumber: 'N° de notification',
  enforcementNumber: 'N° d’exécution',
  courtReference: 'Référence du tribunal',
  checkNumber: 'N° de chèque',
  amount: 'Montant',
}

export default function RechercheResultsPage() {
  const { state } = useLocation()
  const criteria = Object.entries(state?.criteria || {}).filter(([, value]) => value)
  const { t } = useLocale()

  return (
    <main className="standalone-page results-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/actions/recherches"><ArrowLeft size={16} />{t('Modifier la recherche')}</Link><LanguageSwitcher /></div>
      <div className="results-header"><div><p className="eyebrow">{t('Recherche avancée / Résultats')}</p><h1>{t('Résultats de recherche')}</h1><p>{t('Les dossiers correspondant à vos critères de recherche apparaissent ici.')}</p></div><span className="results-count"><FileSearch size={17} />{t('3 résultats')}</span></div>
      <div className="criteria-summary"><span>{t('Critères de recherche :')}</span>{criteria.length ? criteria.map(([key, value]) => <strong key={key}>{t(criteriaLabels[key] || key)} : {t(value)}</strong>) : <strong>{t('Tous les dossiers')}</strong>}</div>
      <div className="result-section result-section--open">
        <div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>{t('Dossiers correspondants')}</strong><small>{t('Exemples de résultats de recherche')}</small></span></div>
        <div className="table-scroll"><table className="results-table"><thead><tr>{['N° de dossier', 'Client', 'Adversaire', 'Tribunal', 'Référence', 'Statut'].map((label) => <th key={label}>{t(label)}</th>)}</tr></thead><tbody><tr><td>DOS-2026-0142</td><td>{t('Société Dupont')}</td><td>Martin Industries</td><td>{t('Tribunal judiciaire de Paris')}</td><td>RG 26/04821</td><td>{t('Actif')}</td></tr><tr><td>DOS-2026-0157</td><td>Claire Martin</td><td>{t('Assurance du Centre')}</td><td>{t('Tribunal judiciaire de Lyon')}</td><td>RG 26/05112</td><td>{t('Actif')}</td></tr><tr><td>DOS-2026-0163</td><td>{t('Entreprise Atlas')}</td><td>Jean Durand</td><td>{t('Tribunal judiciaire de Lille')}</td><td>RG 26/05309</td><td>{t('À vérifier')}</td></tr></tbody></table></div>
      </div>
    </main>
  )
}
