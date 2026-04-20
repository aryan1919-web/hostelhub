import type { Route } from "./+types/splash";
import { Link } from "react-router";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Star,
  Users,
  Building2,
  Award,
} from "lucide-react";
import { Button } from "~/components/ui/button/button";
import styles from "./splash.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HostelHub — Smarter Hostel Living Starts Here" },
    {
      name: "description",
      content:
        "HostelHub is the leading student hostel management platform. Smarter living, seamless management, happier students.",
    },
  ];
}

/* ── Data ── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "#contact" },
] as const;

const HERO_STATS = [
  { icon: Users, value: "50,000+", label: "Active Students" },
  { icon: Building2, value: "1,200+", label: "Hostels Managed" },
  { icon: Star, value: "4.8 / 5", label: "Average Rating" },
  { icon: Award, value: "98%", label: "Satisfaction Rate" },
] as const;

const PORTFOLIO_ITEMS = [
  {
    title: "Student Dashboard",
    category: "UI Design",
    desc: "End-to-end complaint management, notices, and fee tracking in a unified interface.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&fit=crop",
    link: "/student/dashboard",
  },
  {
    title: "Warden Control Panel",
    category: "Dashboard",
    desc: "Comprehensive warden dashboard for room allocation, attendance, and student oversight.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&fit=crop",
    link: "/warden/dashboard",
  },
  {
    title: "Meal Management",
    category: "Feature Module",
    desc: "Weekly meal planner, dietary preferences tracking, and mess feedback system.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=640&fit=crop",
    link: "/student/meals",
  },
  {
    title: "Events & Activities",
    category: "Social Feature",
    desc: "Hostel events calendar with RSVP, push reminders, and photo gallery.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&fit=crop",
    link: "/student/events",
  },
] as const;

const TECH_TAGS = [
  "React 19",
  "TypeScript",
  "UI/UX Design",
  "Responsive Design",
  "CSS Modules",
  "Student-First",
] as const;

/* ── Page ── */

