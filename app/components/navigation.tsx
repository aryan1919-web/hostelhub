import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  Home,
  Bell,
  FileText,
  DollarSign,
  BookOpen,
  Phone,
  LayoutDashboard,
  Menu,
  X,
  User,
  UtensilsCrossed,
  Calendar,
  Users,
  MessageSquare,
  Search,
  Dumbbell,
  Download,
  ArrowRightLeft,
  Shirt,
  ChevronDown,
  ClipboardCheck,
  UserCheck,
  Building,
  BarChart3,
  Package,
  Shield,
  Settings,
} from "lucide-react";
import classNames from "classnames";
import styles from "./navigation.module.css";
import { Button } from "./ui/button/button";

interface NavigationProps {
  /**
   * The user role to determine which navigation items to show
   * @important
   * @enum student,warden,public
   */
  userRole?: "student" | "warden" | "public";
  className?: string;
}

export function Navigation({ userRole = "public", className }: NavigationProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/pricing", label: "Pricing", icon: DollarSign },
    { to: "/product", label: "Pro Plan", icon: Package },
    { to: "/splash", label: "About", icon: User },
    { to: "/login", label: "Login", icon: LayoutDashboard },
  ];

  const studentMainLinks = [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/notices", label: "Notices", icon: Bell },
    { to: "/student/meals", label: "Meals", icon: UtensilsCrossed },
    { to: "/student/leave", label: "Leave", icon: Calendar },
  ];

  const studentMoreLinks = [
    { to: "/student/profile", label: "Profile", icon: User },
    { to: "/student/fees", label: "Fees", icon: DollarSign },
    { to: "/student/complaints", label: "Complaints", icon: FileText },
    { to: "/student/room-change", label: "Room Change", icon: ArrowRightLeft },
    { to: "/student/visitors", label: "Visitors", icon: Users },
    { to: "/student/laundry", label: "Laundry", icon: Shirt },
    { to: "/student/events", label: "Events", icon: Calendar },
    { to: "/student/residents", label: "Residents", icon: Users },
    { to: "/student/feedback", label: "Feedback", icon: MessageSquare },
    { to: "/student/lost-found", label: "Lost & Found", icon: Search },
    { to: "/student/amenities", label: "Amenities", icon: Dumbbell },
    { to: "/student/documents", label: "Documents", icon: Download },
    { to: "/student/security", label: "Security", icon: Shield },
    { to: "/student/security-settings", label: "Security Settings", icon: Settings },
    { to: "/student/rules", label: "Rules", icon: BookOpen },
    { to: "/student/emergency", label: "Emergency", icon: Phone },
  ];

  const wardenMainLinks = [
    { to: "/warden/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/warden/leave-approvals", label: "Leaves", icon: ClipboardCheck },
    { to: "/warden/visitor-approvals", label: "Visitors", icon: UserCheck },
    { to: "/warden/complaints", label: "Complaints", icon: FileText },
  ];

  const wardenMoreLinks = [
    { to: "/warden/students", label: "Students", icon: Users },
    { to: "/warden/rooms", label: "Rooms", icon: Building },
    { to: "/warden/notices", label: "Notices", icon: Bell },
    { to: "/warden/fees", label: "Fees", icon: DollarSign },
    { to: "/warden/attendance", label: "Attendance", icon: UserCheck },
    { to: "/warden/events", label: "Events", icon: Calendar },
    { to: "/warden/reports", label: "Reports", icon: BarChart3 },
    { to: "/warden/lost-found", label: "Lost & Found", icon: Package },
    { to: "/warden/staff", label: "Staff", icon: Users },
    { to: "/warden/audit-log", label: "Audit Log", icon: Shield },
  ];

  const mainLinks = userRole === "student" ? studentMainLinks : userRole === "warden" ? wardenMainLinks : publicLinks;
  const moreLinks = userRole === "student" ? studentMoreLinks : userRole === "warden" ? wardenMoreLinks : [];
  const allStudentLinks = [...studentMainLinks, ...studentMoreLinks];
  const allWardenLinks = [...wardenMainLinks, ...wardenMoreLinks];

  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Home className={styles.logoIcon} />
          <span>HostelHub</span>
        </Link>

        <nav className={styles.nav}>
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={classNames(styles.navLink, {
                  [styles.navLinkActive]: isActive(link.to),
                })}
              >
                <Icon className={styles.navIcon} />
                {link.label}
              </Link>
            );
          })}

          {(userRole === "student" || userRole === "warden") && (
            <div className={styles.moreDropdown}>
              <button
                className={classNames(styles.navLink, styles.moreButton, {
                  [styles.navLinkActive]: moreLinks.some((link) => isActive(link.to)),
                })}
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              >
                More
                <ChevronDown className={classNames(styles.navIcon, { [styles.chevronRotated]: moreMenuOpen })} />
              </button>

              {moreMenuOpen && (
                <>
                  <div className={styles.dropdownOverlay} onClick={() => setMoreMenuOpen(false)} />
                  <div className={styles.dropdownMenu}>
                    {moreLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={classNames(styles.dropdownItem, {
                            [styles.dropdownItemActive]: isActive(link.to),
                          })}
                          onClick={() => setMoreMenuOpen(false)}
                        >
                          <Icon className={styles.dropdownIcon} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </nav>

        <Button
          variant="outline"
          size="icon"
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {(userRole === "student" ? allStudentLinks : userRole === "warden" ? allWardenLinks : mainLinks).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={classNames(styles.mobileNavLink, {
                  [styles.mobileNavLinkActive]: isActive(link.to),
                })}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className={styles.mobileNavIcon} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
