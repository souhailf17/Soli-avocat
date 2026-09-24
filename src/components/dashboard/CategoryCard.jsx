import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ title, description, icon: Icon, tone, links }) {
  return (
    <article className="category-card">
      <div className="category-card__top">
        <span className={`category-card__icon category-card__icon--${tone}`}><Icon size={21} /></span>
        <button className="round-arrow" type="button" aria-label={`Ouvrir ${title}`}><ArrowRight size={17} /></button>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="category-card__links">
        {links.map((link) => <a href={`#${link}`} key={link}>{link}</a>)}
      </div>
    </article>
  )
}
