import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("ruyani_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem("ruyani_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ruyani_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const whatsappCheckout = () => {
    const WHATSAPP_NUMBER = "919629888703";
    const message = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} (Qty: ${item.qty}) - Rs.${
            item.price * item.qty
          }`
      )
      .join("\n");

    const finalMessage = `Hello Ruyani,
  
  I would like to order:
  
  ${message}
  
  Total: Rs.${getTotal()}
  
  Please confirm availability.`;

    const encodedMessage = encodeURIComponent(finalMessage);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        getTotal,
        whatsappCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
