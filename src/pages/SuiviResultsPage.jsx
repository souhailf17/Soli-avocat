import { ArrowLeft, FileSearch, Plus, Users, Bell, Gavel, FileCheck2, Zap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const dossier = [
  ['SC', 'SC-2026-0048'], ['Type', 'Affaire civile'], ['N° Dossier', 'DOS-2026-0142'],
  ['Date Dépôt', '12/09/2026'], ['Client', 'Société Dupont'], ['Tribunal', 'Tribunal judiciaire de Paris'],
  ['Référence', 'RG 26/04821'], ['Procédure', 'Procédure au fond'], ['Créance', '24 500,00 €'],
  ['Rapporteur', 'Me Claire Bernard'], ['Tiers', 'Aucun'], ['N° Exécution', 'EXE-2026-031'],
]

const adversaries = [
  { name: 'Martin Industries', type: 'Société', contact: 'Paul Martin', status: 'Actif' },
  { name: 'Assurance du Centre', type: 'Compagnie', contact: 'Service juridique', status: 'Actif' },
  { name: 'Jean Durand', type: 'Personne physique', contact: 'Jean Durand', status: 'Représenté' },
]

const sections = [
  {
    key: 'notifications', icon: Bell, title: 'Notifications',
    columns: ['SC', 'Date', 'Date PA', 'Réf Tribunal', 'Motif', 'Observation'],
    rows: [
      ['SC-2026-0048', '16/09/2026', '20/09/2026', 'RG 26/04821', 'Convocation', 'Notification envoyée au client'],
      ['SC-2026-0049', '18/09/2026', '24/09/2026', 'RG 26/04821', 'Mise en demeure', 'En attente de réception'],
    ],
  },
  {
    key: 'jugements', icon: Gavel, title: 'Jugements',
    columns: ['SC', 'Référence', 'N° jugement', 'Prononcé jugement', 'Date jugement', 'Date délibéré'],
    rows: [
      ['SC-2026-0048', 'JUG-2026-0089', '2026/394', 'Jugement contradictoire', '18/09/2026', '25/09/2026'],
      ['SC-2026-0051', 'JUG-2026-0092', '2026/402', 'Renvoi', '19/09/2026', '02/10/2026'],
    ],
  },
  {
    key: 'decisions', icon: FileCheck2, title: 'Notifications de décision',
    columns: ['SC', 'Tribunal', 'Référence', 'N° Notification', 'Tiers'],
    rows: [
      ['SC-2026-0048', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'NOT-2026-118', 'Aucun'],
      ['SC-2026-0051', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'NOT-2026-121', 'Assurance du Centre'],
    ],
  },
  {
    key: 'executions', icon: Zap, title: 'Exécutions',
    columns: ['SC', 'Tribunal', 'Référence', 'Huissier', 'N° Exécution', 'Tiers saisi'],
    rows: [
      ['SC-2026-0048', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'Me Paul Robert', 'EXE-2026-031', 'Aucun'],
      ['SC-2026-0053', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'Me Sophie Leroy', 'EXE-2026-034', 'Banque Centrale'],
    ],
  },
]

function SearchSummary({ criteria }) {
  const activeCriteria = Object.entries(criteria || {}).filter(([, value]) => value)
  if (!activeCriteria.length) return null

  return (
    <div className="criteria-summary">
      <span>Recherche effectuée avec :</span>
      {activeCriteria.map(([key, value]) => <strong key={key}>{key === 'numeroDossier' ? 'N° Dossier' : key === 'referenceTribunal' ? 'Référence tribunal' : key} : {value}</strong>)}
    </div>
  )
}

function RepeatableSection({ section }) {
  return (
    <section className="result-section result-section--open">
      <div className="result-section__static-header"><span className="result-section__number"><FileCheck2 size={15} /></span><span><strong>{section.title}</strong><small>{section.rows.length} éléments trouvés</small></span></div>
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
        <thead><tr><th>Adversaire</th><th>Type</th><th>Contact</th><th>Statut</th></tr></thead>
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
      <Link className="back-link" to="/actions/suivi"><ArrowLeft size={16} />Modifier la recherche</Link>
      <div className="results-header">
        <div><p className="eyebrow">Suivi des dossiers / Résultats</p><h1>Résultat du suivi</h1><p>Les données sont regroupées par dossier et chaque élément répétable reste indépendant.</p></div>
        <span className="results-count"><FileSearch size={17} />1 dossier trouvé</span>
      </div>
      <SearchSummary criteria={state?.criteria} />

      <div className="results-layout">
        <aside className="results-menu" aria-label="Sections du dossier">
          <p>Contenu du dossier</p>
          <button className={selectedPanel === 'fiche' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('fiche')}><FileSearch size={17} /><span>Fiche du dossier<small>Informations générales</small></span></button>
          <button className={selectedPanel === 'adversaires' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('adversaires')}><Users size={17} /><span>Adversaires<small>{adversaries.length} éléments</small></span></button>
          {sections.map((section) => <button className={selectedPanel === section.key ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" key={section.key} onClick={() => setSelectedPanel(section.key)}><section.icon size={17} /><span>{section.title}<small>{section.rows.length} éléments</small></span></button>)}
        </aside>
        <div className="results-panel">
          {selectedPanel === 'fiche' && <section className="result-section result-section--open dossier-summary"><div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>Fiche du dossier</strong><small>Informations générales du dossier sélectionné</small></span></div><DossierTable /></section>}
          {selectedPanel === 'adversaires' && <section className="result-section result-section--open related-parties"><div className="result-section__static-header"><span className="result-section__number"><Users size={15} /></span><span><strong>Adversaires</strong><small>{adversaries.length} adversaires liés à ce dossier</small></span><button className="small-action" type="button"><Plus size={14} />Ajouter</button></div><AdversariesTable /></section>}
          {selectedSection && <RepeatableSection section={selectedSection} />}
        </div>
      </div>
    </main>
  )
}
