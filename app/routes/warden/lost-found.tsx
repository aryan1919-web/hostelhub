import type { Route } from "./+types/lost-found";
import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Eye, Package, Smartphone, FileText, Watch, HelpCircle } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { mockLostFoundItems } from "~/data/mock-data";
import styles from "./lost-found.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lost & Found Management - HostelHub Warden" },
    { name: "description", content: "Manage lost and found items" },
  ];
}

const categoryIcons = {
  electronics: Smartphone,
  clothing: Package,
  documents: FileText,
  accessories: Watch,
  other: HelpCircle,
};

export default function LostFoundManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "lost" | "found">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "claimed" | "closed">("all");

  const filteredItems = mockLostFoundItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const lostCount = mockLostFoundItems.filter((i) => i.type === "lost").length;
  const foundCount = mockLostFoundItems.filter((i) => i.type === "found").length;
  const openCount = mockLostFoundItems.filter((i) => i.status === "open").length;

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Lost &amp; Found Management</h1>
            <p className={styles.subtitle}>Manage reported lost and found items</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.lost}`}>
            <XCircle size={20} />
            <div>
              <span className={styles.statValue}>{lostCount}</span>
              <span className={styles.statLabel}>Lost Items</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.found}`}>
            <CheckCircle size={20} />
            <div>
              <span className={styles.statValue}>{foundCount}</span>
              <span className={styles.statLabel}>Found Items</span>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.open}`}>
            <Eye size={20} />
            <div>
              <span className={styles.statValue}>{openCount}</span>
              <span className={styles.statLabel}>Open Cases</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className={styles.select}
            >
              <option value="all">All Types</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className={styles.select}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="claimed">Claimed</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className={styles.itemsList}>
          {filteredItems.map((item) => {
            const CategoryIcon = categoryIcons[item.category];
            return (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <div className={`${styles.categoryIcon} ${styles[item.category]}`}>
                    <CategoryIcon size={20} />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.itemName}</h3>
                    <div className={styles.itemMeta}>
                      <span className={`${styles.typeBadge} ${styles[item.type]}`}>{item.type}</span>
                      <span className={`${styles.statusBadge} ${styles[item.status]}`}>{item.status}</span>
                    </div>
                  </div>
                </div>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <strong>Location:</strong> {item.location}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Date:</strong> {new Date(item.date).toLocaleDateString("en-IN")}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Reported by:</strong> {item.reportedBy}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Contact:</strong> {item.contactPhone}
                  </div>
                </div>

                <div className={styles.actions}>
                  {item.status === "open" && (
                    <>
                      <Button size="sm">Mark Claimed</Button>
                      <Button size="sm" variant="outline">
                        Close Case
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className={styles.emptyState}>
            <Package size={48} />
            <h3>No items found</h3>
            <p>No items match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
