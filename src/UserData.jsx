import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AccountStore } from "./store/AccountStore";
import { PetStore } from "./store/PetStore";
//import { TasksStore } from "./store/TasksStore";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


 function getData() {

    const setAccount = AccountStore((state) => state.setAccount);
    const setPetInfo = PetStore((state) => state.setPetInfo)
    const setTasks = TasksStore((state) => state.setTasksInfo)
    const accountUuid = AccountStore((state) => state.account_uuid); // Access accountUuid from the store

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
        
                // Extract the user ID (accountUuid) from the session
                const userId = session.user.id;
        
                // Save accountUuid to AccountStore
                setAccount({
                  account_uuid: userId,
                  account_email: session.user.email, // Optionally save the email
                });
              } catch (err) {
                console.error("Unexpected error fetching account UUID:", err);
              }
              if (userId) {
                var collection = []
                collection.concat(userId)
                collection.concat(session.Pet.name)
                collection.concat(session.Pet.mood)
                collection.concat(session)

                return collection
              }

        };

        
    }) 
    if (accountUuid) {
        fetchAllData();
    }

}
