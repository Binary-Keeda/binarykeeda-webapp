import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Showcase from '../components/Home/ShowCase';
import Footer from '../components/Home/Footer';

const Home = () => {
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

export default Layout(Home);