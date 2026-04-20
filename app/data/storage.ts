/**
 * LocalStorage Persistence Service
 *
 * Provides CRUD operations with localStorage persistence for all data models.
 * Falls back to mock data on first load, then persists all changes locally.
 */

const STORAGE_PREFIX = "hostelhub_";

function getStorageKey(entity: string): string {
  return `${STORAGE_PREFIX}${entity}`;
}

/**
 * Initialize an entity in localStorage with seed data if not already present.
 */
export function initializeEntity<T>(entity: string, seedData: T[]): T[] {
  const key = getStorageKey(entity);
  const existing = localStorage.getItem(key);

  if (existing) {
    try {
      return JSON.parse(existing) as T[];
    } catch {
      // Corrupted data — re-seed
      localStorage.setItem(key, JSON.stringify(seedData));
      return seedData;
    }
  }

  localStorage.setItem(key, JSON.stringify(seedData));
  return seedData;
}

/**
 * Get all items for an entity.
 */
export function getAll<T>(entity: string): T[] {
  const key = getStorageKey(entity);
  const data = localStorage.getItem(key);

  if (!data) return [];

  try {
    return JSON.parse(data) as T[];
  } catch {
    return [];
  }
}

/**
 * Get a single item by ID.
 */
export function getById<T extends { id: string }>(entity: string, id: string): T | undefined {
  const items = getAll<T>(entity);
  return items.find((item) => item.id === id);
}

/**
 * Create a new item.
 */
export function create<T extends { id: string }>(entity: string, item: T): T {
  const items = getAll<T>(entity);
  items.push(item);
  localStorage.setItem(getStorageKey(entity), JSON.stringify(items));
  return item;
}

/**
 * Update an existing item by ID.
 */
export function update<T extends { id: string }>(entity: string, id: string, updates: Partial<T>): T | undefined {
  const items = getAll<T>(entity);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return undefined;

  items[index] = { ...items[index], ...updates };
  localStorage.setItem(getStorageKey(entity), JSON.stringify(items));
  return items[index];
}

/**
 * Delete an item by ID.
 */
export function remove<T extends { id: string }>(entity: string, id: string): boolean {
  const items = getAll<T>(entity);
  const filtered = items.filter((item) => item.id !== id);

  if (filtered.length === items.length) return false;

  localStorage.setItem(getStorageKey(entity), JSON.stringify(filtered));
  return true;
}

/**
 * Clear all data for an entity (reset to empty).
 */
export function clearEntity(entity: string): void {
  localStorage.removeItem(getStorageKey(entity));
}

/**
 * Reset an entity to its seed data.
 */
export function resetEntity<T>(entity: string, seedData: T[]): T[] {
  localStorage.setItem(getStorageKey(entity), JSON.stringify(seedData));
  return seedData;
}

/**
 * Generate a unique ID for new items.
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Entity names for consistent key usage across the app.
 */
export const ENTITIES = {
  COMPLAINTS: "complaints",
  NOTICES: "notices",
  FEES: "fees",
  RULES: "rules",
  EMERGENCY_CONTACTS: "emergency_contacts",
  LEAVE_APPLICATIONS: "leave_applications",
  MEALS: "meal_schedule",
  VISITORS: "visitors",
  LAUNDRY: "laundry",
  EVENTS: "events",
  RESIDENTS: "residents",
  FEEDBACK: "feedback",
  LOST_FOUND: "lost_found",
  AMENITY_BOOKINGS: "amenity_bookings",
  DOCUMENTS: "documents",
  ROOM_CHANGES: "room_changes",
  STUDENT_PROFILE: "student_profile",
} as const;
