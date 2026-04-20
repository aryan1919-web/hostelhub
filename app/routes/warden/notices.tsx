import type { Route } from "./+types/notices";
import { useState } from "react";
import { Bell, Plus, Edit, Trash2, Pin, AlertTriangle, Calendar as CalendarIcon, Wrench, DollarSign, Info } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockNotices } from "~/data/mock-data";
import type { Notice } from "~/data/mock-data";
import styles from "./notices.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notice Management - HostelHub Warden" },
    { name: "description", content: "Create and manage hostel notices" },
  ];
}

const categoryIcons = {
  general: Info,
  urgent: AlertTriangle,
  event: CalendarIcon,
  maintenance: Wrench,
  fee: DollarSign,
};

const categoryColors = {
  general: "general",
  urgent: "urgent",
  event: "event",
  maintenance: "maintenance",
  fee: "fee",
};

export default function NoticeManagement() {
  const [showForm, setShowForm] = useState(false);
  const [notices] = useState<Notice[]>(mockNotices);

  const pinnedNotices = notices.filter((n) => n.isPinned);
  const regularNotices = notices.filter((n) => !n.isPinned);

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Notice Management</h1>
            <p className={styles.subtitle}>Create and manage hostel notices and announcements</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={16} />
            New Notice
          </Button>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Create New Notice</h2>
            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <Input type="text" placeholder="Enter notice title" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select}>
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Event</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="fee">Fee Related</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Content</label>
                <Textarea placeholder="Enter notice content..." rows={4} />
              </div>
              <div className={styles.formRow}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <Pin size={14} />
                  Pin this notice
                </label>
              </div>
              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Publish Notice</Button>
              </div>
            </form>
          </div>
        )}

        {pinnedNotices.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Pin size={18} />
              Pinned Notices
            </h2>
            <div className={styles.noticesList}>
              {pinnedNotices.map((notice) => {
                const CategoryIcon = categoryIcons[notice.category];
                return (
                  <div key={notice.id} className={`${styles.noticeCard} ${styles.pinned}`}>
                    <div className={styles.noticeHeader}>
                      <div className={`${styles.categoryIcon} ${styles[categoryColors[notice.category]]}`}>
                        <CategoryIcon size={18} />
                      </div>
                      <div className={styles.noticeInfo}>
                        <h3 className={styles.noticeTitle}>{notice.title}</h3>
                        <div className={styles.noticeMeta}>
                          <span className={`${styles.categoryBadge} ${styles[categoryColors[notice.category]]}`}>
                            {notice.category}
                          </span>
                          <span className={styles.date}>
                            {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className={styles.noticeActions}>
                        <button className={styles.iconBtn} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className={styles.iconBtn} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className={styles.noticeContent}>{notice.content}</p>
                    <div className={styles.publishedBy}>Published by: {notice.publishedBy}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Bell size={18} />
            All Notices
          </h2>
          <div className={styles.noticesList}>
            {regularNotices.map((notice) => {
              const CategoryIcon = categoryIcons[notice.category];
              return (
                <div key={notice.id} className={styles.noticeCard}>
                  <div className={styles.noticeHeader}>
                    <div className={`${styles.categoryIcon} ${styles[categoryColors[notice.category]]}`}>
                      <CategoryIcon size={18} />
                    </div>
                    <div className={styles.noticeInfo}>
                      <h3 className={styles.noticeTitle}>{notice.title}</h3>
                      <div className={styles.noticeMeta}>
                        <span className={`${styles.categoryBadge} ${styles[categoryColors[notice.category]]}`}>
                          {notice.category}
                        </span>
                        <span className={styles.date}>
                          {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className={styles.noticeActions}>
                      <button className={styles.iconBtn} title="Pin">
                        <Pin size={16} />
                      </button>
                      <button className={styles.iconBtn} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className={styles.iconBtn} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.noticeContent}>{notice.content}</p>
                  <div className={styles.publishedBy}>Published by: {notice.publishedBy}</div>
                </div>
              );
            })}
          </div>
        </div>

        {notices.length === 0 && (
          <div className={styles.emptyState}>
            <Bell size={48} />
            <h3>No notices yet</h3>
            <p>Create your first notice to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
