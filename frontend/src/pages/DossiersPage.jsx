import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ExcelJS from 'exceljs'

const dossierRows = [
  ['J-001', 'SC-2026-0048', 'DOS-2026-0142', 'Dupont Company', 'RC-4512', 'Martin Industries', '12/09/2026', '24 500,00 €', 'Office 2 — Shelf A', 'ARC-2026-008'],
  ['J-002', 'SC-2026-0051', 'DOS-2026-0157', 'Claire Martin', 'RC-4538', 'Central Insurance', '15/09/2026', '18 200,00 €', 'Office 1 — Shelf C', 'ARC-2026-011'],
  ['J-003', 'SC-2026-0058', 'DOS-2026-0163', 'Atlas Company', 'RC-4602', 'Jean Durand', '18/09/2026', '42 750,00 €', 'Archive — Box 4', 'ARC-2026-015'],
  ['J-004', 'SC-2026-0062', 'DOS-2026-0171', 'Nadia Benali', 'RC-4629', 'Northern Company', '20/09/2026', '9 800,00 €', 'Office 2 — Shelf B', 'ARC-2026-019'],
]

const filters = [
  ['client', 'Client'],
  ['dossier', 'Case number'],
  ['refClient', 'Client reference'],
  ['adversaire', 'Opposing party'],
  ['date', 'Opening date'],
  ['creance', 'Claim amount'],
  ['emplacement', 'File location'],
  ['noArchive', 'Archive number'],
]

const columns = ['ID', 'Internal ref.', 'Case number', 'Client', 'Client reference', 'Opposing party', 'Opened', 'Claim amount', 'File location', 'Archive number']
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
    const worksheet = workbook.addWorksheet('Cases')
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
    link.download = `case-list-${new Date().toISOString().slice(0, 10)}.xlsx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="standalone-page dossiers-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Back to dashboard</Link>
      <div className="dossiers-header">
        <div><p className="eyebrow">Cases</p><h1>All cases</h1><p>Search and review the firm's case records.</p></div>
        <span className="results-count"><Filter size={16} />{rows.length} cases</span>
      </div>
      <div className="dossiers-toolbar">
        <div className="dossiers-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cases..." /><kbd>Ctrl + K</kbd></div>
        <button className="filter-toggle" type="button"><SlidersHorizontal size={16} />Filters {activeFilterCount > 0 && <b>{activeFilterCount}</b>}</button>
      </div>
      <div className="dossiers-layout">
        <aside className="dossiers-filter-panel">
          <div className="filter-panel__header"><div><strong>Filters</strong><span>Select a field to narrow results</span></div><button type="button" onClick={() => { setOpenFilters([]); setFilterValues({}); setFilterQuery('') }}>Reset</button></div>
          <div className="filter-keyword-search"><Search size={14} /><input value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} placeholder="Find a filter..." aria-label="Find a filter" /></div>
          <div className="filter-list">{visibleFilters.map(([key, label]) => <div className="filter-control" key={key}><button className={`filter-option ${openFilters.includes(key) ? 'filter-option--active' : ''}`} type="button" onClick={() => toggleFilter(key)}><span>{label}</span><b>{filterValues[key] ? '●' : '+'}</b></button>{openFilters.includes(key) && <input className="filter-value-input" value={filterValues[key] || ''} onChange={(event) => updateFilter(key, event.target.value)} placeholder={`Filter by ${label.toLowerCase()}...`} autoFocus />}</div>)}</div>
          {visibleFilters.length === 0 && <p className="filter-empty">No filters found.</p>}
        </aside>
        <section className="dossiers-table-card">
          <div className="table-card__header"><div><strong>Case records</strong><span>{activeFilterCount ? `${activeFilterCount} active filter(s)` : 'All cases'}</span></div><button type="button" className="table-card__action" onClick={exportResults} disabled={rows.length === 0}>Export to Excel</button></div>
          <div className="table-scroll"><table className="results-table dossiers-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[2]}>{row.map((value, index) => <td key={`${row[2]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div>
          {rows.length === 0 && <div className="empty-table">No cases match your search.</div>}
        </section>
      </div>
    </main>
  )
}
