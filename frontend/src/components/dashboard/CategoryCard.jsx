import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CategoryCard({ title, description, icon: Icon, tone, links }) {
  return (
    <article className="category-card">
      <div className="category-card__top">
        <span className={`category-card__icon category-card__icon--${tone}`}><Icon size={21} /></span>
        <span className="round-arrow" aria-hidden="true"><ArrowRight size={17} /></span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="category-card__links">
        {links.map((link) => <Link to={link.href} key={link.href}>{link.label}</Link>)}
      </div>
    </article>
  )
}
