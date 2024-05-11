import { ActivityIndicator, FlatList, Text } from "react-native";
import { View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import { ProductList } from "@/src/components/ProductList";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/src/lib/supabase";
import { useProducts } from "@/src/api/products";

export default function TabOneScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Menu",
      headerBackTitle: "Menu",
    });
  }, []);

  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No hay productos</Text>
          </View>
        )}
        data={data}
        renderItem={({ item }) => <ProductList item={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
