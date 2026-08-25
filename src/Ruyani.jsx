import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./style.css";

const WHATSAPP_NUMBER = "919629888703";

export const products = [
    {
      id: 1,
      img: "images/kumcream.png",
      name: "Kumkumadi Cream",
      desc: "Pure Kumkumadi miracle cream – handmade with real saffron for visible glow in few days.",
      price: 250,
      category: "Skin Care",
      badge: "Best Seller",
      inStock: true,
      features: [
        "Handmade with authentic real saffron",
        "Visibly brightens and adds a natural glow",
        "Deeply moisturizes and improves skin texture",
        "Free from artificial colors and harmful chemicals"
      ],
      howToUse: [
        "Cleanse your face thoroughly.",
        "Take a pea-sized amount of Kumkumadi Cream.",
        "Massage gently in upward circular motions.",
        "Use daily at night for best results."  
      ]
    },
    // {
    //   id: 2,
    //   img: "images/Scrub.png",
    //   name: "Face Brightening Scrub",      
    //   desc: "Natural exfoliating scrub that removes impurities, reduces dullness, and enhances your skin’s glow.",
    //   price: 220,
    //   category: "Skin Care",
    //   inStock: false,
    //   features: [
    //     "Gently exfoliates dead skin cells",
    //     "Removes deep-seated impurities and blackheads",
    //     "Instantly brightens dull complexion",
    //     "Made with 100% natural scrubbing agents"
    //   ],
    //   howToUse: [
    //     "Wet your face with warm water.",
    //     "Apply a small amount of scrub.",
    //     "Gently massage in circular motions for 1-2 minutes.",
    //     "Rinse off thoroughly and pat dry. Use 2-3 times a week."
    //   ]
    // },
    {
      id: 3,
      img: "images/Sangupoocream.png",
      name: "Sangupoo face Cream",
      desc: "Herbal Sangupoo face cream enriched with natural ingredients to nourish, brighten, and give a healthy glowing skin.",
      price: 250,
      category: "Skin Care",
      inStock: true,
      features: [
        "Enriched with rare Sangupoo (Butterfly Pea) extracts",
        "Nourishes dry skin and provides lasting hydration",
        "Promotes a healthy, radiant complexion",
        "Lightweight formula suitable for daily use"
      ],
      howToUse: [
        "Cleanse face and pat dry.",
        "Apply an even layer of Sangupoo face cream.",
        "Gently massage until fully absorbed.",
        "Can be used day and night."
      ]
    },
    {
      id: 4,
      img: "images/kumkumserum.png",
      name: "Kumkumadi Face Serum",
      desc: "Enriched with traditional kumkumadi ingredients to brighten skin, reduce dark spots, and boost radiance.",
      price: 250,
      inStock: true,
      badge: "Best Seller",
      category: "Skin Care",
      // inStock: false,
      features: [
        "Traditional Ayurvedic formulation",
        "Fades dark spots, pigmentation, and blemishes",
        "Boosts skin elasticity and natural radiance",
        "Absorbs quickly without leaving a greasy residue"
      ],
      howToUse: [
        "Wash and dry your face.",
        "Take 3-4 drops of the serum.",
        "Gently dab it onto your face and neck.",
        "Leave it overnight and wash off in the morning."
      ]
    },
    // {
    //   id: 5,
    //   img: "images/darkcircleserum.png",
    //   name: "Dark Circle Serum",
    //   desc: "Enriched with natural ingredients to lighten dark circles, reduce puffiness, and refresh under-eye skin.",
    //   price: 199,
    //   category: "Skin Care",
    //   inStock: false,
    //   features: [
    //     "Specifically formulated for delicate under-eye skin",
    //     "Effectively lightens dark circles and pigmentation",
    //     "Reduces morning puffiness and eye bags",
    //     "Cooling effect instantly refreshes tired eyes"
    //   ],
    //   howToUse: [
    //     "Cleanse your face.",
    //     "Take a drop of serum on your ring finger.",
    //     "Gently dab around the under-eye area.",
    //     "Use every night before sleeping."
    //   ]
    // },
    {
      id: 6,
      img: "images/kumkumadifacewash.png",
      name: "Kumkumadi Face Wash",
      desc: "Enriched with kumkumadi ingredients to brighten skin, remove impurities, and give a radiant glow.",
      price: 195,
      category: "Skin Care",
      features: [
        "Gentle daily cleanser with Kumkumadi benefits",
        "Thoroughly removes dirt, oil, and makeup",
        "Leaves skin soft, bright, and glowing",
        "Maintains the skin's natural moisture balance"
      ],
      howToUse: [
        "Wet your face and neck.",
        "Take a small amount of face wash and lather it up.",
        "Massage gently in circular motions.",
        "Rinse thoroughly with water and pat dry."
      ]
    },
    {
      id: 7,
      img: "images/Coffeefacewash.png",
      name: "Coffee Glow Face Wash",
      desc: "Energizing coffee face wash that deeply cleanses, removes excess oil, and gives an instant natural glow.",
      price: 195,
      category: "Skin Care",
      features: [
        "Energizing coffee extracts wake up tired skin",
        "Deeply cleanses pores and removes excess oil",
        "Antioxidant-rich formula fights free radicals",
        "Provides an instant natural glow after every wash"
      ],
      howToUse: [
        "Wet face with lukewarm water.",
        "Apply a dime-sized amount of the coffee glow face wash.",
        "Gently massage for 30-60 seconds.",
        "Rinse thoroughly and pat dry."
      ]
    },
    {
      id: 8,
      img: "images/charcoalsoap.png",
      name: "Charcoal Soap",
      desc: "Activated charcoal soap that deeply cleanses pores, removes impurities, and leaves skin fresh and clear.",
      price: 110,
      category: "Body Care",
      features: [
        "Activated charcoal draws out deep-pore toxins",
        "Effectively controls excess oil and sebum",
        "Helps prevent acne and body breakouts",
        "Leaves skin feeling exceptionally fresh and clear"
      ],
      howToUse: [
        "Wet the soap and lather it in your hands.",
        "Apply the lather to your face and body.",
        "Gently massage to cleanse.",
        "Rinse thoroughly with water."
      ]
    },
    {
      id: 9,
      img: "images/kuppaimenisoap.png",
      name: "Kuppaimeni Soap",
      desc: "Herbal kuppaimeni soap that helps reduce acne, soothe skin, and promote a clear, healthy complexion.",
      price: 110,
      category: "Body Care",
      features: [
        "Traditional Kuppaimeni herb effectively fights acne",
        "Possesses natural anti-bacterial and soothing properties",
        "Helps clear skin rashes and minor irritations",
        "Promotes a clearer, healthier, and even complexion"
      ],
      howToUse: [
        "Lather the soap with water.",
        "Apply to areas prone to acne or rashes.",
        "Massage gently for a minute.",
        "Rinse off well."
      ]
    },
    {
      id: 10,
      img: "images/herbal hairoil.png",
      name: "Advanced Hair Regrowth Oil",
      desc: "Powerful herbal oil that strengthens roots, reduces hair fall, and supports healthy hair regrowth.",
      price: 210,
      category: "Hair Care",
      features: [
        "Potent herbal blend stimulates dormant hair follicles",
        "Strengthens hair roots to significantly reduce hair fall",
        "Supports thicker, healthier, and faster hair regrowth",
        "Improves scalp blood circulation naturally"
      ],
      howToUse: [
        "Section your hair and apply the oil directly to the scalp.",
        "Gently massage for 5-10 minutes.",
        "Leave it on for at least 2 hours or overnight.",
        "Wash off with a mild shampoo."
      ]
    },
    {
      id: 11,
      img: "images/herbal hairdye.png",
      name: "Organic Herbal Hair Dye",
      desc: "100% herbal hair dye that naturally colors hair while nourishing and protecting it from damage.",
      price: 299,
      category: "Hair Care",
      inStock: true,
      badge: "Best Seller",
      features: [
        "100% chemical-free, organic herbal hair color",
        "Safely covers gray hair without damaging strands",
        "Simultaneously acts as a deep hair conditioner",
        "Contains zero ammonia, PPD, or harsh synthetics"
      ],
      howToUse: [
        "Mix the dye powder with warm water to make a paste.",
        "Apply evenly from roots to tips on clean, dry hair.",
        "Leave it on for 1-2 hours.",
        "Rinse thoroughly with water."
      ]
    },
    {
      id: 12,
      img: "images/dandruff oil.png",
      name: "Anti-dandruff Hair Oil",
      desc: "Herbal oil that controls dandruff, soothes itchy scalp, and keeps hair healthy and flake-free.",
      price: 220,
      inStock: true,
      category: "Hair Care",
      features: [
        "Effectively targets root causes of persistent dandruff",
        "Instantly soothes itchy and irritated scalp",
        "Maintains a healthy, clean, and flake-free scalp",
        "Infused with potent anti-microbial herbal extracts"
      ],
      howToUse: [
        "Part your hair and applying oil to the scalp.",
        "Massage gently in circular motions.",
        "Leave for at least 1 hour.",
        "Wash off using a mild shampoo."
      ]
    },
    // {
    //   id: 13,
    //   img: "images/shikakaiHC.png",
    //   name: "Shikakai Hair Conditioner",
    //   desc: "Nourishing conditioner with shikakai that smooths hair, reduces frizz, and adds natural shine.",
    //   price: 199,
    //   category: "Hair Care",
    //   inStock: false,
    //   features: [
    //     "Ancient Shikakai recipe for modern hair care",
    //     "Deeply conditions and smooths rough hair texture",
    //     "Controls frizz naturally and prevents tangling",
    //     "Adds a brilliant, healthy natural shine"
    //   ],
    //   howToUse: [
    //     "After shampooing, apply conditioner from mid-lengths to ends.",
    //     "Avoid applying directly to the scalp.",
    //     "Leave it on for 2-3 minutes.",
    //     "Rinse thoroughly with water."
    //   ]
    // },
    {
      id: 14,
      img: "images/shikakaishampoo.png",
      name: "Shikakai Shampoo",
      desc: "Enriched with shikakai to cleanse naturally, reduce dandruff, and leave hair smooth, soft, and healthy.",
      price: 210,
      category: "Hair Care",
      features: [
        "Natural cleansing properties of Shikakai extract",
        "Gently cleanses scalp without stripping natural oils",
        "Helps keep dandruff at bay with regular use",
        "Leaves hair extremely soft, bouncy, and manageable"
      ],
      howToUse: [
        "Wet your hair completely.",
        "Take appropriate amount of shampoo and lather.",
        "Massage onto scalp and hair.",
        "Rinse thoroughly."
      ]
    },
    // {
    //   id: 15,
    //   img: "images/MoringaHC.png",
    //   name: "Moringa Hair Conditioner",
    //   desc: "Moringa conditioner that strengthens weak hair, reduces breakage, and leaves hair soft and manageable.",
    //   price: 199,
    //   category: "Hair Care",
    //   inStock: false, 
    //   features: [
    //     "Nutrient-dense Moringa superfood strengthens weak strands",
    //     "Significantly reduces hair breakage and split ends",
    //     "Deeply hydrates to leave hair silky soft",
    //     "Protects hair from environmental damages"
    //   ],
    //   howToUse: [
    //     "Apply after washing hair with Moringa shampoo.",
    //     "Distribute evenly through mid-lengths to the ends.",
    //     "Leave for 2-3 minutes.",
    //     "Rinse thoroughly."
    //   ]
    // },
    {
      id: 16,
      img: "images/moringashampoo.png",
      name: "Moringa Shampoo",
      desc: "Enriched with moringa extracts to strengthen roots, control hair fall, and leave hair soft and healthy.",
      price: 210,
      category: "Hair Care",
      features: [
        "Packed with Moringa vitamins and minerals",
        "Strengthens hair roots and improves overall hair health",
        "Helps control hair fall caused by breakage",
        "Leaves hair feeling clean, strong, and revitalized"
      ],
      howToUse: [
        "Wet your hair thoroughly.",
        "Apply the shampoo and massage into the scalp.",
        "Work into a rich lather.",
        "Rinse well with water."
      ]
    },
    {
      id: 17,
      img: "images/Rosepetalssoap.png",
      name: "Rose Petals Soap",
      desc: "Gentle rose petals soap that hydrates skin, soothes irritation, and leaves a soft natural glow.",
      price: 110,
      category: "Body Care",
      features: [
        "Infused with real, gentle rose petal extracts",
        "Deeply hydrates and locks moisture into the skin",
        "Soothes sensitive skin and mild irritations",
        "Imparts a soft, romantic natural glow and scent"
      ],
      howToUse: [
        "Wet the soap to create a rich lather.",
        "Gently massage the lather over your body and face.",
        "Rinse off with water.",
        "Use daily for soft, hydrated skin."
      ]
    },
    {
      id: 18,
      img: "images/kumkumadi soap.png",
      name: "Kumkumadi Soap",
      desc: "Kumkumadi soap enriched with saffron to brighten skin, reduce dullness, and enhance natural glow.",
      price: 110,
      inStock: true,
      category: "Body Care",
      features: [
        "Luxurious soap crafted with saffron and Kumkumadi oil",
        "Works to actively brighten dull and tired skin",
        "Enhances natural skin glow upon regular use",
        "Leaves a rich, luxurious feeling after every bath"
      ],
      howToUse: [
        "Lather the soap in your hands or on a loofah.",
        "Massage onto face and body in circular motions.",
        "Rinse thoroughly.",
        "Pat dry and follow with moisturizer."
      ]
    },
    {
      id: 19,
      img: "images/redwine soap.png",
      name: "Red Wine Soap",
      desc: "Red wine soap rich in antioxidants that helps rejuvenate skin and improve overall skin texture.",
      price: 110,
      inStock: true,
      category: "Body Care",
      features: [
        "Rich in red wine antioxidants (Resveratrol)",
        "Fights aging signs and rejuvenates mature skin",
        "Improves and smooths overall uneven skin texture",
        "Provides a luxurious, spa-like bathing experience"
      ],
      howToUse: [
        "Wet the soap and lather well.",
        "Apply to damp skin and massage gently.",
        "Leave it on for 1-2 minutes for antioxidant absorption.",
        "Rinse off completely."
      ]
    },
    // {
    //   id: 20,
    //   img: "images/pigmentationsoap.png",
    //   name: "Pigmentation Soap",
    //   desc: "Herbal soap that helps reduce pigmentation, even out skin tone, and promote clearer skin.",
    //   price: 110,
    //   category: "Body Care",
    //   inStock: false,
    //   features: [
    //     "Special herbal blend targets dark spots and marks",
    //     "Actively helps reduce skin hyper-pigmentation",
    //     "Evens out patchy skin tone over time",
    //     "Promotes a beautifully clear and uniform complexion"
    //   ],
    //   howToUse: [
    //     "Lather the soap and apply to affected areas.",
    //     "Gently massage for a minute.",
    //     "Rinse thoroughly with water.",
    //     "Use twice daily for best results."
    //   ]
    // },
    {
      id: 21,
      img: "images/lipbalm.png",
      name: "Berry red Lip Balm",
      desc: "Infused with natural oils to hydrate, heal dry lips, and give a rich berry tint.",
      price: 160,
      category: "Skin Care",
      features: [
        "Deeply hydrates and heals chapped, dry lips",
        "Infused with nourishing natural plant oils",
        "Provides a gorgeous, rich berry red tint",
        "Protects lips from harsh weather conditions"
      ],
      howToUse: [
        "Take a small amount on your fingertip.",
        "Apply evenly on your lips.",
        "Reapply whenever lips feel dry.",
        "Can be used as an overnight lip mask."
      ]
    },
    {
      id: 22,
      img: "images/beetroot_lipbalm.png",
      name: "Beetroot Lip Balm",
      desc: "Enriched with beetroot and natural oils to moisturize, heal dry lips, and enhance natural lip color.",
      price: 160,
      category: "Skin Care",
      // inStock: false,
      features: [
        "Natural beetroot extracts enhance natural lip color",
        "Effectively moisturizes and prevents lip drying",
        "Helps lighten dark lips with regular application",
        "100% natural, safe to use daily"
      ],
      howToUse: [
        "Dab a small amount onto your lips.",
        "Spread evenly for a natural tint.",
        "Apply throughout the day as needed.",
        "Use overnight for deep healing."
      ]
    },
    {
      id: 23,
      img: "images/hairpack.png",
      name: "Herbal Hairpack",
      desc: "A nourishing herbal hair pack that strengthens roots, controls hair fall, and restores natural shine.",
      price: 80,
      category: "Hair Care",
      badge: "New Arrival",
      features: [
        "Powerful blend of natural herbs to intensely nourish the scalp",
        "Strengthens hair from root to tip to significantly reduce hair fall",
        "Restores dull hair by adding natural shine and bounce",
        "100% natural, chemical-free, and suitable for all hair types"
      ],
      howToUse: [
        "Mix the powder with water to form a paste.",
        "Apply evenly to scalp and hair.",
        "Leave it on for 30-45 minutes.",
        "Wash off thoroughly with water or a mild shampoo."
      ]
    },
    {
      id: 24,
      img: "images/bodymoisturizer.png",
      name: "Almond Body Moisturizer",
      desc: "Deeply hydrating almond body moisturizer that leaves skin soft, smooth, and nourished all day long.",
      price: 250,
      category: "Body Care",
      // badge: "New Arrival",
      features: [
        "Enriched with sweet almond oil for deep, long-lasting hydration",
        "Absorbs quickly without leaving a greasy or sticky residue",
        "Improves skin elasticity and restores natural softness",
        "Perfect for all skin types, including dry and sensitive skin"
      ],
      howToUse: [
        "Take a generous amount of moisturizer.",
        "Apply to slightly damp skin after a shower.",
        "Massage in circular motions until fully absorbed.",
        "Focus on dry areas like elbows and knees."
      ]
    },
    {
      id: 25,
      img: "images/shimmer_cream.png",
      name: "Shimmer Face Cream",
      desc: "A luxurious face cream with a subtle shimmer for an instant glow and deep hydration.",
      // originalPrice: 380,
      price: 380,
      category: "Skin Care",
      badge: "New Launch",
      features: [
        "Instant radiant glow",
        "Deeply hydrating formula",
        "Crafted with natural oils and Vitamin E",
        "Suitable for all skin types"
      ],
      howToUse: [
        "Cleanse your face.",
        "Apply a small amount evenly.",
        "Gently massage in circular motions.",
        "Use during the day for a sparkling glow."
      ]
    },
    {
      id: 26,
      img: "images/crack balm.png",
      name: "Crack Healing Balm",
      desc: "A rich herbal balm that deeply moisturizes, repairs cracked heels, relieves dryness, and promotes smoother, healthier-looking skin.",
      price: 199,
      category: "Body Care",
      inStock: true,
      badge: "New Launch",
      features: [
        "Provides deep hydration and heals cracked heels",
        "Soothes rough and dry skin on feet and hands",
        "Enriched with natural oils and skin-repairing herbs",
        "Fast-absorbing formula with long-lasting moisture"
      ],
      howToUse: [
        "Cleanse your feet/skin and pat dry.",
        "Apply a generous layer of Crack Cream to the affected area.",
        "Massage gently until fully absorbed.",
        "For best results, use daily before bedtime."
      ]
    },
    {
      id: 27,
      img: "images/detan face pack.png",
      name: "Detan Face Pack",
      desc: "Specially crafted face pack to remove tan, deep cleanse pores, and restore natural skin brightness.",
      price: 220,
      category: "Skin Care",
      inStock: true,
      badge: "New Launch",
      features: [
        "Deeply cleanses pores and removes stubborn tan",
        "Brightens skin complexion and evens out tone",
        "Made with natural soothing ingredients",
        "Reveals a fresh, radiant, and glowing face"
      ],
      howToUse: [
        "Wash your face and pat dry.",
        "Apply an even layer of the pack, avoiding the eyes.",
        "Leave it on for 15-20 minutes until dry.",
        "Rinse off gently with cold water and pat dry. Use 2-3 times a week."
      ]
    },
  ];

