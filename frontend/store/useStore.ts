import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FootprintData {
  transport: number;
  energy: number;
  diet: number;
  shopping: number;
}

interface UserState {
  name: string;
  score: number;
  level: string;
  footprintData: FootprintData;
  isLoggedIn: boolean;
  setFootprintData: (data: Partial<FootprintData>) => void;
  addPoints: (points: number) => void;
  login: (name: string) => void;
  logout: () => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      name: 'Eco Warrior',
      score: 84,
      level: 'Climate Champion',
      footprintData: {
        transport: 45,
        energy: 82,
        diet: 30,
        shopping: 20,
      },
      isLoggedIn: false,
      setFootprintData: (data) =>
        set((state) => ({
          footprintData: { ...state.footprintData, ...data },
        })),
      addPoints: (points) =>
        set((state) => ({
          score: Math.min(100, state.score + points),
        })),
      login: (name) => set({ isLoggedIn: true, name }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'terrasync-storage',
    }
  )
);