export default function SplashPage() {
  return (
    <div className={styles.page}>
      {/* ─ Header ─ */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>H</span>
            <span className={styles.logoText}>HostelHub</span>
          </div>
          <nav className={styles.nav}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className={styles.navLink}>{l.label}</a>
            ))}
          </nav>
          <div className={styles.headerButtons}>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─ Hero ─ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroPill}>
            <Star className={styles.heroPillIcon} />
            <span>Rated #1 Student Hostel Platform 2026</span>
          </div>

          <h1 className={styles.heroTitle}>
            Smarter Hostel Living
            <br />
            <span className={styles.heroAccent}>Starts Here.</span>
          </h1>

          <p className={styles.heroDesc}>
            HostelHub empowers students, wardens, and hostel administrators with an all-in-one
            digital platform — managing everything from complaints to meals, leave to laundry,
            fees to events.
          </p>

          <div className={styles.heroActions}>
            <Button size="lg" className={styles.heroBtnPrimary} asChild>
              <a href="#portfolio">
                View My Work
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button size="lg" variant="outline" className={styles.heroBtnSecondary} asChild>
              <a href="#contact">
                Contact Me
                <Mail size={16} />
              </a>
            </Button>
          </div>

          <div className={styles.statsRow}>
            {HERO_STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <s.icon className={styles.statIcon} />
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ─ About ─ */}
      <section className={styles.sectionPad} id="about">
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImgWrap}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=640&fit=crop"
                alt="Team collaborating on HostelHub"
                className={styles.aboutImg}
              />
              <div className={styles.aboutImgDecor} />
            </div>

            <div className={styles.aboutBody}>
              <span className={styles.sectionEyebrow}>About HostelHub</span>
              <h2 className={styles.aboutTitle}>Built for Students, by People Who Understand</h2>
              <p className={styles.aboutPara}>
                HostelHub was born from firsthand frustration with outdated hostel management systems.
                We set out to build a platform that genuinely helps students and management teams
                communicate, collaborate, and thrive — without paper forms, notice boards, or guesswork.
              </p>
              <p className={styles.aboutPara}>
                From raising a simple maintenance complaint to tracking fee payments, managing visitor
                approvals, and browsing meal menus — HostelHub digitises every touchpoint of the
                student residential experience with a clean, intuitive interface.
              </p>
              <div className={styles.techTags}>
                {TECH_TAGS.map((tag) => (
                  <span key={tag} className={styles.techTag}>{tag}</span>
                ))}
              </div>
              <Button asChild>
                <Link to="/student/dashboard">
                  Explore the App <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─ Portfolio ─ */}
      <section className={`${styles.sectionPad} ${styles.sectionAlt}`} id="portfolio">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Portfolio</span>
            <h2 className={styles.sectionTitle}>Featured Modules</h2>
            <p className={styles.sectionSubtitle}>
              Key features built into HostelHub — each designed for accessibility, clarity, and
              real student needs.
            </p>
          </div>

          <div className={styles.portfolioGrid}>
            {PORTFOLIO_ITEMS.map((item) => (
              <div key={item.title} className={styles.portfolioCard}>
                <div className={styles.portfolioImgWrap}>
                  <img src={item.image} alt={item.title} className={styles.portfolioImg} />
                  <div className={styles.portfolioOverlay}>
                    <Link to={item.link} className={styles.portfolioViewLink}>
                      <ExternalLink size={16} />
                      View Module
                    </Link>
                  </div>
                </div>
                <div className={styles.portfolioCardInfo}>
                  <span className={styles.portfolioCategory}>{item.category}</span>
                  <h3 className={styles.portfolioTitle}>{item.title}</h3>
                  <p className={styles.portfolioDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.portfolioCta}>
            <Button size="lg" variant="outline" asChild>
              <Link to="/student/dashboard">
                Explore All Features <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─ CTA Strip ─ */}
      <section className={styles.ctaStrip}>
        <div className={styles.container}>
          <div className={styles.ctaStripInner}>
            <h2 className={styles.ctaStripTitle}>Ready to transform your hostel experience?</h2>
            <p className={styles.ctaStripDesc}>
              Join thousands of students and wardens who have already made the switch to smarter
              hostel management.
            </p>
            <div className={styles.ctaStripActions}>
              <Button size="lg" className={styles.ctaStripPrimary} asChild>
                <Link to="/login">
                  Get Started Free <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={styles.ctaStripOutline} asChild>
                <Link to="/product">View Pro Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─ Contact ─ */}
      <section className={styles.sectionPad} id="contact">
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <span className={styles.sectionEyebrow}>Get In Touch</span>
              <h2 className={styles.contactTitle}>Let&#39;s Work Together</h2>
              <p className={styles.contactPara}>
                Interested in HostelHub for your institution? Have feedback or want to collaborate?
                We would love to hear from you.
              </p>
              <div className={styles.contactList}>
                <div className={styles.contactRow}>
                  <Mail className={styles.contactRowIcon} />
                  <span>hello@hostelhub.in</span>
                </div>
                <div className={styles.contactRow}>
                  <Phone className={styles.contactRowIcon} />
                  <span>+91 98765 43210</span>
                </div>
                <div className={styles.contactRow}>
                  <MapPin className={styles.contactRowIcon} />
                  <span>Bangalore, Karnataka, India</span>
                </div>
              </div>
              <div className={styles.socials}>
                <a href="#" className={styles.socialCircle} aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" className={styles.socialCircle} aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" className={styles.socialCircle} aria-label="GitHub"><Github size={20} /></a>
              </div>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formCardTitle}>Send Us a Message</h3>
              <div className={styles.formFields}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Your Name</label>
                  <input type="text" placeholder="e.g. Priya Sharma" className={styles.fieldInput} />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email Address</label>
                  <input type="email" placeholder="you@example.com" className={styles.fieldInput} />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Message</label>
                  <textarea placeholder="Tell us how we can help..." className={styles.fieldTextarea} rows={4} />
                </div>
                <Button size="lg" className={styles.formSubmit}>
                  Send Message <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─ Footer ─ */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.footerMark}>H</span>
              <span className={styles.footerBrandText}>HostelHub</span>
            </div>
            <p className={styles.footerTagline}>Simplifying Student Living — One Hostel at a Time.</p>
            <div className={styles.footerLinks}>
              <Link to="/" className={styles.footerLink}>Home</Link>
              <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
              <Link to="/product" className={styles.footerLink}>Pro Plan</Link>
              <Link to="/login" className={styles.footerLink}>Login</Link>
            </div>
            <p className={styles.footerCopy}>© 2026 HostelHub. All rights reserved. Built with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
