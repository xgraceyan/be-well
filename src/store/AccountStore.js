import { create } from "zustand";

export const AccountStore = create((set) => ({
    account_name: "",
    account_email: "",
    account_uuid: "",
    setAccount: (account) => set(account),
    // fetchPet: supabase function here
    // set({ })
}));
