import { useRef, useState } from 'react'
import Contact from './Contact/Contact'
import Arrow from './shared/Arrow'
import './Studio.css'

const projects = [
  { title: 'Horizon Studio', description: 'Interactive visual journal', image: 'horizon-studio', url: 'https://demo-1-five-ebon.vercel.app/', category: 'Editorial' },
  { title: 'Paper Shaders', description: 'Interactive product website', image: 'paper-shaders', url: 'https://demo2-ruby-tau.vercel.app/', category: 'Product' },
  { title: 'VOIDHAUS', description: 'Fashion e-commerce experience', image: 'voidhaus', url: 'https://demo6-puce.vercel.app/', category: 'Commerce' },
  { title: 'AuthorityOS', description: 'Business landing page', image: 'authority-os', url: 'https://demo4-self.vercel.app/', category: 'Product' },
  { title: 'Alex Nova', description: 'Creative portfolio', image: 'alex-nova', url: 'https://demo5-lilac.vercel.app/', category: 'Editorial' },
  { title: 'Passage', description: 'Editorial travel journal', image: 'passage', url: 'https://demo3-kohl.vercel.app/', category: 'Editorial' },
]
const formats = [
  ['Talking', 'Talking videos', 'Hooks, clean pacing, and captions that keep your voice front and center.'],
  ['Product', 'Product showcases', 'Details, movement, and sound design that bring your product into focus.'],
  ['Tutorial', 'Tutorials', 'Clear steps, useful on-screen text, and a structure that is easy to follow.'],
  ['Lifestyle', 'Lifestyle', 'Thoughtful clip selection and a natural rhythm for everyday stories.'],
  ['Cooking', 'Cooking', 'A clear process, satisfying detail, and carefully timed cuts.'],
  ['Vlogs', 'Mini vlogs', 'The strongest moments, connected into a story worth staying for.'],
]
const webServices = ['Web development', 'Mobile applications', 'Online stores', 'Interface design', 'Search & visibility', 'Care & optimization']

function Icon({ index = 0, web = false }) {
  const paths = [
    <><rect x="5" y="3" width="14" height="16" rx="3" /><path d="m10 8 5 3-5 3zM10 22h4" /></>,
    <><rect x="5" y="7" width="14" height="14" rx="2" /><path d="M9 7V5a3 3 0 0 1 6 0v2M10 12h4" /></>,
    <><circle cx="12" cy="12" r="9" /><path d="m10 8 5 4-5 4z" /></>,
    <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" /></>,
    <><path d="M20 5c-4-4-8 1-8 1S8 1 4 5c-5 5 8 15 8 15S25 10 20 5Z" /></>,
    <><path d="m8 5 4-3 4 3h3l2 5-2 10H5L3 10l2-5z" /><circle cx="12" cy="12" r="2" /></>,
  ]
  const webPaths = [
    <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M9 22h6M12 18v4m-2-13-3 3 3 3m4-6 3 3-3 3" /></>,
    <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4M11 19h2" /></>,
    <><path d="M2 3h3l3 13h11l3-10H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
    <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M9 8v13" /></>,
    <><circle cx="10" cy="10" r="7" /><path d="m15 15 7 7" /></>,
    <><path d="m12 2 8 4v6c0 5-8 10-8 10s-8-5-8-10V6zM8 12l3 3 5-6" /></>,
  ]
  return <svg className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">{(web ? webPaths : paths)[index % paths.length]}</svg>
}

function Header({ mode, onContact, onAbout }) {
  const [open, setOpen] = useState(false)
  return <header className="studio-nav wrap">
    <a className="wordmark" href="/" aria-label="Samy home">samy<span>°</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
    <nav id="main-nav" className={open ? 'is-open' : ''} aria-label="Main navigation">
      {[['home', '/', 'Home'], ['video', '/video-editing', 'Video editing'], ['web', '/web-development', 'Web development']].map(([key, url, title]) => <a key={key} href={url} aria-current={mode === key ? 'page' : undefined}>{title}</a>)}
      <button onClick={() => { setOpen(false); onAbout() }}>About</button>
    </nav>
    <button className="nav-contact" onClick={onContact}>{mode === 'home' ? 'Let’s talk' : 'Start a project'}</button>
  </header>
}

