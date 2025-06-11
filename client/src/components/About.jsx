import React from 'react';

function About() {
  return (
    <section id="about" className="min-h-screen px-6 py-20 bg-transparent text-white text-center">
      <div className="bg-gray-900 bg-opacity-20 p-10 rounded-xl shadow-xl">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg mb-4">
              I am a <strong className="font-bold">dynamic Software Engineer and strategic Business Innovator</strong> who architects robust full-stack solutions and leverages cloud computing to drive impactful business growth. With a proven track record in Java, C++, React, Android, and advanced network engineering, I translate complex technical challenges into efficient, scalable systems. My approach merges deep analytical insight with ethical foresight, ensuring technology not only performs but also <strong className="font-bold">positively shapes society.</strong>
            </p>
            <p className="text-lg mb-4">
              Passionate about fostering a sustainable future, I am dedicated to pioneering advancements in decentralization, green energy, and AI for social good. I thrive in environments where innovation meets purpose, consistently delivering solutions that align technology with strategic business objectives and global sustainability goals.
            </p>
            <p className="text-lg">
              <strong className="font-bold">Let's Connect:</strong><br />
              <strong>Email:</strong> markwaweru37@gmail.com<br />
              <strong>Tel:</strong> +254 710 565 193<br />
              <strong>Location:</strong> Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;