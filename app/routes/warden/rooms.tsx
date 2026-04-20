import type { Route } from "./+types/rooms";
import { useState } from "react";
import { Home, Users, Wrench, CheckCircle, Filter, Bed, Building } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { mockRoomAllocations, mockRoomChangeRequests } from "~/data/mock-data";
import styles from "./rooms.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Room Allocation - HostelHub Warden" },
    { name: "description", content: "Manage room assignments and allocations" },
  ];
}

export default function RoomAllocation() {
  const [selectedBlock, setSelectedBlock] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState<"rooms" | "requests">("rooms");

  const blocks = ["all", "A", "B", "C"];
  const statuses = ["all", "available", "full", "maintenance"];

  const filteredRooms = mockRoomAllocations.filter((room) => {
    const matchesBlock = selectedBlock === "all" || room.block === selectedBlock;
    const matchesStatus = selectedStatus === "all" || room.status === selectedStatus;
    return matchesBlock && matchesStatus;
  });

  const pendingRequests = mockRoomChangeRequests.filter((r) => r.status === "pending");

  const totalRooms = mockRoomAllocations.length;
  const availableRooms = mockRoomAllocations.filter((r) => r.status === "available").length;
  const fullRooms = mockRoomAllocations.filter((r) => r.status === "full").length;
  const maintenanceRooms = mockRoomAllocations.filter((r) => r.status === "maintenance").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Room Allocation</h1>
            <p className={styles.subtitle}>Manage room assignments and handle change requests</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <Building size={20} />
            <div>
              <span className={styles.statValue}>{totalRooms}</span>
              <span className={styles.statLabel}>Total Rooms</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.available}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{availableRooms}</span>
              <span className={styles.statLabel}>Available</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.full}`}>
            <Users size={20} />
            <div>
              <span className={styles.statValue}>{fullRooms}</span>
              <span className={styles.statLabel}>Full</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.maintenance}`}>
            <Wrench size={20} />
            <div>
              <span className={styles.statValue}>{maintenanceRooms}</span>
              <span className={styles.statLabel}>Maintenance</span>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "rooms" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("rooms")}
          >
            <Home size={16} />
            Room Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === "requests" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            <Bed size={16} />
            Change Requests
            {pendingRequests.length > 0 && (
              <span className={styles.badge}>{pendingRequests.length}</span>
            )}
          </button>
        </div>

        {activeTab === "rooms" && (
          <>
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <Filter size={18} />
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className={styles.select}
                >
                  {blocks.map((block) => (
                    <option key={block} value={block}>
                      {block === "all" ? "All Blocks" : `Block ${block}`}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={styles.select}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.roomsGrid}>
              {filteredRooms.map((room) => (
                <div key={room.roomNumber} className={`${styles.roomCard} ${styles[room.status]}`}>
                  <div className={styles.roomHeader}>
                    <div className={styles.roomNumber}>
                      <Home size={18} />
                      <span>{room.roomNumber}</span>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[room.status]}`}>
                      {room.status}
                    </span>
                  </div>

                  <div className={styles.occupancy}>
                    <div className={styles.occupancyBar}>
                      <div
                        className={styles.occupancyFill}
                        style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                      />
                    </div>
                    <span className={styles.occupancyText}>
                      {room.occupied}/{room.capacity} occupied
                    </span>
                  </div>

                  <div className={styles.roomDetails}>
                    <span>Block {room.block} • Floor {room.floor}</span>
                  </div>

                  {room.students.length > 0 && (
                    <div className={styles.studentsList}>
                      <strong>Occupants:</strong>
                      <ul>
                        {room.students.map((student) => (
                          <li key={student.id}>{student.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.amenities}>
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className={styles.amenityTag}>
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className={styles.amenityTag}>+{room.amenities.length - 3}</span>
                    )}
                  </div>

                  <div className={styles.roomActions}>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "requests" && (
          <div className={styles.requestsList}>
            {mockRoomChangeRequests.map((request) => (
              <div key={request.id} className={styles.requestCard}>
                <div className={styles.requestHeader}>
                  <div>
                    <h3 className={styles.requestStudent}>{request.studentName}</h3>
                    <span className={styles.requestDate}>
                      Applied: {new Date(request.appliedAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <span className={`${styles.statusBadge} ${styles[`status${request.status.charAt(0).toUpperCase() + request.status.slice(1)}`]}`}>
                    {request.status}
                  </span>
                </div>

                <div className={styles.roomChange}>
                  <div className={styles.roomFrom}>
                    <span className={styles.roomLabel}>Current Room</span>
                    <span className={styles.roomValue}>{request.currentRoom}</span>
                  </div>
                  <span className={styles.arrow}>→</span>
                  <div className={styles.roomTo}>
                    <span className={styles.roomLabel}>Requested Room</span>
                    <span className={styles.roomValue}>{request.preferredRoom}</span>
                  </div>
                </div>

                <div className={styles.requestReason}>
                  <strong>Reason:</strong> {request.reason}
                </div>

                {request.remarks && (
                  <div className={styles.requestRemarks}>
                    <strong>Remarks:</strong> {request.remarks}
                  </div>
                )}

                {request.status === "pending" && (
                  <div className={styles.requestActions}>
                    <Button size="sm" className={styles.approveBtn}>
                      <CheckCircle size={14} />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className={styles.rejectBtn}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
