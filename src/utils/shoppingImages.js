// Shopping Images Database & Smart URL/Keyword Extraction Engine

export const PRESET_SHOPPING_IMAGES = {
  zara: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=85', // Stylish Leather Jacket
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=85',
  sneakers: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=85', // Nike Dunks / Sneakers
  nike: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=85',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=85', // Red Nike Sneaker
  swiggy: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=85', // Hyderabadi Biryani
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=85',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=85', // Domino's Pizza
  airpods: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=85', // Apple AirPods Pro
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=85',
  watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=85',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=85', // iPhone
  iphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=85',
  gadget: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=85',
  gaming: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=85', // PS5 Controller
  hoodie: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=85',
  bag: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=85',
};

// Smart image resolver: supports direct image URLs, shopping link parsing, and keyword matching
export function getShoppingImage(title, customImg) {
  // 1. Direct custom uploaded base64 or valid URL provided
  if (customImg && customImg.trim().length > 0) {
    const trimmed = customImg.trim();
    // If it's a direct image URL (jpg, png, webp, unsplash, etc.) or base64 data url
    if (trimmed.startsWith('data:image') || trimmed.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i) || trimmed.includes('unsplash.com') || trimmed.includes('images.')) {
      return trimmed;
    }
    // If it's a website URL (like amazon.in, myntra, zara.com, swiggy)
    const urlLower = trimmed.toLowerCase();
    for (const [key, url] of Object.entries(PRESET_SHOPPING_IMAGES)) {
      if (urlLower.includes(key)) return url;
    }
  }

  // 2. Keyword detection from Title
  const lower = (title || '').toLowerCase();
  for (const [key, url] of Object.entries(PRESET_SHOPPING_IMAGES)) {
    if (lower.includes(key)) return url;
  }

  // 3. Fallback
  return PRESET_SHOPPING_IMAGES.sneakers;
}
