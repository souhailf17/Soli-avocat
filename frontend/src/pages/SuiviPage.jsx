import { ArrowLeft, FolderSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const fields = [
  { name: 'caseNumber', label: 'Case number', placeholder: 'Enter the case number' },
  { name: 'client', label: 'Client', placeholder: 'Enter the client name' },
  { name: 'court', label: 'Court', placeholder: 'Enter the court name' },
  { name: 'courtReference', label: 'Court reference', placeholder: 'Enter the court reference' },
]

export default function SuiviPage() {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/actions/suivi/resultats', { state: { criteria: form } })
  }

  return (
    <main className="standalone-page">
      <Link className="back-link" to="/"><ArrowLeft size={16} />Back to dashboard</Link>
      <div className="search-page-card">
        <div className="search-page-heading">
          <span className="standalone-icon"><FolderSearch size={25} /></span>
          <div>
            <p className="eyebrow">Cases</p>
            <h1>Track a case</h1>
            <p>Find a case using any information you have.</p>
          </div>
        </div>
        <form className="suivi-form" onSubmit={handleSubmit}>
          {fields.map(({ name, label, placeholder }) => (
            <label className="form-field" key={name}>
              <span>{label}</span>
              <input name={name} value={form[name] || ''} onChange={updateField} placeholder={placeholder} />
            </label>
          ))}
          <button className="primary-search-button" type="submit"><Search size={18} />Search</button>
        </form>
      </div>
    </main>
  )
}
