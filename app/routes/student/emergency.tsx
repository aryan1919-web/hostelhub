import type { Route } from "./+types/emergency";
import { Phone, Mail, Clock, AlertTriangle } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { mockEmergencyContacts } from "~/data/mock-data";
import styles from "./emergency.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Emergency Contacts - HostelHub" },
    {
      name: "description",
      content: "Important emergency contact numbers and information",
    },
  ];
}

export default function Emergency() {
  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Emergency Contacts</h1>
          <p className={styles.subtitle}>Quick access to important emergency contact numbers</p>
        </div>

        <div className={styles.alertBanner}>
          <AlertTriangle className={styles.alertIcon} />
          <p className={styles.alertText}>
            In case of emergency, call the appropriate number immediately. For life-threatening situations, dial 108
            (Ambulance) or 100 (Police).
          </p>
        </div>

        <div className={styles.contactsGrid}>
          {mockEmergencyContacts.map((contact) => (
            <div key={contact.id} className={styles.contactCard}>
              <div className={styles.contactHeader}>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactName}>{contact.name}</h3>
                  <p className={styles.contactDesignation}>{contact.designation}</p>
                </div>
                <span
                  className={`${styles.categoryBadge} ${
                    contact.category === "medical"
                      ? styles.badgeMedical
                      : contact.category === "security"
                        ? styles.badgeSecurity
                        : contact.category === "management"
                          ? styles.badgeManagement
                          : styles.badgeMaintenance
                  }`}
                >
                  {contact.category}
                </span>
              </div>

              <div className={styles.contactDetails}>
                <div className={styles.contactDetail}>
                  <Phone className={styles.contactIcon} />
                  <a href={`tel:${contact.phone}`} className={styles.contactLink}>
                    {contact.phone}
                  </a>
                </div>
                {contact.email && (
                  <div className={styles.contactDetail}>
                    <Mail className={styles.contactIcon} />
                    <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>

              {contact.available24x7 && (
                <div className={styles.availability}>
                  <div className={styles.availabilityDot} />
                  <Clock style={{ width: "14px", height: "14px", color: "var(--color-neutral-10)" }} />
                  <span className={styles.availabilityText}>Available 24/7</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
