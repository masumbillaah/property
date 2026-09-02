'use client';
import { useState } from 'react';

export default function AddListingPage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    const wpUsername = 'masum'; 
    const appPassword = '8zGL 5bgC FtVm oCIA PnAN JMbd';
    const credentials = btoa(`${wpUsername}:${appPassword}`);

    const payload = {
      title: formData.title,
      status: 'pending', // সরাসরি পাবলিশ না হয়ে পেন্ডিং থাকবে
      meta: {
        price: formData.price,
        location: formData.location,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
      },
    };

    try {
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
          text: 'Thank you! Your property has been submitted successfully and is currently under review.',
        });
        setFormData({
          title: '',
          price: '',
          location: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
        });
      } else {
        const errorData = await response.json();
        setStatusMessage({
          type: 'error',
          text: errorData.message || 'Failed to submit property. Please check backend configuration.',
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Network error. Could not reach the server.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Property</h1>
          <p className="text-slate-500 mt-2 text-sm">Submit your listing details for admin verification.</p>
        </div>

        {statusMessage.text && (
          <div
            className={`mb-8 p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200/80 text-emerald-900'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <div className="pt-0.5">
              <h4 className="font-semibold text-sm">
                {statusMessage.type === 'success' ? 'Submission Received!' : 'Notice'}
              </h4>
              <p className="text-xs mt-1 leading-relaxed opacity-90">{statusMessage.text}</p>
            </div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          </div>

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
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

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
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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
                className="w-full px-4 py-3 bg-white text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:bg-blue-300 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting to review...</span>
              </>
            ) : (
              'Submit Property'
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <a href="/" className="text-slate-500 text-sm font-semibold hover:text-blue-600 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}