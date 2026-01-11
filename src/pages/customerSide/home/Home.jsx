import React from 'react';
import Hero from './Hero';
import Trending from './Trending';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Trending/>
    </div>
  );
};

export default Home;
