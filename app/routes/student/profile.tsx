import type { Route } from "./+types/profile";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Droplets, GraduationCap, Home, Edit2, Save, X, Camera } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { studentProfile } from "~/data/mock-data";
import styles from "./profile.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Profile - HostelHub" },
    { name: "description", content: "View and manage your profile" },
  ];
}

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(studentProfile);
  const [editedProfile, setEditedProfile] = useState(studentProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className={styles.buttonIcon} />
              Edit Profile
            </Button>
          ) : (
            <div className={styles.headerActions}>
              <Button variant="outline" onClick={handleCancel}>
                <X className={styles.buttonIcon} />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className={styles.buttonIcon} />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className={styles.profileGrid}>
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className={styles.avatar}
                />
                {isEditing && (
                  <button className={styles.avatarEditButton}>
                    <Camera className={styles.avatarEditIcon} />
                  </button>
                )}
              </div>
              <h2 className={styles.profileName}>{profile.name}</h2>
              <p className={styles.profileRole}>{profile.rollNumber}</p>
              <div className={styles.profileBadge}>
                <GraduationCap className={styles.badgeIcon} />
                <span>{profile.course}</span>
              </div>
            </div>

            <div className={styles.quickInfo}>
              <div className={styles.quickInfoItem}>
                <Home className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Room</span>
                  <span className={styles.quickInfoValue}>{profile.roomNumber}</span>
                </div>
              </div>
              <div className={styles.quickInfoItem}>
                <MapPin className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Block</span>
                  <span className={styles.quickInfoValue}>{profile.block}</span>
                </div>
              </div>
              <div className={styles.quickInfoItem}>
                <Calendar className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Year</span>
                  <span className={styles.quickInfoValue}>{profile.year}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailsCard}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <User className={styles.detailIcon} />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.name}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <Mail className={styles.detailIcon} />
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.email}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <Phone className={styles.detailIcon} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.phone}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <Calendar className={styles.detailIcon} />
                    Date of Birth
                  </label>
                  <span className={styles.detailValue}>
                    {new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <Droplets className={styles.detailIcon} />
                    Blood Group
                  </label>
                  <span className={styles.detailValue}>{profile.bloodGroup}</span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <MapPin className={styles.detailIcon} />
                    Permanent Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.address}
                      onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.detailsCard}>
              <h3 className={styles.sectionTitle}>Guardian Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <User className={styles.detailIcon} />
                    Guardian Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.guardianName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, guardianName: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.guardianName}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>
                    <Phone className={styles.detailIcon} />
                    Guardian Phone
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.guardianPhone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, guardianPhone: e.target.value })}
                    />
                  ) : (
                    <span className={styles.detailValue}>{profile.guardianPhone}</span>
                  )}
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>Relationship</label>
                  <span className={styles.detailValue}>{profile.guardianRelation}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsCard}>
              <h3 className={styles.sectionTitle}>Academic Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>Roll Number</label>
                  <span className={styles.detailValue}>{profile.rollNumber}</span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>Course</label>
                  <span className={styles.detailValue}>{profile.course}</span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>Current Year</label>
                  <span className={styles.detailValue}>{profile.year}</span>
                </div>

                <div className={styles.detailItem}>
                  <label className={styles.detailLabel}>Admission Date</label>
                  <span className={styles.detailValue}>
                    {new Date(profile.admissionDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
