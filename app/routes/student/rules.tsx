import type { Route } from "./+types/rules";
import { BookOpen, Shield, Home, DollarSign } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { mockRules } from "~/data/mock-data";
import styles from "./rules.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rules & Guidelines - HostelHub" },
    {
      name: "description",
      content: "Hostel rules, regulations, and guidelines",
    },
  ];
}

export default function Rules() {
  const categories = Array.from(new Set(mockRules.map((r) => r.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "General Conduct":
        return BookOpen;
      case "Safety & Security":
        return Shield;
      case "Room & Facilities":
        return Home;
      case "Fees & Payments":
        return DollarSign;
      default:
        return BookOpen;
    }
  };

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rules & Guidelines</h1>
          <p className={styles.subtitle}>Important hostel rules and regulations for a harmonious living environment</p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            const categoryRules = mockRules.filter((r) => r.category === category);

            return (
              <div key={category} className={styles.categoryCard}>
                <h2 className={styles.categoryTitle}>
                  <Icon className={styles.categoryIcon} />
                  {category}
                </h2>
                <div className={styles.rulesList}>
                  {categoryRules.map((rule) => (
                    <div key={rule.id} className={styles.ruleItem}>
                      <h3 className={styles.ruleTitle}>{rule.title}</h3>
                      <p className={styles.ruleDescription}>{rule.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