function Timeline({ final = true }) {
  return <div className={`edit-timeline ${final ? 'is-final' : 'is-raw'}`} aria-label={final ? 'Selected clips with captions and sound tracks' : 'Unedited clips with pauses between takes'}>
    <div className="timeline-ruler mono"><span>IN</span><span>STORY</span><span>OUT</span></div>
    <div className="timeline-clips">{Array.from({ length: final ? 5 : 9 }, (_, i) => <span key={i} style={{ flex: 1 + i % 3 }}>{final && ['Hook', 'Story', 'Detail', 'Beat', 'End'][i]}</span>)}</div>
    {final && <div className="caption-track"><span>Captions</span><span /><span /></div>}
    <div className="wave-track" aria-hidden="true">{Array.from({ length: 64 }, (_, i) => <i key={i} style={{ height: `${4 + (i * 13 % 18)}px` }} />)}</div>
    <div className="playhead" />
  </div>
}

function Phone({ small = false }) {
  return <div className={`phone ${small ? 'phone-small' : ''}`}>
    <div className="phone-notch" /><div className="phone-screen">
      <div className="phone-label mono">THE EDITING PROCESS <span>9:16</span></div>
      <div className="phone-type">Your footage.<br />Your voice.<br /><em>A stronger<br />story.</em></div>
      <div className="phone-bottom"><span className="mono">SELECT / SHAPE / FINISH</span><Timeline /></div>
    </div>
  </div>
}

function Laptop({ compact = false }) {
  return <div className={`laptop ${compact ? 'laptop-compact' : ''}`}>
    <div className="laptop-display"><div className="laptop-camera" /><img src="/projects/horizon-studio.webp" alt="Horizon Studio website interface" fetchPriority={compact ? 'auto' : 'high'} /></div>
    <div className="laptop-base"><span /></div>
  </div>
}

function HomeHero({ onContact }) {
  return <section className="home-hero wrap">
    <div className="home-workstation" aria-hidden="true"><div className="desk-screen"><div className="screen-toolbar mono">SAMY / EDITING WORKSPACE <span>SEQUENCE 01</span></div><div className="screen-preview"><img src="/Background/hero-bg.webp" alt="" /><span className="screen-note mono">REVIEW. SELECT. REFINE.</span></div><Timeline /></div><div className="desk-stand" /><div className="desk-surface" /></div>
    <div className="hero-copy"><p className="mono eyebrow-copy">CREATIVE SOLUTIONS<br />FOR A DIGITAL WORLD.</p><h1>Ideas.<br />Edited.<br />Built.<br /><em>Brought to life.</em></h1><p className="hero-description">Video editing and web development<br />for creators and forward-thinking brands.</p><div className="hero-actions"><a href="#explore" className="pill primary">Explore my work <Arrow /></a><button className="text-button" onClick={onContact}>Let’s talk</button></div><a className="scroll-cue mono" href="#explore">SCROLL<br />TO EXPLORE</a></div>
    <div className="hero-margin mono">SIMPLE<br />CLEAN<br />CREATIVE</div>
  </section>
}

function VideoHero({ onContact }) {
  return <section className="specialty-hero video-hero wrap"><div className="hero-copy"><p className="mono eyebrow-copy">SHORT-FORM VIDEO EDITOR<br />FOR CONTENT CREATORS</p><h1>You film.<br />I shape<br />the story.</h1><p className="hero-description">I turn raw footage into polished Reels, TikToks and YouTube Shorts — with strong pacing, clean cuts, captions, and an editing style that still feels like you.</p><div className="hero-actions"><button className="pill primary" onClick={onContact}>Request samples <Arrow /></button><a className="text-button" href="#breakdown">See how I edit</a></div></div><div className="video-visual"><Phone /><div className="edit-notes"><span className="mono">HOOKS<br />PACING<br />CAPTIONS<br />SOUND</span><div className="note-card"><span>01</span><p>Find the<br />moment.</p></div><div className="note-card"><span>02</span><p>Make it<br />matter.</p></div></div></div></section>
}

function WebHero({ onContact }) {
  return <section className="specialty-hero web-hero wrap"><div className="hero-copy"><p className="mono eyebrow-copy">WEB DEVELOPMENT<br />& DIGITAL SOLUTIONS</p><h1>Modern<br />web experiences<br />that make an impact.</h1><p className="hero-description">I design and develop websites, applications and digital products that bring thoughtful design and dependable development together.</p><div className="hero-actions"><a className="pill primary" href="#projects">View my work <Arrow /></a><button className="text-button" onClick={onContact}>Let’s talk</button></div></div><div className="web-visual"><span className="hero-margin mono">WEBSITES<br />APPS<br />E-COMMERCE<br />OPTIMIZATION</span><a href={projects[0].url} target="_blank" rel="noreferrer" className="laptop-link" aria-label="View Horizon Studio live website"><Laptop /></a></div></section>
}

