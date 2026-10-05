import { ArrowLeft, FileSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const groups = [
  {
    title: 'Dossier',
    fields: [
      ['client', 'Client', 'Saisissez le nom du client'],
      ['opponent', 'Adversaire', 'Saisissez le nom de l’adversaire'],
      ['clientReference', 'Référence client', 'Saisissez la référence client'],
      ['identityNumber', 'Numéro d’identité', 'Saisissez le numéro d’identité'],
    ],
  },
  {
    title: 'Documents',
    fields: [
      ['documentType', 'Type de document', 'Sélectionnez un type'],
      ['judgmentNumber', 'N° de jugement', 'Saisissez le numéro du jugement'],
      ['notificationNumber', 'N° de notification', 'Saisissez le numéro de notification'],
      ['enforcementNumber', 'N° d’exécution', 'Saisissez le numéro d’exécution'],
    ],
  },
  {
    title: 'Tribunal',
    fields: [['courtReference', 'Référence du tribunal', 'Saisissez la référence du tribunal']],
  },
  {
    title: 'Paiement',
    fields: [
      ['checkNumber', 'N° de chèque', 'Saisissez le numéro du chèque'],
      ['amount', 'Montant', 'Saisissez le montant'],
    ],
  },
]

export default function RecherchePage() {
  const [form, setForm] = useState({})
  const [selectedGroup, setSelectedGroup] = useState('Dossier')
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
      <Link className="back-link" to="/"><ArrowLeft size={16} />Retour au tableau de bord</Link>
      <div className="advanced-search-header">
        <div><span className="standalone-icon"><FileSearch size={25} /></span><div><p className="eyebrow">Dossiers</p><h1>Recherche avancée</h1><p>Utilisez un ou plusieurs critères pour retrouver un dossier.</p></div></div>
      </div>
      <form onSubmit={submit}>
        <div className="search-workspace">
          <aside className="search-filter-menu" aria-label="Catégories de recherche">
            <p>Catégorie de recherche</p>
            {groups.map((group) => {
              const filledCount = group.fields.filter(([name]) => form[name]).length
              return <button className={selectedGroup === group.title ? 'search-filter-menu__item search-filter-menu__item--active' : 'search-filter-menu__item'} type="button" key={group.title} onClick={() => setSelectedGroup(group.title)}><span>{group.title}</span><small>{filledCount ? `${filledCount} renseigné${filledCount > 1 ? 's' : ''}` : `${group.fields.length} champs`}</small></button>
            })}
          </aside>
          <section className="search-group search-group--active">
            <div className="search-group__heading"><span>{activeGroup.title}</span><small>{activeGroup.fields.length} champs disponibles</small></div>
            <div className="advanced-fields">
              {activeGroup.fields.map(([name, label, placeholder]) => (
                <label className="form-field" key={name}>
                  <span>{label}</span>
                  {name === 'documentType' ? (
                    <select name={name} value={form[name] || ''} onChange={updateField}>
                      <option value="">Sélectionnez un type</option><option value="Dossier">Dossier</option><option value="Jugement">Jugement</option><option value="Notification">Notification</option><option value="Exécution">Exécution</option>
                    </select>
                  ) : <input name={name} type="text" value={form[name] || ''} onChange={updateField} placeholder={placeholder} />}
                </label>
              ))}
            </div>
          </section>
        </div>
        <div className="advanced-search-actions"><button className="secondary-button" type="button" onClick={() => setForm({})}>Réinitialiser</button><button className="primary-search-button" type="submit"><Search size={18} />Rechercher</button></div>
      </form>
    </main>
  )
}
