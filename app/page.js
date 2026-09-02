'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://masum66.wpelitee.com/wp-json/wp/v2/properties?_embed&order=asc&orderby=title&t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch properties');
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
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      {/* 1. NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">EliteHomes</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            <Link href="/" className="text-blue-600 font-semibold">Home</Link>
            <Link href="#properties" className="hover:text-blue-600 transition-colors">Properties</Link>
            <Link href="#services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="#contact-section" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/add-listing" 
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
              + Add Listing
            </Link>
            <Link 
              href="#contact-section" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="text-blue-400 font-bold text-xs uppercase tracking-widest bg-blue-950/80 border border-blue-800/60 px-3.5 py-1.5 rounded-full inline-block mb-6">
            ✨ Premium Real Estate Platform
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
            Find Your Next Luxury Space With Confidence
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse our verified luxury listings powered by high-speed headless architecture. High living standards, seamless booking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#properties" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30"
            >
              Explore Listings
            </Link>
            <Link 
              href="/add-listing" 
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Submit Property
            </Link>
          </div>
        </div>
      </header>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200 inline-block mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-slate-500 mt-3 text-base">
              Tailored solutions whether you are purchasing, renting, or consulting on luxury property investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Property Valuation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accurate, up-to-date market insights and expert analysis to maximize your investment returns.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Property Management</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Full-service maintenance, tenant relations, and operational management for homeowners.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Legal & Financial Advisory</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparent guidance through contracts, deed verification, tax documentation, and mortgages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROPERTIES GRID */}
      <main id="properties" className="max-w-7xl mx-auto px-6 py-20 w-full flex-1">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured Listings</h2>
            <p className="text-slate-500 text-sm mt-1">Live listings updated directly from WordPress.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            {properties.length} Properties
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-600 font-medium">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((item) => {
              const thumbnail =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80';

              const price = item.meta?.property_price ? `$${item.meta.property_price}` : 'Contact for Price';
              const location = item.meta?.property_location || 'Dhanmondi, Dhaka';
              const beds = item.meta?.property_beds || '0';
              const baths = item.meta?.property_baths || '0';
              const area = item.meta?.property_area || 'N/A';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={thumbnail}
                      alt={item.title?.rendered || 'Property'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 rounded-lg shadow-sm">
                        📍 {location}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-600 mb-2">
                        {price}
                      </div>
                      <h3
                        className="text-xl font-bold text-slate-900 line-clamp-1 mb-4"
                        dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                      />

                      <div className="flex items-center justify-between py-3 border-t border-b border-slate-100 text-xs font-semibold text-slate-600 mb-6">
                        <span>🛏️ {beds} Beds</span>
                        <span>🚿 {baths} Baths</span>
                        <span>📐 {area}</span>
                      </div>
                    </div>

                    <Link
                      href={`/properties/${item.slug}`}
                      className="w-full text-center bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold py-3 rounded-xl text-sm transition-all block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 5. CONTACT SECTION */}
      <section id="contact-section" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-white px-3 py-1 rounded-md border border-slate-200 inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Have Questions About a Property?
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto">
            Our real estate team is ready to schedule a private walkthrough or review your property requirements.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Contact Our Team
            </Link>
            <a
              href="mailto:support@wpelitee.com"
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <span className="text-xl font-black text-white">EliteHomes</span>
          </Link>
          <p className="text-sm">Headless WordPress + JetEngine + Next.js Showcase</p>
        </div>
        <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-slate-500">
          © 2026 EliteHomes Real Estate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}