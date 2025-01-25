import create from "zustand";

export const AccountStore = create((set) => ({
    account_name: "",
    account_email: "",
    account_uuid: "",
    // fetchPet: supabase function here
    // set({ })
}));
