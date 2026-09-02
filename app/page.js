'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // প্রতিবার ব্রাউজারে সাইট লোড হলে সরাসরি ওয়ার্ডপ্রেস API থেকে নতুন ডেটা টানবে
    fetch('https://masum66.wpelitee.com/wp-json/wp/v2/properties?_embed&order=asc&orderby=title')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch properties');
        }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl font-medium text-gray-600">Loading properties...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Properties</h1>
        <Link
          href="/add-listing"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((item) => {
            const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between"
              >
                {featuredMedia && (
                  <img
                    src={featuredMedia}
                    alt={item.title?.rendered || 'Property'}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2
                      className="text-xl font-semibold text-gray-800 mb-2"
                      dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                    />
                    <div
                      className="text-gray-600 text-sm line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ __html: item.excerpt?.rendered || item.content?.rendered }}
                    />
                  </div>
                  <Link
                    href={`/properties/${item.slug}`}
                    className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}