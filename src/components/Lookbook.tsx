import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { LOOKBOOK_SLIDES, PRODUCTS, Product } from '../data/products';
import { sounds } from '../utils/audio';

interface LookbookProps {
  onSelectProduct: (product: Product) => void;
  lang: 'ID' | 'EN';
}

export const Lookbook: React.FC<LookbookProps> = ({ onSelectProduct, lang }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slide = LOOKBOOK_SLIDES[activeSlideIndex];

  const taggedProducts = PRODUCTS.filter(p => slide.taggedProductIds.includes(p.id));

  return (
    <section id="lookbook" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto border-t border-[#101214]/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#101214]/10">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            Vol. 6 Campaign Editorial
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'ID' ? 'Editorial Lookbook Sepakbola' : 'The Campaign Lookbook'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'ID'
              ? 'Potret para member JKT48 dalam balutan streetwear blockcore Erigo di lorong stadion hingga atap Shibuya Tokyo.'
              : 'Styled editorial scenes featuring JKT48 members in football-inspired streetwear coordinates.'}
          </p>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center gap-2">
          {LOOKBOOK_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                setActiveSlideIndex(idx);
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border transition-all ${
                activeSlideIndex === idx
                  ? 'bg-[#101214] text-white border-[#101214]'
                  : 'bg-white hover:bg-[#f4f5f5] text-[#101214] border-[#101214]/20'
              }`}
            >
              SCENE 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Editorial Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Photo */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm group shadow-xl">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#f4772a] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{slide.location}</span>
                <span>•</span>
                <span>{slide.member}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bebas tracking-wide text-white m-0">
                {slide.title}
              </h3>
              <p className="text-sm text-white/80 italic mt-1 max-w-lg">
                "{slide.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Tagged Coordinate Products (Shop This Look) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#101214]/60 font-bold">
            {lang === 'ID' ? 'PRODUK DI FOTO INI (SHOP THIS LOOK):' : 'ITEMS IN THIS SCENE:'}
          </div>

          <div className="flex flex-col gap-3">
            {taggedProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectProduct(product);
                }}
                className="group p-3 bg-white border border-[#101214]/15 hover:border-[#f4772a] flex items-center gap-4 cursor-pointer transition-all hover:shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover bg-[#f4f5f5]"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-[#f4772a] block font-bold uppercase">
                    {product.badge || 'Vol. 6 Matchday'}
                  </span>
                  <h4 className="text-sm font-sans font-bold text-[#101214] truncate group-hover:text-[#f4772a] transition-colors">
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-[#101214] mt-1">
                    Rp {product.price.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="p-2 text-[#101214]/40 group-hover:text-[#f4772a] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#101214] text-white text-xs font-mono flex items-center justify-between">
            <span>PRE-ORDER SET DISCOUNT:</span>
            <span className="text-[#f4772a] font-bold">EXTRA 10% OFF</span>
          </div>
        </div>
      </div>
    </section>
  );
};
