import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Tables } from "../types";
import { Link, useSegments } from "expo-router";

type PropsProductItemList = {
  item: Tables<"products">;
};

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

export const ProductList = ({ item }: PropsProductItemList) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${item.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: item.image || defaultPizzaImage }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>${item.price}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 15,
    flex: 1,
    backgroundColor: "white",
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.light.tint,
  },
});
