import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { RETAILER_STORES } from '../data/products';
import { sounds } from '../utils/audio';

interface RetailerFinderProps {
  lang: 'ID' | 'EN';
}

export const RetailerFinder: React.FC<RetailerFinderProps> = ({ lang }) => {
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = ['all', 'Jakarta', 'Bandung', 'Surabaya', 'Tokyo, Japan'];

  const filteredStores = RETAILER_STORES.filter(store => {
    if (selectedCity === 'all') return true;
    return store.city.includes(selectedCity);
  });

  return (
    <section id="retailers" className="py-20 px-[4.6vw] max-w-[1720px] mx-auto border-t border-[#101214]/10 bg-[#fafafa]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#101214]/10">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#f4772a] mb-2">
            Offline Concept Stores & Stadium Pop-Ups
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-[#101214] m-0">
            {lang === 'ID' ? 'Lokasi Toko Resmi Erigo Store' : 'Official Store Retailers'}
          </h2>
          <p className="text-sm md:text-base text-[#101214]/70 mt-2 max-w-xl">
            {lang === 'ID'
              ? 'Kunjungi offline store terdekat untuk mencoba fitting ukuran jaket & jersey serta penukaran tiket photocard eksklusif.'
              : 'Visit official physical flagship stores to try on sizes and collect exclusive photocard sleeves.'}
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => {
                sounds.playClick();
                setSelectedCity(city);
              }}
              className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all ${
                selectedCity === city
                  ? 'bg-[#101214] text-white border-[#101214]'
                  : 'bg-white hover:bg-[#f4f5f5] text-[#101214] border-[#101214]/20'
              }`}
            >
              {city === 'all' ? 'All Locations' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map(store => (
          <div
            key={store.id}
            className="p-6 bg-white border border-[#101214]/15 hover:border-[#f4772a] transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#101214] text-white">
                  {store.type}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {store.status}
                </span>
              </div>

              <h3 className="text-xl font-sans font-bold text-[#101214] mb-2">
                {store.name}
              </h3>

              <div className="flex items-start gap-2 text-xs text-[#101214]/70 mb-3">
                <MapPin className="w-4 h-4 text-[#f4772a] shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/60 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{store.hours}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#101214]/60">
                <Phone className="w-3.5 h-3.5" />
                <span>{store.phone}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101214]/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#101214]/60 font-medium">
                {store.city}
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#101214] hover:text-[#f4772a] flex items-center gap-1 transition-colors"
              >
                <span>{lang === 'ID' ? 'Petunjuk Arah' : 'Get Directions'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
