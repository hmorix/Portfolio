import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { Product } from '../data/products';
import { sounds } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  lang: 'ID' | 'EN';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const sizeChartData = [
    { size: 'S', chest: '52 cm', length: '68 cm', sleeve: '60 cm' },
    { size: 'M', chest: '55 cm', length: '70 cm', sleeve: '62 cm' },
    { size: 'L', chest: '58 cm', length: '72 cm', sleeve: '64 cm' },
    { size: 'XL', chest: '61 cm', length: '74 cm', sleeve: '66 cm' },
    { size: 'XXL', chest: '64 cm', length: '76 cm', sleeve: '68 cm' },
  ];

  const handleAdd = () => {
    sounds.playWhistle();
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#101214]/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-[#101214] hover:text-white rounded-full text-[#101214] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images with thumbnails */}
        <div className="md:w-1/2 p-6 bg-[#f4f5f5] flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shadow-inner mb-4">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#101214] text-white text-[10px] font-mono px-2 py-0.5 uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Alternate Angle Thumbnails */}
          {product.backImage && (
            <div className="flex gap-2">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-20 border-2 overflow-hidden ${
                  activeImage === product.image ? 'border-[#f4772a]' : 'border-black/10'
                }`}
              >
                <img src={product.image} alt="Front" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveImage(product.backImage!)}
                className={`w-16 h-20 border-2 overflow-hidden ${
                  activeImage === product.backImage ? 'border-[#f4772a]' : 'border-black/10'
                }`}
              >
                <img src={product.backImage} alt="Back" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f4772a] uppercase font-bold mb-1">
              <span>MEMBER AMBASSADOR: {product.ambassador}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#101214] mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#101214]/70">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 font-bold text-[#101214]">{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.reviewsCount} verified supporter reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#101214]/10">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#101214]">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm font-mono text-[#101214]/40 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#101214]/80 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#101214]/70 font-bold mb-2">
                Technical Specifications:
              </h4>
              <ul className="text-xs space-y-1.5 text-[#101214]/80">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f4772a] rounded-full" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector with Size Chart link */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase font-bold text-[#101214]/70">
                  Select Size:
                </span>
                <button
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-xs text-[#f4772a] hover:underline font-mono"
                >
                  {showSizeChart ? 'Hide Size Chart' : 'View Size Chart (cm)'}
                </button>
              </div>

              {showSizeChart ? (
                <div className="mb-4 overflow-x-auto p-3 bg-[#f4f5f5] text-xs font-mono border border-black/10">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-black/20 text-[#101214]/60">
                        <th className="py-1">Size</th>
                        <th>Chest</th>
                        <th>Length</th>
                        <th>Sleeve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChartData.map(s => (
                        <tr key={s.size} className="border-b border-black/5">
                          <td className="py-1 font-bold">{s.size}</td>
                          <td>{s.chest}</td>
                          <td>{s.length}</td>
                          <td>{s.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSize(size);
                    }}
                    className={`h-10 px-4 text-xs font-mono font-bold border transition-colors ${
                      selectedSize === size
                        ? 'border-[#101214] bg-[#101214] text-white'
                        : 'border-[#101214]/20 hover:border-[#101214] text-[#101214]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono uppercase font-bold text-[#101214]/70">
                Quantity:
              </span>
              <div className="flex items-center border border-[#101214]/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#f4f5f5] text-sm font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-[#f4f5f5] text-sm font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-mono text-emerald-600">
                Max 5 pcs per supporter
              </span>
            </div>
          </div>

          {/* Action button */}
          <div>
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f4772a] shrink-0" />
              <span>Includes 1x Official Holographic JKT48 Vol. 6 Photocard!</span>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full h-12 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
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
                  <span>
                    {lang === 'ID' ? 'Pesan Pre-Order Sekarang' : 'Add to Pre-Order Bag'} — Rp{' '}
                    {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
