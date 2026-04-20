import type { Route } from "./+types/documents";
import { useState } from "react";
import { FileText, Download, Search, Filter, File, FileSpreadsheet, BookOpen, Bell, Award } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Input } from "~/components/ui/input/input";
import { Button } from "~/components/ui/button/button";
import { mockDocuments } from "~/data/mock-data";
import styles from "./documents.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documents & Downloads - HostelHub" },
    { name: "description", content: "Access forms, certificates, and important documents" },
  ];
}

const categoryIcons = {
  forms: FileText,
  certificates: Award,
  guidelines: BookOpen,
  notices: Bell,
};

const fileTypeIcons = {
  pdf: File,
  doc: FileText,
  xlsx: FileSpreadsheet,
};

const categories = [
  { id: "all", label: "All Documents" },
  { id: "forms", label: "Forms" },
  { id: "certificates", label: "Certificates" },
  { id: "guidelines", label: "Guidelines" },
  { id: "notices", label: "Notices" },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedDocuments = categories.slice(1).reduce((acc, cat) => {
    acc[cat.id] = filteredDocuments.filter((doc) => doc.category === cat.id);
    return acc;
  }, {} as Record<string, typeof mockDocuments>);

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Documents & Downloads</h1>
            <p className={styles.subtitle}>Access forms, certificates, and important documents</p>
          </div>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <Filter className={styles.filterIcon} />
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.filterButtonActive : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === "all" ? (
          Object.entries(groupedDocuments).map(([category, docs]) => {
            if (docs.length === 0) return null;
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];

            return (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>
                  <CategoryIcon className={styles.categoryIcon} />
                  {categories.find((c) => c.id === category)?.label}
                </h2>
                <div className={styles.documentsGrid}>
                  {docs.map((doc) => {
                    const FileIcon = fileTypeIcons[doc.fileType];
                    return (
                      <div key={doc.id} className={styles.documentCard}>
                        <div className={styles.documentIcon}>
                          <FileIcon className={styles.fileIcon} />
                        </div>
                        <div className={styles.documentInfo}>
                          <h3 className={styles.documentTitle}>{doc.title}</h3>
                          <p className={styles.documentDescription}>{doc.description}</p>
                          <div className={styles.documentMeta}>
                            <span className={styles.fileType}>{doc.fileType.toUpperCase()}</span>
                            <span className={styles.uploadDate}>
                              Updated: {new Date(doc.uploadedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className={styles.downloadButton}>
                          <Download className={styles.downloadIcon} />
                          Download
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.documentsGrid}>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const FileIcon = fileTypeIcons[doc.fileType];
                return (
                  <div key={doc.id} className={styles.documentCard}>
                    <div className={styles.documentIcon}>
                      <FileIcon className={styles.fileIcon} />
                    </div>
                    <div className={styles.documentInfo}>
                      <h3 className={styles.documentTitle}>{doc.title}</h3>
                      <p className={styles.documentDescription}>{doc.description}</p>
                      <div className={styles.documentMeta}>
                        <span className={styles.fileType}>{doc.fileType.toUpperCase()}</span>
                        <span className={styles.uploadDate}>
                          Updated: {new Date(doc.uploadedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className={styles.downloadButton}>
                      <Download className={styles.downloadIcon} />
                      Download
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <FileText className={styles.emptyIcon} />
                <p className={styles.emptyText}>No documents found</p>
              </div>
            )}
          </div>
        )}

        <div className={styles.requestSection}>
          <div className={styles.requestCard}>
            <div className={styles.requestContent}>
              <h3 className={styles.requestTitle}>Need a Document?</h3>
              <p className={styles.requestDescription}>
                Request specific certificates or documents from the hostel administration.
              </p>
            </div>
            <Button>Request Document</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
