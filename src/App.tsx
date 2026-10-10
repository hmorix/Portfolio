import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { JerseyCustomizer } from './components/JerseyCustomizer';
import { PhotocardGacha } from './components/PhotocardGacha';
import { Lookbook } from './components/Lookbook';
import { RetailerFinder } from './components/RetailerFinder';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { Product, PRODUCTS } from './data/products';
import { sounds } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [currentTheme, setCurrentTheme] = useState<string>('classic');
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Default initial sample item in cart
    return [
      {
        cartId: 'item-initial-1',
        product: PRODUCTS[0],
        size: 'L',
        quantity: 1,
      },
    ];
  });

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'catalog', 'customizer', 'gacha', 'lookbook', 'retailers'];
      const scrollPos = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme application to document root
  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (themeId === 'classic') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  const handleToggleAudio = () => {
    sounds.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Keyboard shortcut Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sounds.playClick();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setAccountOpen(false);
        setCartOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && !item.customDetails);
      if (existing) {
        return prev.map(item =>
          item.cartId === existing.cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        cartId: `${product.id}-${size}-${Date.now()}`,
        product,
        size,
        quantity,
      };
      return [...prev, newItem];
    });
  };

  const handleAddCustomJersey = (customData: {
    product: Product;
    customName: string;
    customNumber: string;
    badgeName: string;
    colorVariant: string;
    size: string;
  }) => {
    const newItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      product: customData.product,
      size: customData.size,
      quantity: 1,
      customDetails: {
        name: customData.customName,
        number: customData.customNumber,
        badge: customData.badgeName,
        colorVariant: customData.colorVariant,
      },
    };
    setCartItems(prev => [...prev, newItem]);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    sounds.playClick();
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#edf0f1] text-[#101214] font-sans antialiased overflow-x-hidden selection:bg-[#f4772a] selection:text-white">
      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <Hero
        onPreOrderClick={() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreClick={() => {
          const el = document.getElementById('lookbook');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        lang={lang}
      />

      {/* Product Catalog */}
      <ProductCatalog
        onSelectProduct={setSelectedProduct}
        onAddToCart={(product, size) => handleAddToCart(product, size)}
        lang={lang}
      />

      {/* Custom Kit Builder */}
      <JerseyCustomizer
        onAddCustomJersey={handleAddCustomJersey}
        lang={lang}
      />

      {/* JKT48 Collectible Photocard Gacha Simulation */}
      <PhotocardGacha lang={lang} />

      {/* Editorial Lookbook */}
      <Lookbook
        onSelectProduct={setSelectedProduct}
        lang={lang}
      />

      {/* Official Retailer Stores Finder */}
      <RetailerFinder lang={lang} />

      {/* Footer */}
      <Footer
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        lang={lang}
      />

      {/* Modals and Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
        lang={lang}
      />

      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        lang={lang}
      />
    </div>
  );
}
