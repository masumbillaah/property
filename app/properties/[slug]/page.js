'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://masum66.wpelitee.com/wp-json/wp/v2/properties?slug=${slug}&_embed`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch property');
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProperty(data[0]);
        } else {
          setProperty(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
          <p className="text-lg font-bold text-slate-700">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
          <Link
            href="/"
            className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors inline-block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const thumbnail =
    property._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1400&q=80';

  const price = property.meta?.property_price ? `$${property.meta.property_price}` : 'Contact for Price';
  const location = property.meta?.property_location || 'Location Not Specified';
  const beds = property.meta?.property_beds || '0';
  const baths = property.meta?.property_baths || '0';
  const area = property.meta?.property_area || 'N/A';

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">EliteHomes</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/#properties" className="text-blue-600 font-semibold">Properties</Link>
            <Link href="/#services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/#contact-section" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/add-listing" 
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
              + Add Listing
            </Link>
            <Link 
              href="/#contact-section" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
            >
              Contact Agent
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
            <span>←</span> Back to all listings
          </Link>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Active Listing
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200 inline-block mb-3">
              Premium Property
            </span>
            <h1 
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight"
              dangerouslySetInnerHTML={{ __html: property.title.rendered }}
            />
            <p className="text-slate-500 text-base sm:text-lg flex items-center gap-2 mt-3">
              <span>📍</span> {location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block">Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
              {price}
            </div>
          </div>
        </div>

        <div className="relative h-[400px] sm:h-[540px] w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 mb-12">
          <img
            src={thumbnail}
            alt={property.title.rendered}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-3xl block mb-1">🛏️</span>
                <span className="text-xl font-black text-slate-900">{beds}</span>
                <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Bedrooms</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-3xl block mb-1">🚿</span>
                <span className="text-xl font-black text-slate-900">{baths}</span>
                <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Bathrooms</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-3xl block mb-1">📐</span>
                <span className="text-xl font-black text-slate-900">{area}</span>
                <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Total Space</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Property Description</h3>
              <div 
                className="text-slate-600 leading-relaxed space-y-4 text-base"
                dangerouslySetInnerHTML={{ 
                  __html: property.content?.rendered || '<p>A modern luxury residence with world-class finishing and architectural excellence.</p>' 
                }}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>🏊‍♂️</span> Swimming Pool
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>🚗</span> Covered Parking
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>🛡️</span> 24/7 Security
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>⚡</span> Power Backup
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>🌳</span> Private Garden
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50">
                  <span>📶</span> High-speed Wi-Fi
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-28">
              <h4 className="text-xl font-bold text-slate-900 mb-1">Book a Private Tour</h4>
              <p className="text-slate-500 text-xs mb-6">Schedule a physical viewing with the listing manager.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Address</label>
                  <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Phone Number</label>
                  <input type="text" placeholder="+880 1..." className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <button 
                  type="button" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/25 mt-2 cursor-pointer"
                >
                  Request Appointment
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
                <span className="text-emerald-500 text-base">✓</span> Verified by EliteHomes Real Estate
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20">
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