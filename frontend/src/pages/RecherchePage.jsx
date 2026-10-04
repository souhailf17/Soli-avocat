import { ArrowLeft, FileSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const groups = [
  {
    title: 'Case',
    fields: [
      ['client', 'Client', 'Enter the client name'],
      ['opponent', 'Opposing party', 'Enter the opposing party'],
      ['clientReference', 'Client reference', 'Enter the client reference'],
      ['identityNumber', 'Identity number', 'Enter the identity number'],
    ],
  },
  {
    title: 'Documents',
    fields: [
      ['documentType', 'Document type', 'Select a type'],
      ['judgmentNumber', 'Judgment number', 'Enter the judgment number'],
      ['notificationNumber', 'Notification number', 'Enter the notification number'],
      ['enforcementNumber', 'Enforcement number', 'Enter the enforcement number'],
    ],
  },
  {
    title: 'Court',
    fields: [['courtReference', 'Court reference', 'Enter the court reference']],
  },
  {
    title: 'Payment',
    fields: [
      ['checkNumber', 'Check number', 'Enter the check number'],
      ['amount', 'Amount', 'Enter the amount'],
    ],
  },
]

export default function RecherchePage() {
  const [form, setForm] = useState({})
  const [selectedGroup, setSelectedGroup] = useState('Case')
  const navigate = useNavigate()
  const activeGroup = groups.find((group) => group.title === selectedGroup) || groups[0]

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submit(event) {
    event.preventDefault()
    navigate('/actions/recherches/resultats', { state: { criteria: form } })
  }

  return (
    <main className="standalone-page advanced-search-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Back to dashboard</Link>
      <div className="advanced-search-header">
        <div><span className="standalone-icon"><FileSearch size={25} /></span><div><p className="eyebrow">Cases</p><h1>Advanced search</h1><p>Use one or more criteria to find a case.</p></div></div>
      </div>
      <form onSubmit={submit}>
        <div className="search-workspace">
          <aside className="search-filter-menu" aria-label="Search categories">
            <p>Search category</p>
            {groups.map((group) => {
              const filledCount = group.fields.filter(([name]) => form[name]).length
              return <button className={selectedGroup === group.title ? 'search-filter-menu__item search-filter-menu__item--active' : 'search-filter-menu__item'} type="button" key={group.title} onClick={() => setSelectedGroup(group.title)}><span>{group.title}</span><small>{filledCount ? `${filledCount} completed` : `${group.fields.length} fields`}</small></button>
            })}
          </aside>
          <section className="search-group search-group--active">
            <div className="search-group__heading"><span>{activeGroup.title}</span><small>{activeGroup.fields.length} available fields</small></div>
            <div className="advanced-fields">
              {activeGroup.fields.map(([name, label, placeholder]) => (
                <label className="form-field" key={name}>
                  <span>{label}</span>
                  {name === 'documentType' ? (
                    <select name={name} value={form[name] || ''} onChange={updateField}>
                      <option value="">Select a type</option><option value="Case">Case</option><option value="Judgment">Judgment</option><option value="Notification">Notification</option><option value="Enforcement">Enforcement</option>
                    </select>
                  ) : <input name={name} type="text" value={form[name] || ''} onChange={updateField} placeholder={placeholder} />}
                </label>
              ))}
            </div>
          </section>
        </div>
        <div className="advanced-search-actions"><button className="secondary-button" type="button" onClick={() => setForm({})}>Reset</button><button className="primary-search-button" type="submit"><Search size={18} />Search</button></div>
      </form>
    </main>
  )
}
