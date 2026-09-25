import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Arrow from '../shared/Arrow'
import './Contact.css'
const contactContent = {
  video: {
    eyebrow: '04 / Start a project',
    title: <>Have footage waiting<br /><em>to be edited?</em></>,
    intro: 'Tell me what you create, how often you publish, and what kind of editing support you need.',
    direct: 'Prefer email? Write to me directly and include a link to your content.',
    helpful: 'Your profile, the kind of videos you make, expected monthly volume, and a reference for the editing style you like.',
    profileLabel: 'Creator or social profile',
    profilePlaceholder: 'https://instagram.com/…',
    volumeLabel: 'Monthly video volume',
    volumeOptions: ['1–4 videos', '5–8 videos', '9–15 videos', '16+ videos', 'Not sure yet'],
    messageLabel: 'What do you need help editing?',
    messagePlaceholder: 'Tell me about your content, timeline, and the kind of support you need…',
    faqs: [['Can you match my current style?', 'Yes. References and previous posts help me keep your content recognizable.'], ['Do you edit ongoing batches?', 'Yes. One-off edits and recurring creator partnerships are both welcome.'], ['How does pricing work?', 'Quotes reflect footage volume, editing complexity, turnaround, and monthly output.'], ['Do you offer a test edit?', 'A paid test edit is available for potential ongoing partnerships.']],
  },
  web: {
    eyebrow: '04 / Start a project',
    title: <>Have something useful<br /><em>to build?</em></>,
    intro: 'Tell me what you are creating, where the project stands, and what kind of development support you need.',
    direct: 'Prefer email? Write to me directly and include any useful links, references, or project documents.',
    helpful: 'Your project goal, current stage, required features, preferred timeline, and any existing brand or technical material.',
    profileLabel: 'Company or project URL',
    profilePlaceholder: 'https://yourproject.com',
    volumeLabel: 'Project type',
    volumeOptions: ['Website', 'Web application', 'Mobile application', 'E-commerce', 'Interface design', 'Care & optimization', 'Not sure yet'],
    messageLabel: 'What are you looking to build?',
    messagePlaceholder: 'Tell me about the project, its goals, timeline, and the support you need…',
    faqs: [['Can you work from an existing design?', 'Yes. I can build from supplied designs or help shape the interface before development.'], ['Do you take complete projects?', 'Yes. Projects can cover the full experience from interface planning through development and delivery.'], ['How does pricing work?', 'Quotes reflect scope, functionality, technical complexity, and timeline.'], ['Can you improve an existing product?', 'Yes. Care and optimization work can focus on usability, performance, maintenance, and focused improvements.']],
  },
}

export default function Contact({ mode = 'video' }) {
  const content = contactContent[mode]
  const [formData, setFormData] = useState({ name: '', email: '', profile: '', volume: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })
  const sending = useRef(false)
  const handleChange = event => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))
  const handleSubmit = async event => {
    event.preventDefault()
    if (sending.current) return
    if ([formData.name, formData.email, formData.message].some(value => !value.trim())) {
      setFormMessage({ type: 'error', text: 'Please complete each field before sending.' })
      return
    }
    sending.current = true
    setIsSubmitting(true)
    setFormMessage({ type: '', text: '' })
    try {
      const now = new Date()
      await emailjs.send('service_l27gciw', 'template_upuqc3x', {
        name: formData.name.trim(), email: formData.email.trim(),
        message: [formData.message.trim(), `Portfolio: ${mode}`, formData.profile && `Profile / project: ${formData.profile}`, formData.volume && `${content.volumeLabel}: ${formData.volume}`].filter(Boolean).join('\n\n'),
        date: now.toLocaleDateString(), time: now.toLocaleTimeString(),
      }, 'm8EqVxAfEurm8Tc52')
      setFormData({ name: '', email: '', profile: '', volume: '', message: '' })
      setFormMessage({ type: 'success', text: 'Message sent. Thanks for getting in touch!' })
    } catch {
      setFormMessage({ type: 'error', text: 'Your message couldn’t be sent. Please try again or email me directly.' })
    } finally {
      sending.current = false
      setIsSubmitting(false)
    }
  }
  return <section id="contact" className="contact" aria-labelledby="contact-title"><div className="page-width">
    <div className="contact-heading"><span className="eyebrow">{content.eyebrow}</span><h2 id="contact-title">{content.title}</h2><p>{content.intro}</p></div>
    <div className="contact-content"><div className="contact-info"><span className="eyebrow">Direct contact</span><p>{content.direct}</p><a href="mailto:hello@sami-creative.com" className="contact-email">hello@sami-creative.com <Arrow /></a><div className="contact-promise"><span className="eyebrow">Good to include</span><p>{content.helpful}</p></div></div>
      <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <div className="form-top-row"><div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} maxLength={120} /></div><div className="form-field"><label htmlFor="email">Your email <span>*</span></label><input id="email" type="email" name="email" autoComplete="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} required disabled={isSubmitting} maxLength={254} /></div></div>
        <div className="form-top-row"><div className="form-field"><label htmlFor="profile">{content.profileLabel}</label><input id="profile" name="profile" type="url" autoComplete="url" placeholder={content.profilePlaceholder} value={formData.profile} onChange={handleChange} disabled={isSubmitting} maxLength={500} /></div><div className="form-field"><label htmlFor="volume">{content.volumeLabel}</label><select id="volume" name="volume" value={formData.volume} onChange={handleChange} disabled={isSubmitting}><option value="">Select an option</option>{content.volumeOptions.map(option => <option key={option}>{option}</option>)}</select></div></div>
        <div className="form-field"><label htmlFor="message">{content.messageLabel} <span>*</span></label><textarea id="message" name="message" placeholder={content.messagePlaceholder} rows="4" value={formData.message} onChange={handleChange} required disabled={isSubmitting} maxLength={5000} /></div>
        <div className="form-bottom"><span className="eyebrow">No obligation. Just a useful first conversation.</span><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Start the conversation'}<Arrow /></button></div>
        <p className={`form-message ${formMessage.type}`} role="status" aria-live="polite">{formMessage.text}</p>
      </form>
    </div>
    <div className="quick-faq"><span className="eyebrow">Quick answers</span><div>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
  </div></section>
}
