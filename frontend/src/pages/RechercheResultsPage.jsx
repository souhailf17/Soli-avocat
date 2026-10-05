import { ArrowLeft, FileSearch } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

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

  return (
    <main className="standalone-page results-page">
      <Link className="back-link" to="/actions/recherches"><ArrowLeft size={16} />Modifier la recherche</Link>
      <div className="results-header"><div><p className="eyebrow">Recherche avancée / Résultats</p><h1>Résultats de recherche</h1><p>Les dossiers correspondant à vos critères de recherche apparaissent ici.</p></div><span className="results-count"><FileSearch size={17} />3 résultats</span></div>
      <div className="criteria-summary"><span>Critères de recherche :</span>{criteria.length ? criteria.map(([key, value]) => <strong key={key}>{criteriaLabels[key] || key} : {value}</strong>) : <strong>Tous les dossiers</strong>}</div>
      <div className="result-section result-section--open">
        <div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>Dossiers correspondants</strong><small>Exemples de résultats de recherche</small></span></div>
        <div className="table-scroll"><table className="results-table"><thead><tr><th>N° de dossier</th><th>Client</th><th>Adversaire</th><th>Tribunal</th><th>Référence</th><th>Statut</th></tr></thead><tbody><tr><td>DOS-2026-0142</td><td>Société Dupont</td><td>Martin Industries</td><td>Tribunal judiciaire de Paris</td><td>RG 26/04821</td><td>Actif</td></tr><tr><td>DOS-2026-0157</td><td>Claire Martin</td><td>Assurance du Centre</td><td>Tribunal judiciaire de Lyon</td><td>RG 26/05112</td><td>Actif</td></tr><tr><td>DOS-2026-0163</td><td>Entreprise Atlas</td><td>Jean Durand</td><td>Tribunal judiciaire de Lille</td><td>RG 26/05309</td><td>À vérifier</td></tr></tbody></table></div>
      </div>
    </main>
  )
}
