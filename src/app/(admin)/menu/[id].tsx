import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  Link,
  Stack,
  router,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import products from "@/assets/data/products";
import { useState } from "react";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/ProductList";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("XL");

  const { addItem } = useCart();
  const { data: product, isLoading, error } = useProduct(id.toString());

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (!product) return <Text>Producto no encontrado</Text>;

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        options={{ title: product?.name, headerBackTitle: "Menu" }}
      />
      <Image
        source={{ uri: product?.image ? product.image : defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
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
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
