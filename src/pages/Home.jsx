import React from 'react'
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Showcase from '../components/Home/ShowCase';
import Features from '../components/Home/Features';
import Content from '../components/Home/Content';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <section className=''>
      <Hero />
      <About />
      <Showcase/>
      <Content/>
      <Footer/>
    </section>
  )
}

export default Layout(Home);