import { ArrowLeft, FolderSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

const fields = [
  { name: 'caseNumber', label: 'N° de dossier', placeholder: 'Saisissez le numéro du dossier' },
  { name: 'client', label: 'Client', placeholder: 'Saisissez le nom du client' },
  { name: 'court', label: 'Tribunal', placeholder: 'Saisissez le nom du tribunal' },
  { name: 'courtReference', label: 'Référence du tribunal', placeholder: 'Saisissez la référence du tribunal' },
]

export default function SuiviPage() {
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const { t } = useLocale()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/actions/suivi/resultats', { state: { criteria: form } })
  }

  return (
    <main className="standalone-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/"><ArrowLeft size={16} />{t('Retour au tableau de bord')}</Link><LanguageSwitcher /></div>
      <div className="search-page-card">
        <div className="search-page-heading">
          <span className="standalone-icon"><FolderSearch size={25} /></span>
          <div>
            <p className="eyebrow">{t('Dossiers')}</p>
            <h1>{t('Suivi des dossiers')}</h1>
            <p>{t('Recherchez un dossier à partir des informations dont vous disposez.')}</p>
          </div>
        </div>
        <form className="suivi-form" onSubmit={handleSubmit}>
          {fields.map(({ name, label, placeholder }) => (
            <label className="form-field" key={name}>
              <span>{t(label)}</span>
              <input name={name} value={form[name] || ''} onChange={updateField} placeholder={t(placeholder)} />
            </label>
          ))}
          <button className="primary-search-button" type="submit"><Search size={18} />{t('Rechercher')}</button>
        </form>
      </div>
    </main>
  )
}
