import { StyleSheet, Text, View, FlatList } from "react-native";
import orders from "../../../../../assets/data/orders";
import OrderListItem from "../../../../components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  return (
    <>
      <Stack.Screen options={{ title: "Active" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
