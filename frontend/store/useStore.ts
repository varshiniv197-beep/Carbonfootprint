import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUsers, saveUser, findUser, UserAccount } from '@/utils/db';

interface FootprintData {
  transport: number;
  energy: number;
  diet: number;
  habits: number;
}

interface UserState {
  name: string;
  score: number;
  level: string;
  footprintData: FootprintData;
  isLoggedIn: boolean;
  hasCalculated: boolean;
  isOfflineMode: boolean;
  setFootprintData: (data: Partial<FootprintData>) => Promise<void>;
  addPoints: (points: number) => void;
  login: (name: string, passwordHash: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, passwordHash: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  completeCalculator: () => Promise<void>;
  localRegisterFallback: (name: string, passwordHash: string) => { success: boolean; error?: string };
  localLoginFallback: (name: string, passwordHash: string) => { success: boolean; error?: string };
}

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: '',
      score: 0,
      level: 'Novice',
      footprintData: {
        transport: 0,
        energy: 0,
        diet: 0,
        habits: 0,
      },
      isLoggedIn: false,
      hasCalculated: false,
      isOfflineMode: false,
      
      setFootprintData: async (data) => {
        const state = get();
        const newData = { ...state.footprintData, ...data };
        
        // Compute Carbon Score
        const total = newData.transport + newData.energy + newData.diet + newData.habits;
        let newScore = 100;
        if (total > 200) newScore = 30;
        else if (total > 150) newScore = 50;
        else if (total > 100) newScore = 70;
        else if (total > 50) newScore = 85;
        else if (total > 0) newScore = 95;

        const newLevel = newScore > 80 ? 'Climate Champion' : newScore > 50 ? 'Eco Advocate' : 'Green Cadet';

        set({
          footprintData: newData,
          score: newScore,
          level: newLevel
        });

        if (state.isLoggedIn && state.name) {
          if (state.isOfflineMode) {
            // Offline sync directly
            const user = findUser(state.name);
            if (user) {
              user.footprintData = newData;
              user.score = newScore;
              saveUser(user);
            }
          } else {
            try {
              const res = await fetch('/api/footprint', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: state.name, footprintData: newData, score: newScore })
              });
              if (!res.ok) throw new Error('API Sync failed');
            } catch (e) {
              // Fallback to local DB cache
              const user = findUser(state.name);
              if (user) {
                user.footprintData = newData;
                user.score = newScore;
                saveUser(user);
              }
            }
          }
        }
      },

      addPoints: (points) =>
        set((state) => ({
          score: Math.min(100, state.score + points),
        })),

      localRegisterFallback: (name, passwordHash) => {
        const existing = findUser(name);
        if (!existing) {
          const newUser: UserAccount = {
            username: name,
            passwordHash,
            hasCalculated: false,
            score: 0,
            footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 }
          };
          saveUser(newUser);
          set({
            isLoggedIn: true,
            name,
            hasCalculated: false,
            footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 },
            score: 0,
            level: 'Novice',
            isOfflineMode: true
          });
          return { success: true };
        }
        return { success: false, error: 'Username already exists in local database.' };
      },

      localLoginFallback: (name, passwordHash) => {
        const user = findUser(name);
        if (user && user.passwordHash === passwordHash) {
          set({
            isLoggedIn: true,
            name: user.username,
            hasCalculated: user.hasCalculated,
            footprintData: user.footprintData,
            score: user.score,
            isOfflineMode: true
          });
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials in local database.' };
      },

      login: async (name, passwordHash) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: name, password: passwordHash })
          });
          
          if (res.ok) {
            const data = await res.json();
            set({
              isLoggedIn: true,
              name: data.username,
              hasCalculated: data.hasCalculated,
              footprintData: data.footprintData,
              score: data.score,
              isOfflineMode: false
            });
            return { success: true };
          } else {
            const errData = await res.json().catch(() => ({}));
            // If server-side database error, fallback to local DB instantly
            if (res.status === 500 || errData.error === 'Database Connection Error') {
              console.warn('MongoDB offline, falling back to Local DB cache.');
              return get().localLoginFallback(name, passwordHash);
            }
            return { success: false, error: errData.error || 'Authentication failed' };
          }
        } catch (e) {
          // Network fail
          return get().localLoginFallback(name, passwordHash);
        }
      },

      register: async (name, passwordHash) => {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: name, password: passwordHash })
          });

          if (res.ok) {
            set({
              isLoggedIn: true,
              name,
              hasCalculated: false,
              footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 },
              score: 0,
              level: 'Novice',
              isOfflineMode: false
            });
            return { success: true };
          } else {
            const errData = await res.json().catch(() => ({}));
            // If server-side database error, fallback to local DB instantly
            if (res.status === 500 || errData.error === 'Database Connection Error') {
              console.warn('MongoDB offline, falling back to Local DB cache.');
              return get().localRegisterFallback(name, passwordHash);
            }
            return { success: false, error: errData.error || 'Registration failed' };
          }
        } catch (e) {
          // Network fail
          return get().localRegisterFallback(name, passwordHash);
        }
      },

      logout: () =>
        set({
          isLoggedIn: false,
          name: '',
          hasCalculated: false,
          footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 },
          score: 0,
          level: 'Novice',
          isOfflineMode: false
        }),

      completeCalculator: async () => {
        const state = get();
        set({ hasCalculated: true });
        
        if (state.isLoggedIn && state.name) {
          if (state.isOfflineMode) {
            const user = findUser(state.name);
            if (user) {
              user.hasCalculated = true;
              saveUser(user);
            }
          } else {
            try {
              await fetch('/api/footprint', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: state.name, footprintData: state.footprintData, score: state.score })
              });
            } catch (e) {
              const user = findUser(state.name);
              if (user) {
                user.hasCalculated = true;
                saveUser(user);
              }
            }
          }
        }
      }
    }),
    {
      name: 'terrasync-storage',
    }
  )
);
