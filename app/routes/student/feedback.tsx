import type { Route } from "./+types/feedback";
import { useState, useEffect } from "react";
import { MessageSquare, Plus, Star, Clock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockFeedbacks, studentProfile, type Feedback } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./feedback.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Feedback & Suggestions - HostelHub" },
    { name: "description", content: "Submit feedback and suggestions" },
  ];
}

const categories = [
  { id: "food", label: "Food & Mess" },
  { id: "cleanliness", label: "Cleanliness" },
  { id: "facilities", label: "Facilities" },
  { id: "staff", label: "Staff" },
  { id: "security", label: "Security" },
  { id: "other", label: "Other" },
];

export default function FeedbackPage() {
  const [showForm, setShowForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [formData, setFormData] = useState({
    category: "food" as "food" | "cleanliness" | "facilities" | "staff" | "security" | "other",
    rating: 0,
    title: "",
    description: "",
    isAnonymous: false,
  });

  useEffect(() => {
    setFeedbacks(initializeEntity<Feedback>(ENTITIES.FEEDBACK, mockFeedbacks));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      id: generateId("FB"),
      studentName: formData.isAnonymous ? "Anonymous" : studentProfile.name,
      roomNumber: formData.isAnonymous ? "-" : studentProfile.roomNumber,
      category: formData.category,
      rating: formData.rating,
      title: formData.title,
      description: formData.description,
      isAnonymous: formData.isAnonymous,
      submittedAt: new Date().toISOString(),
      status: "submitted" as const,
    };
    const created = create<Feedback>(ENTITIES.FEEDBACK, newFeedback);
    setFeedbacks([created, ...feedbacks]);
    setFormData({ category: "food", rating: 0, title: "", description: "", isAnonymous: false });
    setShowForm(false);
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${styles.star} ${star <= rating ? styles.starFilled : ""} ${interactive ? styles.starInteractive : ""}`}
            onClick={() => interactive && onChange && onChange(star)}
            disabled={!interactive}
          >
            <Star className={styles.starIcon} />
          </button>
        ))}
      </div>
    );
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "reviewed":
        return { icon: Eye, label: "Reviewed", color: "statusReviewed" };
      case "addressed":
        return { icon: CheckCircle, label: "Addressed", color: "statusAddressed" };
      default:
        return { icon: Clock, label: "Submitted", color: "statusSubmitted" };
    }
  };

  const myFeedbacks = feedbacks.filter(
    (f) => f.studentName === studentProfile.name || (f.isAnonymous && f.roomNumber === "-")
  );

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Feedback & Suggestions</h1>
            <p className={styles.subtitle}>Help us improve your hostel experience</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Submit Feedback
            </Button>
          )}
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>New Feedback</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <div className={styles.categoryGrid}>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.categoryButton} ${formData.category === cat.id ? styles.categoryButtonActive : ""}`}
                      onClick={() => setFormData({ ...formData, category: cat.id as typeof formData.category })}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Rating</label>
                {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Title</label>
                <Input
                  placeholder="Brief summary of your feedback"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <Textarea
                  placeholder="Provide detailed feedback or suggestions..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className={styles.anonymousToggle}>
                <button
                  type="button"
                  className={`${styles.toggleButton} ${formData.isAnonymous ? styles.toggleButtonActive : ""}`}
                  onClick={() => setFormData({ ...formData, isAnonymous: !formData.isAnonymous })}
                >
                  {formData.isAnonymous ? <EyeOff className={styles.toggleIcon} /> : <Eye className={styles.toggleIcon} />}
                  Submit Anonymously
                </button>
                <span className={styles.toggleHint}>
                  {formData.isAnonymous
                    ? "Your identity will be hidden"
                    : "Your name will be visible to administrators"}
                </span>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formData.rating === 0}>
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.feedbackSection}>
          <h2 className={styles.sectionTitle}>My Feedback</h2>

          {myFeedbacks.length > 0 ? (
            <div className={styles.feedbackList}>
              {myFeedbacks.map((feedback) => {
                const statusInfo = getStatusInfo(feedback.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={feedback.id} className={styles.feedbackCard}>
                    <div className={styles.feedbackHeader}>
                      <div className={styles.feedbackMeta}>
                        <span className={styles.categoryTag}>
                          {categories.find((c) => c.id === feedback.category)?.label}
                        </span>
                        {feedback.isAnonymous && (
                          <span className={styles.anonymousBadge}>
                            <EyeOff className={styles.anonymousIcon} />
                            Anonymous
                          </span>
                        )}
                      </div>
                      <div className={`${styles.statusBadge} ${styles[statusInfo.color]}`}>
                        <StatusIcon className={styles.statusIcon} />
                        {statusInfo.label}
                      </div>
                    </div>

                    <h3 className={styles.feedbackTitle}>{feedback.title}</h3>

                    {renderStars(feedback.rating)}

                    <p className={styles.feedbackDescription}>{feedback.description}</p>

                    <div className={styles.feedbackDate}>
                      Submitted: {new Date(feedback.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {feedback.response && (
                      <div className={styles.responseBox}>
                        <strong>Response:</strong> {feedback.response}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <MessageSquare className={styles.emptyIcon} />
              <p className={styles.emptyText}>No feedback submitted yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
