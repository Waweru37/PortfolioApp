import React from 'react';

function About() {
  return (
    <section id="about" className="min-h-screen px-6 py-20 bg-transparent text-white text-center">
      <div className="bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg mb-4">
              I’m a <strong className="font-bold">Software Engineer and Business Strategist</strong> who builds scalable full-stack solutions that solve real-world problems and drive measurable business growth.
              With hands-on experience in <strong>Java, C++, React, Android</strong>, and advanced cloud and network engineering, I transform complex challenges into streamlined systems.
            </p>
            <p className="text-lg mb-4">
              I combine deep technical insight with strategic thinking to deliver robust, ethical, and future-focused solutions. My mission is to develop technology that not only works flawlessly — but also creates meaningful impact.
            </p>
            <p className="text-lg mb-4">
              I’m especially passionate about <strong>decentralized systems, green energy</strong>, and <strong>AI for social good</strong>. I thrive in purpose-driven environments where innovation meets long-term sustainability.
            </p>
            <p className="text-lg">
              <strong className="font-bold">Let’s Connect</strong><br />
              <strong>Email:</strong> markwaweru37@gmail.com<br />
              <strong>Tel:</strong> +254 710 565 193<br />
              <strong>Location:</strong> Nairobi, Kenya<br />
              <span className="italic">Open to collaborations in clean tech, ethical AI, and strategic software innovation.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;