import React from 'react'
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Features from '../components/Home/Features';

const Home = () => {
  return (
    <section className=''>
      <Hero />

      <About />
      <Features />
    </section>
  )
}

export default Layout(Home);