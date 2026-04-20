import type { Route } from "./+types/events";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Trophy, Music, BookOpen, PartyPopper, ChevronRight, Filter } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockEvents } from "~/data/mock-data";
import styles from "./events.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event Calendar - HostelHub" },
    { name: "description", content: "View upcoming hostel events and activities" },
  ];
}

const categoryIcons = {
  cultural: Music,
  sports: Trophy,
  academic: BookOpen,
  festival: PartyPopper,
  meeting: Users,
};

const categoryColors = {
  cultural: "categoryCultural",
  sports: "categorySports",
  academic: "categoryAcademic",
  festival: "categoryFestival",
  meeting: "categoryMeeting",
};

export default function EventCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const filteredEvents = selectedCategory === "all"
    ? mockEvents
    : mockEvents.filter((e) => e.category === selectedCategory);

  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  const upcomingEvents = filteredEvents.filter((e) => new Date(e.date) >= new Date());

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Event Calendar</h1>
            <p className={styles.subtitle}>Upcoming hostel events and activities</p>
          </div>
        </div>

        <div className={styles.filters}>
          <Filter className={styles.filterIcon} />
          <button
            className={`${styles.filterButton} ${selectedCategory === "all" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Events
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === "cultural" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("cultural")}
          >
            <Music className={styles.filterButtonIcon} />
            Cultural
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === "sports" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("sports")}
          >
            <Trophy className={styles.filterButtonIcon} />
            Sports
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === "academic" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("academic")}
          >
            <BookOpen className={styles.filterButtonIcon} />
            Academic
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === "festival" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("festival")}
          >
            <PartyPopper className={styles.filterButtonIcon} />
            Festival
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === "meeting" ? styles.filterButtonActive : ""}`}
            onClick={() => setSelectedCategory("meeting")}
          >
            <Users className={styles.filterButtonIcon} />
            Meeting
          </button>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className={styles.eventsList}>
            {upcomingEvents.map((event) => {
              const CategoryIcon = categoryIcons[event.category];
              const isRegistered = registeredEvents.includes(event.id);
              const isPastDeadline = event.registrationDeadline && new Date(event.registrationDeadline) < new Date();

              return (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventDate}>
                    <span className={styles.eventDay}>
                      {new Date(event.date).getDate()}
                    </span>
                    <span className={styles.eventMonth}>
                      {new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </div>

                  <div className={styles.eventContent}>
                    <div className={styles.eventHeader}>
                      <div className={`${styles.categoryBadge} ${styles[categoryColors[event.category]]}`}>
                        <CategoryIcon className={styles.categoryIcon} />
                        {event.category}
                      </div>
                      {isRegistered && (
                        <span className={styles.registeredBadge}>Registered</span>
                      )}
                    </div>

                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventDescription}>{event.description}</p>

                    <div className={styles.eventDetails}>
                      <div className={styles.detailItem}>
                        <Clock className={styles.detailIcon} />
                        <span>{event.time}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <MapPin className={styles.detailIcon} />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {event.isRegistrationRequired && (
                      <div className={styles.eventActions}>
                        {event.registrationDeadline && (
                          <span className={styles.deadline}>
                            Registration {isPastDeadline ? "closed" : "closes"}: {new Date(event.registrationDeadline).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                        {!isRegistered && !isPastDeadline ? (
                          <Button size="sm" onClick={() => handleRegister(event.id)}>
                            Register Now
                            <ChevronRight className={styles.buttonIcon} />
                          </Button>
                        ) : isRegistered ? (
                          <span className={styles.registeredText}>You&apos;re registered!</span>
                        ) : (
                          <span className={styles.closedText}>Registration closed</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Calendar className={styles.emptyIcon} />
            <p className={styles.emptyText}>No upcoming events in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