export const anniversaryCombos = [
  {
    id: 101,
    images: [
      "images/kumcream.png",
      "images/kumkumadifacewash.png",
      "images/lipbalm.png"
    ],
    name: "Ultimate Glow Kit",
    desc: "Achieve beautiful radiant skin with our saffron-infused bestseller cream, refreshing face wash, and nourishing lip tint.",
    price: 569,
    originalPrice: 605,
    savings: 36,
    badge: "Anniversary Special",
    inStock: true,
    items: [
      "Kumkumadi Cream (Saffron glow)",
      "Kumkumadi Face Wash",
      "Berry red Lip Balm"
    ]
  },
  {
    id: 102,
    images: [
      "images/herbal hairoil.png",
      "images/shikakaishampoo.png",
      "images/hairpack.png"
    ],
    name: "Complete Hair Care Kit",
    desc: "Complete traditional ayurvedic routine to cleanse, soothe scalp, and stimulate healthy root regrowth.",
    price: 469,
    originalPrice: 500,
    savings: 31,
    badge: "15% Extra Off",
    inStock: true,
    items: [
      "Advanced Hair Regrowth Oil",
      "Shikakai Shampoo",
      "Herbal Hairpack"
    ]
  },
  {
    id: 103,
    images: [
      "images/redwine soap.png",
      "images/Rosepetalssoap.png",
      "images/charcoalsoap.png"
    ],
    name: "Artisan Soap Trio",
    desc: "Three cold-processed, chemical-free soaps for a luxurious, skin-replenishing bathing experience.",
    price: 299,
    originalPrice: 330,
    savings: 31,
    badge: "Sellers Pick",
    inStock: true,
    items: [
      "Red Wine Soap (Antioxidant)",
      "Rose Petals Soap (Hydration)",
      "Charcoal Soap (Deep cleanse)"
    ]
  }
];

