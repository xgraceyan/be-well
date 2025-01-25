import create from "zustand";
const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
// impurt user id from the login/auth

let { data: Pet, error } = await supabase
  .from('Pet')
  .select('pet_id')

export const useTasksStore = create((set) => ({
  tasks: [],

  
  

  // fetchTasks: put your supabase function here
  // set({ tasks: supabaseData })
}));
