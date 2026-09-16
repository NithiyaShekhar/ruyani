import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("ruyani_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout form state
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("ruyani_cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      const currentQty = exist ? exist.qty : 0;
      const newQty = currentQty + quantity;

      // Check stock
      if (product.stock_quantity <= 0) {
        alert("This product is out of stock.");
        return prev;
      }

      if (newQty > product.stock_quantity) {
        alert(`Only ${product.stock_quantity} items are available in stock.`);
        return prev;
      }

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: newQty }
            : item
        );
      }

      return [...prev, { ...product, qty: quantity }];
    });
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        console.log("Current quantity:", item.qty);
        console.log("Available stock:", item.stock_quantity);

        if (item.qty >= Number(item.stock_quantity)) {
          alert(`Only ${item.stock_quantity} items are available in stock.`);
          return item;
        }

        return {
          ...item,
          qty: item.qty + 1,
        };
      })
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove product
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const getTotal = () =>
    cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

  // Open checkout form
  const openCheckoutForm = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setShowCheckoutForm(true);
  };

  // Close checkout form
  const closeCheckoutForm = () => {
    setShowCheckoutForm(false);
  };

  // WhatsApp checkout
  const whatsappCheckout = async (
    customerName,
    customerPhone,
    customerAddress
  ) => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch(
        "https://ruyani-backend.onrender.com/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: customerAddress,
            items: cart.map((item) => ({
              product_id: item.id,
              quantity: item.qty,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Unable to place order.");
        return;
      }

      // Prepare WhatsApp message
      const message = cart
        .map(
          (item, i) =>
            `${i + 1}. ${item.name} (Qty: ${item.qty}) - Rs.${
              item.price * item.qty
            }`
        )
        .join("\n");

      const finalMessage = `Hello Ruyani,

I would like to place an order.

Customer Name: ${customerName}
Phone: ${customerPhone}
Delivery Address: ${customerAddress}

${message}

Total: Rs.${data.total_amount}

Order ID: ${data.order_id}

Please confirm my order.`;

      const encodedMessage = encodeURIComponent(finalMessage);

      // Clear cart
      setCart([]);
      setIsCartOpen(false);
      setShowCheckoutForm(false);

      // Clear form fields
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");

      // Open WhatsApp
      window.location.href =
        `https://wa.me/919629888703?text=${encodedMessage}`;

    } catch (error) {
      console.error("Order error:", error);
      alert("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        // Cart
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        getTotal,

        // Checkout
        showCheckoutForm,
        setShowCheckoutForm,
        openCheckoutForm,
        closeCheckoutForm,

        // Customer details
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        customerAddress,
        setCustomerAddress,

        // Order
        whatsappCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};