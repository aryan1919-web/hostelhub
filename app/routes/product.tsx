import type { Route } from "./+types/product";
import { Link } from "react-router";
import {
  ShoppingCart,
  Star,
  CheckCircle,
  Shield,
  Wifi,
  Coffee,
  Dumbbell,
  Utensils,
  Wind,
  ChevronRight,
  ArrowRight,
  Truck,
  BookOpen,
  Zap,
  Clock,
  Heart,
  BadgeCheck,
} from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Badge } from "~/components/ui/badge/badge";
import styles from "./product.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HostelHub Pro Room Plan — Premium Student Accommodation" },
    {
      name: "description",
      content:
        "HostelHub Pro Room Plan: double-occupancy premium hostel with AC, 3 meals, 100 Mbps Wi-Fi, gym, laundry — all for ₹12,000/month.",
    },
  ];
}

/* ── Data ── */

const FEATURES = [
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    desc: "100 Mbps dedicated fibre broadband in every room and common area, unlimited data.",
  },
  {
    icon: Utensils,
    title: "3-Meal Plan",
    desc: "Nutritious breakfast, lunch, and dinner prepared by professional chefs with rotating menus.",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    desc: "CCTV surveillance, biometric entry gates, and on-site security staff around the clock.",
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    desc: "Individual 1.5-ton AC units with personal temperature controls in every room.",
  },
  {
    icon: Dumbbell,
    title: "Gym & Recreation",
    desc: "Fully equipped gym, TT tables, carrom, and indoor games for a balanced lifestyle.",
  },
  {
    icon: Coffee,
    title: "Common Lounge",
    desc: "Comfortable shared spaces with TV, vending machines, and cosy study nooks.",
  },
  {
    icon: BookOpen,
    title: "Study Library",
    desc: "Quiet reading rooms and a well-stocked reference library, open until midnight.",
  },
  {
    icon: Zap,
    title: "Smart App Management",
    desc: "HostelHub app for complaints, leave, fees, notices, and visitor management — all digital.",
  },
] as const;

const SPECS = [
  { label: "Room Type", value: "Double Occupancy (Shared)" },
  { label: "Room Size", value: "180 sq. ft. per occupant" },
  { label: "Bed Type", value: "Single — orthopedic mattress" },
  { label: "Study Area", value: "Individual desk & ergonomic chair" },
  { label: "Storage", value: "Full wardrobe + under-bed drawers" },
  { label: "Bathroom", value: "Attached — 1 per 2 residents" },
  { label: "Internet", value: "100 Mbps Wi-Fi — unlimited" },
  { label: "Meals", value: "Breakfast, Lunch & Dinner included" },
  { label: "Laundry", value: "Twice per week, included in plan" },
  { label: "Housekeeping", value: "Daily room cleaning service" },
  { label: "AC / Heating", value: "1.5-ton split AC in every room" },
  { label: "Power Backup", value: "24/7 inverter + generator backup" },
] as const;

const PLANS = [
  {
    name: "Standard Room",
    subtitle: "Triple occupancy, shared amenities",
    price: "₹8,500",
    features: ["3 meals / day", "Shared Wi-Fi", "Shared bathroom", "Basic study desk", "Common area access"],
    popular: false,
  },
  {
    name: "Pro Room",
    subtitle: "Double occupancy, all amenities",
    price: "₹12,000",
    features: [
      "3 meals / day",
      "100 Mbps Wi-Fi",
      "Attached bathroom",
      "AC room",
      "Gym access",
      "Laundry 2×/week",
      "HostelHub app access",
    ],
    popular: true,
  },
  {
    name: "Premium Suite",
    subtitle: "Single occupancy, exclusive perks",
    price: "₹18,000",
    features: [
      "3 meals + snacks",
      "Dedicated 100 Mbps Wi-Fi",
      "Private bathroom",
      "AC + air purifier",
      "Priority support",
      "Daily laundry",
      "Premium app features",
    ],
    popular: false,
  },
] as const;

const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "B.Tech, Delhi University",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
    body: "The rooms are incredibly spacious and the HostelHub app makes everything effortless. I raised a plumbing complaint at 11 PM and it was fixed by morning. Genuinely the best hostel experience I have had.",
    date: "Jan 2026",
  },
  {
    name: "Aakash Mehta",
    role: "MBA, IIM Ahmedabad",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
    body: "Best value-for-money accommodation in the city. Three proper meals a day, blazing-fast Wi-Fi for online lectures, and a gym I actually use — hard to beat at this price point.",
    date: "Dec 2025",
  },
  {
    name: "Riya Desai",
    role: "MBBS, AIIMS Delhi",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop",
    body: "Parents love the security — CCTV, biometric entry, and visitor approval via the app. I love that fee tracking, leave applications, and notices are all in one place. It just works.",
    date: "Nov 2025",
  },
  {
    name: "Vikram Nair",
    role: "BCA, Pune University",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop",
    body: "As a tech student, the HostelHub app is the killer feature. Digital leave, instant notices, fee payment history, lost-and-found — everything is streamlined. Highly recommended!",
    date: "Oct 2025",
  },
] as const;

