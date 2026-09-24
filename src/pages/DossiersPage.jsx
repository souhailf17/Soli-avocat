import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ExcelJS from 'exceljs'

const dossierRows = [
  ['J-001', 'SC-2026-0048', 'DOS-2026-0142', 'Société Dupont', 'RC-4512', 'Martin Industries', '12/09/2026', '24 500,00 €', 'Bureau 2 — Étagère A', 'ARC-2026-008'],
  ['J-002', 'SC-2026-0051', 'DOS-2026-0157', 'Claire Martin', 'RC-4538', 'Assurance du Centre', '15/09/2026', '18 200,00 €', 'Bureau 1 — Étagère C', 'ARC-2026-011'],
  ['J-003', 'SC-2026-0058', 'DOS-2026-0163', 'Entreprise Atlas', 'RC-4602', 'Jean Durand', '18/09/2026', '42 750,00 €', 'Archives — Lot 4', 'ARC-2026-015'],
  ['J-004', 'SC-2026-0062', 'DOS-2026-0171', 'Nadia Benali', 'RC-4629', 'Compagnie Nord', '20/09/2026', '9 800,00 €', 'Bureau 2 — Étagère B', 'ARC-2026-019'],
]

const filters = [
  ['societe', 'Société'], ['emplacement', 'Emplacement'], ['enCours', 'En cours'], ['suspendu', 'Suspendu'],
  ['classe', 'Classer'], ['tout', 'Tout'], ['cause', 'Cause'], ['noArchive', 'N° Archive'], ['dateArchive', 'Date Archive'],
  ['date', 'Date'], ['dossier', 'Dossier'], ['client', 'Client'], ['refClient', 'Réf Client'], ['departement', 'Département client'],
  ['adversaire', 'Adversaire'], ['cin', 'CIN'], ['ville', 'Ville'], ['gestionnaire', 'Gestionnaire'], ['lot', 'Lot'],
  ['typeDossier', 'Type Dossier'], ['natureAffaire', 'Nature Affaire'], ['creance', 'Créance'],
  ['aNePlusControle', 'A ne plus Contrôlé'], ['aControle', 'A Contrôlé'], ['tousDossiers1', 'Tous les Dossiers'],
  ['tousDossiers2', 'Tous les Dossiers'], ['sansMiseEnDemeure', 'Sans Mise en Demeure'], ['avecMiseEnDemeure', 'Avec Mise en Demeure'],
]

const columns = ['J', 'SC', 'N° Dossier', 'Client', 'Référence Client', 'Adversaire', 'Date Ouverture', 'Créance', 'Emplacement', 'N° Archive']
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

  function toggleFilter(key) {
    setOpenFilters((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key])
  }

  function updateFilter(key, value) {
    setFilterValues((current) => ({ ...current, [key]: value }))
  }

  const rows = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    return dossierRows.filter((row) => {
      const matchesGlobal = !normalizedQuery || row.some((value) => value.toLowerCase().includes(normalizedQuery))
      const matchesFields = Object.entries(filterValues).every(([key, value]) => {
        if (!value.trim() || filterColumns[key] === undefined) return true
        return row[filterColumns[key]].toLowerCase().includes(value.toLowerCase().trim())
      })
      return matchesGlobal && matchesFields
    })
  }, [query, filterValues])

  const activeFilterCount = Object.values(filterValues).filter(Boolean).length
  const visibleFilters = filters.filter(([, label]) => label.toLowerCase().includes(filterQuery.toLowerCase().trim()))

  async function exportResults() {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Dossiers')
    worksheet.addRow(columns)
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
      <Link className="back-link" to="/"><ArrowLeft size={16} />Retour au tableau de bord</Link>
      <div className="dossiers-header">
        <div><p className="eyebrow">Dossiers / Consultation</p><h1>Liste des dossiers</h1><p>Consultez, recherchez et filtrez les dossiers du cabinet.</p></div>
        <span className="results-count"><Filter size={16} />{rows.length} dossiers</span>
      </div>
      <div className="dossiers-toolbar">
        <div className="dossiers-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans les dossiers..." /><kbd>Ctrl + K</kbd></div>
        <button className="filter-toggle" type="button"><SlidersHorizontal size={16} />Filtres {activeFilterCount > 0 && <b>{activeFilterCount}</b>}</button>
      </div>
      <div className="dossiers-layout">
        <aside className="dossiers-filter-panel">
          <div className="filter-panel__header"><div><strong>Filtres</strong><span>Cliquez pour saisir un critère</span></div><button type="button" onClick={() => { setOpenFilters([]); setFilterValues({}); setFilterQuery('') }}>Réinitialiser</button></div>
          <div className="filter-keyword-search"><Search size={14} /><input value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} placeholder="Rechercher un filtre..." aria-label="Rechercher un filtre" /></div>
          <div className="filter-list">{visibleFilters.map(([key, label]) => <div className="filter-control" key={key}><button className={`filter-option ${openFilters.includes(key) ? 'filter-option--active' : ''}`} type="button" onClick={() => toggleFilter(key)}><span>{label}</span><b>{filterValues[key] ? '●' : '+'}</b></button>{openFilters.includes(key) && <input className="filter-value-input" value={filterValues[key] || ''} onChange={(event) => updateFilter(key, event.target.value)} placeholder={`Rechercher par ${label.toLowerCase()}...`} autoFocus />}</div>)}</div>
          {visibleFilters.length === 0 && <p className="filter-empty">Aucun filtre trouvé.</p>}
        </aside>
        <section className="dossiers-table-card">
          <div className="table-card__header"><div><strong>Dossiers enregistrés</strong><span>{activeFilterCount ? `${activeFilterCount} filtre(s) actif(s)` : 'Tous les dossiers'}</span></div><button type="button" className="table-card__action" onClick={exportResults} disabled={rows.length === 0}>Exporter en Excel</button></div>
          <div className="table-scroll"><table className="results-table dossiers-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[2]}>{row.map((value, index) => <td key={`${row[2]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div>
          {rows.length === 0 && <div className="empty-table">Aucun dossier ne correspond à votre recherche.</div>}
        </section>
      </div>
    </main>
  )
}
