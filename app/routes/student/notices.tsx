import type { Route } from "./+types/notices";
import { Calendar, User, Pin } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { mockNotices } from "~/data/mock-data";
import styles from "./notices.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notices - HostelHub" },
    {
      name: "description",
      content: "View all hostel notices and announcements",
    },
  ];
}

export default function Notices() {
  const pinnedNotices = mockNotices.filter((n) => n.isPinned);
  const regularNotices = mockNotices.filter((n) => !n.isPinned);

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Notices & Announcements</h1>
          <p className={styles.subtitle}>Stay updated with important information and announcements</p>
        </div>

        <div className={styles.noticesList}>
          {pinnedNotices.map((notice) => (
            <div key={notice.id} className={`${styles.noticeCard} ${styles.pinnedCard}`}>
              <div className={styles.noticeHeader}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
                <div className={styles.badges}>
                  <span className={styles.badgePinned}>
                    <Pin style={{ width: "12px", height: "12px", display: "inline", marginRight: "4px" }} />
                    Pinned
                  </span>
                  <span
                    className={`${styles.badge} ${
                      notice.category === "urgent"
                        ? styles.badgeUrgent
                        : notice.category === "fee"
                          ? styles.badgeFee
                          : notice.category === "event"
                            ? styles.badgeEvent
                            : styles.badgeGeneral
                    }`}
                  >
                    {notice.category}
                  </span>
                </div>
              </div>
              <p className={styles.noticeContent}>{notice.content}</p>
              <div className={styles.noticeMeta}>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>
                    {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>{notice.publishedBy}</span>
                </div>
              </div>
            </div>
          ))}

          {regularNotices.map((notice) => (
            <div key={notice.id} className={styles.noticeCard}>
              <div className={styles.noticeHeader}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
                <div className={styles.badges}>
                  <span
                    className={`${styles.badge} ${
                      notice.category === "urgent"
                        ? styles.badgeUrgent
                        : notice.category === "fee"
                          ? styles.badgeFee
                          : notice.category === "event"
                            ? styles.badgeEvent
                            : styles.badgeGeneral
                    }`}
                  >
                    {notice.category}
                  </span>
                </div>
              </div>
              <p className={styles.noticeContent}>{notice.content}</p>
              <div className={styles.noticeMeta}>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>
                    {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>{notice.publishedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
