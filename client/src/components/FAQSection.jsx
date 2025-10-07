import React, { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of topics are covered on this blog?",
      answer:
        "Our blog features a blend of technology, lifestyle, and educational content. From the latest innovations in AI and software to practical insights that help readers grow personally and professionally.",
    },
    {
      question: "Who writes the articles?",
      answer:
        "All articles are written and curated by our admin team of passionate writers and editors. Each post is crafted with research, clarity, and a love for sharing knowledge.",
    },
    {
      question: "Can I contribute or submit a guest post?",
      answer:
        "Currently, only our admin team publishes content to maintain consistent quality and reliability. However, we welcome ideas and topic suggestions from our readers anytime!",
    },
    {
      question: "How can I suggest a topic for a future article?",
      answer:
        "We love hearing from our readers! If you'd like us to cover a particular subject, visit our Contact page and share your suggestion. Your feedback helps shape our content.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 w-full max-w-[1350px] mx-auto px-6 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <div className="text-center px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base md:text-base text-slate-500 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
          Have a question? Here are some of the most common things our readers
          ask about our blog, content, and community.
        </p>
      </div>

      {/* Image + Accordion */}
      <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
        <img
          className="w-full lg:w-[60%] h-auto rounded-2xl shadow-md object-cover transition-all duration-300 max-w-lg lg:max-w-none"
          src="faqImage1.png"
          alt="Person exploring blog content"
        />

        <div className="flex-1 w-full max-w-[650px] px-2 sm:px-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-200 py-3 sm:py-4 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 leading-tight pr-4">
                  {faq.question}
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`sm:w-[18px] sm:h-[18px] ${
                    openIndex === index ? "rotate-180" : ""
                  } transition-transform duration-500 ease-in-out flex-shrink-0`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Smooth open/close using grid + opacity */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p
                  className={`text-xs sm:text-sm text-slate-500 transition-all overflow-hidden duration-500 ${
                    openIndex === index
                      ? "opacity-100 pt-2 sm:pt-3"
                      : "opacity-0"
                  }`}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;