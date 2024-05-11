import { InsertTables } from "./../../types";
import { Tables } from "@/src/database.types";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({ archived = false }) => {
  const statusValues = archived
    ? ["DELIVERED"]
    : ["NEW", "COOKING", "DELIVERING"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statusValues)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId }],
    queryFn: async () => {
      if (!userId) {
        return null;
      }
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, orders_items(*, products(*))")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const id = useAuth().session?.user.id;
  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { data: NewOrder, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: id })
        .select()
        .single();
      console.log(error);
      if (error) {
        throw new Error(error.message);
      }
      return NewOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
};
