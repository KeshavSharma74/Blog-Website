import React from 'react';

const About = () => {
  return (
    <div className='pb-20 ' >
      {/* Heading Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          About Kloudshark
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          A dedicated space for insightful articles and stories – each piece curated with expertise, passion, and a commitment to knowledge.
        </p>
      </div>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-4 md:px-0">
        {/* Left Side - Image with community overlay */}
        <div className="relative flex-1 flex justify-center items-center">
          <img
            className="max-w-md w-full object-cover rounded-2xl shadow-lg"
            src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
            alt="Kloudshark team working on content"
          />

          {/* Overlay Box */}
          <div className="flex items-center gap-2 max-w-xs absolute  bottom-6 left-30 bg-white p-4 rounded-xl shadow-md">
            <div className="flex -space-x-3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="team member 1"
                className="w-9 h-9 rounded-full border-2 border-white hover:-translate-y-1 transition"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="team member 2"
                className="w-9 h-9 rounded-full border-2 border-white hover:-translate-y-1 transition"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="team member 3"
                className="w-9 h-9 rounded-full border-2 border-white hover:-translate-y-1 transition"
              />
              <div className="flex items-center justify-center text-xs font-medium text-white w-9 h-9 rounded-full border-2 border-white bg-blue-600 hover:-translate-y-1 transition">
                50+
              </div>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Our growing reader community
            </p>
          </div>
        </div>

        {/* Right Side - Mission Statement */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl uppercase font-semibold text-slate-700">
            Our Mission
          </h2>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-blue-600 to-[#D9E6FF] mt-2"></div>

          <p className="mt-8 text-gray-700">
            At Kloudshark, we believe in the power of knowledge to inform, inspire, and foster growth. Our platform is dedicated to providing high-quality, thoroughly researched articles across a spectrum of tech-related topics, lifestyle, and educational content.
          </p>
          <p className="mt-4 text-gray-700">
            Our team of expert writers and administrators carefully crafts each piece, ensuring accuracy, relevance, and engaging narratives. We strive to be your go-to source for understanding complex concepts, discovering new trends, and gaining valuable insights.
          </p>
          <p className="mt-4 text-gray-700">
            While only our dedicated administrators publish content, our ultimate goal is to empower our readers with the information they need to stay ahead, learn something new, or simply enjoy a well-written story.
          </p>

          <button className="flex w-[210px] items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-blue-600 to-blue-400 py-3 px-8 rounded-full text-white shadow-md">
            <span>Explore Articles</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
