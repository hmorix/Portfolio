import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, ShoppingBag, Check, SlidersHorizontal } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { sounds } from '../utils/audio';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  lang: 'ID' | 'EN';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAmbassador, setSelectedAmbassador] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: lang === 'ID' ? 'Semua Produk' : 'All Products' },
    { id: 'jackets', label: 'Best Jackets' },
    { id: 'jerseys', label: 'Retro Jerseys' },
    { id: 'hoodies', label: 'Boxy Hoodies' },
    { id: 'tracksuits', label: 'Tracksuits' },
    { id: 'accessories', label: 'Matchday Accessories' },
  ];

  const ambassadors = ['all', 'Freya Jayawardana', 'Zee Asadel', 'Christy', 'Gracia', 'Adel', 'Marsha Lenathea'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedAmbassador !== 'all' && !p.ambassador.includes(selectedAmbassador)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [selectedCategory, selectedAmbassador, sortBy]);

  const handleSizeSelect = (productId: string, size: string) => {
    sounds.playClick();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    sounds.playWhistle();
    onAddToCart(product, size);
    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1400);
  };

  return (
    <section id="catalog" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#101214]/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f4772a] mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Erigo x JKT48 Vol. 6 Official Drop</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'ID' ? 'Koleksi Streetwear Sepakbola' : 'The Victory Collection'}
          </h2>
          <p className="text-[#101214]/70 text-sm md:text-base mt-2 max-w-xl">
            {lang === 'ID'
              ? 'Didesain dengan material premium ripstop, jersey jacquard 90-an, dan sentuhan blockcore otentik.'
              : 'Engineered with Japanese ripstop, 90s vintage jersey jacquards, and stadium-ready blockcore cuts.'}
          </p>
        </div>

        {/* Filter Controls & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/70 bg-white/70 border border-[#101214]/15 px-3 py-2 rounded">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#f4772a]" />
            <span>{lang === 'ID' ? 'Member:' : 'Ambassador:'}</span>
            <select
              value={selectedAmbassador}
              onChange={e => setSelectedAmbassador(e.target.value)}
              className="bg-transparent font-medium text-[#101214] outline-none cursor-pointer"
            >
              <option value="all">All Members</option>
              {ambassadors.filter(a => a !== 'all').map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/70 bg-white/70 border border-[#101214]/15 px-3 py-2 rounded">
            <span>{lang === 'ID' ? 'Urutkan:' : 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent font-medium text-[#101214] outline-none cursor-pointer"
            >
              <option value="featured">Featured Drop</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 text-xs md:text-sm font-medium tracking-tight whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#101214] text-white shadow-sm'
                : 'bg-white/60 hover:bg-white text-[#101214] border border-[#101214]/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map(product => {
          const currentSize = selectedSizes[product.id] || product.sizes[0];
          const isAdded = addedAnimation === product.id;

          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-white/80 border border-[#101214]/10 p-4 transition-all duration-300 hover:shadow-xl hover:border-[#101214]/25 hover:-translate-y-1"
            >
              {/* Image & Badge Wrapper */}
              <div>
                <div className="relative aspect-[3/4] bg-[#f4f5f5] overflow-hidden mb-4">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-[#101214] text-white text-[10px] font-mono tracking-wider px-2 py-0.5 uppercase">
                      {product.badge}
                    </div>
                  )}

                  {/* Stock counter */}
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-[#101214] text-[10px] font-mono px-2 py-0.5 border border-[#101214]/10">
                    {product.inStockCount} {lang === 'ID' ? 'tersisa' : 'left'}
                  </div>

                  {/* Product Image with hover flip */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2 bg-white text-[#101214] text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 hover:bg-[#f4772a] hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'ID' ? 'Detail Produk & Size Chart' : 'Quick View & Specs'}</span>
                    </button>
                  </div>
                </div>

                {/* Ambassador Credit */}
                <div className="text-[11px] font-mono text-[#f4772a] uppercase tracking-wider mb-1 font-semibold">
                  Member: {product.ambassador}
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-sans text-base md:text-lg font-bold text-[#101214] leading-snug cursor-pointer hover:text-[#f4772a] transition-colors mb-2 line-clamp-1"
                >
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-base md:text-lg font-bold text-[#101214]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="font-mono text-xs text-[#101214]/40 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                {/* Size Picker Pills */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="text-[11px] font-mono text-[#101214]/50 mr-1">SIZE:</span>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(product.id, size)}
                      className={`min-w-[28px] h-7 px-1.5 text-[11px] font-mono font-medium border transition-colors ${
                        currentSize === size
                          ? 'border-[#101214] bg-[#101214] text-white'
                          : 'border-[#101214]/20 text-[#101214] hover:border-[#101214]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Pre-Order Cart */}
              <button
                onClick={() => handleAdd(product)}
                className={`w-full h-11 text-xs md:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#101214] hover:bg-[#f4772a] text-white active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'ID' ? 'Berhasil Ditambahkan!' : 'Added to Bag!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'ID' ? 'Tambah Pre-Order' : 'Add to Pre-Order'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
