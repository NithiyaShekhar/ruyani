import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./style.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { cart, isCartOpen, setIsCartOpen, addToCart, increaseQty, decreaseQty, removeItem, getTotal, whatsappCheckout } = useCart();
  const [preAddQty, setPreAddQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItem = cart.find((item) => item.id === product?.id);
  const currentQty = cartItem?.qty || 0;
  const stockQuantity = Number(product?.stock_quantity || 0);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://ruyani-backend.onrender.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div>Loading product...</div>;
  }
  
  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>{error || "Product not found"}</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
            <img src="/images/fav.png" alt="Ruyani Naturals Logo" className="nav-logo-icon" />
            RUYANI NATURALS
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </div>
        </ul>
      </nav>

      <div className="product-details-container" style={{ padding: "100px 20px", maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div className="product-details-image" style={{ flex: "1", minWidth: "300px" }}>
          <img 
            src={`/${product.img}`} 
            alt={product.name} 
            style={{ 
              width: "100%", 
              maxWidth: "500px", 
              borderRadius: "10px", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              display: "block",
              margin: "0 auto"
            }} 
          />
        </div>
        <div className="product-details-info" style={{ flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ color: "var(--primary-color)", margin: "0" }}>{product.name}</h1>
          {product.badge && <span className="product-badge" style={{ alignSelf: "flex-start", position: "static" }}>{product.badge}</span>}
          <div className="price" style={{ fontSize: "28px", color: "var(--primary-hover)", fontWeight: "600" }}>
            Rs. {product.price} {product.size && <span style={{ fontSize: "18px", color: "#666", fontWeight: "normal", marginLeft: "10px" }}>({product.size})</span>}
          </div>
          <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--text-color)" }}>{product.desc}</p>
          
          <div style={{ padding: "20px", backgroundColor: "#f9fbf8", borderRadius: "8px", border: "1px solid #e1e8dd", marginTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", color: "var(--primary-color)", fontSize: "20px" }}>Benefits</h3>
            <ul style={{ margin: "0", paddingLeft: "20px", lineHeight: "2", color: "var(--text-color)", fontSize: "16px" }}>
              {product.benefits && product.benefits.length > 0 ? (
                product.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{benefit}</li>
                ))
              ) : product.features && product.features.length > 0 ? (
                product.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{feature}</li>
                ))
              ) : (
                <>
                  <li style={{ marginBottom: "8px" }}>100% natural and handcrafted in small batches</li>
                  <li style={{ marginBottom: "8px" }}>Free from harsh chemicals, synthetic fragrances, and parabens</li>
                  <li style={{ marginBottom: "8px" }}>Cruelty-free and vegan friendly</li>
                  <li>Made with skin-loving oils & herbs to preserve natural goodness</li>
                </>
              )}
            </ul>
          </div>
          
          <div style={{ padding: "20px", backgroundColor: "#fff9f5", borderRadius: "8px", border: "1px solid #f2e6de", marginTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", color: "#d97743", fontSize: "20px" }}>How to Use</h3>
            <ol style={{ margin: "0", paddingLeft: "20px", lineHeight: "2", color: "var(--text-color)", fontSize: "16px" }}>
              {product.howToUse && product.howToUse.length > 0 ? (
                product.howToUse.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{step}</li>
                ))
              ) : (
                <>
                  <li style={{ marginBottom: "8px" }}>Take a small amount of the product.</li>
                  <li style={{ marginBottom: "8px" }}>Gently apply or massage onto the required area.</li>
                  <li style={{ marginBottom: "8px" }}>Use regularly for best results.</li>
                </>
              )}
            </ol>
          </div>
          
          {product.inStock === false ? (
            <button className="cta-btn disabled-btn" disabled style={{ marginTop: "20px", width: "fit-content", padding: "12px 30px", fontSize: "18px" }}>
              Out of Stock
            </button>
          ) : cartItem ? (
            <div
              className="cart-added-controls"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                display: "inline-flex",
              }}
            >
              <span
                className="added-text"
                style={{
                  fontSize: "18px",
                  padding: "12px 20px",
                }}
              >
                Added ✓
              </span>

              <div className="inline-qty" style={{ height: "48px" }}>
                <button
                  onClick={() => decreaseQty(product.id)}
                  style={{
                    width: "40px",
                    fontSize: "20px",
                  }}
                >
                  -
                </button>

                <span
                  className="qty-count"
                  style={{
                    width: "40px",
                    fontSize: "18px",
                  }}
                >
                  {currentQty}
                </span>

                <button
                  onClick={() => increaseQty(product.id)}
                  disabled={currentQty >= stockQuantity}
                  style={{
                    width: "40px",
                    fontSize: "20px",
                    cursor:
                      currentQty >= stockQuantity
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      currentQty >= stockQuantity ? 0.5 : 1,
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <div className="pre-add-qty-container" style={{ marginTop: "20px", display: "inline-flex", gap: "15px", alignItems: "center" }}>
              <div className="inline-qty" style={{ height: "48px" }}>
                <button onClick={() => preAddQty > 1 && setPreAddQty(preAddQty - 1)} style={{ width: "40px", fontSize: "20px" }}>-</button>
                <span className="qty-count" style={{ width: "40px", fontSize: "18px", textAlign: "center", display: "inline-block" }}>{preAddQty}</span>
                <button
                    onClick={() => {
                      if (preAddQty < product.stock_quantity) {
                        setPreAddQty(preAddQty + 1);
                      }
                    }}
                    disabled={preAddQty >= product.stock_quantity}
                    style={{
                      width: "40px",
                      fontSize: "20px",
                      cursor:
                        preAddQty >= product.stock_quantity
                          ? "not-allowed"
                          : "pointer",
                      opacity: preAddQty >= product.stock_quantity ? 0.5 : 1,
                    }}
                  >
                    +
                  </button>
              </div>
              <button className="cta-btn" onClick={() => addToCart(product, preAddQty)} style={{ width: "fit-content", padding: "12px 30px", fontSize: "18px", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>
          )}

          <Link to="/" className="cta-btn" style={{ 
            width: "fit-content", 
            textDecoration: "none", 
            marginTop: "10px", 
            display: "inline-block", 
            textAlign: "center",
            padding: "12px 30px",
            fontSize: "18px",
            backgroundColor: "#99663E",
            color: "#fff",
            border: "1px solid var(--primary-color)"
          }}>
            Back to Products
          </Link>
        </div>
      </div>
      
      {/* Overlay */}
      {isCartOpen && (
        <div className="overlay" onClick={() => setIsCartOpen(false)}></div>
      )}

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={`/${item.img}`} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>
                      {item.qty} × ₹{item.price}
                    </p>

                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button
                          onClick={() => increaseQty(item.id)}
                          disabled={item.qty >= Number(item.stock_quantity)}
                          style={{
                            cursor:
                              item.qty >= Number(item.stock_quantity)
                                ? "not-allowed"
                                : "pointer",
                            opacity:
                              item.qty >= Number(item.stock_quantity)
                                ? 0.5
                                : 1,
                          }}
                        >
                          +
                        </button>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h4>Total: Rs. {getTotal()}</h4>
              <button className="checkout-btn" onClick={whatsappCheckout}>
                Checkout on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Footer */}
      <footer style={{ marginTop: "auto", borderTop: "1px solid #eee", paddingTop: "30px" }}>
        <h2>Ruyani</h2>
        <p>Handmade Natural Cosmetics • Made with Love</p>
        <p>Contact: +91-9629888703</p>
        <a 
          href="https://www.instagram.com/ruyani2025/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#D1DACF', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '15px 0' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          @ruyani2025
        </a>
        <p>© 2025 Ruyani. All rights reserved.</p>
      </footer>
    </>
  );
}
