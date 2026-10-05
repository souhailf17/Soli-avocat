import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ExcelJS from 'exceljs'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

const dossierRows = [
  ['J-001', 'SC-2026-0048', 'DOS-2026-0142', 'Société Dupont', 'RC-4512', 'Martin Industries', '12/09/2026', '24 500,00 €', 'Bureau 2 — Étagère A', 'ARC-2026-008'],
  ['J-002', 'SC-2026-0051', 'DOS-2026-0157', 'Claire Martin', 'RC-4538', 'Assurance du Centre', '15/09/2026', '18 200,00 €', 'Bureau 1 — Étagère C', 'ARC-2026-011'],
  ['J-003', 'SC-2026-0058', 'DOS-2026-0163', 'Entreprise Atlas', 'RC-4602', 'Jean Durand', '18/09/2026', '42 750,00 €', 'Archives — Boîte 4', 'ARC-2026-015'],
  ['J-004', 'SC-2026-0062', 'DOS-2026-0171', 'Nadia Benali', 'RC-4629', 'Compagnie du Nord', '20/09/2026', '9 800,00 €', 'Bureau 2 — Étagère B', 'ARC-2026-019'],
]

const filters = [
  ['client', 'Client'],
  ['dossier', 'N° de dossier'],
  ['refClient', 'Référence client'],
  ['adversaire', 'Adversaire'],
  ['date', 'Date d’ouverture'],
  ['creance', 'Montant de la créance'],
  ['emplacement', 'Emplacement du dossier'],
  ['noArchive', 'N° d’archive'],
]

const columns = ['ID', 'Réf. interne', 'N° de dossier', 'Client', 'Référence client', 'Adversaire', 'Date d’ouverture', 'Créance', 'Emplacement', 'N° d’archive']
const filterColumns = {
  societe: 3,
  emplacement: 8,
  noArchive: 9,
  date: 6,
  dossier: 2,
  client: 3,
  refClient: 4,
  adversaire: 5,
  creance: 7,
}

export default function DossiersPage() {
  const [query, setQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [openFilters, setOpenFilters] = useState([])
  const [filterValues, setFilterValues] = useState({})
  const { t } = useLocale()
  const localizedRows = useMemo(() => dossierRows.map((row) => row.map((value) => t(value))), [t])
  const localizedFilters = useMemo(() => filters.map(([key, label]) => [key, t(label)]), [t])
  const localizedColumns = useMemo(() => columns.map((column) => t(column)), [t])

  function toggleFilter(key) {
    setOpenFilters((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  function updateFilter(key, value) {
    setFilterValues((current) => ({ ...current, [key]: value }))
  }

  const rows = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    return localizedRows.filter((row) => {
      const matchesGlobal = !normalizedQuery || row.some((value) => value.toLowerCase().includes(normalizedQuery))
      const matchesFields = Object.entries(filterValues).every(([key, value]) => {
        if (!value.trim() || filterColumns[key] === undefined) return true
        return row[filterColumns[key]].toLowerCase().includes(value.toLowerCase().trim())
      })
      return matchesGlobal && matchesFields
    })
  }, [query, filterValues, localizedRows])

  const activeFilterCount = Object.values(filterValues).filter(Boolean).length
  const visibleFilters = localizedFilters.filter(([, label]) => label.toLowerCase().includes(filterQuery.toLowerCase().trim()))

  async function exportResults() {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Dossiers')
    worksheet.addRow(localizedColumns)
    rows.forEach((row) => worksheet.addRow(row))
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5556D5' } }
    worksheet.columns.forEach((column) => { column.width = 20 })
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `liste-dossiers-${new Date().toISOString().slice(0, 10)}.xlsx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="standalone-page dossiers-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/"><ArrowLeft size={16} />{t('Retour au tableau de bord')}</Link><LanguageSwitcher /></div>
      <div className="dossiers-header">
        <div><p className="eyebrow">{t('Dossiers')}</p><h1>{t('Tous les dossiers')}</h1><p>{t('Recherchez et consultez les dossiers du cabinet.')}</p></div>
        <span className="results-count"><Filter size={16} />{t(rows.length === 1 ? 'casesCount' : 'casesCountPlural', { count: rows.length })}</span>
      </div>
      <div className="dossiers-toolbar">
        <div className="dossiers-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Rechercher dans les dossiers…')} /><kbd>Ctrl + K</kbd></div>
        <button className="filter-toggle" type="button"><SlidersHorizontal size={16} />{t('Filtres')} {activeFilterCount > 0 && <b>{activeFilterCount}</b>}</button>
      </div>
      <div className="dossiers-layout">
        <aside className="dossiers-filter-panel">
          <div className="filter-panel__header"><div><strong>{t('Filtres')}</strong><span>{t('Sélectionnez un champ pour affiner les résultats')}</span></div><button type="button" onClick={() => { setOpenFilters([]); setFilterValues({}); setFilterQuery('') }}>{t('Réinitialiser')}</button></div>
          <div className="filter-keyword-search"><Search size={14} /><input value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} placeholder={t('Rechercher un filtre…')} aria-label={t('Rechercher un filtre')} /></div>
          <div className="filter-list">{visibleFilters.map(([key, label]) => <div className="filter-control" key={key}><button className={`filter-option ${openFilters.includes(key) ? 'filter-option--active' : ''}`} type="button" onClick={() => toggleFilter(key)}><span>{label}</span><b>{filterValues[key] ? '●' : '+'}</b></button>{openFilters.includes(key) && <input className="filter-value-input" value={filterValues[key] || ''} onChange={(event) => updateFilter(key, event.target.value)} placeholder={t('Filtrer par {label}…', { label: label.toLowerCase() })} autoFocus />}</div>)}</div>
          {visibleFilters.length === 0 && <p className="filter-empty">{t('Aucun filtre trouvé.')}</p>}
        </aside>
        <section className="dossiers-table-card">
          <div className="table-card__header"><div><strong>{t('Dossiers enregistrés')}</strong><span>{activeFilterCount ? t(activeFilterCount === 1 ? 'activeFilters' : 'activeFiltersPlural', { count: activeFilterCount }) : t('Tous les dossiers')}</span></div><button type="button" className="table-card__action" onClick={exportResults} disabled={rows.length === 0}>{t('Exporter vers Excel')}</button></div>
          <div className="table-scroll"><table className="results-table dossiers-table"><thead><tr>{localizedColumns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[2]}>{row.map((value, index) => <td key={`${row[2]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div>
          {rows.length === 0 && <div className="empty-table">{t('Aucun dossier ne correspond à votre recherche.')}</div>}
        </section>
      </div>
    </main>
  )
}
