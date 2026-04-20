import type { Route } from "./+types/students";
import { useState } from "react";
import { Users, Search, Mail, Phone, Home, GraduationCap, Filter, Eye } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { allStudents } from "~/data/mock-data";
import styles from "./students.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Management - HostelHub Warden" },
    { name: "description", content: "View and manage all hostel students" },
  ];
}

export default function WardenStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const blocks = ["all", "A Block", "B Block", "C Block"];
  const years = ["all", "1st Year", "2nd Year", "3rd Year", "4th Year"];

  const filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = selectedBlock === "all" || student.block === selectedBlock;
    const matchesYear = selectedYear === "all" || student.year === selectedYear;
    return matchesSearch && matchesBlock && matchesYear;
  });

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Student Management</h1>
            <p className={styles.subtitle}>View and manage all hostel students</p>
          </div>
          <div className={styles.stats}>
            <div className={styles.statBadge}>
              <Users size={16} />
              <span>{allStudents.length} Total Students</span>
            </div>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Search by name, room, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className={styles.select}
            >
              {blocks.map((block) => (
                <option key={block} value={block}>
                  {block === "all" ? "All Blocks" : block}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.select}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.studentsGrid}>
          {filteredStudents.map((student) => (
            <div key={student.id} className={styles.studentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>{student.name}</h3>
                  <span className={styles.studentId}>{student.id}</span>
                </div>
              </div>

              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <Home size={14} />
                  <span>
                    {student.roomNumber} • {student.block}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <GraduationCap size={14} />
                  <span>
                    {student.course} • {student.year}
                  </span>
                </div>
                {student.email && (
                  <div className={styles.detailRow}>
                    <Mail size={14} />
                    <span className={styles.truncate}>{student.email}</span>
                  </div>
                )}
                {student.phone && (
                  <div className={styles.detailRow}>
                    <Phone size={14} />
                    <span>{student.phone}</span>
                  </div>
                )}
              </div>

              <div className={styles.cardActions}>
                <Button size="sm" variant="outline">
                  <Eye size={14} />
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  <Mail size={14} />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} />
            <h3>No students found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
