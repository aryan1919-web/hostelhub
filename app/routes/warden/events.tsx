import type { Route } from "./+types/events";
import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Users, Clock, MapPin, Trophy, Music, Book, PartyPopper, Megaphone } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockEvents } from "~/data/mock-data";
import type { HostelEvent } from "~/data/mock-data";
import styles from "./events.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event Management - HostelHub Warden" },
    { name: "description", content: "Create and manage hostel events" },
  ];
}

const categoryIcons = {
  cultural: Music,
  sports: Trophy,
  academic: Book,
  festival: PartyPopper,
  meeting: Megaphone,
};

const categoryColors = {
  cultural: "cultural",
  sports: "sports",
  academic: "academic",
  festival: "festival",
  meeting: "meeting",
};

export default function EventManagement() {
  const [showForm, setShowForm] = useState(false);
  const [events] = useState<HostelEvent[]>(mockEvents);

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date());
  const pastEvents = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Event Management</h1>
            <p className={styles.subtitle}>Create and manage hostel events and activities</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={16} />
            Create Event
          </Button>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Create New Event</h2>
            <form className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Event Title</label>
                  <Input type="text" placeholder="Enter event title" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select}>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="academic">Academic</option>
                    <option value="festival">Festival</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <Textarea placeholder="Enter event description..." rows={3} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date</label>
                  <Input type="date" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Time</label>
                  <Input type="text" placeholder="e.g., 09:00 AM - 06:00 PM" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Venue</label>
                  <Input type="text" placeholder="Enter venue" />
                </div>
              </div>
              <div className={styles.formRow}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  Registration Required
                </label>
              </div>
              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <Calendar size={20} />
            <div>
              <span className={styles.statValue}>{upcomingEvents.length}</span>
              <span className={styles.statLabel}>Upcoming Events</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.registration}`}>
            <Users size={20} />
            <div>
              <span className={styles.statValue}>{events.filter((e) => e.isRegistrationRequired).length}</span>
              <span className={styles.statLabel}>With Registration</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <div className={styles.eventsGrid}>
            {upcomingEvents.map((event) => {
              const CategoryIcon = categoryIcons[event.category];
              return (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <div className={`${styles.categoryIcon} ${styles[categoryColors[event.category]]}`}>
                      <CategoryIcon size={20} />
                    </div>
                    <div className={styles.eventActions}>
                      <button className={styles.iconBtn} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className={styles.iconBtn} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <span className={`${styles.categoryBadge} ${styles[categoryColors[event.category]]}`}>
                    {event.category}
                  </span>

                  <p className={styles.eventDescription}>{event.description}</p>

                  <div className={styles.eventDetails}>
                    <div className={styles.detailItem}>
                      <Calendar size={14} />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <MapPin size={14} />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {event.isRegistrationRequired && (
                    <div className={styles.registrationInfo}>
                      <Users size={14} />
                      <span>Registration required</span>
                      {event.registrationDeadline && (
                        <span className={styles.deadline}>
                          Deadline: {new Date(event.registrationDeadline).toLocaleDateString("en-IN")}
                        </span>
                      )}
                    </div>
                  )}

                  <div className={styles.cardActions}>
                    <Button size="sm" variant="outline">
                      View Registrations
                    </Button>
                    <Button size="sm" variant="outline">
                      Send Reminder
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {pastEvents.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Past Events</h2>
            <div className={styles.pastEventsList}>
              {pastEvents.map((event) => {
                const CategoryIcon = categoryIcons[event.category];
                return (
                  <div key={event.id} className={styles.pastEventItem}>
                    <div className={`${styles.categoryIconSmall} ${styles[categoryColors[event.category]]}`}>
                      <CategoryIcon size={16} />
                    </div>
                    <div className={styles.pastEventInfo}>
                      <h4 className={styles.pastEventTitle}>{event.title}</h4>
                      <span className={styles.pastEventDate}>
                        {new Date(event.date).toLocaleDateString("en-IN")} at {event.venue}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      View Summary
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className={styles.emptyState}>
            <Calendar size={48} />
            <h3>No events yet</h3>
            <p>Create your first event to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
