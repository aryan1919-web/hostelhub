import type { Route } from "./+types/home";
import { Link } from "react-router";
import {
  Bell,
  FileText,
  DollarSign,
  BookOpen,
  Phone,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  MessageSquare,
  Star,
  Zap,
} from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HostelHub - Simplifying Student Living" },
    {
      name: "description",
      content:
        "A comprehensive hostel and PG management platform for students, wardens, and owners. Manage complaints, notices, fees, and more in one place.",
    },
  ];
}

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student, Delhi University",
    content:
      "HostelHub has completely transformed how I manage my hostel experience. Raising complaints is now effortless and I get quick responses!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Rajesh Kumar",
    role: "Hostel Warden",
    content:
      "Managing 500+ students was a nightmare before HostelHub. Now I can track complaints, post notices, and manage fees all from one dashboard.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    name: "Anita Desai",
    role: "PG Owner, Bangalore",
    content:
      "The best investment I made for my PG. Tenants are happier, communication is clearer, and my management overhead has reduced by 60%.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

const stats = [
  { value: "50,000+", label: "Active Students" },
  { value: "1,200+", label: "Hostels & PGs" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation userRole="public" />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient} />
          <div className={styles.heroPattern} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Zap className={styles.heroBadgeIcon} />
            <span>Trusted by 1,200+ Hostels Nationwide</span>
          </div>
          <h1 className={styles.title}>HostelHub</h1>
          <p className={styles.tagline}>Simplifying Student Living</p>
          <p className={styles.description}>
            The all-in-one platform that transforms hostel and PG management. Streamline complaints, automate notices,
            track fees, and enhance communication—all in one powerful, intuitive interface.
          </p>
          <div className={styles.ctaButtons}>
            <Button size="lg" asChild>
              <Link to="/login">
                Get Started Free
                <ArrowRight className={styles.ctaIcon} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
          <div className={styles.heroStats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Features</span>
            <h2 className={styles.sectionTitle}>Everything You Need to Manage Smarter</h2>
            <p className={styles.sectionSubtitle}>
              Powerful, purpose-built features designed to make hostel management effortless for students, wardens, and
              owners alike.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <FileText className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Smart Complaint Management</h3>
              <p className={styles.featureDescription}>
                Raise, track, and resolve maintenance complaints with real-time status updates. AI-powered
                categorization ensures issues reach the right person instantly.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Bell className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Instant Notices & Alerts</h3>
              <p className={styles.featureDescription}>
                Push important announcements directly to students. Pin critical notices, schedule posts, and ensure no
                one misses vital information.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <DollarSign className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Transparent Fee Tracking</h3>
              <p className={styles.featureDescription}>
                Crystal-clear fee breakdowns, payment history, and automated reminders. Students always know what they
                owe and when it is due.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <BookOpen className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Digital Rules Repository</h3>
              <p className={styles.featureDescription}>
                Centralized, searchable hostel rules and guidelines. Always accessible, always up-to-date, reducing
                disputes and confusion.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Phone className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Emergency Contact Directory</h3>
              <p className={styles.featureDescription}>
                One-tap access to emergency contacts—medical, security, and management. Critical information when every
                second counts.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <MessageSquare className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Seamless Communication</h3>
              <p className={styles.featureDescription}>
                Direct messaging between students and management. Structured conversations replace chaotic WhatsApp
                groups with organized threads.
              </p>
              <Link to="/login" className={styles.featureLink}>
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>How It Works</span>
            <h2 className={styles.sectionTitle}>Get Started in Minutes</h2>
            <p className={styles.sectionSubtitle}>
              Simple setup, powerful results. Here is how HostelHub transforms your hostel management.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Sign Up & Setup</h3>
              <p className={styles.stepDescription}>
                Create your account in seconds. Add your hostel or PG details and invite your team members.
              </p>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Onboard Residents</h3>
              <p className={styles.stepDescription}>
                Invite students via email or share a join link. They get instant access to all features.
              </p>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Manage Everything</h3>
              <p className={styles.stepDescription}>
                Post notices, handle complaints, track fees—all from your centralized dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <div className={styles.benefitsText}>
              <span className={styles.sectionLabel}>Why HostelHub?</span>
              <h2 className={styles.sectionTitle}>Built for Everyone in the Ecosystem</h2>
              <p className={styles.benefitsDescription}>
                Whether you are a student looking for hassle-free living, a warden managing operations, or an owner
                overseeing multiple properties—HostelHub adapts to your needs.
              </p>

              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <CheckCircle className={styles.benefitIcon} />
                  <div>
                    <h4 className={styles.benefitItemTitle}>Intuitive Interface</h4>
                    <p className={styles.benefitItemText}>No training needed. Start using immediately.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <Clock className={styles.benefitIcon} />
                  <div>
                    <h4 className={styles.benefitItemTitle}>Real-Time Updates</h4>
                    <p className={styles.benefitItemText}>Instant notifications keep everyone informed.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <Users className={styles.benefitIcon} />
                  <div>
                    <h4 className={styles.benefitItemTitle}>Role-Based Access</h4>
                    <p className={styles.benefitItemText}>Right information to the right people.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <Shield className={styles.benefitIcon} />
                  <div>
                    <h4 className={styles.benefitItemTitle}>Enterprise Security</h4>
                    <p className={styles.benefitItemText}>Bank-grade encryption protects your data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.benefitsVisual}>
              <div className={styles.benefitsCard}>
                <Building2 className={styles.benefitsCardIcon} />
                <h3 className={styles.benefitsCardTitle}>For Hostels & PGs</h3>
                <ul className={styles.benefitsCardList}>
                  <li>Centralized management dashboard</li>
                  <li>Automated fee reminders</li>
                  <li>Complaint tracking & resolution</li>
                  <li>Digital notice board</li>
                  <li>Multi-property support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Testimonials</span>
            <h2 className={styles.sectionTitle}>Loved by Thousands</h2>
            <p className={styles.sectionSubtitle}>
              Do not just take our word for it. Here is what our users have to say about HostelHub.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.avatar} alt={testimonial.name} className={styles.testimonialAvatar} />
                  <div>
                    <p className={styles.testimonialName}>{testimonial.name}</p>
                    <p className={styles.testimonialRole}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Hostel Management?</h2>
            <p className={styles.ctaDescription}>
              Join over 1,200 hostels and PGs already using HostelHub. Start your free trial today—no credit card
              required.
            </p>
            <div className={styles.ctaActions}>
              <Button size="lg" asChild>
                <Link to="/login">
                  Start Free Trial
                  <ArrowRight className={styles.ctaIcon} />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/pricing">Compare Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerLogo}>HostelHub</h3>
              <p className={styles.footerTagline}>Simplifying Student Living</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerLinkGroup}>
                <h4 className={styles.footerLinkTitle}>Product</h4>
                <Link to="/pricing" className={styles.footerLink}>
                  Pricing
                </Link>
                <Link to="/login" className={styles.footerLink}>
                  Login
                </Link>
              </div>
              <div className={styles.footerLinkGroup}>
                <h4 className={styles.footerLinkTitle}>Support</h4>
                <Link to="/student/emergency" className={styles.footerLink}>
                  Help Center
                </Link>
                <Link to="/student/rules" className={styles.footerLink}>
                  Documentation
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>© 2025 HostelHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
