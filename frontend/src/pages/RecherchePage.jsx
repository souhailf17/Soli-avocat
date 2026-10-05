import { ArrowLeft, FileSearch, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'

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
  const { t } = useLocale()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submit(event) {
    event.preventDefault()
    navigate('/actions/recherches/resultats', { state: { criteria: form } })
  }

  return (
    <main className="standalone-page advanced-search-page">
      <div className="standalone-toolbar"><Link className="back-link" to="/"><ArrowLeft size={16} />{t('Retour au tableau de bord')}</Link><LanguageSwitcher /></div>
      <div className="advanced-search-header">
        <div><span className="standalone-icon"><FileSearch size={25} /></span><div><p className="eyebrow">{t('Dossiers')}</p><h1>{t('Recherche avancée')}</h1><p>{t('Utilisez un ou plusieurs critères pour retrouver un dossier.')}</p></div></div>
      </div>
      <form onSubmit={submit}>
        <div className="search-workspace">
          <aside className="search-filter-menu" aria-label={t('Catégories de recherche')}>
            <p>{t('Catégorie de recherche')}</p>
            {groups.map((group) => {
              const filledCount = group.fields.filter(([name]) => form[name]).length
              return <button className={selectedGroup === group.title ? 'search-filter-menu__item search-filter-menu__item--active' : 'search-filter-menu__item'} type="button" key={group.title} onClick={() => setSelectedGroup(group.title)}><span>{t(group.title)}</span><small>{filledCount ? t(filledCount > 1 ? 'fieldsCompletedPlural' : 'fieldsCompleted', { count: filledCount }) : t('fieldsCount', { count: group.fields.length })}</small></button>
            })}
          </aside>
          <section className="search-group search-group--active">
            <div className="search-group__heading"><span>{t(activeGroup.title)}</span><small>{t('fieldsAvailable', { count: activeGroup.fields.length })}</small></div>
            <div className="advanced-fields">
              {activeGroup.fields.map(([name, label, placeholder]) => (
                <label className="form-field" key={name}>
                  <span>{t(label)}</span>
                  {name === 'documentType' ? (
                    <select name={name} value={form[name] || ''} onChange={updateField}>
                      <option value="">{t('Sélectionnez un type')}</option><option value="Dossier">{t('Dossier')}</option><option value="Jugement">{t('Jugement')}</option><option value="Notification">{t('Notification')}</option><option value="Exécution">{t('Exécution')}</option>
                    </select>
                  ) : <input name={name} type="text" value={form[name] || ''} onChange={updateField} placeholder={t(placeholder)} />}
                </label>
              ))}
            </div>
          </section>
        </div>
        <div className="advanced-search-actions"><button className="secondary-button" type="button" onClick={() => setForm({})}>{t('Réinitialiser')}</button><button className="primary-search-button" type="submit"><Search size={18} />{t('Rechercher')}</button></div>
      </form>
    </main>
  )
}
