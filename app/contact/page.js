'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Contact Our Agents</h1>
        <p className="text-slate-600 mb-8 text-sm">Have a question about a property? Leave us a message.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
            <textarea rows="4" placeholder="I am interested in..." className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>

          <button 
            type="button" 
            onClick={() => alert('Message sent successfully!')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-600 text-sm font-semibold hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  );
}