import React from 'react';
import Hero from './Hero';
import Trending from './Trending';
import Newsletter from './Newsletter';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Trending/>
      <Newsletter/>
    </div>
  );
};

export default Home;
