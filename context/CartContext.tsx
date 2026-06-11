"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("homebliss-cart");

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);

        const normalizedCart: CartItem[] = parsedCart
          .map((item: CartItem) => ({
            ...item,
            id: String(item.id),
            price: Number(item.price),
            quantity: Number(item.quantity),
          }))
          .filter(
            (item: CartItem) =>
              item.id &&
              item.name &&
              item.image &&
              Number.isFinite(item.price) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
          )
          .map((item: CartItem) => ({
            ...item,
            quantity: Math.min(item.quantity, 20),
          }));

        setCartItems(normalizedCart);
      } catch {
        localStorage.removeItem("homebliss-cart");
        setCartItems([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("homebliss-cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.min(20, Number(quantity) || 1));

    const normalizedItem = {
      ...item,
      id: String(item.id),
      price: Number(item.price),
    };

    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.id === normalizedItem.id
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === normalizedItem.id
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + safeQuantity, 20),
              }
            : cartItem
        );
      }

      return [...prev, { ...normalizedItem, quantity: safeQuantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== String(id)));
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === String(id)
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, 20),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === String(id)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("homebliss-cart");
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}