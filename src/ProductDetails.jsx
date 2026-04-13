import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "./Ruyani";
import "./style.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Product not found</h2>
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
          <div className="price" style={{ fontSize: "28px", color: "var(--primary-hover)", fontWeight: "600" }}>Rs. {product.price}</div>
          <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--text-color)" }}>{product.desc}</p>
          
          <div style={{ padding: "20px", backgroundColor: "#f9fbf8", borderRadius: "8px", border: "1px solid #e1e8dd", marginTop: "20px" }}>
            <h3 style={{ marginBottom: "15px", color: "var(--primary-color)", fontSize: "20px" }}>Why you'll love it</h3>
            <ul style={{ margin: "0", paddingLeft: "20px", lineHeight: "2", color: "var(--text-color)", fontSize: "16px" }}>
              {product.features && product.features.length > 0 ? (
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
          
          <Link to="/" className="cta-btn" style={{ 
            width: "fit-content", 
            textDecoration: "none", 
            marginTop: "20px", 
            display: "inline-block", 
            textAlign: "center",
            padding: "12px 30px",
            fontSize: "18px"
          }}>
            Back to Products
          </Link>
        </div>
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
