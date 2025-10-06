import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';

const Home = () => {
  return (
    <div
      className=" bg-cover bg-center"
      
    >
      <Navigation />
      {/* You can add more content here */}
      <Hero></Hero>
      <About></About>
    </div>
  );
};

export default Home;
