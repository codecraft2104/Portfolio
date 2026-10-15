import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  LayoutGrid,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';

type Project = {
  id?: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  cover_image: string;
  technologies: string[];
  problem_statement: string;
  objectives: string[];
  features: string[];
  architecture: string;
  my_role: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  future_improvements: string[];
  github_url?: string | null;
  live_demo_url?: string | null;
  featured?: boolean;
  sort_order?: number;
  screenshots?: Array<{ title: string; url: string; alt: string }>;
};

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const personal = {
  name: 'Madhuri',
  email: 'lmadhuri913@gmail.com',
  phone: '7676652798',
  githubUrl: 'https://github.com/codecraft2104',
  title: 'Full-Stack Developer | Software Developer | IT Trainer',
};

const skillGroups: SkillGroup[] = [
  { title: 'Programming Languages', icon: Code2, items: ['Java', 'Python', 'C', 'C++'] },
  { title: 'Frontend Development', icon: LayoutGrid, items: ['React.js', 'HTML5', 'CSS3', 'JavaScript'] },
  { title: 'Backend Development', icon: Sparkles, items: ['Node.js', 'Django', 'Spring Boot'] },
  { title: 'Databases', icon: Database, items: ['MySQL', 'PostgreSQL'] },
  { title: 'ORM and Persistence', icon: BookOpen, items: ['Hibernate'] },
];

