import { create } from 'zustand';

type ViewMode = 'login' | 'signup';

interface LandingStore {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  logoUrl: string | null;
  setLogoUrl: (url: string) => void;
}

export const useLandingStore = create<LandingStore>((set) => ({
  view: "signup",
  setView: (view) => set({ view }),
  logoUrl: null,
  setLogoUrl: (url) => set({ logoUrl: url }),
}));