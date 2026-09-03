'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://masum66.wpelitee.com/wp-json/wp/v2/properties?_embed&order=asc&orderby=title&t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* 1. ULTRA-CLEAN LUXURY NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F17]/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/25">
              🏛️
            </div>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition">
              Elite<span className="text-blue-500">Homes</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10 font-semibold text-sm tracking-wide text-slate-300">
            <Link href="/" className="text-blue-400 font-bold transition">Home</Link>
            <Link href="#properties" className="hover:text-white transition">Properties</Link>
            <Link href="#services" className="hover:text-white transition">Services</Link>
            <Link href="#contact" className="hover:text-white transition">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/add-listing" 
              className="hidden sm:inline-block px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white font-semibold text-xs tracking-wider uppercase transition bg-white/5 backdrop-blur-md"
            >
              + Add Listing
            </Link>
            <Link 
              href="#contact" 
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-blue-600/30 active:scale-95"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. CINEMATIC HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-[#0B0F17]/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Prime Luxury Estates
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] mb-8 drop-shadow-2xl">
            Architectural Mastery. <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
              Unrivaled Luxury Property.
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Curated residences engineered for discerning buyers. Verified JetEngine listings updated directly in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="#properties"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30"
            >
              Explore Collection
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all"
            >
              Book Private Tour
            </Link>
          </div>
        </div>
      </header>

      {/* 3. LUXURY PROPERTIES GRID */}
      <section id="properties" className="max-w-7xl mx-auto px-6 sm:px-10 py-28 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-blue-500 text-xs font-black uppercase tracking-widest block mb-2">
              CURATED PORTFOLIO
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Featured Residences
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
            {properties.length} Active Listings
          </span>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 text-sm tracking-widest uppercase">Connecting to WordPress...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((item) => {
              const thumbnail =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80';

              const price = item.meta?.property_price ? `$${item.meta.property_price}` : 'Inquire';
              const location = item.meta?.property_location || 'Dhanmondi, Dhaka';
              const beds = item.meta?.property_beds || '4';
              const baths = item.meta?.property_baths || '3';
              const area = item.meta?.property_area || '2400 sq ft';

              return (
                <Link
                  key={item.id}
                  href={`/properties/${item.slug}`}
                  className="group bg-[#131926] rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={item.title?.rendered}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                      📍 {location}
                    </div>

                    <div className="absolute bottom-4 left-4 text-3xl font-black text-white tracking-tight drop-shadow-md">
                      {price}
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 text-xs font-semibold text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">🛏️</span> {beds} Beds
                      </div>
                      <div className="flex items-center gap-1.5 justify-center">
                        <span className="text-slate-400">🚿</span> {baths} Baths
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-slate-400">📐</span> {area}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. HIGH-END SERVICES */}
      <section id="services" className="py-28 bg-[#0D121D] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <span className="text-blue-400 text-xs font-black uppercase tracking-widest block mb-3">
            BESPOKE EXPERIENCES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Full-Spectrum Real Estate Services
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mb-20 font-light">
            Providing refined advisory, acquisitions, and property management tailored for high-net-worth portfolios.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="bg-[#131926] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-2xl flex items-center justify-center mb-6">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Acquisitions</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                Discrete access to off-market villas and trophy penthouses with verified title deeds.
              </p>
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase group-hover:underline">Inquire →</span>
            </div>

            <div className="bg-[#131926] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-2xl flex items-center justify-center mb-6">
                📈
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Valuations</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                Algorithmic and real-world market intelligence ensuring maximum capital yield upon sale.
              </p>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase group-hover:underline">Inquire →</span>
            </div>

            <div className="bg-[#131926] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-2xl flex items-center justify-center mb-6">
                🗝️
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tenancy & Leasing</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                High-net-worth tenant verification, automated yield distribution, and property care.
              </p>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase group-hover:underline">Inquire →</span>
            </div>

            <div className="bg-[#131926] p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-2xl flex items-center justify-center mb-6">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Legal Advisory</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                Comprehensive legal diligence, tax structural advice, and cross-border deed conveyancing.
              </p>
              <span className="text-xs font-bold text-purple-400 tracking-wider uppercase group-hover:underline">Inquire →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METALLIC STATS BANNER */}
      <div className="max-w-6xl mx-auto px-6 w-full -my-14 relative z-20">
        <div className="bg-gradient-to-r from-[#172033] to-[#0F172A] border border-white/15 rounded-3xl py-12 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-2xl backdrop-blur-xl">
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">1,200+</div>
            <div className="text-xs text-blue-400 mt-2 uppercase font-bold tracking-widest">Properties Managed</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">98.4%</div>
            <div className="text-xs text-blue-400 mt-2 uppercase font-bold tracking-widest">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">$45M+</div>
            <div className="text-xs text-blue-400 mt-2 uppercase font-bold tracking-widest">Volume Transacted</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">12+</div>
            <div className="text-xs text-blue-400 mt-2 uppercase font-bold tracking-widest">Years in Operation</div>
          </div>
        </div>
      </div>

      {/* 6. IMMERSIVE CONTACT FORM */}
      <section id="contact" className="pt-36 pb-28 bg-[#0B0F17] w-full">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-blue-500 text-xs font-black uppercase tracking-widest block mb-3">
            PRIVATE CONSULTATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Connect With Our Advisors
          </h2>
          <p className="text-slate-400 text-base mb-14 font-light">
            Looking for a specific property or bespoke appraisal? We respond within 2 hours.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="bg-[#131926] p-10 sm:p-14 rounded-3xl border border-white/10 shadow-2xl text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Alexander Wright" 
                  className="w-full text-sm px-5 py-4 rounded-xl border border-white/10 focus:border-blue-500 bg-[#0B0F17] text-white focus:outline-none transition" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="alexander@domain.com" 
                  className="w-full text-sm px-5 py-4 rounded-xl border border-white/10 focus:border-blue-500 bg-[#0B0F17] text-white focus:outline-none transition" 
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Inquiry Message</label>
              <textarea 
                rows="5" 
                placeholder="Specify your requirements (e.g. villa specifications, investment budget)..." 
                className="w-full text-sm p-5 rounded-xl border border-white/10 focus:border-blue-500 bg-[#0B0F17] text-white focus:outline-none resize-none transition"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider py-5 rounded-xl text-sm transition-all shadow-xl shadow-blue-600/30 cursor-pointer active:scale-95"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#080B11] border-t border-white/10 py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <span className="text-white font-black text-xl tracking-tight">EliteHomes</span>
          </div>
          <div className="text-slate-400 font-light">
            Headless Architecture • Powered by Next.js & JetEngine
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 text-center text-xs text-slate-500">
          © 2026 EliteHomes Real Estate Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}