
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Showcase from '../components/Home/ShowCase';
import Footer from '../components/Home/Footer';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [userInfoModal, setUserInfoModal] = useState(false)

  useEffect(() => {
    const userinfo = localStorage.getItem('account')
    if (!userinfo) {
      setUserInfoModal(false)
      localStorage.setItem('current', false)
    }
  }, [])

  return (
    <>
    <section className='bg-landingPage'>
      <Hero />
      <About />
      <Showcase/>
      <Footer/>
    </section>
    </>
  )
}

export default Layout(Home)


