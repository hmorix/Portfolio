import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../data/products';
import { sounds } from '../utils/audio';

export interface CartItem {
  cartId: string;
  product: Product;
  size: string;
  quantity: number;
  customDetails?: {
    name: string;
    number: string;
    badge: string;
    colorVariant: string;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  lang: 'ID' | 'EN';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = subtotal >= 500000 || items.length === 0 ? 0 : 25000;
  const total = subtotal - discountAmount + shipping;

  const freeShippingThreshold = 500000;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (promoCode.trim().toUpperCase() === 'VICTORY48') {
      setDiscountPercent(10);
      setPromoMessage('Promo VICTORY48 applied! 10% Off');
    } else if (promoCode.trim().toUpperCase() === 'JKT48') {
      setDiscountPercent(15);
      setPromoMessage('Fanclub Perk: 15% Off Applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code. Try "VICTORY48"');
    }
  };

  const handleCheckout = () => {
    sounds.playWhistle();
    setIsCheckingOut(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f4772a', '#101214', '#ffffff', '#ffd700'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      const generatedOrder = `ERG-V6-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderComplete(generatedOrder);
      setIsCheckingOut(false);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideIn">
        {/* Header */}
        <div className="p-5 border-b border-[#101214]/10 flex items-center justify-between bg-[#f4f5f5]">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bebas tracking-wide text-[#101214] m-0">
              {lang === 'ID' ? 'TAS PRE-ORDER BATCH 01' : 'PRE-ORDER BAG'}
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 bg-[#101214] text-white rounded">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#101214]/70 hover:text-[#101214] hover:bg-black/5 rounded-full"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping & Photocard Progress */}
        <div className="px-5 py-3 bg-amber-50 border-b border-amber-200/60 text-xs font-mono text-amber-900">
          <div className="flex items-center justify-between mb-1.5">
            <span>{subtotal >= freeShippingThreshold ? '🎉 Free Shipping & Sticker Pack Unlocked!' : `Add Rp ${(freeShippingThreshold - subtotal).toLocaleString('id-ID')} for Free Shipping`}</span>
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f4772a] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Success Checkout Screen */}
        {orderComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bebas tracking-wide text-[#101214] mb-2">
              PRE-ORDER CONFIRMED!
            </h3>
            <p className="text-sm text-[#101214]/80 mb-4">
              Terima kasih! Pesanan kolaborasi ERIGO X JKT48 Vol. 6 kamu telah tercatat di Batch 01.
            </p>
            <div className="p-4 bg-[#f4f5f5] rounded border border-black/10 font-mono text-xs mb-6 w-full text-left">
              <div className="text-[#101214]/60">NO. PESANAN:</div>
              <div className="font-bold text-base text-[#101214] mb-2">{orderComplete}</div>
              <div className="text-[#101214]/60">STATUS:</div>
              <div className="font-semibold text-emerald-700">Batch 01 Allocated • 1x Photocard Included</div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(null);
                onClose();
              }}
              className="w-full h-11 bg-[#101214] text-white text-xs font-semibold tracking-wider hover:bg-[#f4772a] transition-colors"
            >
              KEMBALI KE STORE
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-black/5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#101214]/60">
                  <p className="text-sm font-sans mb-3">
                    {lang === 'ID' ? 'Tas pre-order kamu masih kosong.' : 'Your pre-order bag is empty.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="text-xs font-mono font-bold text-[#f4772a] hover:underline"
                  >
                    {lang === 'ID' ? 'Lihat Katalog Koleksi →' : 'Explore Collection →'}
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.cartId} className="py-4 flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover bg-[#f4f5f5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#101214] line-clamp-1">
                        {item.product.name}
                      </h4>

                      {/* Custom kit details if present */}
                      {item.customDetails && (
                        <div className="text-[11px] font-mono text-[#f4772a] font-semibold mt-0.5">
                          PRINT: #{item.customDetails.number} {item.customDetails.name}
                        </div>
                      )}

                      <div className="text-xs font-mono text-[#101214]/60 mt-1">
                        Size: {item.size}
                      </div>

                      <div className="text-sm font-mono font-bold text-[#101214] mt-1">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-black/15">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center hover:bg-black/5 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, Math.min(5, item.quantity + 1))}
                            className="w-6 h-6 flex items-center justify-center hover:bg-black/5 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#101214]/10 bg-[#f4f5f5]">
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder='Promo Code (e.g. VICTORY48)'
                    className="flex-1 px-3 py-1.5 text-xs font-mono border border-black/20 focus:border-[#f4772a] focus:outline-none uppercase bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#101214] text-white text-xs font-mono font-bold hover:bg-[#f4772a] transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {promoMessage && (
                  <div className={`text-[11px] font-mono mb-3 ${discountPercent > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {promoMessage}
                  </div>
                )}

                {/* Costs breakdown */}
                <div className="space-y-1.5 text-xs font-mono mb-4 text-[#101214]/80">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount ({discountPercent}%):</span>
                      <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#101214] pt-2 border-t border-black/10">
                    <span>TOTAL:</span>
                    <span>Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#101214]/60 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f4772a]" />
                  <span>Includes {items.reduce((a, b) => a + b.quantity, 0)}x Holographic Photocards</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-12 bg-[#101214] hover:bg-[#f4772a] text-white font-semibold text-sm tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
                >
                  <span>{isCheckingOut ? 'PROCESSING PRE-ORDER...' : 'CHECKOUT PRE-ORDER NOW'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
