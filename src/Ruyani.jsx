import React, { useEffect, useState } from "react";
import "./style.css";

const WHATSAPP_NUMBER = "919629888703";

export default function Ruyani() {
  const products = [
    {
      id: 1,
      img: "images/kumcream.png",
      name: "Kumkumadi Cream",
      desc: "Pure Kumkumadi miracle cream – handmade with real saffron for visible glow in few days.",
      price: 250,
      category: "Skin Care",
      badge: "Best Seller",
    },
    {
      id: 2,
      img: "images/Scrub.png",
      name: "Face Brightening Scrub",
      desc: "Natural exfoliating scrub that removes impurities, reduces dullness, and enhances your skin’s glow.",
      price: 220,
      category: "Skin Care",
      inStock: false,
    },
    {
      id: 3,
      img: "images/Sangupoocream.png",
      name: "Sangupoo face Cream",
      desc: "Herbal Sangupoo face cream enriched with natural ingredients to nourish, brighten, and give a healthy glowing skin.",
      price: 250,
      category: "Skin Care",
    },
    {
      id: 4,
      img: "images/kumkumserum.png",
      name: "Kumkumadi Face Serum",
      desc: "Enriched with traditional kumkumadi ingredients to brighten skin, reduce dark spots, and boost radiance.",
      price: 250,
      category: "Skin Care",
    },
    {
      id: 5,
      img: "images/darkcircleserum.png",
      name: "Dark Circle Serum",
      desc: "Enriched with natural ingredients to lighten dark circles, reduce puffiness, and refresh under-eye skin.",
      price: 199,
      category: "Skin Care",
      inStock: false,
    },
    {
      id: 6,
      img: "images/kumkumadifacewash.png",
      name: "Kumkumadi Face Wash",
      desc: "Enriched with kumkumadi ingredients to brighten skin, remove impurities, and give a radiant glow.",
      price: 195,
      category: "Skin Care",
    },
    {
      id: 7,
      img: "images/Coffeefacewash.png",
      name: "Coffee Glow Face Wash",
      desc: "Energizing coffee face wash that deeply cleanses, removes excess oil, and gives an instant natural glow.",
      price: 195,
      category: "Skin Care",
    },
    {
      id: 8,
      img: "images/charcoalsoap.png",
      name: "Charcoal Soap",
      desc: "Activated charcoal soap that deeply cleanses pores, removes impurities, and leaves skin fresh and clear.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 9,
      img: "images/kuppaimenisoap.png",
      name: "Kuppaimeni Soap",
      desc: "Herbal kuppaimeni soap that helps reduce acne, soothe skin, and promote a clear, healthy complexion.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 10,
      img: "images/herbal hairoil.png",
      name: "Advanced Hair Regrowth Oil",
      desc: "Powerful herbal oil that strengthens roots, reduces hair fall, and supports healthy hair regrowth.",
      price: 210,
      category: "Hair Care",
    },
    {
      id: 11,
      img: "images/herbal hairdye.png",
      name: "Organic Herbal Hair Dye",
      desc: "100% herbal hair dye that naturally colors hair while nourishing and protecting it from damage.",
      price: 280,
      category: "Hair Care",
      badge: "Best Seller",
    },
    {
      id: 12,
      img: "images/dandruff oil.png",
      name: "Anti-dandruff Hair Oil",
      desc: "Herbal oil that controls dandruff, soothes itchy scalp, and keeps hair healthy and flake-free.",
      price: 220,
      category: "Hair Care",
    },
    {
      id: 13,
      img: "images/shikakaiHC.png",
      name: "Shikakai Hair Conditioner",
      desc: "Nourishing conditioner with shikakai that smooths hair, reduces frizz, and adds natural shine.",
      price: 199,
      category: "Hair Care",
    },
    {
      id: 14,
      img: "images/shikakaishampoo.png",
      name: "Shikakai Shampoo",
      desc: "Enriched with shikakai to cleanse naturally, reduce dandruff, and leave hair smooth, soft, and healthy.",
      price: 210,
      category: "Hair Care",
    },
    {
      id: 15,
      img: "images/MoringaHC.png",
      name: "Moringa Hair Conditioner",
      desc: "Moringa conditioner that strengthens weak hair, reduces breakage, and leaves hair soft and manageable.",
      price: 199,
      category: "Hair Care",
    },
    {
      id: 16,
      img: "images/moringashampoo.png",
      name: "Moringa Shampoo",
      desc: "Enriched with moringa extracts to strengthen roots, control hair fall, and leave hair soft and healthy.",
      price: 210,
      category: "Hair Care",
    },
    {
      id: 17,
      img: "images/Rosepetalssoap.png",
      name: "Rose Petals Soap",
      desc: "Gentle rose petals soap that hydrates skin, soothes irritation, and leaves a soft natural glow.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 18,
      img: "images/kumkumadi soap.png",
      name: "Kumkumadi Soap",
      desc: "Kumkumadi soap enriched with saffron to brighten skin, reduce dullness, and enhance natural glow.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 19,
      img: "images/redwine soap.png",
      name: "Red Wine Soap",
      desc: "Red wine soap rich in antioxidants that helps rejuvenate skin and improve overall skin texture.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 20,
      img: "images/pigmentationsoap.png",
      name: "Pigmentation Soap",
      desc: "Herbal soap that helps reduce pigmentation, even out skin tone, and promote clearer skin.",
      price: 110,
      category: "Body Care",
    },
    {
      id: 21,
      img: "images/lipbalm.png",
      name: "Berry red Lip Balm",
      desc: "Infused with natural oils to hydrate, heal dry lips, and give a rich berry tint.",
      price: 160,
      category: "Skin Care",
    },
    {
      id: 22,
      img: "images/beetroot_lipbalm.png",
      name: "Beetroot Lip Balm",
      desc: "Enriched with beetroot and natural oils to moisturize, heal dry lips, and enhance natural lip color.",
      price: 160,
      category: "Skin Care",
    },
  ];
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("ruyani_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

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
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src="images/fav.png" alt="Ruyani Naturals Logo" className="nav-logo-icon" />
          RUYANI NATURALS
        </div>

        <ul className="nav-links">
          <li>
            <a href="#" onClick={() => setActiveCategory("All")}>Home</a>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span 
              className="dropdown-title" 
              onClick={() => {
                setActiveCategory("All");
                setIsDropdownOpen(prev => !prev);
              }} 
              style={{ cursor: 'pointer' }}
            >
              Categories ▾
            </span>

            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="#products" onClick={() => { setActiveCategory("Skin Care"); setIsDropdownOpen(false); }}>Skin Care</a></li>
                <li><a href="#products" onClick={() => { setActiveCategory("Hair Care"); setIsDropdownOpen(false); }}>Hair Care</a></li>
                <li><a href="#products" onClick={() => { setActiveCategory("Body Care"); setIsDropdownOpen(false); }}>Body Care</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#about">About Us</a>
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

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          {/* <a href="#products" className="cta-btn">Discover Our Collection</a> */}
        </div>
      </header>

      {/* Cart Bar */}
      {/* {cart.length > 0 && (
        <div className="cart-bar">
          <h3>Your Cart</h3>

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span> {item.qty} </span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <span>Rs. {item.price * item.qty}</span>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <h4>Total: Rs. {getTotal()}</h4>

          <button className="cta-btn" onClick={whatsappCheckout}>
            Checkout on WhatsApp
          </button>
        </div>
      )} */}

      {/* About */}
      <section className="about" id="about">
        <h2>Our Story</h2>
        <p>
          RUYANI was born from a simple belief — skincare should be pure,
          gentle, and honest. What started as a small handmade passion has now
          grown into a thoughtful journey of crafting natural soaps and skincare
          products with love, care, and quality ingredients. At RUYANI, every
          product is: Handcrafted in small batches Made with skin-loving oils &
          herbs Free from harsh chemicals Created with patience, not machines We
          focus on traditional methods like cold process soap making to preserve
          the natural goodness of oils and butters, giving your skin the
          nourishment it truly deserves. Each bar is not just a soap — it is a
          blend of nature, science, and care for everyday self-love. RUYANI –
          Crafted for Life’s Essentials.
        </p>
      </section>

      {/* Products */}
      <section className="products" id="products">
        <h2>Handcrafted for life's essentials</h2>

        {["Skin Care", "Hair Care", "Body Care"]
          .filter((cat) => activeCategory === "All" || activeCategory === cat)
          .map((category) => (
          <div key={category} id={category.toLowerCase().replace(" ", "")} className="category-section">
            <h3 className="category-title">{category}</h3>
            <div className="products-grid">
              {products
                .filter((p) => p.category === category)
                .map((p) => (
                  <div className="product-card" key={p.id}>
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                    <img src={p.img} alt={p.name} />
                    <div className="product-info">
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <div className="price">Rs. {p.price}</div>
                      {p.inStock === false ? (
                        <button className="cta-btn disabled-btn" disabled>
                          Out of Stock
                        </button>
                      ) : cart.find((item) => item.id === p.id) ? (
                        <div className="cart-added-controls">
                          <span className="added-text">Added ✓</span>
                          <div className="inline-qty">
                            <button onClick={() => decreaseQty(p.id)}>-</button>
                            <span className="qty-count">{cart.find(item => item.id === p.id).qty}</span>
                            <button onClick={() => increaseQty(p.id)}>+</button>
                          </div>
                        </div>
                      ) : (
                        <button className="cta-btn" onClick={() => addToCart(p)}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
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
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product Image */}
                <img src={item.img} alt={item.name} className="cart-item-img" />

                {/* Product Details */}
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>
                    {item.qty} × ₹{item.price}
                  </p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-footer">
              <h4>Total: Rs. {getTotal()}</h4>
              <button className="checkout-btn" onClick={whatsappCheckout}>
                Checkout on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>

      {/* Why Us */}
      <section className="why-us">
        <h2>Why Ruyani?</h2>
        <div className="features">
          <div className="feature">
            <h3>100% Natural</h3>
            <p>No synthetic fragrances or parabens</p>
          </div>
          <div className="feature">
            <h3>Cruelty-Free & Vegan</h3>
            <p>We never test on animals and use only plant-based ingredients.</p>
          </div>
          <div className="feature">
            <h3>Handmade with Love</h3>
            <p>Small-batch crafted</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
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
