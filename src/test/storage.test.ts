import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredItem, setStoredItem, removeStoredItem, clearAllAppData, STORAGE_KEYS } from '../utils/storage';

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves serialized data accurately', () => {
    const testData = { name: 'Joineazy Test', count: 42 };
    setStoredItem('test_key', testData);

    const retrieved = getStoredItem('test_key', null);
    expect(retrieved).toEqual(testData);
  });

  it('returns default fallback value when key does not exist', () => {
    const fallback = { fallback: true };
    const retrieved = getStoredItem('non_existent_key', fallback);
    expect(retrieved).toEqual(fallback);
  });

  it('handles corrupted JSON safely without crashing', () => {
    localStorage.setItem('corrupted_key', '{bad json');
    const fallback = 'safe_fallback';
    const retrieved = getStoredItem('corrupted_key', fallback);
    expect(retrieved).toBe(fallback);
  });

  it('removes stored items cleanly', () => {
    setStoredItem('key_to_remove', 'test');
    removeStoredItem('key_to_remove');
    expect(getStoredItem('key_to_remove', null)).toBeNull();
  });

  it('clears all app storage keys', () => {
    setStoredItem(STORAGE_KEYS.USERS, []);
    setStoredItem(STORAGE_KEYS.ASSIGNMENTS, []);
    clearAllAppData();
    expect(getStoredItem(STORAGE_KEYS.USERS, null)).toBeNull();
  });
});
