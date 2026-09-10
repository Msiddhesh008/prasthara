import { useState, type FormEvent } from 'react'
import instagramQr from '../assets/instagram-qr.png'
import { CONTACT, MESSAGES } from '../constants'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus(MESSAGES.formError)
      return
    }
    setStatus(MESSAGES.contactSent)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="page-contact section">
      <div className="section__inner contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch</h1>
          <p className="section__lead">
            Reach us for donations, custom upcycles, or thrift enquiries.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Message
            <textarea
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Send message
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <ul className="contact-list">
          <li>
            <span>Phone</span>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </li>
          <li>
            <span>Email</span>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          </li>
          <li>
            <span>Location</span>
            <p>{CONTACT.location}</p>
          </li>
          <li>
            <span>Instagram</span>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
              {CONTACT.instagramLabel}
            </a>
          </li>
        </ul>

        <a
          className="contact-qr footer-qr"
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
    </div>
  )
}
