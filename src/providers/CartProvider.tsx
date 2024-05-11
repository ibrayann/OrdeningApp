import {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";
import { CartItem, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/orders-items";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity: (id: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const NewCart: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([...items, NewCart]);
    console.log(items);
  };
  const updateQuantity = (id: string, amount: -1 | 1) => {
    const newItems = items
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const clear = () => {
    setItems([]);
  };

  const saveOrderItems = (data: Tables<"orders">) => {
    const listItems = items.map((item) => ({
      order_id: data.id,
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      size: item.size,
    }));

    insertOrderItems(listItems, {
      onSuccess: () => {
        clear(), router.replace(`/(user)/orders/${data.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
