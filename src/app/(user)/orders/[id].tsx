import { View, Text, StyleSheet, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemList";
import OrderListItem from "../../../components/OrderListItem";
import { useOrderDetails } from "@/src/api/orders";
import { useOrderDetailsItems } from "@/src/api/orders-items";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: order, error, isLoading } = useOrderDetails(id!.toString());

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.num_order}` }} />

      <FlatList
        data={order.orders_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
