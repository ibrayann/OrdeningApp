import React from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { OrderItem, Tables } from "../types";
import { defaultPizzaImage } from "./ProductList";
import { useUpdateOrder } from "../api/orders";

type OrderItemListItemProps = {
  item: { product: Tables<"products"> } & Tables<"orders_items">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  const colorScheme = useColorScheme(); // Moved inside component function
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === "dark" ? "rgba(255, 255, 255, 0.15)" : "white",
        },
      ]}
    >
      <Image
        source={{ uri: item.products.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.title, colorScheme === "dark" && { color: "white" }]}
        >
          {item.products.name}
        </Text>
        <View style={[styles.subtitleContainer]}>
          <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
          <Text style={colorScheme === "dark" && { color: "white" }}>
            Size: {item.size}
          </Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text
          style={[
            styles.quantity,
            ,
            colorScheme === "dark" && { color: "white" },
          ]}
        >
          {item.quantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
