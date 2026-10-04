import { ArrowLeft, FileSearch, Plus, Users, Bell, Gavel, FileCheck2, Zap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const dossier = [
  ['Internal ref.', 'SC-2026-0048'], ['Type', 'Civil case'], ['Case number', 'DOS-2026-0142'],
  ['Filed on', '12/09/2026'], ['Client', 'Dupont Company'], ['Court', 'Paris Judicial Court'],
  ['Court reference', 'RG 26/04821'], ['Procedure', 'Ordinary proceeding'], ['Claim amount', '24 500,00 €'],
  ['Assigned lawyer', 'Claire Bernard'], ['Third party', 'None'], ['Enforcement number', 'EXE-2026-031'],
]

const adversaries = [
  { name: 'Martin Industries', type: 'Company', contact: 'Paul Martin', status: 'Active' },
  { name: 'Central Insurance', type: 'Company', contact: 'Legal department', status: 'Active' },
  { name: 'Jean Durand', type: 'Individual', contact: 'Jean Durand', status: 'Represented' },
]

const sections = [
  {
    key: 'notifications', icon: Bell, title: 'Notifications',
    columns: ['Internal ref.', 'Date', 'Service date', 'Court reference', 'Reason', 'Notes'],
    rows: [
      ['SC-2026-0048', '16/09/2026', '20/09/2026', 'RG 26/04821', 'Summons', 'Sent to the client'],
      ['SC-2026-0049', '18/09/2026', '24/09/2026', 'RG 26/04821', 'Formal notice', 'Awaiting receipt'],
    ],
  },
  {
    key: 'judgments', icon: Gavel, title: 'Judgments',
    columns: ['Internal ref.', 'Reference', 'Judgment number', 'Decision', 'Judgment date', 'Decision date'],
    rows: [
      ['SC-2026-0048', 'JUG-2026-0089', '2026/394', 'Adversarial judgment', '18/09/2026', '25/09/2026'],
      ['SC-2026-0051', 'JUG-2026-0092', '2026/402', 'Adjourned', '19/09/2026', '02/10/2026'],
    ],
  },
  {
    key: 'decisions', icon: FileCheck2, title: 'Decision notices',
    columns: ['Internal ref.', 'Court', 'Reference', 'Notification number', 'Third party'],
    rows: [
      ['SC-2026-0048', 'Paris Judicial Court', 'RG 26/04821', 'NOT-2026-118', 'None'],
      ['SC-2026-0051', 'Paris Judicial Court', 'RG 26/04821', 'NOT-2026-121', 'Central Insurance'],
    ],
  },
  {
    key: 'enforcement', icon: Zap, title: 'Enforcement',
    columns: ['Internal ref.', 'Court', 'Reference', 'Bailiff', 'Enforcement number', 'Garnishee'],
    rows: [
      ['SC-2026-0048', 'Paris Judicial Court', 'RG 26/04821', 'Paul Robert', 'EXE-2026-031', 'None'],
      ['SC-2026-0053', 'Paris Judicial Court', 'RG 26/04821', 'Sophie Leroy', 'EXE-2026-034', 'Central Bank'],
    ],
  },
]

function SearchSummary({ criteria }) {
  const activeCriteria = Object.entries(criteria || {}).filter(([, value]) => value)
  if (!activeCriteria.length) return null

  return (
    <div className="criteria-summary">
      <span>Search criteria:</span>
      {activeCriteria.map(([key, value]) => <strong key={key}>{key}: {value}</strong>)}
    </div>
  )
}

function RepeatableSection({ section }) {
  return (
    <section className="result-section result-section--open">
      <div className="result-section__static-header"><span className="result-section__number"><FileCheck2 size={15} /></span><span><strong>{section.title}</strong><small>{section.rows.length} records</small></span></div>
      <div className="table-scroll">
        <table className="results-table">
          <thead><tr>{section.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>{section.rows.map((row, rowIndex) => <tr key={`${section.title}-${rowIndex}`}>{row.map((value, index) => <td key={`${value}-${index}`}>{value}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

function DossierTable() {
  return (
    <div className="table-scroll">
      <table className="results-table dossier-table">
        <thead><tr>{dossier.map(([label]) => <th key={label}>{label}</th>)}</tr></thead>
        <tbody><tr>{dossier.map(([label, value]) => <td key={label}>{value}</td>)}</tr></tbody>
      </table>
    </div>
  )
}

function AdversariesTable() {
  return (
    <div className="table-scroll">
      <table className="results-table adversaries-table">
        <thead><tr><th>Opposing party</th><th>Type</th><th>Contact</th><th>Status</th></tr></thead>
        <tbody>{adversaries.map((adversary) => <tr key={adversary.name}><td>{adversary.name}</td><td>{adversary.type}</td><td>{adversary.contact}</td><td><span className="status-badge">{adversary.status}</span></td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default function SuiviResultsPage() {
  const { state } = useLocation()
  const [selectedPanel, setSelectedPanel] = useState('fiche')
  const selectedSection = sections.find((section) => section.key === selectedPanel)

  return (
    <main className="standalone-page results-page">
      <Link className="back-link" to="/actions/suivi"><ArrowLeft size={16} />Change search</Link>
      <div className="results-header">
        <div><p className="eyebrow">Case tracking / Result</p><h1>Case details</h1><p>Review the case summary and related legal records.</p></div>
        <span className="results-count"><FileSearch size={17} />1 case found</span>
      </div>
      <SearchSummary criteria={state?.criteria} />

      <div className="results-layout">
        <aside className="results-menu" aria-label="Case sections">
          <p>Case content</p>
          <button className={selectedPanel === 'fiche' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('fiche')}><FileSearch size={17} /><span>Case summary<small>General information</small></span></button>
          <button className={selectedPanel === 'adversaires' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('adversaires')}><Users size={17} /><span>Opposing parties<small>{adversaries.length} records</small></span></button>
          {sections.map((section) => <button className={selectedPanel === section.key ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" key={section.key} onClick={() => setSelectedPanel(section.key)}><section.icon size={17} /><span>{section.title}<small>{section.rows.length} records</small></span></button>)}
        </aside>
        <div className="results-panel">
          {selectedPanel === 'fiche' && <section className="result-section result-section--open dossier-summary"><div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>Case summary</strong><small>General information for the selected case</small></span></div><DossierTable /></section>}
          {selectedPanel === 'adversaires' && <section className="result-section result-section--open related-parties"><div className="result-section__static-header"><span className="result-section__number"><Users size={15} /></span><span><strong>Opposing parties</strong><small>{adversaries.length} parties linked to this case</small></span><button className="small-action" type="button"><Plus size={14} />Add</button></div><AdversariesTable /></section>}
          {selectedSection && <RepeatableSection section={selectedSection} />}
        </div>
      </div>
    </main>
  )
}