const RATING_BARS: [string, number][] = [
  ["5 stars", 78],
  ["4 stars", 16],
  ["3 stars", 4],
  ["2 stars", 1],
  ["1 star", 1],
];

/* ── Components ── */

function StarRating({ rating }: { rating: number }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={i < rating ? styles.starIcon : styles.starIconEmpty} />
      ))}
    </span>
  );
}

/* ── Page ── */

export default function ProductPage() {
  return (
    <div className={styles.page}>
      <Navigation userRole="public" />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className={`${styles.container} ${styles.breadcrumbInner}`}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight className={styles.breadcrumbSep} />
          <Link to="/pricing" className={styles.breadcrumbLink}>Plans</Link>
          <ChevronRight className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>Pro Room Plan</span>
        </div>
      </nav>

      {/* ── Hero / Product Detail ── */}
      <section className={styles.heroProduct}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImageWrap}>
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&fit=crop"
                  alt="HostelHub Pro Room — bright, modern shared room"
                  className={styles.mainImage}
                />
                <Badge className={styles.imageBadge}>Most Popular</Badge>
              </div>
              <div className={styles.thumbRow}>
                <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&fit=crop" alt="Room interior" className={styles.thumb} />
                <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200&fit=crop" alt="Study desk" className={styles.thumb} />
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&fit=crop" alt="Common area" className={styles.thumb} />
                <img src="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&fit=crop" alt="Dining hall" className={styles.thumb} />
              </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
              <div className={styles.infoBadges}>
                <Badge variant="secondary">HostelHub Verified</Badge>
                <div className={styles.ratingInline}>
                  <StarRating rating={5} />
                  <span className={styles.ratingLabel}>4.8 (128 reviews)</span>
                </div>
              </div>

              <h1 className={styles.productTitle}>HostelHub Pro Room Plan</h1>
              <p className={styles.productSubtitle}>
                Premium double-occupancy student accommodation with smart digital management.
              </p>

              <div className={styles.priceBox}>
                <div className={styles.priceRow}>
                  <span className={styles.priceValue}>₹12,000</span>
                  <span className={styles.pricePeriod}>/month per student</span>
                </div>
                <p className={styles.priceNote}>
                  <CheckCircle className={styles.priceNoteIcon} />
                  All-inclusive · GST included · No hidden charges
                </p>
              </div>

              <p className={styles.descriptionText}>
                The <strong>Pro Room Plan</strong> offers double-occupancy rooms in a fully managed, secure hostel
                environment. Enjoy meals, laundry, high-speed Wi-Fi, air conditioning, and seamless management
                through the HostelHub app — all under one roof at one flat price. Perfect for students who want
                comfort, safety, and productivity without the hassle.
              </p>

              <div className={styles.highlightsList}>
                {["3 Meals Included", "AC Room", "100 Mbps Wi-Fi", "Laundry 2×/week", "24/7 Security", "Gym Access"].map(
                  (item) => (
                    <div key={item} className={styles.highlightChip}>
                      <CheckCircle className={styles.highlightChipIcon} />
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className={styles.ctaStack}>
                <div className={styles.ctaRow}>
                  <Button size="lg" className={styles.ctaPrimary} asChild>
                    <Link to="/login">
                      <ShoppingCart size={18} />
                      Book Now — Free Admission
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className={styles.ctaSecondary} asChild>
                    <Link to="/login">
                      <Heart size={16} />
                      Waitlist
                    </Link>
                  </Button>
                </div>
                <div className={styles.ctaFootnote}>
                  <span className={styles.ctaFootnoteItem}><CheckCircle className={styles.ctaFootnoteIcon} /> Free to register</span>
                  <span className={styles.ctaFootnoteItem}><CheckCircle className={styles.ctaFootnoteIcon} /> Cancel anytime</span>
                  <span className={styles.ctaFootnoteItem}><CheckCircle className={styles.ctaFootnoteIcon} /> Instant confirmation</span>
                </div>
              </div>

              <div className={styles.trustBar}>
                <span className={styles.trustItem}><Shield className={styles.trustIcon} /> Verified Hostel</span>
                <span className={styles.trustItem}><Truck className={styles.trustIcon} /> Move-in Support</span>
                <span className={styles.trustItem}><Clock className={styles.trustIcon} /> 24/7 Help Desk</span>
                <span className={styles.trustItem}><BadgeCheck className={styles.trustIcon} /> 50K+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>What&#39;s Included</span>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <p className={styles.sectionDesc}>
              Everything a student needs for comfortable, productive, and connected hostel living.
            </p>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featCard}>
                <div className={styles.featIconWrap}>
                  <f.icon className={styles.featIcon} />
                </div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Details</span>
            <h2 className={styles.sectionTitle}>Product Specifications</h2>
            <p className={styles.sectionDesc}>
              Full breakdown of what the Pro Room Plan includes at ₹12,000/month.
            </p>
          </div>
          <div className={styles.specsWrap}>
            {SPECS.map((s) => (
              <div key={s.label} className={styles.specRow}>
                <span className={styles.specLabel}>{s.label}</span>
                <span className={styles.specValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans Compare ── */}
      <section className={`${styles.section} ${styles.sectionAccent}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Choose Your Plan</span>
            <h2 className={styles.sectionTitle}>Room Plan Options</h2>
            <p className={styles.sectionDesc}>
              Compare all accommodation tiers and pick the one that fits your needs and budget.
            </p>
          </div>
          <div className={styles.plansGrid}>
            {PLANS.map((p) => (
              <div key={p.name} className={`${styles.planCard} ${p.popular ? styles.planPopular : ""}`}>
                {p.popular && <div className={styles.popularBadge}>Best Value</div>}
                <h3 className={styles.planName}>{p.name}</h3>
                <p className={styles.planSubtitle}>{p.subtitle}</p>
                <div className={styles.planPrice}>
                  <span className={styles.planPriceVal}>{p.price}</span>
                  <span className={styles.planPricePer}>/month</span>
                </div>
                <hr className={styles.planDivider} />
                <ul className={styles.planFeatures}>
                  {p.features.map((f) => (
                    <li key={f} className={styles.planFeatureRow}>
                      <CheckCircle className={styles.planCheckIcon} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant={p.popular ? "default" : "outline"} className={styles.planCta} asChild>
                  <Link to="/login">Book {p.name}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Social Proof</span>
            <h2 className={styles.sectionTitle}>Student Reviews</h2>
            <p className={styles.sectionDesc}>
              Hear from the students who call HostelHub their home away from home.
            </p>
          </div>

          <div className={styles.reviewSummary}>
            <div className={styles.reviewBig}>
              <span className={styles.reviewBigNumber}>4.8</span>
              <StarRating rating={5} />
              <span className={styles.reviewBigLabel}>128 verified reviews</span>
            </div>
            <div className={styles.barChart}>
              {RATING_BARS.map(([label, pct]) => (
                <div key={label} className={styles.barRow}>
                  <span className={styles.barLabel}>{label}</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.barPct}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reviewsGrid}>
            {REVIEWS.map((r) => (
              <div key={r.name} className={styles.reviewCard}>
                <div className={styles.reviewHead}>
                  <img src={r.avatar} alt={r.name} className={styles.reviewAvatar} />
                  <div className={styles.reviewMeta}>
                    <p className={styles.reviewerName}>{r.name}</p>
                    <p className={styles.reviewerRole}>{r.role}</p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className={styles.reviewBody}>&ldquo;{r.body}&rdquo;</p>
                <p className={styles.reviewDate}>{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <div className={styles.ctaBannerInner}>
            <div className={styles.ctaBannerText}>
              <h2 className={styles.ctaBannerTitle}>Ready to upgrade your student living?</h2>
              <p className={styles.ctaBannerDesc}>
                Join 50,000+ students already enjoying the HostelHub Pro Room Plan.
                Book now and get your first month with free admission.
              </p>
            </div>
            <div className={styles.ctaBannerActions}>
              <Button size="lg" className={styles.ctaBannerPrimary} asChild>
                <Link to="/login">
                  <ShoppingCart size={18} />
                  Book Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={styles.ctaBannerSecondary} asChild>
                <Link to="/login">
                  Add to Waitlist
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerLogo}>HostelHub</h3>
              <p className={styles.footerTagline}>Simplifying Student Living — One Hostel at a Time.</p>
            </div>
            <div className={styles.footerColumns}>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Product</h4>
                <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
                <Link to="/product" className={styles.footerLink}>Pro Room Plan</Link>
                <Link to="/student/dashboard" className={styles.footerLink}>Dashboard</Link>
              </div>
              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Support</h4>
                <Link to="/student/emergency" className={styles.footerLink}>Help Center</Link>
                <Link to="/student/rules" className={styles.footerLink}>Rules</Link>
                <Link to="/student/complaints" className={styles.footerLink}>Complaints</Link>
              </div>
            </div>
          </div>
          <p className={styles.footerCopy}>© 2026 HostelHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
