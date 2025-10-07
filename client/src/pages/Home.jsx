import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonial from '../components/Testimonial';
import FAQSection from '../components/FAQSection';
import LatestBlogs from '../components/LatestBlogs';

const Home = () => {
  return (
    <div
      className=" bg-cover bg-center bg-[#F9FAFB]"
      
    >
      <Navigation />
      {/* You can add more content here */}
      <Hero></Hero>
      <About></About>
      <Testimonial></Testimonial>
      <FAQSection></FAQSection>

      <LatestBlogs></LatestBlogs>
    </div>
  );
};

export default Home;
