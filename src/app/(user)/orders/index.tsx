import { StyleSheet, Text, View, FlatList } from "react-native";
import OrderListItem from "../../../components/OrderListItem";
import { Stack } from "expo-router";
import { useMyOrderList } from "@/src/api/orders";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
