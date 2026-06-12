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
  setFootprintData: (data: Partial<FootprintData>) => void;
  addPoints: (points: number) => void;
  login: (name: string) => boolean;
  register: (name: string, passwordHash: string) => boolean;
  logout: () => void;
  completeCalculator: () => void;
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
      setFootprintData: (data) => {
        set((state) => {
          const newData = { ...state.footprintData, ...data };
          
          // Calculate score based on total emissions
          const total = newData.transport + newData.energy + newData.diet + newData.habits;
          let newScore = 100;
          if (total > 200) newScore = 30;
          else if (total > 150) newScore = 50;
          else if (total > 100) newScore = 70;
          else if (total > 50) newScore = 85;
          else if (total > 0) newScore = 95;

          const newLevel = newScore > 80 ? 'Climate Champion' : newScore > 50 ? 'Eco Advocate' : 'Green Cadet';

          // Sync to db if logged in
          if (state.isLoggedIn && state.name) {
            const user = findUser(state.name);
            if (user) {
              user.footprintData = newData;
              user.score = newScore;
              saveUser(user);
            }
          }

          return {
            footprintData: newData,
            score: newScore,
            level: newLevel
          };
        });
      },
      addPoints: (points) =>
        set((state) => ({
          score: Math.min(100, state.score + points),
        })),
      login: (name) => {
        const user = findUser(name);
        if (user) {
          set({
            isLoggedIn: true,
            name: user.username,
            hasCalculated: user.hasCalculated,
            footprintData: user.footprintData,
            score: user.score
          });
          return true;
        }
        return false;
      },
      register: (name, passwordHash) => {
        const existing = findUser(name);
        if (existing) return false;

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
          level: 'Novice'
        });
        return true;
      },
      logout: () =>
        set({
          isLoggedIn: false,
          name: '',
          hasCalculated: false,
          footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 },
          score: 0,
          level: 'Novice'
        }),
      completeCalculator: () => {
        set((state) => {
          if (state.isLoggedIn && state.name) {
            const user = findUser(state.name);
            if (user) {
              user.hasCalculated = true;
              saveUser(user);
            }
          }
          return { hasCalculated: true };
        });
      }
    }),
    {
      name: 'terrasync-storage',
    }
  )
);
