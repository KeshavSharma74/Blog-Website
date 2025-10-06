import React from 'react';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div
      className="h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/bgImage.png')" }}
    >
      <Navigation />
      {/* You can add more content here */}
    </div>
  );
};

export default Home;
