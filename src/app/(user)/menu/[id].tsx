import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { useState } from "react";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { defaultPizzaImage } from "@/src/components/CartListItem";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("XL");

  const { addItem } = useCart();
  const { data, isLoading, error } = useProduct(id!.toString());

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (!data) return <Text>Producto no encontrado</Text>;

  const addToCart = () => {
    if (!data) return;
    addItem(data, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: data?.name, headerBackTitle: "Menu" }} />
      <Image
        source={{ uri: data?.image ? data.image : defaultPizzaImage }}
        style={styles.image}
      />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text style={styles.sizeText}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${data?.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
});

export default ProductDetailsScreen;
