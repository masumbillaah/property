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

    // 🔴 আপনার ওয়ার্ডপ্রেস ইউজারনেমটি এখানে বসান (যেমন masum বা admin)
    const wpUsername = 'masum'; 
    const appPassword = '8zGL 5bgC FtVm oCIA PnAN JMbd';

    // Base64 এনকোডিং তৈরি
    const credentials = btoa(`${wpUsername}:${appPassword}`);

    // ব্যাকএন্ডে পাঠানোর জন্য ডেটা ফরম্যাট
    const payload = {
      title: formData.title,
      status: 'publish', // সরাসরি পাবলিশ না করে পেন্ডিং রাখতে চাইলে 'pending' দিন
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
          text: 'Property successfully added to WordPress!',
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
        console.error('WP API Error:', errorData);
        setStatusMessage({
          type: 'error',
          text: errorData.message || 'Failed to submit property. Please check permissions.',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage({
        type: 'error',
        text: 'Network error. Could not connect to backend.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Add New Property</h1>
        <p className="text-slate-600 mb-8 text-sm">Submit your property details to list it on our platform.</p>

        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              statusMessage.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Modern Luxury Villa"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="450000"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Dhanmondi, Dhaka"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                placeholder="4"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                placeholder="3"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                placeholder="2400 sq ft"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
          >
            {loading ? 'Submitting Property...' : 'Submit Property'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 text-sm font-semibold hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  );
}