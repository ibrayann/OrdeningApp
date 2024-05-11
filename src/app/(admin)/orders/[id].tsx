import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useColorScheme,
  BackHandler,
} from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import OrderItemListItem from "@/src/components/OrderItemList";
import OrderListItem from "../../../components/OrderListItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails } from "@/src/api/orders";
import { useEffect } from "react";

const OrderDetailScreen = () => {
  const colorScheme = useColorScheme();

  const { id } = useLocalSearchParams();

  const { data: order, error, isLoading } = useOrderDetails(id!.toString());

  console.log(order);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  console.log(order);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.num_order}` }} />

      <FlatList
        data={order.orders_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text
              style={[
                { fontWeight: "bold" },
                colorScheme === "dark" && { color: "white" },
              ]}
            >
              Status
            </Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
