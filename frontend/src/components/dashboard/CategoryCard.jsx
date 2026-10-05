import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../i18n/LocaleContext'

export default function CategoryCard({ title, description, icon: Icon, tone, links }) {
  const { t } = useLocale()

  return (
    <article className="category-card">
      <div className="category-card__top">
        <span className={`category-card__icon category-card__icon--${tone}`}><Icon size={21} /></span>
        <span className="round-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
      </div>
      <h3>{t(title)}</h3>
      <p>{t(description)}</p>
      <div className="category-card__links">
        {links.map((link) => <Link to={link.href} key={link.href}>{t(link.label)}</Link>)}
      </div>
    </article>
  )
}
