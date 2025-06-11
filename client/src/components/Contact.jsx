import React, { useState } from 'react';

function Contact() {
  const [status, setStatus] = useState(''); // 'idle', 'submitting', 'success', 'error'
  const [message, setMessage] = useState(''); // Message to display to the user

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('Sending your message...');

    const form = event.target;
    const data = new FormData(form);

    try {
      // Updated with the provided Formspree URL
      const response = await fetch('https://formspree.io/f/xanjowvg', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for your message! I will get back to you shortly.');
        form.reset(); // Clear the form fields
      } else {
        const result = await response.json();
        setStatus('error');
        setMessage(result.errors ? result.errors.map(e => e.message).join(', ') : 'Oops! There was an issue sending your message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error: Could not connect to the server. Please check your internet connection and try again.');
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-transparent py-20 px-6 text-white text-center">
      <div className="bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Contact</h2>
          <p className="mb-10 text-lg text-slate-300">
            Interested in working together or have any questions? Let’s connect!
          </p>
          <form
            onSubmit={handleSubmit} // Use the new handleSubmit function
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium shadow-lg transition duration-300"
              disabled={status === 'submitting'} // Disable button while submitting
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {status && status !== 'idle' && (
              <p className={`mt-4 text-center text-lg ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
          <p className="mt-10 text-sm text-slate-400">
            Or reach me directly: <br />
            <strong>Email:</strong> markwaweru37@gmail.com <br />
            <strong>Phone:</strong> +254 710 565 193 <br />
            <strong>Location:</strong> Nairobi, Kenya
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;