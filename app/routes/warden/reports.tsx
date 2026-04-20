import type { Route } from "./+types/reports";
import { useState } from "react";
import { BarChart3, Download, Calendar, Building, AlertCircle, DollarSign, Users, TrendingUp } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Button } from "~/components/ui/button/button";
import { wardenReports } from "~/data/mock-data";
import styles from "./reports.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reports & Analytics - HostelHub Warden" },
    { name: "description", content: "View hostel reports and analytics" },
  ];
}

const reportIcons = {
  occupancy: Building,
  complaint: AlertCircle,
  fee: DollarSign,
  attendance: Users,
  maintenance: TrendingUp,
};

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("January 2024");

  return (
    <div className={styles.container}>
      <Navigation userRole="warden" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Reports &amp; Analytics</h1>
            <p className={styles.subtitle}>View detailed hostel reports and performance metrics</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.periodSelector}>
              <Calendar size={18} />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={styles.select}
              >
                <option value="January 2024">January 2024</option>
                <option value="December 2023">December 2023</option>
                <option value="November 2023">November 2023</option>
              </select>
            </div>
            <Button>
              <Download size={16} />
              Export All
            </Button>
          </div>
        </div>

        <div className={styles.quickStats}>
          <div className={styles.quickStatCard}>
            <Building size={24} />
            <div>
              <span className={styles.quickStatValue}>84%</span>
              <span className={styles.quickStatLabel}>Occupancy Rate</span>
            </div>
          </div>
          <div className={styles.quickStatCard}>
            <DollarSign size={24} />
            <div>
              <span className={styles.quickStatValue}>86.7%</span>
              <span className={styles.quickStatLabel}>Fee Collection</span>
            </div>
          </div>
          <div className={styles.quickStatCard}>
            <AlertCircle size={24} />
            <div>
              <span className={styles.quickStatValue}>80%</span>
              <span className={styles.quickStatLabel}>Complaint Resolution</span>
            </div>
          </div>
          <div className={styles.quickStatCard}>
            <Users size={24} />
            <div>
              <span className={styles.quickStatValue}>94.2%</span>
              <span className={styles.quickStatLabel}>Avg Attendance</span>
            </div>
          </div>
        </div>

        <div className={styles.reportsGrid}>
          {wardenReports.map((report) => {
            const ReportIcon = reportIcons[report.type];
            return (
              <div key={report.id} className={styles.reportCard}>
                <div className={styles.reportHeader}>
                  <div className={`${styles.reportIcon} ${styles[report.type]}`}>
                    <ReportIcon size={20} />
                  </div>
                  <div className={styles.reportInfo}>
                    <h3 className={styles.reportTitle}>{report.title}</h3>
                    <span className={styles.reportPeriod}>{report.period}</span>
                  </div>
                </div>

                <div className={styles.summaryGrid}>
                  {Object.entries(report.summary).map(([key, value]) => (
                    <div key={key} className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </span>
                      <span className={styles.summaryValue}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.reportFooter}>
                  <span className={styles.generatedAt}>
                    Generated: {new Date(report.generatedAt).toLocaleDateString("en-IN")}
                  </span>
                  <div className={styles.reportActions}>
                    <Button size="sm" variant="outline">
                      <BarChart3 size={14} />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Reports</h2>
          <div className={styles.quickReports}>
            <div className={styles.quickReportCard}>
              <h4>Daily Summary</h4>
              <p>Today&apos;s attendance, complaints, and activities</p>
              <Button size="sm">Generate</Button>
            </div>
            <div className={styles.quickReportCard}>
              <h4>Weekly Overview</h4>
              <p>This week&apos;s key metrics and trends</p>
              <Button size="sm">Generate</Button>
            </div>
            <div className={styles.quickReportCard}>
              <h4>Fee Defaulters</h4>
              <p>List of students with pending/overdue fees</p>
              <Button size="sm">Generate</Button>
            </div>
            <div className={styles.quickReportCard}>
              <h4>Maintenance Log</h4>
              <p>Pending and completed maintenance tasks</p>
              <Button size="sm">Generate</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
