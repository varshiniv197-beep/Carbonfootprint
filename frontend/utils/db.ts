/**
 * Local Database Utility for TerraSync AI+
 * Simulates a PostgreSQL database using localStorage with custom table schemas
 */

export interface UserAccount {
  username: string;
  passwordHash: string;
  hasCalculated: boolean;
  score: number;
  footprintData: {
    transport: number;
    energy: number;
    diet: number;
    habits: number;
  };
}

const DB_KEY = 'terrasync_users_db';

export function getUsers(): Record<string, UserAccount> {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {};
}

export function saveUser(user: UserAccount): void {
  if (typeof window === 'undefined') return;
  const db = getUsers();
  db[user.username] = user;
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function findUser(username: string): UserAccount | null {
  const db = getUsers();
  return db[username] || null;
}