function Stats({ home = false }) {
  const stats = [...(home ? [['317K+', 'Instagram community', 'Page management & content']] : []), ['5+', 'Years of experience', 'Since 2021'], ['100+', 'Projects worked on', 'Across our combined experience'], ['30+', 'Technologies', 'Across the full stack']]
  return <section className={`stats wrap ${home ? 'stats-home' : ''}`} aria-label="Experience">{stats.map(([value, title, detail]) => <div key={title}><strong>{value}</strong><span>{title}</span><small>{detail}</small></div>)}</section>
}

function Directions() {
  return <section id="explore" className="directions wrap" aria-label="Explore the portfolios">
    <a className="direction-card video-direction" href="/video-editing"><div className="direction-copy"><span className="mono">01</span><h2>VIDEO EDITING</h2><p>Turn moments<br />into impact.</p><span className="text-button">View work <Arrow /></span></div><Phone small /></a>
    <a className="direction-card web-direction" href="/web-development"><div className="direction-copy"><span className="mono">02</span><h2>WEB DEVELOPMENT</h2><p>Web experiences<br />that work.</p><span className="text-button">View work <Arrow /></span></div><Laptop compact /></a>
  </section>
}

function ProjectGallery() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const filtered = projects.filter(p => filter === 'All' || p.category === filter)
  const visible = expanded || filter !== 'All' ? filtered : filtered.slice(0, 3)
  return <section id="projects" className="projects-section wrap"><div className="section-top"><h2>Selected projects.</h2><button className="text-button" onClick={() => { setExpanded(!expanded); setFilter('All') }} aria-expanded={expanded}>{expanded ? 'Show less' : 'View all six'} <Arrow /></button></div><div className="filters" aria-label="Filter projects">{['All', 'Editorial', 'Product', 'Commerce'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="studio-project-grid">{visible.map(project => <article className="studio-project" key={project.title}><a className="project-cover" href={project.url} target="_blank" rel="noreferrer"><img src={`/projects/${project.image}.webp`} alt={`${project.title} project preview`} loading="lazy" /></a><div className="project-caption"><h3>{project.title}</h3><p>{project.description}</p><a className="text-button" href={project.url} target="_blank" rel="noreferrer">View live site <Arrow /></a></div></article>)}</div></section>
}

function VideoSamples({ onContact }) {
  const [selected, setSelected] = useState('Talking')
  const format = formats.find(f => f[0] === selected)
  return <section className="samples-section wrap" id="work"><div className="section-top"><h2>Selected work.</h2><button className="text-button" onClick={onContact}>Request private reel <Arrow /></button></div><div className="filters" aria-label="Editing sample categories">{formats.map(([key]) => <button key={key} aria-pressed={selected === key} onClick={() => setSelected(key)}>{key}</button>)}</div><div className="private-samples"><div className="sample-category"><Icon index={formats.indexOf(format)} /><h3>{format[1]}</h3><p>{format[2]}</p></div><div className="private-samples-note"><span className="mono">CREATOR WORK / SHARED PRIVATELY</span><p>Get a focused selection of edits for the content you make.</p><button className="text-button" onClick={onContact}>Request {selected.toLowerCase()} samples <Arrow /></button></div></div></section>
}

function Breakdown() {
  const [stage, setStage] = useState('raw')
  const [position, setPosition] = useState(25)
  const final = stage === 'final'
  return <section id="breakdown" className="breakdown-section wrap"><div className="section-top"><h2>From raw to ready.</h2><span className="mono">THE EDITING PROCESS</span></div><div className="breakdown-layout"><div className="workflow-demo"><div className="workflow-toggle" aria-label="Editing workflow stage"><button aria-pressed={!final} onClick={() => setStage('raw')}>Raw footage</button><button aria-pressed={final} onClick={() => setStage('final')}>Final edit <Arrow /></button></div><div className={`workflow-preview ${final ? 'finished' : ''}`}><span className="mono">{final ? 'SELECTED / STRUCTURED / POLISHED' : 'TAKES / PAUSES / POSSIBILITIES'}</span><p>{final ? <>A clear hook.<br />A stronger story.</> : <>Every take.<br />All the possibilities.</>}</p><span className="workflow-status mono">{final ? 'CAPTIONS + SOUND + COLOR' : 'REVIEW / SELECT / STRUCTURE'}</span></div><div className="scrubbable-timeline" style={{ '--scrub': `${position}%` }}><Timeline final={final} /><label className="sr-only" htmlFor="timeline-scrub">Explore the illustrative editing timeline</label><input id="timeline-scrub" type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} /></div><p className="demo-caption">Interactive workflow illustration</p></div><div className="breakdown-copy"><h3>Everything you filmed.<br />Only what the story needs.</h3><ul><li>Selected the strongest moments</li><li>Created a clear structure and hook</li><li>Added captions and sound design</li><li>Reviewed, refined, and exported</li></ul><p>Send the footage → review the first cut → receive post-ready files.</p></div></div></section>
}

