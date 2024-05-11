import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(product: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: product.name,
          image: product.image,
          price: product.price,
        })
        .single();
      console.log(error);
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};

// En useUpdateProduct
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(product: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: product.name,
          image: product.image,
          price: product.price,
        })
        .eq("id", product.id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess() {
      console.log("Update successful");
      // Invalida la consulta general de productos y la consulta específica del producto actualizado
      await queryClient.invalidateQueries(["products"]);
    },
    onError(error) {
      console.error("Error occurred during update:", error);
    },
  });
};

// En useDeleteProduct
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess(_, id) {
      console.log("Deletion successful");
      // Invalida la consulta específica del producto eliminado y la consulta general de productos
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["products", id]);
    },
    onError(error) {
      console.error("Error occurred during deletion:", error);
    },
  });
};
