import type { Route } from "./+types/residents";
import { useState } from "react";
import { Users, Search, Phone, Mail, Home, GraduationCap, Filter, Lock } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Input } from "~/components/ui/input/input";
import { mockResidents, studentProfile } from "~/data/mock-data";
import styles from "./residents.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resident Directory - HostelHub" },
    { name: "description", content: "View fellow hostel residents" },
  ];
}

const blocks = ["All Blocks", "A Block", "B Block", "C Block"];

export default function ResidentDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("All Blocks");

  const filteredResidents = mockResidents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlock = selectedBlock === "All Blocks" || resident.block === selectedBlock;
    return matchesSearch && matchesBlock;
  });

  const visibleResidents = filteredResidents.filter(
    (r) => r.profileVisible || r.id === studentProfile.id
  );

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Resident Directory</h1>
            <p className={styles.subtitle}>Connect with fellow hostel residents</p>
          </div>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search by name, room number, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <Filter className={styles.filterIcon} />
            {blocks.map((block) => (
              <button
                key={block}
                className={`${styles.filterButton} ${selectedBlock === block ? styles.filterButtonActive : ""}`}
                onClick={() => setSelectedBlock(block)}
              >
                {block}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.statsBar}>
          <span className={styles.statItem}>
            <Users className={styles.statIcon} />
            {visibleResidents.length} residents found
          </span>
        </div>

        {visibleResidents.length > 0 ? (
          <div className={styles.residentsGrid}>
            {visibleResidents.map((resident) => {
              const isCurrentUser = resident.id === studentProfile.id;

              return (
                <div
                  key={resident.id}
                  className={`${styles.residentCard} ${isCurrentUser ? styles.currentUserCard : ""}`}
                >
                  {isCurrentUser && <span className={styles.youBadge}>You</span>}

                  <div className={styles.residentAvatar}>
                    {resident.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>

                  <h3 className={styles.residentName}>{resident.name}</h3>

                  <div className={styles.residentInfo}>
                    <div className={styles.infoItem}>
                      <Home className={styles.infoIcon} />
                      <span>{resident.roomNumber}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <GraduationCap className={styles.infoIcon} />
                      <span>{resident.course}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.yearBadge}>{resident.year}</span>
                    </div>
                  </div>

                  {resident.profileVisible ? (
                    <div className={styles.contactInfo}>
                      {resident.phone && (
                        <a href={`tel:${resident.phone}`} className={styles.contactLink}>
                          <Phone className={styles.contactIcon} />
                          <span>{resident.phone}</span>
                        </a>
                      )}
                      {resident.email && (
                        <a href={`mailto:${resident.email}`} className={styles.contactLink}>
                          <Mail className={styles.contactIcon} />
                          <span className={styles.emailText}>{resident.email}</span>
                        </a>
                      )}
                      {!resident.phone && !resident.email && (
                        <span className={styles.noContact}>No contact info shared</span>
                      )}
                    </div>
                  ) : (
                    <div className={styles.privateProfile}>
                      <Lock className={styles.lockIcon} />
                      <span>Profile is private</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Users className={styles.emptyIcon} />
            <p className={styles.emptyText}>No residents found matching your criteria</p>
          </div>
        )}

        <div className={styles.privacyNote}>
          <Lock className={styles.noteIcon} />
          <p>
            Only residents who have made their profile visible are shown. You can manage your visibility in{" "}
            <a href="/student/profile" className={styles.noteLink}>profile settings</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
