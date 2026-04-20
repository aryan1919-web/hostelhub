import type { Route } from "./+types/pricing";
import { Link } from "react-router";
import { Check, X } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import styles from "./pricing.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing - HostelHub" },
    {
      name: "description",
      content: "Choose the perfect plan for your hostel or PG. Free for students, affordable plans for management.",
    },
  ];
}

export default function Pricing() {
  return (
    <div className={styles.container}>
      <Navigation userRole="public" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Simple, Transparent Pricing</h1>
          <p className={styles.subtitle}>
            Choose the plan that fits your needs. Always free for students, flexible plans for hostels and PGs.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Student</h3>
            <p className={styles.planDescription}>Perfect for students residing in hostels or PGs</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>Free</span>
            </div>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Raise and track complaints</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>View notices and announcements</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Track fee payments</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Access rules and guidelines</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Emergency contact directory</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>

          <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
            <span className={styles.popularBadge}>Most Popular</span>
            <h3 className={styles.planName}>Basic</h3>
            <p className={styles.planDescription}>Ideal for small hostels and PGs (up to 50 residents)</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>
                ₹2,999
                <span className={styles.pricePeriod}>/month</span>
              </span>
            </div>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Up to 50 student accounts</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Complaint management system</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Notice board management</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Fee tracking and reports</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Email notifications</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Basic analytics</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/login">Start Free Trial</Link>
            </Button>
          </div>

          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Pro</h3>
            <p className={styles.planDescription}>For medium-sized hostels (up to 150 residents)</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>
                ₹5,999
                <span className={styles.pricePeriod}>/month</span>
              </span>
            </div>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Up to 150 student accounts</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>All Basic features</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Advanced analytics dashboard</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>SMS notifications</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Custom branding</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Priority support</span>
              </li>
            </ul>
            <Button variant="outline" asChild>
              <Link to="/login">Start Free Trial</Link>
            </Button>
          </div>

          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Enterprise</h3>
            <p className={styles.planDescription}>For large hostels and PG chains (unlimited residents)</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>Custom</span>
            </div>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Unlimited student accounts</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>All Pro features</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Multi-property management</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>API access</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Dedicated account manager</span>
              </li>
              <li className={styles.featureItem}>
                <Check className={styles.featureIcon} />
                <span>Custom integrations</span>
              </li>
            </ul>
            <Button variant="outline" asChild>
              <Link to="/login">Contact Sales</Link>
            </Button>
          </div>
        </div>

        <div className={styles.comparison}>
          <h2 className={styles.comparisonTitle}>Feature Comparison</h2>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Student</th>
                <th>Basic</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Student Accounts</td>
                <td>1</td>
                <td>Up to 50</td>
                <td>Up to 150</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Complaint Management</td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>Notice Board</td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>Fee Tracking</td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>Email Notifications</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>SMS Notifications</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>Analytics Dashboard</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>Basic</td>
                <td>Advanced</td>
                <td>Advanced</td>
              </tr>
              <tr>
                <td>Custom Branding</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>Multi-Property</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
              <tr>
                <td>API Access</td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <X className={styles.crossIcon} />
                </td>
                <td>
                  <Check className={styles.checkIcon} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
