import { ArrowLeft, FileSearch, Plus, Users, Bell, Gavel, FileCheck2, Zap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

const dossier = [
  ['Réf. interne', 'SC-2026-0048'], ['Type', 'Affaire civile'], ['N° de dossier', 'DOS-2026-0142'],
  ['Date de dépôt', '12/09/2026'], ['Client', 'Société Dupont'], ['Tribunal', 'Tribunal judiciaire de Paris'],
  ['Référence du tribunal', 'RG 26/04821'], ['Procédure', 'Procédure au fond'], ['Créance', '24 500,00 €'],
  ['Avocate responsable', 'Claire Bernard'], ['Tiers', 'Aucun'], ['N° d’exécution', 'EXE-2026-031'],
]

const adversaries = [
  { name: 'Martin Industries', type: 'Société', contact: 'Paul Martin', status: 'Actif' },
  { name: 'Assurance du Centre', type: 'Société', contact: 'Service juridique', status: 'Actif' },
  { name: 'Jean Durand', type: 'Personne physique', contact: 'Jean Durand', status: 'Représenté' },
]

const criteriaLabels = {
  caseNumber: 'N° de dossier',
  client: 'Client',
  court: 'Tribunal',
  courtReference: 'Référence du tribunal',
}

const sections = [
  {
    key: 'notifications', icon: Bell, title: 'Notifications',
    columns: ['Réf. interne', 'Date', 'Date de signification', 'Référence du tribunal', 'Motif', 'Observations'],
    rows: [
      ['SC-2026-0048', '16/09/2026', '20/09/2026', 'RG 26/04821', 'Convocation', 'Envoyée au client'],
      ['SC-2026-0049', '18/09/2026', '24/09/2026', 'RG 26/04821', 'Mise en demeure', 'En attente de réception'],
    ],
  },
  {
    key: 'judgments', icon: Gavel, title: 'Jugements',
    columns: ['Réf. interne', 'Référence', 'N° de jugement', 'Décision', 'Date du jugement', 'Date du délibéré'],
    rows: [
      ['SC-2026-0048', 'JUG-2026-0089', '2026/394', 'Jugement contradictoire', '18/09/2026', '25/09/2026'],
      ['SC-2026-0051', 'JUG-2026-0092', '2026/402', 'Renvoi', '19/09/2026', '02/10/2026'],
    ],
  },
  {
    key: 'decisions', icon: FileCheck2, title: 'Notifications de décision',
    columns: ['Réf. interne', 'Tribunal', 'Référence', 'N° de notification', 'Tiers'],
    rows: [
      ['SC-2026-0048', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'NOT-2026-118', 'Aucun'],
      ['SC-2026-0051', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'NOT-2026-121', 'Assurance du Centre'],
    ],
  },
  {
    key: 'enforcement', icon: Zap, title: 'Exécutions',
    columns: ['Réf. interne', 'Tribunal', 'Référence', 'Huissier', 'N° d’exécution', 'Tiers saisi'],
    rows: [
      ['SC-2026-0048', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'Me Paul Robert', 'EXE-2026-031', 'Aucun'],
      ['SC-2026-0053', 'Tribunal judiciaire de Paris', 'RG 26/04821', 'Me Sophie Leroy', 'EXE-2026-034', 'Banque centrale'],
    ],
  },
]

function SearchSummary({ criteria }) {
  const activeCriteria = Object.entries(criteria || {}).filter(([, value]) => value)
  const { t } = useLocale()
  if (!activeCriteria.length) return null

  return (
    <div className="criteria-summary">
      <span>{t('Critères de recherche :')}</span>
      {activeCriteria.map(([key, value]) => <strong key={key}>{t(criteriaLabels[key] || key)} : {value}</strong>)}
    </div>
  )
}

function RepeatableSection({ section }) {
  const { t } = useLocale()

  return (
    <section className="result-section result-section--open">
      <div className="result-section__static-header"><span className="result-section__number"><FileCheck2 size={15} /></span><span><strong>{t(section.title)}</strong><small>{t(section.rows.length === 1 ? 'recordsCount' : 'recordsCountPlural', { count: section.rows.length })}</small></span></div>
      <div className="table-scroll">
        <table className="results-table">
          <thead><tr>{section.columns.map((column) => <th key={column}>{t(column)}</th>)}</tr></thead>
          <tbody>{section.rows.map((row, rowIndex) => <tr key={`${section.title}-${rowIndex}`}>{row.map((value, index) => <td key={`${value}-${index}`}>{t(value)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

function DossierTable() {
  const { t } = useLocale()

  return (
    <div className="table-scroll">
      <table className="results-table dossier-table">
        <thead><tr>{dossier.map(([label]) => <th key={label}>{t(label)}</th>)}</tr></thead>
        <tbody><tr>{dossier.map(([label, value]) => <td key={label}>{t(value)}</td>)}</tr></tbody>
      </table>
    </div>
  )
}

function AdversariesTable() {
  const { t } = useLocale()

  return (
    <div className="table-scroll">
      <table className="results-table adversaries-table">
        <thead><tr>{['Adversaire', 'Type', 'Contact', 'Statut'].map((label) => <th key={label}>{t(label)}</th>)}</tr></thead>
        <tbody>{adversaries.map((adversary) => <tr key={adversary.name}><td>{t(adversary.name)}</td><td>{t(adversary.type)}</td><td>{t(adversary.contact)}</td><td><span className="status-badge">{t(adversary.status)}</span></td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default function SuiviResultsPage() {
  const { state } = useLocation()
  const [selectedPanel, setSelectedPanel] = useState('fiche')
  const selectedSection = sections.find((section) => section.key === selectedPanel)
  const { t } = useLocale()

  return (
    <main className="standalone-page results-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/actions/suivi"><ArrowLeft size={16} />{t('Modifier la recherche')}</Link><LanguageSwitcher /></div>
      <div className="results-header">
        <div><p className="eyebrow">{t('Suivi des dossiers / Résultat')}</p><h1>{t('Détails du dossier')}</h1><p>{t('Consultez la synthèse du dossier et les éléments juridiques associés.')}</p></div>
        <span className="results-count"><FileSearch size={17} />{t('1 dossier trouvé')}</span>
      </div>
      <SearchSummary criteria={state?.criteria} />

      <div className="results-layout">
        <aside className="results-menu" aria-label={t('Sections du dossier')}>
          <p>{t('Contenu du dossier')}</p>
          <button className={selectedPanel === 'fiche' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('fiche')}><FileSearch size={17} /><span>{t('Fiche du dossier')}<small>{t('Informations générales')}</small></span></button>
          <button className={selectedPanel === 'adversaires' ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" onClick={() => setSelectedPanel('adversaires')}><Users size={17} /><span>{t('Adversaires')}<small>{t(adversaries.length === 1 ? 'recordsCount' : 'recordsCountPlural', { count: adversaries.length })}</small></span></button>
          {sections.map((section) => <button className={selectedPanel === section.key ? 'results-menu__item results-menu__item--active' : 'results-menu__item'} type="button" key={section.key} onClick={() => setSelectedPanel(section.key)}><section.icon size={17} /><span>{t(section.title)}<small>{t(section.rows.length === 1 ? 'recordsCount' : 'recordsCountPlural', { count: section.rows.length })}</small></span></button>)}
        </aside>
        <div className="results-panel">
          {selectedPanel === 'fiche' && <section className="result-section result-section--open dossier-summary"><div className="result-section__static-header"><span className="result-section__number">01</span><span><strong>{t('Fiche du dossier')}</strong><small>{t('Informations générales du dossier sélectionné')}</small></span></div><DossierTable /></section>}
          {selectedPanel === 'adversaires' && <section className="result-section result-section--open related-parties"><div className="result-section__static-header"><span className="result-section__number"><Users size={15} /></span><span><strong>{t('Adversaires')}</strong><small>{t(adversaries.length === 1 ? 'partiesLinked' : 'partiesLinkedPlural', { count: adversaries.length })}</small></span><button className="small-action" type="button"><Plus size={14} />{t('Ajouter')}</button></div><AdversariesTable /></section>}
          {selectedSection && <RepeatableSection section={selectedSection} />}
        </div>
      </div>
    </main>
  )
}
