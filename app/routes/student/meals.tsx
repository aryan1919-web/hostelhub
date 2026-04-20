import type { Route } from "./+types/meals";
import { useState } from "react";
import { UtensilsCrossed, Coffee, Sun, Cookie, Moon, Clock, Info } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { mockMealSchedule } from "~/data/mock-data";
import styles from "./meals.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meal Schedule - HostelHub" },
    { name: "description", content: "View weekly mess menu and meal timings" },
  ];
}

const mealTimings = {
  breakfast: "7:30 AM - 9:00 AM",
  lunch: "12:30 PM - 2:00 PM",
  snacks: "5:00 PM - 6:00 PM",
  dinner: "8:00 PM - 9:30 PM",
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = dayNames[new Date().getDay()];

export default function MealSchedule() {
  const [selectedDay, setSelectedDay] = useState(today);
  const todayMeal = mockMealSchedule.find((m) => m.day === selectedDay);

  return (
    <div className={styles.container}>
      <Navigation userRole="student" />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Meal Schedule</h1>
            <p className={styles.subtitle}>Weekly mess menu and timings</p>
          </div>
        </div>

        <div className={styles.timingsCard}>
          <h2 className={styles.timingsTitle}>
            <Clock className={styles.timingsIcon} />
            Meal Timings
          </h2>
          <div className={styles.timingsGrid}>
            <div className={styles.timingItem}>
              <Coffee className={styles.mealIcon} />
              <div>
                <span className={styles.mealName}>Breakfast</span>
                <span className={styles.mealTime}>{mealTimings.breakfast}</span>
              </div>
            </div>
            <div className={styles.timingItem}>
              <Sun className={styles.mealIcon} />
              <div>
                <span className={styles.mealName}>Lunch</span>
                <span className={styles.mealTime}>{mealTimings.lunch}</span>
              </div>
            </div>
            <div className={styles.timingItem}>
              <Cookie className={styles.mealIcon} />
              <div>
                <span className={styles.mealName}>Snacks</span>
                <span className={styles.mealTime}>{mealTimings.snacks}</span>
              </div>
            </div>
            <div className={styles.timingItem}>
              <Moon className={styles.mealIcon} />
              <div>
                <span className={styles.mealName}>Dinner</span>
                <span className={styles.mealTime}>{mealTimings.dinner}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.menuSection}>
          <div className={styles.daySelector}>
            {mockMealSchedule.map((meal) => (
              <button
                key={meal.day}
                className={`${styles.dayButton} ${selectedDay === meal.day ? styles.dayButtonActive : ""} ${meal.day === today ? styles.dayButtonToday : ""}`}
                onClick={() => setSelectedDay(meal.day)}
              >
                {meal.day.slice(0, 3)}
                {meal.day === today && <span className={styles.todayDot} />}
              </button>
            ))}
          </div>

          {todayMeal && (
            <div className={styles.menuCard}>
              <div className={styles.menuHeader}>
                <h2 className={styles.menuTitle}>
                  <UtensilsCrossed className={styles.menuTitleIcon} />
                  {selectedDay}&apos;s Menu
                </h2>
                {selectedDay === today && (
                  <span className={styles.todayBadge}>Today</span>
                )}
              </div>

              <div className={styles.menuGrid}>
                <div className={styles.menuItem}>
                  <div className={styles.menuItemHeader}>
                    <Coffee className={styles.menuItemIcon} />
                    <h3 className={styles.menuItemTitle}>Breakfast</h3>
                    <span className={styles.menuItemTime}>{mealTimings.breakfast}</span>
                  </div>
                  <p className={styles.menuItemContent}>{todayMeal.breakfast}</p>
                </div>

                <div className={styles.menuItem}>
                  <div className={styles.menuItemHeader}>
                    <Sun className={styles.menuItemIcon} />
                    <h3 className={styles.menuItemTitle}>Lunch</h3>
                    <span className={styles.menuItemTime}>{mealTimings.lunch}</span>
                  </div>
                  <p className={styles.menuItemContent}>{todayMeal.lunch}</p>
                </div>

                <div className={styles.menuItem}>
                  <div className={styles.menuItemHeader}>
                    <Cookie className={styles.menuItemIcon} />
                    <h3 className={styles.menuItemTitle}>Snacks</h3>
                    <span className={styles.menuItemTime}>{mealTimings.snacks}</span>
                  </div>
                  <p className={styles.menuItemContent}>{todayMeal.snacks}</p>
                </div>

                <div className={styles.menuItem}>
                  <div className={styles.menuItemHeader}>
                    <Moon className={styles.menuItemIcon} />
                    <h3 className={styles.menuItemTitle}>Dinner</h3>
                    <span className={styles.menuItemTime}>{mealTimings.dinner}</span>
                  </div>
                  <p className={styles.menuItemContent}>{todayMeal.dinner}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.infoCard}>
          <Info className={styles.infoIcon} />
          <div>
            <h3 className={styles.infoTitle}>Important Notes</h3>
            <ul className={styles.infoList}>
              <li>Menu is subject to change based on availability</li>
              <li>Special meals on festivals and occasions</li>
              <li>For dietary restrictions, contact the mess manager</li>
              <li>Feedback can be submitted through the feedback section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
