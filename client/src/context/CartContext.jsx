import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      syncFromServer();
    }
  }, [user]);

  const persist = (data) => {
    setItems(data);
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const syncFromServer = async () => {
    try {
      const res = await api.get("/cart");
      persist(res.data.data?.items || []);
    } catch {
      // ignore
    }
  };

  const addItem = async (productId, quantity = 1) => {
    if (user) {
      await api.post("/cart", { productId, quantity });
      await syncFromServer();
    } else {
      const existing = items.find((i) => i.productId === productId);
      const next = existing
        ? items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...items, { productId, quantity }];
      persist(next);
    }
  };

  const updateItem = async (productId, quantity) => {
    if (user) {
      await api.put("/cart/update", { productId, quantity });
      await syncFromServer();
    } else {
      persist(items.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
    }
  };

  const removeItem = async (productId) => {
    if (user) {
      await api.delete(`/cart/remove/${productId}`);
      await syncFromServer();
    } else {
      persist(items.filter((i) => i.productId !== productId));
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, syncFromServer }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);





