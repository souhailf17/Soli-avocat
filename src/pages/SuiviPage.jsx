import { ArrowLeft, FolderSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const fields = [
  { name: 'numeroDossier', label: 'N° Dossier', placeholder: 'Saisissez le numéro du dossier' },
  { name: 'client', label: 'Client', placeholder: 'Saisissez le nom du client' },
  { name: 'tribunal', label: 'Tribunal', placeholder: 'Saisissez le tribunal' },
  { name: 'referenceTribunal', label: 'Référence tribunal', placeholder: 'Saisissez la référence tribunal' },
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
      <Link className="back-link" to="/"><ArrowLeft size={16} />Retour au tableau de bord</Link>
      <div className="search-page-card">
        <div className="search-page-heading">
          <span className="standalone-icon"><FolderSearch size={25} /></span>
          <div>
            <p className="eyebrow">Dossiers</p>
            <h1>Suivi</h1>
            <p>Recherchez un dossier à partir de ses informations.</p>
          </div>
        </div>
        <form className="suivi-form" onSubmit={handleSubmit}>
          {fields.map(({ name, label, placeholder }) => (
            <label className="form-field" key={name}>
              <span>{label}</span>
              <input name={name} value={form[name] || ''} onChange={updateField} placeholder={placeholder} />
            </label>
          ))}
          <button className="primary-search-button" type="submit"><Search size={18} />Rechercher</button>
        </form>
      </div>
    </main>
  )
}
