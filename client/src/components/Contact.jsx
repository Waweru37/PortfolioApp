function Contact() {
    return (
      <section id="contact" className="min-h-screen bg-transparent py-20 px-6 text-white text-center">
            <div className="bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Contact</h2>
          <p className="mb-10 text-lg text-slate-300">
            Interested in working together or have any questions? Let’s connect!
          </p>
          <form
            action="mailto:markwaweru37@gmail.com"
            method="POST"
            encType="text/plain"
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
            >
              Send Message
            </button>
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
  
  