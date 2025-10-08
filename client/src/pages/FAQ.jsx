import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of topics are covered on this blog?",
      answer: "Our blog features a blend of technology, lifestyle, and educational content. From the latest innovations in AI and software to practical insights that help readers grow personally and professionally."
    },
    {
      question: "Who writes the articles?",
      answer: "All articles are written and curated by our admin team of passionate writers and editors. Each post is crafted with research, clarity, and a love for sharing knowledge."
    },
    {
      question: "Can I contribute or submit a guest post?",
      answer: "Currently, only our admin team publishes content to maintain consistent quality and reliability. However, we welcome ideas and topic suggestions from our readers anytime!"
    },
    {
      question: "How can I suggest a topic for a future article?",
      answer: "We love hearing from our readers! If you'd like us to cover a particular subject, visit our Contact page and share your suggestion. Your feedback helps shape our content."
    },
    {
      question: "How often is new content published?",
      answer: "We publish new articles regularly to keep our content fresh and relevant. Our goal is to provide consistent, high-quality content that our readers can rely on."
    },
    {
      question: "Is the content free to read?",
      answer: "Yes! All our content is completely free to read. We believe in making knowledge accessible to everyone and don't require any subscriptions or payments."
    },
    {
      question: "Can I share articles on social media?",
      answer: "Absolutely! We encourage sharing our articles on social media platforms. Each article includes social sharing buttons to make it easy for you to share with your network."
    },
    {
      question: "How can I stay updated with new posts?",
      answer: "You can stay updated by regularly visiting our blog page or following us on social media. We also recommend bookmarking our site for easy access to new content."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* FAQ Hero Section */}
      <div className="mt-16 border-b border-b-gray-200 bg-blue-50">
        <div className="flex flex-col lg:flex-row w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 h-auto lg:h-[570px] py-12 lg:py-0">
          
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:gap-7">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Answers & Insights: Your Questions, Addressed
            </h1>
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
              Find clear, concise answers to the most common questions about Kloudshark. We've compiled this list to help you navigate our content and community with ease.
            </p>
            {/* Avatars + Rating Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:divide-x sm:divide-gray-300">
              <div className="flex -space-x-3 sm:pr-3">
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="user3" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user4" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
              </div>
              <div className="sm:pl-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                    </svg>
                  ))}
                  <p className="text-gray-600 font-medium ml-2 text-sm sm:text-base">5.0</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Trusted by our community
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center mt-8 lg:mt-0">
            <img 
              src="faqHero.png" 
              className="w-full max-w-md lg:max-w-lg h-auto object-cover rounded-lg" 
              alt="FAQ Hero Visual" 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Image and Additional Info */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <img
                src="faqImage.png"
                alt="FAQ illustration"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer you're looking for, we'd love to hear from you. 
                Feel free to reach out with any questions or suggestions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email us your questions</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>We respond within 24 hours</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>We're here to help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;