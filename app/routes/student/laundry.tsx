import type { Route } from "./+types/laundry";
import { useState, useEffect } from "react";
import { Shirt, Plus, Clock, CheckCircle, Package, Droplets, Wind } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockLaundryItems, studentProfile, type LaundryItem } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./laundry.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Laundry Tracking - HostelHub" },
    { name: "description", content: "Submit and track laundry items" },
  ];
}

const laundryTypes = [
  "Shirts",
  "T-Shirts",
  "Pants",
  "Shorts",
  "Bed Sheets",
  "Pillow Covers",
  "Towels",
  "Socks (pair)",
  "Innerwear",
  "Others",
];

export default function LaundryTracking() {
  const [showForm, setShowForm] = useState(false);
  const [laundryItems, setLaundryItems] = useState<LaundryItem[]>([]);
  const [formItems, setFormItems] = useState<{ type: string; quantity: number }[]>([
    { type: "Shirts", quantity: 0 },
  ]);

  useEffect(() => {
    setLaundryItems(initializeEntity<LaundryItem>(ENTITIES.LAUNDRY, mockLaundryItems));
  }, []);

  const handleAddItem = () => {
    setFormItems([...formItems, { type: "Shirts", quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: "type" | "quantity", value: string | number) => {
    const newItems = [...formItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validItems = formItems.filter((item) => item.quantity > 0);
    if (validItems.length === 0) return;

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 2);

    const newLaundry: LaundryItem = {
      id: generateId("LN"),
      studentName: studentProfile.name,
      roomNumber: studentProfile.roomNumber,
      items: validItems,
      submittedAt: new Date().toISOString(),
      status: "submitted" as const,
      expectedDate: expectedDate.toISOString().split("T")[0],
    };
    const created = create<LaundryItem>(ENTITIES.LAUNDRY, newLaundry);
    setLaundryItems([created, ...laundryItems]);
    setFormItems([{ type: "Shirts", quantity: 0 }]);
    setShowForm(false);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "submitted":
        return { icon: Package, label: "Submitted", color: "statusSubmitted" };
      case "washing":
        return { icon: Droplets, label: "Washing", color: "statusWashing" };
      case "drying":
        return { icon: Wind, label: "Drying", color: "statusDrying" };
      case "ready":
        return { icon: CheckCircle, label: "Ready for Pickup", color: "statusReady" };
      case "collected":
        return { icon: CheckCircle, label: "Collected", color: "statusCollected" };
      default:
        return { icon: Clock, label: status, color: "statusSubmitted" };
    }
  };

  const myLaundry = laundryItems.filter((l) => l.studentName === studentProfile.name);
  const readyCount = myLaundry.filter((l) => l.status === "ready").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Laundry Tracking</h1>
            <p className={styles.subtitle}>Submit and track your laundry items</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Submit Laundry
            </Button>
          )}
        </div>

        {readyCount > 0 && (
          <div className={styles.alertCard}>
            <CheckCircle className={styles.alertIcon} />
            <div>
              <h3 className={styles.alertTitle}>Laundry Ready!</h3>
              <p className={styles.alertText}>
                You have {readyCount} laundry {readyCount === 1 ? "batch" : "batches"} ready for pickup.
              </p>
            </div>
          </div>
        )}

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit New Laundry</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.itemsHeader}>
                <span className={styles.itemsLabel}>Items</span>
                <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                  <Plus className={styles.smallIcon} />
                  Add Item
                </Button>
              </div>

              <div className={styles.itemsList}>
                {formItems.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <select
                      className={styles.select}
                      value={item.type}
                      onChange={(e) => handleItemChange(index, "type", e.target.value)}
                    >
                      {laundryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                      className={styles.quantityInput}
                    />
                    {formItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                        className={styles.removeButton}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.formNote}>
                <Clock className={styles.noteIcon} />
                <span>Expected return: 2 working days from submission</span>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Laundry</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.laundrySection}>
          <h2 className={styles.sectionTitle}>Laundry History</h2>

          {myLaundry.length > 0 ? (
            <div className={styles.laundryList}>
              {myLaundry.map((laundry) => {
                const statusInfo = getStatusInfo(laundry.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={laundry.id} className={styles.laundryCard}>
                    <div className={styles.laundryHeader}>
                      <div className={styles.laundryId}>
                        <Shirt className={styles.laundryIcon} />
                        <span>#{laundry.id}</span>
                      </div>
                      <div className={`${styles.statusBadge} ${styles[statusInfo.color]}`}>
                        <StatusIcon className={styles.statusIcon} />
                        {statusInfo.label}
                      </div>
                    </div>

                    <div className={styles.laundryItems}>
                      {laundry.items.map((item, idx) => (
                        <span key={idx} className={styles.itemTag}>
                          {item.type} × {item.quantity}
                        </span>
                      ))}
                    </div>

                    <div className={styles.laundryMeta}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Submitted:</span>
                        <span>
                          {new Date(laundry.submittedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Expected:</span>
                        <span>
                          {new Date(laundry.expectedDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {laundry.status === "ready" && (
                      <div className={styles.pickupNote}>
                        <CheckCircle className={styles.pickupIcon} />
                        <span>Ready for pickup at laundry counter</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Shirt className={styles.emptyIcon} />
              <p className={styles.emptyText}>No laundry submissions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
