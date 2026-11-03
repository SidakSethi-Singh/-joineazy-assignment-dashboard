/**
 * LocalStorage keys and helper functions with safe serialization and fallback
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'joineazy_current_user_id',
  USERS: 'joineazy_users',
  ASSIGNMENTS: 'joineazy_assignments',
  SUBMISSIONS: 'joineazy_submissions',
  THEME: 'joineazy_theme',
} as const;

export function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}

export function removeStoredItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
}

export function clearAllAppData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch (error) {
    console.error('Error clearing app data:', error);
  }
}

export { STORAGE_KEYS };