export default function Ruyani() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Offer ends on August 31st, 2026 at 23:59:59 (Month is 7 because 0-indexed in JS)
    const targetDate = new Date(2026, 7, 31, 23, 59, 59).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(0);
        return false;
      }

      setTimeLeft(Math.floor(difference / 1000));
      return true;
    };

    updateTimer();
    const interval = setInterval(() => {
      const active = updateTimer();
      if (!active) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    if (seconds <= 0) return "Offer Ended";
    const days = Math.floor(seconds / (3600 * 24));
    const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (days > 0) {
      return `${days}d ${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const customerFeedback = [
    {
      name: "Priya S.",
      message:
        "My skin feels softer and brighter within a week. The Kumkumadi Cream is now part of my daily routine."
    },
    {
      name: "Meena R.",
      message:
        "I love how gentle these products are. The face wash and lip balm worked really well for my sensitive skin."
    },
    {
      name: "Vidhya",
      message:
        "Hi Nithya, I have started using Sangupoovu face cream.  Iam using this cream at night. Excellent hydration, fast absorbing and I can feel the smoothness in skin.  Worth buying this product."
    },
    {
      name: "Karthika M.",
      message:
        "The quality feels premium and natural. Fast delivery and great support on WhatsApp too."
    },
    {
      name: "Devi",
      message:
        "Hi Nitya tried organic hair dye , the dye is gentle on my hair and colour is good and Shikakai shampoo is also super nourishing .Hair feels healthy and looks great ."
    },
    {
      name: "Bindhu",
      message:
        "I have been using the Advanced Hair Regrowth Oil and I can see visible reduction in my hair fall."
    },
    {
      name: "Revathi K.",
      message:
        "Absolutely in love with the Red Wine Soap. Leaves my skin feeling so fresh and rejuvenated after every bath."
    }
  ];

  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    getTotal,
    whatsappCheckout
  } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 500); // Faster popup
    return () => clearTimeout(timer);
  }, []);

  const shimmerProduct = products.find(p => p.id === 25);

  return (
    <>
      {/* Offer Popup */}
      {/* {showOffer && shimmerProduct && (
        <div className="popup-overlay" onClick={() => setShowOffer(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={() => setShowOffer(false)}>×</button>
            <div className="popup-badge">LIMITED PERIOD OFFER</div>
            <img src={shimmerProduct.img} alt={shimmerProduct.name} className="popup-img" />
            <h2 className="popup-title">{shimmerProduct.name}</h2>
            <p className="popup-text">Our newly launched magic cream is here with an exclusive offer!</p>
            <div className="popup-prices">
              <span className="popup-original-price">Rs. {shimmerProduct.originalPrice}</span>
              <span className="popup-offer-price">Rs. {shimmerProduct.price}</span>
            </div>
            <button 
              className="cta-btn popup-btn" 
              onClick={() => {
                addToCart(shimmerProduct);
                setShowOffer(false);
              }}
            >
              Grab the Offer Now
            </button>
          </div>
        </div>
      )} */}

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
          <li>
            <a href="#anniversary-sale">Anniversary Offers</a>
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

      {/* Shimmering Launch Marquee */}
      <div className="shimmer-marquee-wrapper">
        <div className="shimmer-marquee">
          {[...Array(2)].map((_, i) => (
            <div className="marquee-group" key={i}>
              <div className="marquee-item brand">RUYANI</div>
              <div className="marquee-item launch-tag">SHIMMER CREAM • NEW LAUNCH - ORDER NOW</div>
              <img src="images/shimmer_cream.png" alt="Shimmer Cream" className="marquee-prod-img" />
              <div className="marquee-item ingredients">
                <span>Aloe Vera</span>
                <span className="dot"></span>
                <span>Coconut Oil</span>
                <span className="dot"></span>
                <span>Shea Butter</span>
                <span className="dot"></span>
                <span>Vitamin E</span>
                <span className="dot"></span>
                <span>Glycerin</span>
                <span className="dot"></span>
                <span>Hyaluronic Acid</span>
                <span className="dot"></span>
                <span>Natural Oils</span>
              </div>
              <div className="marquee-item shimmer-effect">✨ EXPERIENCE THE GLOW ✨</div>
            </div>
          ))}
        </div>
      </div>

      {/* Anniversary Sale Section */}
      <section className="anniversary-sale" id="anniversary-sale">
        <div className="anniversary-header">
          <span className="anniversary-tag">RUYANI NATURALS • 1ST YEAR ANNIVERSARY 🎉</span>
          <h2>Anniversary Sale Specials</h2>
          <p className="anniversary-sub">
            Celebrating 1 year of crafting pure, natural love. Grab our limited-edition, curated combos at exclusive prices!
            <br />
            <strong>Offer valid from Aug 1st 2026 to Aug 31 2026</strong>
          </p>
          <div className="countdown-container">
            <span className="countdown-label">Offer ends in:</span>
            <div className="countdown-timer">{formatTime(timeLeft)}</div>
          </div>
        </div>

        <div className="anniversary-grid">
          {anniversaryCombos.map((combo) => (
            <div className="combo-card" key={combo.id}>
              <div className="combo-badge">{combo.badge}</div>
              <div className="combo-images-container">
                {combo.images.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc} alt={combo.name} />
                ))}
              </div>
              <div className="combo-info">
                <h3>{combo.name}</h3>
                <p className="combo-desc">{combo.desc}</p>
                
                <div className="combo-items-list">
                  <h4>What's Inside:</h4>
                  <ul>
                    {combo.items.map((item, idx) => (
                      <li key={idx}>
                        <svg className="tick-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="combo-price-container">
                  <div className="price-row">
                    <span className="combo-orig-price">Rs. {combo.originalPrice}</span>
                    <span className="combo-saving">Save Rs. {combo.savings}!</span>
                  </div>
                  <span className="combo-price">Rs. {combo.price}</span>
                </div>

                {cart.find((item) => item.id === combo.id) ? (
                  <div className="cart-added-controls combo-added-controls">
                    <span className="added-text">Added ✓</span>
                    <div className="inline-qty">
                      <button onClick={() => decreaseQty(combo.id)}>-</button>
                      <span className="qty-count">{cart.find(item => item.id === combo.id).qty}</span>
                      <button onClick={() => increaseQty(combo.id)}>+</button>
                    </div>
                  </div>
                ) : (
                  <button className="cta-btn combo-add-btn" onClick={() => addToCart(combo)}>
                    Add Combo to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

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
                    <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={p.img} alt={p.name} />
                    </Link>
                    <div className="product-info">
                      <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3>{p.name}</h3>
                      </Link>
                      <p>{p.desc}</p>
                      <div className="price-container">
                        {p.originalPrice && (
                          <span className="original-price">Rs. {p.originalPrice}</span>
                        )}
                        <span className="price"> Rs. {p.price}</span>
                      </div>
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

      {/* Feedback */}
      <section className="feedback-section">
        <h2>Feedback Received from Customers</h2>
        <div className="feedback-marquee-wrapper">
          <div className="feedback-marquee">
            {customerFeedback.map((feedback, index) => (
              <article className="feedback-card" key={`original-${index}`}>
                <p>"{feedback.message}"</p>
                <h4>- {feedback.name}</h4>
              </article>
            ))}
          </div>
          <div className="feedback-marquee" aria-hidden="true">
            {customerFeedback.map((feedback, index) => (
              <article className="feedback-card" key={`duplicate-${index}`}>
                <p>"{feedback.message}"</p>
                <h4>- {feedback.name}</h4>
              </article>
            ))}
          </div>
        </div>
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
            <div className="cart-items-list">
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
