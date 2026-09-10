import { useState, type FormEvent } from 'react'
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
        <div className="contact-info">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch</h1>
          <p className="section__lead">
            Reach us for donations, custom upcycles, or thrift enquiries.
          </p>
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
      </div>
    </div>
  )
}
