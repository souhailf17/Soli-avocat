import { ArrowLeft, FileSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const groups = [
  {
    title: 'Dossier',
    fields: [
      ['client', 'Client', 'Saisissez le nom du client'],
      ['adversaire', 'Adversaire', 'Saisissez le nom de l’adversaire'],
      ['referenceClient', 'Référence Client', 'Saisissez la référence client'],
      ['cin', 'CIN', 'Saisissez le CIN'],
    ],
  },
  {
    title: 'Divers',
    fields: [
      ['choisir', 'Choisir', 'Sélectionnez un type'],
      ['noJugement', 'N° Jugement', 'Saisissez le numéro de jugement'],
      ['noNotification', 'N° Notification', 'Saisissez le numéro de notification'],
      ['noExecution', 'N° Exécution', 'Saisissez le numéro d’exécution'],
      ['vente', 'Vente', 'Saisissez la référence de vente'],
    ],
  },
  {
    title: 'Tribunal',
    fields: [['referenceTribunal', 'Référence Tribunal', 'Saisissez la référence tribunal']],
  },
  {
    title: 'Caution',
    fields: [['nomCaution', 'Nom de la Caution', 'Saisissez le nom de la caution']],
  },
  {
    title: 'Accident',
    fields: [
      ['dateAccident', 'Date Accident', 'JJ/MM/AAAA'],
      ['adversaireAccident', 'Adversaire', 'Saisissez le nom de l’adversaire'],
      ['typeAccident', 'Type Accident', 'Saisissez le type d’accident'],
      ['assureur', 'Assureur', 'Saisissez le nom de l’assureur'],
      ['employeur', 'Employeur', 'Saisissez le nom de l’employeur'],
    ],
  },
  {
    title: 'Créance',
    fields: [
      ['noCheque', 'N° Chèque', 'Saisissez le numéro de chèque'],
      ['montCheque', 'Montant Chèque et créance', 'Saisissez le montant'],
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
        <div><span className="standalone-icon"><FileSearch size={25} /></span><div><p className="eyebrow">Recherche avancée</p><h1>Rechercher</h1><p>Combinez plusieurs critères pour retrouver rapidement un dossier.</p></div></div>
      </div>
      <form onSubmit={submit}>
        <div className="search-workspace">
          <aside className="search-filter-menu" aria-label="Catégories de recherche">
            <p>Filtrer par catégorie</p>
            {groups.map((group) => {
              const filledCount = group.fields.filter(([name]) => form[name]).length
              return <button className={selectedGroup === group.title ? 'search-filter-menu__item search-filter-menu__item--active' : 'search-filter-menu__item'} type="button" key={group.title} onClick={() => setSelectedGroup(group.title)}><span>{group.title}</span><small>{filledCount ? `${filledCount} renseigné${filledCount > 1 ? 's' : ''}` : `${group.fields.length} critères`}</small></button>
            })}
          </aside>
          <section className="search-group search-group--active">
            <div className="search-group__heading"><span>{activeGroup.title}</span><small>{activeGroup.fields.length} critères disponibles</small></div>
            <div className="advanced-fields">
              {activeGroup.fields.map(([name, label, placeholder]) => (
                <label className="form-field" key={name}>
                  <span>{label}</span>
                  {name === 'choisir' ? (
                    <select name={name} value={form[name] || ''} onChange={updateField}>
                      <option value="">Choisir</option><option value="Dossier">Dossier</option><option value="Jugement">Jugement</option><option value="Notification">Notification</option><option value="Exécution">Exécution</option>
                    </select>
                  ) : <input name={name} type={name === 'dateAccident' ? 'date' : 'text'} value={form[name] || ''} onChange={updateField} placeholder={placeholder} />}
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
