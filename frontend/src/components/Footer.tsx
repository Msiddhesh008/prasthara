import { Link } from 'react-router-dom'
import instagramQr from '../assets/instagram-qr.png'
import { CONTACT, ROUTES } from '../constants'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">Prasthara</p>
          <p className="site-footer__tag">Spreading second lives for textiles.</p>
        </div>

        <div className="site-footer__links">
          <Link to={ROUTES.shop}>Shop</Link>
          <Link to={ROUTES.story}>Our Story</Link>
          <Link to={ROUTES.donate}>Donate</Link>
          <Link to={ROUTES.contact}>Contact</Link>
        </div>

        <div className="site-footer__contact">
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          <p>{CONTACT.location}</p>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
          >
            {CONTACT.instagramHandle}
          </a>
        </div>

        <a
          className="footer-qr"
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label={`Follow Prasthara on Instagram ${CONTACT.instagramHandle}`}
        >
          <p className="footer-qr__label">Instagram</p>
          <img
            src={instagramQr}
            alt={`QR code for ${CONTACT.instagramHandle}`}
            className="footer-qr__image"
            width={148}
            height={148}
          />
          <p className="footer-qr__handle">{CONTACT.instagramHandle}</p>
          <p className="footer-qr__hint">Scan to follow & share</p>
        </a>
      </div>
    </footer>
  )
}
