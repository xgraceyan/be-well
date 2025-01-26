import { create } from "zustand";

export const PetStore = create((set) => ({
  pet_id: "",
  pet_mood: "",
  username: "",
  setPetInfo: (pet) => set(pet),
  // fetchPet: supabase function here
  // set({ })
}));