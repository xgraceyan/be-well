import create from "zustand";

export const useTasksStore = create((set) => ({
  tasks: [],
  // fetchTasks: put your supabase function here
  // set({ tasks: supabaseData })
}));
