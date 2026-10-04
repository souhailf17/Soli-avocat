import { ArrowLeft, FileSearch } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function RechercheResultsPage() {
  const { state } = useLocation()
  const criteria = Object.entries(state?.criteria || {}).filter(([, value]) => value)

  return (
    <main className="standalone-page results-page">
      <Link className="back-link" to="/actions/recherches"><ArrowLeft size={16} />Change search</Link>
      <div className="results-header"><div><p className="eyebrow">Advanced search / Results</p><h1>Search results</h1><p>Cases matching your search criteria appear here.</p></div><span className="results-count"><FileSearch size={17} />3 results</span></div>
      <div className="criteria-summary"><span>Search criteria:</span>{criteria.length ? criteria.map(([key, value]) => <strong key={key}>{key}: {value}</strong>) : <strong>All cases</strong>}</div>
      <div className="result-section result-section--open">
        <div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>Matching cases</strong><small>Example search results</small></span></div>
        <div className="table-scroll"><table className="results-table"><thead><tr><th>Case number</th><th>Client</th><th>Opposing party</th><th>Court</th><th>Reference</th><th>Status</th></tr></thead><tbody><tr><td>DOS-2026-0142</td><td>Dupont Company</td><td>Martin Industries</td><td>Paris Judicial Court</td><td>RG 26/04821</td><td>Active</td></tr><tr><td>DOS-2026-0157</td><td>Claire Martin</td><td>Central Insurance</td><td>Lyon Judicial Court</td><td>RG 26/05112</td><td>Active</td></tr><tr><td>DOS-2026-0163</td><td>Atlas Company</td><td>Jean Durand</td><td>Lille Judicial Court</td><td>RG 26/05309</td><td>Needs review</td></tr></tbody></table></div>
      </div>
    </main>
  )
}
