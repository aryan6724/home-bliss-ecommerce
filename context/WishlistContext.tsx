"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("homebliss-wishlist");

    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);

        const normalizedWishlist: WishlistItem[] = parsedWishlist.map(
          (item: WishlistItem) => ({
            ...item,
            id: String(item.id),
            price: Number(item.price),
          })
        );

        setWishlistItems(normalizedWishlist);
      } catch {
        localStorage.removeItem("homebliss-wishlist");
        setWishlistItems([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "homebliss-wishlist",
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems, isLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    const normalizedItem = {
      ...item,
      id: String(item.id),
      price: Number(item.price),
    };

    setWishlistItems((prev) => {
      const exists = prev.find(
        (wishlistItem) => wishlistItem.id === normalizedItem.id
      );

      if (exists) {
        return prev;
      }

      return [...prev, normalizedItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== String(id))
    );
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === String(id));
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}