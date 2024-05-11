import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ProductList } from "@/src/components/ProductList";
import { useProduct, useProducts } from "@/src/api/products";

export default function TabOneScreen() {
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
