import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { CartContext } from "@/src/providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CardScreen = () => {
  const { items, total, checkout } = useContext(CartContext);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text
        style={{
          textAlign: "left",
          marginVertical: 10,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Total: ${total.toFixed(2)}
      </Text>
      <Button text="Checkout" onPress={checkout} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({});
