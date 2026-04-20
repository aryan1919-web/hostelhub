import type { Route } from "./+types/amenities";
import { useState } from "react";
import { Calendar, Clock, Plus, CheckCircle, X, BookOpen, Dumbbell, Music, Gamepad2, WashingMachine, ChefHat } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockAmenityBookings, availableAmenities, amenityTimeSlots, studentProfile } from "~/data/mock-data";
import styles from "./amenities.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Amenity Booking - HostelHub" },
    { name: "description", content: "Book hostel amenities and facilities" },
  ];
}

const amenityIcons: Record<string, React.ElementType> = {
  "Study Room A": BookOpen,
  "Study Room B": BookOpen,
  "Gym": Dumbbell,
  "Music Room": Music,
  "Recreation Room": Gamepad2,
  "Washing Machine 1": WashingMachine,
  "Washing Machine 2": WashingMachine,
  "Common Kitchen": ChefHat,
};

export default function AmenityBooking() {
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState(mockAmenityBookings);
  const [formData, setFormData] = useState({
    amenity: availableAmenities[0].name,
    date: "",
    timeSlot: amenityTimeSlots[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = {
      id: `AB${String(bookings.length + 1).padStart(3, "0")}`,
      studentName: studentProfile.name,
      roomNumber: studentProfile.roomNumber,
      amenity: formData.amenity,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: "booked" as const,
      bookedAt: new Date().toISOString(),
    };
    setBookings([newBooking, ...bookings]);
    setFormData({
      amenity: availableAmenities[0].name,
      date: "",
      timeSlot: amenityTimeSlots[0],
    });
    setShowForm(false);
  };

  const handleCancel = (bookingId: string) => {
    setBookings(bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    ));
  };

  const myBookings = bookings.filter((b) => b.studentName === studentProfile.name);
  const upcomingBookings = myBookings.filter(
    (b) => b.status === "booked" && new Date(b.date) >= new Date()
  );

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Amenity Booking</h1>
            <p className={styles.subtitle}>Book study rooms, gym, and other facilities</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Book Amenity
            </Button>
          )}
        </div>

        <div className={styles.amenitiesGrid}>
          {availableAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity.name] || BookOpen;
            return (
              <div
                key={amenity.id}
                className={`${styles.amenityCard} ${!amenity.available ? styles.amenityUnavailable : ""}`}
              >
                <div className={styles.amenityIcon}>
                  <Icon className={styles.icon} />
                </div>
                <div className={styles.amenityInfo}>
                  <h3 className={styles.amenityName}>{amenity.name}</h3>
                  <span className={styles.amenityCapacity}>Capacity: {amenity.capacity}</span>
                </div>
                <span className={`${styles.availabilityBadge} ${amenity.available ? styles.available : styles.unavailable}`}>
                  {amenity.available ? "Available" : "In Use"}
                </span>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Book an Amenity</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Select Amenity</label>
                <select
                  className={styles.select}
                  value={formData.amenity}
                  onChange={(e) => setFormData({ ...formData, amenity: e.target.value })}
                >
                  {availableAmenities
                    .filter((a) => a.available)
                    .map((amenity) => (
                      <option key={amenity.id} value={amenity.name}>
                        {amenity.name} (Capacity: {amenity.capacity})
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Time Slot</label>
                <div className={styles.timeSlotsGrid}>
                  {amenityTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`${styles.timeSlotButton} ${formData.timeSlot === slot ? styles.timeSlotActive : ""}`}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Confirm Booking</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.bookingsSection}>
          <h2 className={styles.sectionTitle}>My Bookings</h2>

          {upcomingBookings.length > 0 && (
            <div className={styles.upcomingSection}>
              <h3 className={styles.subsectionTitle}>Upcoming</h3>
              <div className={styles.bookingsList}>
                {upcomingBookings.map((booking) => {
                  const Icon = amenityIcons[booking.amenity] || BookOpen;
                  return (
                    <div key={booking.id} className={styles.bookingCard}>
                      <div className={styles.bookingIcon}>
                        <Icon className={styles.bookingIconInner} />
                      </div>
                      <div className={styles.bookingInfo}>
                        <h4 className={styles.bookingAmenity}>{booking.amenity}</h4>
                        <div className={styles.bookingDetails}>
                          <span className={styles.bookingDetail}>
                            <Calendar className={styles.detailIcon} />
                            {new Date(booking.date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span className={styles.bookingDetail}>
                            <Clock className={styles.detailIcon} />
                            {booking.timeSlot}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancel(booking.id)}
                        className={styles.cancelButton}
                      >
                        <X className={styles.cancelIcon} />
                        Cancel
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.historySection}>
            <h3 className={styles.subsectionTitle}>History</h3>
            {myBookings.filter((b) => b.status !== "booked" || new Date(b.date) < new Date()).length > 0 ? (
              <div className={styles.bookingsList}>
                {myBookings
                  .filter((b) => b.status !== "booked" || new Date(b.date) < new Date())
                  .map((booking) => {
                    const Icon = amenityIcons[booking.amenity] || BookOpen;
                    return (
                      <div key={booking.id} className={`${styles.bookingCard} ${styles.bookingCardHistory}`}>
                        <div className={styles.bookingIcon}>
                          <Icon className={styles.bookingIconInner} />
                        </div>
                        <div className={styles.bookingInfo}>
                          <h4 className={styles.bookingAmenity}>{booking.amenity}</h4>
                          <div className={styles.bookingDetails}>
                            <span className={styles.bookingDetail}>
                              <Calendar className={styles.detailIcon} />
                              {new Date(booking.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span className={styles.bookingDetail}>
                              <Clock className={styles.detailIcon} />
                              {booking.timeSlot}
                            </span>
                          </div>
                        </div>
                        <span className={`${styles.statusBadge} ${styles[`status${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}`]}`}>
                          {booking.status === "completed" && <CheckCircle className={styles.statusIcon} />}
                          {booking.status === "cancelled" && <X className={styles.statusIcon} />}
                          {booking.status}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className={styles.noHistory}>No booking history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
