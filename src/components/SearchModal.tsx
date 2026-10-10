import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { sounds } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  lang: 'ID' | 'EN';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  lang,
}) => {
  const [query, setQuery] = useState('');

  const quickTags = ['Windbreaker', 'Jersey', 'Freya', 'Zee', 'Hoodie', 'Coach Jacket', 'Scarf', 'Vol. 6'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ambassador.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#101214]/20 shadow-2xl overflow-hidden rounded-sm">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-black/10 flex items-center gap-3 bg-[#f4f5f5]">
          <Search className="w-5 h-5 text-[#f4772a]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === 'ID' ? 'Cari jaket, jersey, member oshi (contoh: Freya, Windbreaker)...' : 'Search collection, member or item (e.g. Jersey, Zee)...'}
            className="flex-1 bg-transparent text-base md:text-lg font-sans text-[#101214] placeholder:text-[#101214]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#101214]/50 hover:text-[#101214]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 bg-black/10 hover:bg-black/20 rounded"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggested Tags */}
        <div className="px-4 py-3 bg-white border-b border-black/5 flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-none">
          <span className="text-[#101214]/50 shrink-0">Popular:</span>
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                sounds.playClick();
                setQuery(tag);
              }}
              className="px-2.5 py-1 bg-[#f4f5f5] hover:bg-[#101214] hover:text-white transition-colors rounded-sm text-[#101214] shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs font-mono text-[#101214]/50">
              {lang === 'ID' ? 'Ketik kata kunci untuk mencari koleksi ERIGO X JKT48 Vol. 6' : 'Type to search products, members, and accessories'}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#101214]/60">
              Tidak ditemukan produk untuk "{query}".
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {results.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 flex items-center gap-4 hover:bg-[#f4f5f5] px-2 rounded cursor-pointer transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 object-cover bg-black/5"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#f4772a] block font-bold">
                      {product.ambassador}
                    </span>
                    <h4 className="text-sm font-bold text-[#101214] truncate group-hover:text-[#f4772a] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#101214]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#101214]/30 group-hover:text-[#f4772a] transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
