import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, Shield } from 'lucide-react';
import { Product } from '../data/products';
import { sounds } from '../utils/audio';

interface JerseyCustomizerProps {
  onAddCustomJersey: (customItem: {
    product: Product;
    customName: string;
    customNumber: string;
    badgeName: string;
    colorVariant: string;
    size: string;
  }) => void;
  lang: 'ID' | 'EN';
}

export const JerseyCustomizer: React.FC<JerseyCustomizerProps> = ({
  onAddCustomJersey,
  lang,
}) => {
  const [name, setName] = useState('FREYA');
  const [number, setNumber] = useState('48');
  const [colorVariant, setColorVariant] = useState<'home' | 'away' | 'third'>('home');
  const [badge, setBadge] = useState('Official Liga Victory Vol. 6 Badge');
  const [size, setSize] = useState('L');
  const [isAdded, setIsAdded] = useState(false);

  const presets = [
    { name: 'FREYA', number: '48' },
    { name: 'ZEE', number: '01' },
    { name: 'CHRISTY', number: '06' },
    { name: 'GRACIA', number: '99' },
    { name: 'ADEL', number: '12' },
    { name: 'MARSHA', number: '24' },
  ];

  const colorStyles = {
    home: {
      bg: '#101214',
      stripes: '#1c1f24',
      text: '#f4772a',
      accent: '#f4772a',
      collar: '#252930',
      label: 'Home Stadium (Pitch Black & Orange)',
    },
    away: {
      bg: '#f8fafc',
      stripes: '#e2e8f0',
      text: '#0f172a',
      accent: '#d97706',
      collar: '#0f172a',
      label: 'Away Supporter (Ivory White & Gold)',
    },
    third: {
      bg: '#064e3b',
      stripes: '#047857',
      text: '#ecfdf5',
      accent: '#10b981',
      collar: '#022c22',
      label: 'Third Stadium (Emerald Pitch)',
    },
  };

  const currentStyle = colorStyles[colorVariant];

  const handleApplyPreset = (pName: string, pNumber: string) => {
    sounds.playClick();
    setName(pName);
    setNumber(pNumber);
  };

  const handleAdd = () => {
    sounds.playWhistle();
    const mockProduct: Product = {
      id: `custom-jersey-${Date.now()}`,
      name: `Custom Matchday Jersey (#${number} ${name})`,
      category: 'jerseys',
      price: 439000,
      originalPrice: 529000,
      badge: 'Custom Print',
      ambassador: name,
      colorName: currentStyle.label,
      colors: [currentStyle.bg, currentStyle.accent],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      description: `Customized Erigo x JKT48 Vol. 6 Jersey with name ${name} and number ${number}.`,
      features: ['Velvet flocking typography', 'Aerodry breathable mesh weave', 'Liga Victory Vol. 6 patch included'],
      inStockCount: 24,
      rating: 5.0,
      reviewsCount: 42,
    };

    onAddCustomJersey({
      product: mockProduct,
      customName: name.toUpperCase(),
      customNumber: number,
      badgeName: badge,
      colorVariant,
      size,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="customizer" className="py-20 px-[4.6vw] bg-[#e9ecee]/80 border-y border-[#101214]/10">
      <div className="max-w-[1720px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Kit Customizer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'ID' ? 'Cetak Nama & Nomor Pilihanmu' : 'Print Your Name & Number'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2">
            {lang === 'ID'
              ? 'Personalisasi jersey resmi ERIGO X JKT48 Vol. 6 dengan nama oshi favoritmu atau nama kamu sendiri menggunakan teknik velvet flocking autentik.'
              : 'Personalize the official matchday kit with your favorite idol name or your own supporter identity.'}
          </p>
        </div>

        {/* Builder Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left / Center: Live Interactive Jersey Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-lg shadow-2xl p-6 flex flex-col items-center justify-between transition-colors duration-500 border border-black/10 select-none overflow-hidden"
              style={{ backgroundColor: currentStyle.bg }}
            >
              {/* Subtle jersey stripes pattern */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${currentStyle.stripes}, ${currentStyle.stripes} 24px, transparent 24px, transparent 48px)`,
                }}
              />

              {/* Top collar & collar tag */}
              <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-white/60">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#f4772a]" />
                  <span>ERIGO X JKT48</span>
                </div>
                <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-black/40 text-white font-mono">
                  VOL. 6 OFFICIAL
                </span>
              </div>

              {/* Center Printed Name & Big Football Number */}
              <div className="relative z-10 my-auto text-center flex flex-col items-center">
                <div
                  className="font-bebas text-4xl sm:text-5xl tracking-widest uppercase transition-all duration-300 drop-shadow-md font-bold px-4"
                  style={{ color: currentStyle.text }}
                >
                  {name || 'YOUR NAME'}
                </div>
                <div
                  className="font-bebas text-[110px] sm:text-[130px] leading-none tracking-tight transition-all duration-300 drop-shadow-xl font-extrabold"
                  style={{ color: currentStyle.text }}
                >
                  {number || '48'}
                </div>
              </div>

              {/* Bottom authentic stadium badge & sponsor */}
              <div className="relative z-10 w-full pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white/60 text-[10px] uppercase">{badge}</span>
                <span
                  className="px-2 py-0.5 font-bold text-[10px] rounded"
                  style={{ backgroundColor: currentStyle.accent, color: currentStyle.bg }}
                >
                  SIZE: {size}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#101214]/60 mt-4 text-center">
              *Real velvet heat-press flocking with gold metallic league edge.
            </div>
          </div>

          {/* Right: Controls & Options */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-[#101214]/15 shadow-sm flex flex-col gap-6">
            {/* Quick Member Presets */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                {lang === 'ID' ? 'Pilih Oshi Favorit (Presets):' : 'Member Presets:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button
                    key={p.name}
                    onClick={() => handleApplyPreset(p.name, p.number)}
                    className={`px-2.5 py-1 text-xs font-mono border transition-all ${
                      name === p.name && number === p.number
                        ? 'bg-[#101214] text-white border-[#101214]'
                        : 'bg-white hover:bg-[#f4772a]/10 border-[#101214]/20 text-[#101214]'
                    }`}
                  >
                    #{p.number} {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-1 font-bold">
                  {lang === 'ID' ? 'Nama Punggung (Maks 12 Huruf):' : 'Back Name (Max 12):'}
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={name}
                  onChange={e => setName(e.target.value.toUpperCase())}
                  placeholder="EX: FREYA"
                  className="w-full px-3 py-2 text-sm font-bebas text-lg tracking-wider border border-[#101214]/30 focus:border-[#f4772a] focus:outline-none uppercase bg-[#f4f5f5]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-1 font-bold">
                  {lang === 'ID' ? 'Nomor:' : 'Number:'}
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={number}
                  onChange={e => setNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="48"
                  className="w-full px-3 py-2 text-sm font-bebas text-lg tracking-wider border border-[#101214]/30 focus:border-[#f4772a] focus:outline-none bg-[#f4f5f5] text-center"
                />
              </div>
            </div>

            {/* Colorway Variant */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                {lang === 'ID' ? 'Varian Warna Jersey:' : 'Color Edition:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['home', 'away', 'third'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      sounds.playClick();
                      setColorVariant(c);
                    }}
                    className={`py-2 px-3 text-xs font-mono font-medium border text-center capitalize transition-all ${
                      colorVariant === c
                        ? 'border-[#f4772a] bg-[#101214] text-white shadow-sm'
                        : 'border-[#101214]/20 hover:border-[#101214] text-[#101214]'
                    }`}
                  >
                    {c} Kit
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#101214]/70 mb-2 font-bold">
                Size:
              </label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      sounds.playClick();
                      setSize(s);
                    }}
                    className={`w-10 h-10 text-xs font-mono font-bold border transition-colors ${
                      size === s
                        ? 'border-[#101214] bg-[#101214] text-white'
                        : 'border-[#101214]/20 text-[#101214] hover:border-[#101214]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing & Add Button */}
            <div className="pt-4 border-t border-[#101214]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono text-[#101214]/60">Total Custom Pre-Order:</div>
                <div className="text-2xl font-mono font-bold text-[#101214]">Rp 439.000</div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full sm:w-auto px-8 h-12 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#101214] hover:bg-[#f4772a] text-white active:scale-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'ID' ? 'Kustom Ditambahkan!' : 'Custom Kit Added!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'ID' ? 'Pesan Jersey Kustom' : 'Add Custom to Bag'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
