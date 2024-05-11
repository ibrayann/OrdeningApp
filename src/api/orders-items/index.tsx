import { InsertTables } from "./../../types";
import { Tables } from "@/src/database.types";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(items: InsertTables<"orders_items">[]) {
      const { data: NewOrder, error } = await supabase
        .from("orders_items")
        .insert(items)
        .select();

      console.log(error);
      if (error) {
        throw new Error(error.message);
      }
      return NewOrder;
    },
  });
};

export const useOrderDetailsItems = (id: string) => {
  return useQuery({
    queryKey: ["orders_items", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders_items")
        .select("*")
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
