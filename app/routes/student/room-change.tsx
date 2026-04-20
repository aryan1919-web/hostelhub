import type { Route } from "./+types/room-change";
import { useState, useEffect } from "react";
import { Home, ArrowRight, Plus, Clock, CheckCircle, XCircle, Info } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockRoomChangeRequests, studentProfile, type RoomChangeRequest } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./room-change.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Room Change Request - HostelHub" },
    { name: "description", content: "Request a room change" },
  ];
}

export default function RoomChangeRequest() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<RoomChangeRequest[]>([]);
  const [formData, setFormData] = useState({
    preferredRoom: "",
    reason: "",
  });

  useEffect(() => {
    setRequests(initializeEntity<RoomChangeRequest>(ENTITIES.ROOM_CHANGES, mockRoomChangeRequests));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: RoomChangeRequest = {
      id: generateId("RC"),
      studentName: studentProfile.name,
      currentRoom: studentProfile.roomNumber,
      preferredRoom: formData.preferredRoom,
      reason: formData.reason,
      status: "pending" as const,
      appliedAt: new Date().toISOString(),
    };
    const created = create<RoomChangeRequest>(ENTITIES.ROOM_CHANGES, newRequest);
    setRequests([created, ...requests]);
    setFormData({ preferredRoom: "", reason: "" });
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className={styles.statusIconApproved} />;
      case "rejected":
        return <XCircle className={styles.statusIconRejected} />;
      default:
        return <Clock className={styles.statusIconPending} />;
    }
  };

  const hasPendingRequest = requests.some((r) => r.status === "pending" && r.studentName === studentProfile.name);

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Room Change Request</h1>
            <p className={styles.subtitle}>Request to change your current room assignment</p>
          </div>
          {!showForm && !hasPendingRequest && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              New Request
            </Button>
          )}
        </div>

        <div className={styles.currentRoomCard}>
          <div className={styles.currentRoomInfo}>
            <Home className={styles.roomIcon} />
            <div>
              <span className={styles.currentRoomLabel}>Current Room Assignment</span>
              <span className={styles.currentRoomValue}>
                {studentProfile.roomNumber} • {studentProfile.block}
              </span>
            </div>
          </div>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>New Room Change Request</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.roomTransfer}>
                <div className={styles.roomBox}>
                  <span className={styles.roomBoxLabel}>Current Room</span>
                  <span className={styles.roomBoxValue}>{studentProfile.roomNumber}</span>
                </div>
                <ArrowRight className={styles.arrowIcon} />
                <div className={styles.roomBox}>
                  <span className={styles.roomBoxLabel}>Preferred Room</span>
                  <Input
                    placeholder="e.g., B-301"
                    value={formData.preferredRoom}
                    onChange={(e) => setFormData({ ...formData, preferredRoom: e.target.value })}
                    required
                    className={styles.roomInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Reason for Room Change</label>
                <Textarea
                  placeholder="Please explain why you want to change your room..."
                  rows={4}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>

              <div className={styles.infoBox}>
                <Info className={styles.infoIcon} />
                <p className={styles.infoText}>
                  Room change requests are subject to availability and approval by the hostel administration.
                  Processing time is typically 5-7 working days.
                </p>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </div>
        )}

        {hasPendingRequest && !showForm && (
          <div className={styles.pendingNotice}>
            <Clock className={styles.pendingIcon} />
            <div>
              <h3 className={styles.pendingTitle}>Pending Request</h3>
              <p className={styles.pendingText}>
                You already have a pending room change request. Please wait for it to be processed before submitting a new one.
              </p>
            </div>
          </div>
        )}

        <div className={styles.requestsSection}>
          <h2 className={styles.sectionTitle}>Request History</h2>

          {requests.filter((r) => r.studentName === studentProfile.name).length > 0 ? (
            <div className={styles.requestsList}>
              {requests
                .filter((r) => r.studentName === studentProfile.name)
                .map((request) => (
                  <div key={request.id} className={styles.requestCard}>
                    <div className={styles.requestHeader}>
                      <div className={styles.requestId}>Request #{request.id}</div>
                      <div className={`${styles.statusBadge} ${styles[`status${request.status.charAt(0).toUpperCase() + request.status.slice(1)}`]}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </div>
                    </div>

                    <div className={styles.requestRooms}>
                      <div className={styles.requestRoom}>
                        <span className={styles.requestRoomLabel}>From</span>
                        <span className={styles.requestRoomValue}>{request.currentRoom}</span>
                      </div>
                      <ArrowRight className={styles.requestArrow} />
                      <div className={styles.requestRoom}>
                        <span className={styles.requestRoomLabel}>To</span>
                        <span className={styles.requestRoomValue}>{request.preferredRoom}</span>
                      </div>
                    </div>

                    <p className={styles.requestReason}>{request.reason}</p>

                    <div className={styles.requestMeta}>
                      <span>
                        Applied: {new Date(request.appliedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {request.processedAt && (
                        <span>
                          Processed: {new Date(request.processedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    {request.remarks && (
                      <div className={styles.requestRemarks}>
                        <strong>Remarks:</strong> {request.remarks}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Home className={styles.emptyIcon} />
              <p className={styles.emptyText}>No room change requests yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
