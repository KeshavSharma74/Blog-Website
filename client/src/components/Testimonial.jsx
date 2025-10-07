import React from 'react';

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@digitalExplorer',
      testimonial: "This blog has become my go-to source for insightful articles. The quality of writing is exceptional and always leaves me with something new to think about.",
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Alex Johnson',
      handle: '@codeCrafter',
      testimonial: "I've been following this blog for months. The content is consistently well-researched, engaging, and has genuinely helped me grow in my professional journey.",
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@creativeMind',
      testimonial: "An amazing resource for anyone in the industry. The clear explanations and practical examples make complex topics easy to understand. Highly recommended!",
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Casey Garcia',
      handle: '@techSavvyReader',
      testimonial: "I love the diverse range of topics covered. There's always something interesting to read, and the community in the comments is just as insightful.",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-3 sm:p-4 rounded-lg mx-2 sm:mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 sm:w-80 shrink-0 bg-white">
      <div className="flex gap-2">
        <img className="w-9 h-9 sm:w-11 sm:h-11 rounded-full" src={card.image} alt={card.name} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium text-sm sm:text-base">{card.name}</p>
            <svg
              className="mt-0.5 fill-blue-500 sm:w-3 sm:h-3"
              width="10"
              height="10"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
              />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm py-3 sm:py-4 text-gray-800 leading-relaxed">
        "{card.testimonial}"
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="w-full max-w-[1350px] mx-auto bg-gray-50 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-800">What Our Readers Say</h2>

        {/* First Row */}
        <div className="marquee-row w-full mx-auto max-w-[1300px] overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] py-3 sm:py-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={`first-${index}`} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-10 sm:w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>

        {/* Second Row (Reverse) */}
        <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-3 sm:py-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={`second-${index}`} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-10 sm:w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;