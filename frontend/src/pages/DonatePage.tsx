import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONTACT, ROUTES } from '../constants'

const paths = [
  {
    title: 'Shop With Us',
    body: 'Purchase thrifted clothing or upcycled products and become part of a more circular textile economy.',
    to: ROUTES.shop,
    cta: 'Browse the shop',
  },
  {
    title: 'Donate Your Clothes',
    body: 'Have clothes you no longer wear? Donate them to Prasthara. Usable garments may find new homes; damaged textiles may become new products.',
    to: ROUTES.contact,
    cta: 'Get in touch',
  },
  {
    title: 'Follow and Share',
    body: 'Support our work by following us on Instagram and sharing our story with others.',
    to: CONTACT.instagram,
    cta: 'Instagram',
    external: true,
  },
]

export function DonatePage() {
  return (
    <div className="page-donate section">
      <div className="section__inner">
        <div className="section__header">
          <p className="eyebrow">Support</p>
          <h1>How you can support Prasthara</h1>
          <p className="section__lead">
            Your support helps us extend the life of textiles.
          </p>
        </div>

        <div className="support-grid">
          {paths.map((path, index) => (
            <motion.article
              key={path.title}
              className="support-path"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <h2>{path.title}</h2>
              <p>{path.body}</p>
              {path.external ? (
                <a
                  href={path.to}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  {path.cta}
                </a>
              ) : (
                <Link to={path.to} className="btn btn--ghost">
                  {path.cta}
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