function Services({ mode }) {
  const video = mode === 'video'
  const services = video ? formats.map(f => f[1]) : webServices
  return <section id="services" className="services-section wrap"><h2>{video ? 'Built for creator-led content.' : 'Services.'}</h2><div className="service-row">{services.map((service, i) => <div key={service}><Icon index={i} web={!video} /><h3>{service}</h3></div>)}</div></section>
}

function Closing({ mode, onContact }) {
  return <><section className="closing wrap"><h2>{mode === 'home' ? <>Good ideas<br />make a better internet.</> : mode === 'web' ? <>Let’s build<br />something great.</> : <>Your next story.<br />Let’s make it happen.</>}</h2><p>{mode === 'home' ? 'Video editing. Web development. A thoughtful approach to both.' : mode === 'web' ? 'Have a project in mind? Let’s turn your ideas into a clear, useful digital experience.' : 'Share your footage, your references, and the kind of editing support you need.'}</p><button className="pill primary" onClick={onContact}>Start a project <Arrow /></button></section><footer className="studio-footer wrap"><a className="wordmark" href="/">samy<span>°</span></a><a className="footer-email" href="mailto:hello@sami-creative.com">hello@sami-creative.com</a><span className="mono">FOCUSED ON QUALITY<br />BUILT WITH INTENTION</span></footer></>
}

export function StudioPage({ mode }) {
  const dialogRef = useRef(null)
  const aboutRef = useRef(null)
  const [contactMode, setContactMode] = useState(mode === 'web' ? 'web' : 'video')
  const onContact = () => dialogRef.current.showModal()
  return <div className={`studio studio-${mode}`} id="top">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Header mode={mode} onContact={onContact} onAbout={() => aboutRef.current.showModal()} />
    <main id="main-content">
      {mode === 'home' ? <><HomeHero onContact={onContact} /><Directions /><Stats home /></> : mode === 'video' ? <><VideoHero onContact={onContact} /><VideoSamples onContact={onContact} /><Breakdown /><Services mode={mode} /></> : <><WebHero onContact={onContact} /><Stats /><ProjectGallery /><Services mode={mode} /></>}
      <Closing mode={mode} onContact={onContact} />
    </main>
    <dialog className="contact-dialog" aria-label="Start a project" ref={dialogRef} onClick={e => { if (e.target === e.currentTarget) dialogRef.current.close() }}>
      <button className="dialog-close" onClick={() => dialogRef.current.close()} aria-label="Close contact form">Close ×</button>
      {mode === 'home' && <div className="contact-mode filters" aria-label="Project discipline"><button aria-pressed={contactMode === 'video'} onClick={() => setContactMode('video')}>Video editing</button><button aria-pressed={contactMode === 'web'} onClick={() => setContactMode('web')}>Web development</button></div>}
      <Contact key={contactMode} mode={contactMode} />
    </dialog>
    <dialog className="about-dialog" aria-labelledby="about-title" ref={aboutRef} onClick={e => { if (e.target === e.currentTarget) aboutRef.current.close() }}>
      <button className="dialog-close" onClick={() => aboutRef.current.close()}>Close ×</button><span className="mono">ABOUT SAMY</span><h2 id="about-title">A creative eye.<br />A technical foundation.</h2><p>I’m a short-form video editor and web developer. My graphic-design background informs the typography, composition, and detail in my work. My software-engineering background keeps the process organized and dependable.</p><dl><div><dt>2023 — present</dt><dd>Instagram page management · 317K+ community</dd></div><div><dt>2022 — 2027</dt><dd>Software engineering studies</dd></div></dl><a className="text-button" href="mailto:hello@sami-creative.com">Get in touch <Arrow /></a>
    </dialog>
  </div>
}
