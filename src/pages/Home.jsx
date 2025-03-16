import React from 'react'
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';

const Home = () => {
  return (
    <section className=''>
        <Hero/>
        <About/>
    </section>
  )
}

export default Layout(Home);