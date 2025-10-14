import React from 'react';
import Navigation from '../components/Navigation';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      content: "Kloudshark has been my go-to source for tech insights. The articles are well-researched and always provide practical value. I've learned so much from their content!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      content: "The quality of content on Kloudshark is exceptional. Each article is thoughtfully written and provides real value. It's become part of my daily reading routine.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      content: "I love how Kloudshark covers diverse topics with such depth. The articles are engaging and always teach me something new. Highly recommended!",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      content: "Kloudshark consistently delivers high-quality content that's both informative and engaging. Their insights have helped me stay ahead in the tech industry.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
      content: "The articles on Kloudshark are not just informative but also actionable. I've implemented many ideas from their content in my work. Great resource!",
      rating: 5
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Data Scientist",
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
      content: "Kloudshark's content quality is outstanding. The articles are well-structured, easy to understand, and always provide valuable insights. Keep up the great work!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Testimonials Hero Section */}
      <div className="mt-16 border-b border-b-gray-200 bg-blue-50">
        <div className="flex flex-col lg:flex-row w-full max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 h-auto lg:h-[570px] py-12 lg:py-0">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:gap-7 px-2 sm:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Hear What Our Global Community Is Saying
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Dive into the experiences of our valued readers and discover how Kloudshark's curated
              content empowers them in their learning journeys and professional growth every day.
            </p>

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
                  Trusted by <span className="font-medium text-gray-800">100,000+</span> satisfied users
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center mt-8 lg:mt-0">
            <img 
              src="testimonialHero.png" 
              className="w-full max-w-md lg:max-w-lg h-auto object-cover rounded-lg" 
              alt="Testimonial Hero Visual" 
            />
          </div>
        </div>
      </div>

      {/* Main Content - Testimonials Grid */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  className="w-10 h-10 rounded-full object-cover" 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Light Call to Action */}
        <div className="mt-16">
          <div className="max-w-[1300px] md:w-full mx-auto flex flex-col items-center justify-center text-center bg-[#EFF6FF] border border-gray-200 rounded-2xl p-10">
            <div className="flex items-center">
                <div className="flex -space-x-3 pr-3">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user avatar"
                        className="size-8 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user avatar"
                        className="size-8 rounded-full border-2 border-white" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                        alt="user avatar"
                        className="size-8 rounded-full border-2 border-white" />
                </div>
                <div>
                    <div className="flex items-center justify-center gap-px">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z" fill="#F59E0B"/>
                          </svg>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">Trusted by 100,000+ readers</p>
                </div>
            </div>
            <h2 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold max-w-2xl mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Ready to Start Your Learning Journey?
            </h2>
            <a href="/blog" className="px-8 py-3 bg-blue-500  text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200 mt-8">
                Explore Our Blog
            </a>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Testimonials;