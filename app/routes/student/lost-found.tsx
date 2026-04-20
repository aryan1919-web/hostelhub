import type { Route } from "./+types/lost-found";
import { useState, useEffect } from "react";
import { Search, Plus, MapPin, Calendar, Phone, Package, CheckCircle, Smartphone, Shirt, FileText, Watch } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { mockLostFoundItems, studentProfile, type LostFoundItem } from "~/data/mock-data";
import { initializeEntity, create, generateId, ENTITIES } from "~/data/storage";
import styles from "./lost-found.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lost & Found - HostelHub" },
    { name: "description", content: "Report lost items or view found items" },
  ];
}

const categoryIcons = {
  electronics: Smartphone,
  clothing: Shirt,
  documents: FileText,
  accessories: Watch,
  other: Package,
};

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "documents", label: "Documents" },
  { id: "accessories", label: "Accessories" },
  { id: "other", label: "Other" },
];

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost");
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    type: "lost" as "lost" | "found",
    itemName: "",
    description: "",
    category: "electronics" as "electronics" | "clothing" | "documents" | "accessories" | "other",
    location: "",
    date: "",
    contactPhone: studentProfile.phone,
  });

  useEffect(() => {
    setItems(initializeEntity<LostFoundItem>(ENTITIES.LOST_FOUND, mockLostFoundItems));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: LostFoundItem = {
      id: generateId("LF"),
      type: formData.type,
      itemName: formData.itemName,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      date: formData.date,
      reportedBy: studentProfile.name,
      contactPhone: formData.contactPhone,
      status: "open" as const,
    };
    const created = create<LostFoundItem>(ENTITIES.LOST_FOUND, newItem);
    setItems([created, ...items]);
    setFormData({
      type: "lost",
      itemName: "",
      description: "",
      category: "electronics",
      location: "",
      date: "",
      contactPhone: studentProfile.phone,
    });
    setShowForm(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesTab = item.type === activeTab;
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const openItems = filteredItems.filter((item) => item.status === "open");

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Lost & Found</h1>
            <p className={styles.subtitle}>Report lost items or help others find their belongings</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className={styles.buttonIcon} />
              Report Item
            </Button>
          )}
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Report an Item</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Item Type</label>
                <div className={styles.typeToggle}>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${formData.type === "lost" ? styles.typeButtonActive : ""}`}
                    onClick={() => setFormData({ ...formData, type: "lost" })}
                  >
                    I Lost Something
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeButton} ${formData.type === "found" ? styles.typeButtonActive : ""}`}
                    onClick={() => setFormData({ ...formData, type: "found" })}
                  >
                    I Found Something
                  </button>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Item Name</label>
                  <Input
                    placeholder="e.g., Blue Wallet, iPhone 13"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <select
                    className={styles.select}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof formData.category })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <Textarea
                  placeholder="Provide details about the item (color, brand, distinguishing features...)"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <Input
                    placeholder="Where was it lost/found?"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Phone</label>
                <Input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </div>
        )}

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "lost" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("lost")}
          >
            Lost Items
            <span className={styles.tabCount}>
              {items.filter((i) => i.type === "lost" && i.status === "open").length}
            </span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "found" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("found")}
          >
            Found Items
            <span className={styles.tabCount}>
              {items.filter((i) => i.type === "found" && i.status === "open").length}
            </span>
          </button>
        </div>

        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {openItems.length > 0 ? (
          <div className={styles.itemsGrid}>
            {openItems.map((item) => {
              const CategoryIcon = categoryIcons[item.category];

              return (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemHeader}>
                    <div className={`${styles.itemType} ${item.type === "lost" ? styles.itemTypeLost : styles.itemTypeFound}`}>
                      {item.type === "lost" ? "Lost" : "Found"}
                    </div>
                    <span className={`${styles.statusBadge} ${item.status === "open" ? styles.statusOpen : styles.statusClaimed}`}>
                      {item.status === "open" ? "Open" : <><CheckCircle className={styles.statusIcon} /> Claimed</>}
                    </span>
                  </div>

                  <div className={styles.itemIcon}>
                    <CategoryIcon className={styles.categoryIcon} />
                  </div>

                  <h3 className={styles.itemName}>{item.itemName}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>

                  <div className={styles.itemDetails}>
                    <div className={styles.detailItem}>
                      <MapPin className={styles.detailIcon} />
                      <span>{item.location}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <Calendar className={styles.detailIcon} />
                      <span>
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className={styles.itemFooter}>
                    <span className={styles.reportedBy}>By: {item.reportedBy}</span>
                    <a href={`tel:${item.contactPhone}`} className={styles.contactButton}>
                      <Phone className={styles.contactIcon} />
                      Contact
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <Search className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              {searchQuery
                ? "No items found matching your search"
                : `No ${activeTab} items reported yet`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
