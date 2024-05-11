import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Database } from "../database.types";
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://ljuspkmhdbxwpnuelaup.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXNwa21oZGJ4d3BudWVsYXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NzA0MjgsImV4cCI6MjAzMDQ0NjQyOH0.F10337gwSbm8QRSkZLXSF1gQJ0repAvbq4m50m1Cofw";
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
