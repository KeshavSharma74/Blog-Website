import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonial from '../components/Testimonial';
import FAQSection from '../components/FAQSection';
import LatestBlogs from '../components/LatestBlogs';

const Home = () => {
  const location = useLocation();
  
  // Create refs for each section
  const aboutRef = useRef(null);
  const testimonialRef = useRef(null);
  const faqRef = useRef(null);
  const latestBlogsRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle navigation state for auto-scrolling
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        switch (location.state.scrollTo) {
          case 'about':
            scrollToSection(aboutRef);
            break;
          case 'testimonials':
            scrollToSection(testimonialRef);
            break;
          case 'faq':
            scrollToSection(faqRef);
            break;
          case 'features':
            scrollToSection(latestBlogsRef);
            break;
          default:
            break;
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="bg-[#F9FAFB] bg-cover bg-center">
      <Navigation
        scrollToSection={scrollToSection}
        refs={{ aboutRef, testimonialRef, faqRef, latestBlogsRef }}
      />
      <Hero />
      <div ref={aboutRef}><About /></div>
      <div ref={testimonialRef}><Testimonial /></div>
      <div ref={faqRef}><FAQSection /></div>
      <div ref={latestBlogsRef}><LatestBlogs /></div>
    </div>
  );
};

export default Home;
