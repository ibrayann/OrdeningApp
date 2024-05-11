import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/src/components/ProductList";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const router = useRouter();

  const { data: updatingProduct } = useProduct(id?.toString());
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const validateInput = () => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push("Name is required");
    }

    if (!price.trim()) {
      newErrors.push("Price is required");
    } else if (
      isNaN(Number(price.trim())) ||
      !/^\d+(\.\d{1,2})?$/.test(price.trim())
    ) {
      newErrors.push("Price should be a valid number");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    insertProduct(
      {
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };
  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    updateProduct({
      id: id && id.toString(),
      name,
      price: parseFloat(price),
      image,
    });
    setName("");
    setPrice("");
    setImage("");
    router.back();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onSubmitDelete = () => {
    console.log("Deleting product with ID:", id);
    Alert.alert("Delete", "Are you sure you want to delete this dish?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          onDelete();
        },
      },
    ]);
  };

  const onDelete = () => {
    deleteProduct(id.toString(), {
      onSuccess: () => {
        router.replace("/(admin)");
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? "Update" : "Create" }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={onSubmitDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateScreen;