const experienceItems = [
  {
    role: 'IT Trainer',
    period: '2 years',
    summary: 'I explain programming and IT concepts in a clear, practical way and help learners build confidence in real software development workflows.',
    responsibilities: [
      'Explain programming and IT concepts in an accessible way.',
      'Help learners understand practical software development.',
      'Support programming exercises, debugging, and problem-solving.',
      'Develop communication, technical explanation, and mentoring skills.',
    ],
  },
];

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | Madhuri`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`);
        if (!response.ok) {
          throw new Error('Unable to load projects');
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (error) {
        setProjectsError('Unable to load the project gallery right now.');
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className={`app-shell ${theme === 'light' ? 'light-mode' : ''}`}>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main className="page-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="route-transition"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage projects={projects} loading={loadingProjects} error={projectsError} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage projects={projects} loading={loadingProjects} error={projectsError} />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage projects={projects} />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function Header({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="Madhuri home">
          <span className="brand-mark">M</span>
          <span>Madhuri</span>
        </Link>

        <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setMobileOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <a href="/resume-madhuri.pdf" download="Madhuri-Resume.pdf" className="nav-link resume-mobile" onClick={() => setMobileOpen(false)}>
            Download Resume
          </a>
        </nav>

        <div className="nav-actions">
          <a href="/resume-madhuri.pdf" download="Madhuri-Resume.pdf" className="ghost-link resume-download">
            <Download size={18} />
            <span>Resume</span>
          </a>
          <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="ghost-link" aria-label="GitHub profile">
            <GitBranch size={18} />
            <span>GitHub</span>
          </a>
          <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link to="/contact" className="primary-button header-cta">
            Contact Me
          </Link>
          <button type="button" className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h3>Madhuri</h3>
          <p>Full-Stack Developer • Software Developer • IT Trainer</p>
        </div>
        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-contact">
          <a href={`mailto:${personal.email}`} className="footer-email">
            <Mail size={16} />
            {personal.email}
          </a>
          <a href={`tel:${personal.phone}`} className="footer-email">
            <Phone size={16} />
            {personal.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ projects, loading, error }: { projects: Project[]; loading: boolean; error: string }) {
  usePageMeta('Home', 'Madhuri is a full-stack developer and IT trainer building practical web applications, backend systems, and AI-powered tools.');

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured).slice(0, 3), [projects]);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="hero-copy">
            <span className="eyebrow">Developer • Trainer • Problem Solver</span>
            <h1>Hi, I&apos;m Madhuri</h1>
            <h2 className="hero-subtitle">{personal.title}</h2>
            <p>
              I build useful web applications, backend systems, and AI-powered tools while combining hands-on development with the ability to teach and explain technology in a practical way.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="primary-button">
                Explore My Projects
              </Link>
              <Link to="/about" className="secondary-button">
                About Me
              </Link>
              <Link to="/contact" className="secondary-button">
                Contact Me
              </Link>
              <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="secondary-button github-button">
                <GitBranch size={18} />
                View GitHub Profile
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="hero-panel">
            <div className="profile-card">
              <div className="profile-avatar">M</div>
              <div>
                <span className="mini-label">Profile</span>
                <h3>Full-Stack Developer</h3>
                <p>Building practical digital experiences with maintainable code and clear communication.</p>
              </div>
            </div>
            <div className="experience-box">
              <span className="mini-label">Experience</span>
              <strong>2 Years of IT Training Experience</strong>
            </div>
            <div className="stats-grid">
              <div>
                <span>Full-Stack</span>
                <strong>Development</strong>
              </div>
              <div>
                <span>AI & Web</span>
                <strong>Applications</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="highlights-section">
        <div className="container highlights-grid">
          {[
            '2 Years of IT Training Experience',
            'Full-Stack Development Skills',
            'Multiple Software Projects',
            'AI and Web Application Development',
          ].map((item) => (
            <div key={item} className="highlight-item">
              <CheckCircle2 size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container section-head">
          <div>
            <span className="eyebrow">Featured work</span>
            <h2>Selected Projects</h2>
          </div>
          <Link to="/projects" className="inline-link">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="container project-grid">
          {loading ? (
            <div className="status-card">Loading projects...</div>
          ) : error ? (
            <div className="status-card error-card">{error}</div>
          ) : (
            featuredProjects.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card">
                <div className="project-cover" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,14,20,0.3), rgba(97,50,200,0.4)), url(${project.cover_image})` }} aria-label={project.title} />
                <div className="project-card-body">
                  <span className="category-pill">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.short_description}</p>
                  <span className="read-more">
                    Read case study <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  usePageMeta('About Me', 'Learn about Madhuri, a full-stack developer and IT trainer focused on practical software, backend systems, and user-centered applications.');

  return (
    <div className="page-shell">
      <div className="container content-grid">
        <div className="content-panel">
          <span className="eyebrow">About</span>
          <h1>Professional profile</h1>
          <p>
            I am a full-stack developer and IT trainer with a strong interest in building practical applications that solve real user problems. My background in teaching helps me turn technical concepts into clear, understandable solutions while creating products that are both functional and easy to use.
          </p>
          <p>
            I work across frontend and backend development, with experience in building responsive interfaces, database-backed systems, and application workflows that support project goals. I enjoy combining maintainable code practices with thoughtful user experience design.
          </p>
          <div className="profile-points">
            <span>Practical programming knowledge</span>
            <span>Frontend and backend development</span>
            <span>Database design and SQL</span>
            <span>Application development</span>
            <span>Technical instruction and communication</span>
            <span>Problem-solving and continuous learning</span>
          </div>
        </div>

        <div className="content-panel accent-panel">
          <span className="eyebrow">Development philosophy</span>
          <h2>My Development Philosophy</h2>
          <p>
            I focus on building useful features, readable code, maintainable systems, and better user experiences. I believe good software should be practical, accessible, and easy to evolve as needs change.
          </p>
          <p>
            My goal is to create digital products that are clear to use, reliable in performance, and grounded in thoughtful engineering decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  usePageMeta('Skills', 'Skills and technology areas for Madhuri, including frontend, backend, databases, and AI-powered application development.');

  return (
    <div className="page-shell">
      <div className="container">
        <div className="section-head narrow-head">
          <div>
            <span className="eyebrow">Core strengths</span>
            <h1>Skills</h1>
          </div>
        </div>

        <div className="skill-grid">
          {skillGroups.map(({ title, icon: Icon, items }) => (
            <article key={title} className="skill-card">
              <div className="skill-icon-wrap">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ projects, loading, error }: { projects: Project[]; loading: boolean; error: string }) {
  usePageMeta('Projects', 'Project portfolio and case studies for Madhuri, including AI tools, communication apps, and business management systems.');

  return (
    <div className="page-shell">
      <div className="container">
        <div className="section-head narrow-head">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h1>Projects</h1>
          </div>
        </div>

        {loading ? (
          <div className="status-card">Loading projects...</div>
        ) : error ? (
          <div className="status-card error-card">{error}</div>
        ) : (
          <div className="project-grid full-width-grid">
            {projects.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="project-card">
                <div className="project-cover" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,14,20,0.3), rgba(97,50,200,0.4)), url(${project.cover_image})` }} aria-label={project.title} />
                <div className="project-card-body">
                  <span className="category-pill">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.short_description}</p>
                  <span className="read-more">
                    Read case study <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetailPage({ projects }: { projects: Project[] }) {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  usePageMeta(project ? project.title : 'Project', project ? project.short_description : 'Detailed project case study.');

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects/${slug}`);
        if (!response.ok) {
          throw new Error('Project not found');
        }
        const data: Project = await response.json();
        setProject(data);
      } catch (loadError) {
        const fallback = projects.find((item) => item.slug === slug);
        if (fallback) {
          setProject(fallback);
        } else {
          setError('This project is not available right now.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projects, slug]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="status-card">Loading case study...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return <NotFoundPage />;
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="page-shell case-study-page">
      <div className="container project-detail-shell">
        <Link to="/projects" className="inline-link back-link">
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        <header className="case-header">
          <div className="case-copy">
            <span className="eyebrow">{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.short_description}</p>
          </div>
          <div className="case-actions">
            {project.live_demo_url ? (
              <a href={project.live_demo_url} target="_blank" rel="noreferrer" className="primary-button">
                Visit Live Demo <ExternalLink size={16} />
              </a>
            ) : null}
            {project.github_url ? (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="secondary-button">
                View Source Code <GitBranch size={16} />
              </a>
            ) : null}
          </div>
        </header>

        <div className="cover-figure" style={{ backgroundImage: `linear-gradient(135deg, rgba(10,14,20,0.25), rgba(91,52,167,0.5)), url(${project.cover_image})` }}>
          <span>Project overview</span>
        </div>

        <div className="case-grid">
          <article className="case-panel">
            <h3>Project Overview</h3>
            <p>{project.full_description}</p>
          </article>
          <article className="case-panel">
            <h3>Problem Statement</h3>
            <p>{project.problem_statement}</p>
          </article>
        </div>

        <div className="case-grid three-up">
          <article className="case-panel">
            <h3>Objectives</h3>
            <ul>{project.objectives.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="case-panel">
            <h3>Target Users</h3>
            <p>{project.category}</p>
          </article>
          <article className="case-panel">
            <h3>Features</h3>
            <ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <div className="case-grid two-up">
          <article className="case-panel">
            <h3>Technologies Used</h3>
            <div className="tag-list">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </article>
          <article className="case-panel">
            <h3>Architecture Overview</h3>
            <p>{project.architecture}</p>
          </article>
        </div>

        <div className="case-grid two-up">
          <article className="case-panel">
            <h3>My Role and Contributions</h3>
            <p>{project.my_role}</p>
          </article>
          <article className="case-panel">
            <h3>Development Challenges</h3>
            <ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <div className="case-grid two-up">
          <article className="case-panel">
            <h3>Solutions and Technical Decisions</h3>
            <ul>{project.solutions.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="case-panel">
            <h3>Database Design</h3>
            <p>{project.architecture}</p>
          </article>
        </div>

        <article className="case-panel gallery-panel">
          <h3>Screenshot Gallery</h3>
          <div className="gallery-grid">
            {(project.screenshots && project.screenshots.length > 0 ? project.screenshots : [{ title: 'Project screenshot placeholder', url: project.cover_image, alt: `${project.title} placeholder` }]).map((image) => (
              <figure key={image.title} className="gallery-card">
                <img src={image.url} alt={image.alt} />
                <figcaption>{image.title}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        <div className="case-grid two-up">
          <article className="case-panel">
            <h3>Testing and Implementation Details</h3>
            <p>Core functionality and user flows were validated with a focus on usability, maintainable structure, and practical implementation details suitable for ongoing development.</p>
          </article>
          <article className="case-panel">
            <h3>Outcomes and Lessons Learned</h3>
            <ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <div className="case-grid two-up">
          <article className="case-panel">
            <h3>Future Improvements</h3>
            <ul>{project.future_improvements.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="case-panel">
            <h3>Project Summary</h3>
            <p>This case study shows how the project approach balances functional requirements, maintainability, and user-focused design while remaining open to future improvements.</p>
          </article>
        </div>

        <div className="case-footer">
          {previousProject ? (
            <Link to={`/projects/${previousProject.slug}`} className="secondary-button navigation-button">
              <ArrowLeft size={16} /> Previous
            </Link>
          ) : <span className="placeholder-button">Previous</span>}
          {nextProject ? (
            <Link to={`/projects/${nextProject.slug}`} className="secondary-button navigation-button">
              Next <ArrowRight size={16} />
            </Link>
          ) : <span className="placeholder-button">Next</span>}
        </div>
      </div>
    </div>
  );
}

function ExperiencePage() {
  usePageMeta('Experience', 'Experience overview for Madhuri as an IT Trainer and developer with practical problem-solving and communication skills.');

  return (
    <div className="page-shell">
      <div className="container">
        <div className="section-head narrow-head">
          <div>
            <span className="eyebrow">Professional experience</span>
            <h1>Experience</h1>
          </div>
        </div>

        <div className="timeline">
          {experienceItems.map((item) => (
            <article key={item.role} className="timeline-item">
              <div className="timeline-marker">
                <Briefcase size={18} />
              </div>
              <div className="timeline-content">
                <div className="experience-head">
                  <div>
                    <h3>{item.role}</h3>
                    <span className="experience-badge">{item.period}</span>
                  </div>
                </div>
                <p>{item.summary}</p>
                <details>
                  <summary>
                    View responsibilities <ChevronDown size={16} />
                  </summary>
                  <ul>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  usePageMeta('Contact', 'Contact Madhuri for project collaboration, development opportunities, or technical training enquiries.');

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('loading');
    setFeedback('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send message.');
      }

      setSubmitState('success');
      setFeedback(data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitState('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send message right now.');
    }
  };

  return (
    <div className="page-shell">
      <div className="container contact-grid">
        <section className="content-panel contact-panel">
          <span className="eyebrow">Contact</span>
          <h1>Let&apos;s build something useful</h1>
          <p>
            I am open to meaningful projects, software development conversations, and technical learning conversations. If you want to connect, send a message and I will get back to you.
          </p>
          <div className="contact-list">
            <a href={`mailto:${personal.email}`}>
              <Mail size={18} /> {personal.email}
            </a>
            <a href={`tel:${personal.phone}`}>
              <Phone size={18} /> {personal.phone}
            </a>
            <a href={personal.githubUrl} target="_blank" rel="noreferrer">
              <GitBranch size={18} /> {personal.githubUrl}
            </a>
          </div>
        </section>

        <section className="content-panel form-panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" value={formData.name} onChange={(event) => handleChange('name', event.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={formData.email} onChange={(event) => handleChange('email', event.target.value)} required />
            </label>
            <label>
              Subject
              <input type="text" value={formData.subject} onChange={(event) => handleChange('subject', event.target.value)} required />
            </label>
            <label>
              Message
              <textarea value={formData.message} onChange={(event) => handleChange('message', event.target.value)} rows={6} required />
            </label>

            <button type="submit" className="primary-button submit-button" disabled={submitState === 'loading'}>
              {submitState === 'loading' ? 'Sending...' : 'Submit'}
            </button>

            {feedback ? (
              <p className={`form-feedback ${submitState === 'success' ? 'success' : 'error'}`}>
                {feedback}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}

function NotFoundPage() {
  usePageMeta('Page not found', 'The page you requested could not be found.');

  return (
    <div className="page-shell not-found-shell">
      <div className="container not-found-card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="primary-button">
          Return home
        </Link>
      </div>
    </div>
  );
}

export default App;
