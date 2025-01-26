import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { AccountStore } from "./store/AccountStore";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function usePetData() {
  const [petData, setPetData] = useState(null);
  const setAccount = AccountStore((state) => state.setAccount);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          console.error("Error fetching session or no session found:", error);
          return;
        }

        const userId = session.user.id;

        // Save accountUuid to AccountStore
        setAccount({
          account_uuid: userId,
          account_email: session.user.email,
        });

        // Call supabase to get pet name via accountUuid
        const { data: pet, error: petError } = await supabase
          .from("Pet")
          .select("username")
          .eq("pet_id", userId)
          .single();

        if (petError) {
          console.error("Error fetching pet data:", petError);
          return;
        }

        setPetData(pet);
      } catch (err) {
        console.error("Unexpected error fetching account UUID:", err);
      }
    };

    fetchAllData();
  }, [setAccount]); // Run only when `setAccount` changes

  return petData;
}
