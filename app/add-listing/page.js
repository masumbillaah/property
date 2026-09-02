'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AddListingPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    const wpUsername = 'masum';
    const appPassword = '8zGL 5bgC FtVm oCIA PnAN JMbd';
    const credentials = btoa(`${wpUsername}:${appPassword}`);

    try {
      let featuredMediaId = null;

      // ১. ছবি আপলোড করা (WordPress Media Library)
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);

        const uploadRes = await fetch(
          'https://masum66.wpelitee.com/wp-json/wp/v2/media',
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${credentials}`,
            },
            body: imageFormData,
          }
        );

        if (uploadRes.ok) {
          const uploadedMedia = await uploadRes.json();
          featuredMediaId = uploadedMedia.id;
        } else {
          console.error('Image upload failed, proceeding without image.');
        }
      }

      // ২. প্রোপার্টি ডাটা সাবমিট করা
      const payload = {
        title: formData.title,
        status: 'pending',
        featured_media: featuredMediaId,
        meta: {
          price: formData.price,
          location: formData.location,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          area: formData.area,
        },
      };

      const response = await fetch(
        'https://masum66.wpelitee.com/wp-json/wp/v2/properties',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your property and image have been submitted successfully for admin review.',
        });
        setFormData({
          title: '',
          price: '',
          location: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
        });
        setImageFile(null);
        setImagePreview('');
      } else {
        const errorData = await response.json();
        setStatusMessage({
          type: 'error',
          text: errorData.message || 'Failed to submit property. Please check configuration.',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Network error. Could not connect to the server.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* --- HEADER --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-blue-600">
              Elite<span className="text-slate-900">Homes</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/add-listing" className="text-blue-600 transition-colors">Add Property</Link>
          </nav>
        </div>
      </header>

      {/* --- MAIN FORM CONTENT --- */}
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add New Property</h1>
            <p className="text-slate-500 mt-2 text-sm">Submit your listing details for admin verification.</p>
          </div>

          {statusMessage.text && (
            <div
              className={`mb-8 p-5 rounded-2xl flex items-start gap-4 transition-all ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full text-white flex items-center justify-center shrink-0 ${
                  statusMessage.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                {statusMessage.type === 'success' ? '✓' : '!'}
              </div>
              <div className="pt-0.5">
                <h4 className="font-semibold text-sm">
                  {statusMessage.type === 'success' ? 'Submission Received!' : 'Notice'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed opacity-90">{statusMessage.text}</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Modern Luxury Villa"
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center transition-all bg-slate-50/50">
                {imagePreview ? (
                  <div className="relative group flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-44 w-full object-cover rounded-xl mb-3 shadow-md"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-xs font-bold text-blue-600 hover:underline"
                    >
                      Change Photo
                    </label>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">Click to upload property image</span>
                    <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</span>
                  </label>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="450000"
                  className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Dhanmondi, Dhaka"
                  className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Beds, Baths, Area */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Beds
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  placeholder="4"
                  className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Baths
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  placeholder="3"
                  className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Area
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  placeholder="2400 sq ft"
                  className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting & Uploading Media...</span>
                </>
              ) : (
                'Submit Property'
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <Link href="/" className="text-slate-500 text-sm font-semibold hover:text-blue-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2026 EliteHomes Real Estate Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}