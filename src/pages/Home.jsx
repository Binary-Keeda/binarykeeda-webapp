import React, { useEffect, useRef, useState } from 'react'
import Layout from '../layout/Layout'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Showcase from '../components/Home/ShowCase'
import Features from '../components/Home/Features'
import Content from '../components/Home/Content'

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
    <section>
      {userInfoModal && <InfoModal setUserInfoModal={setUserInfoModal} />}
      <Hero />
      <DynamicHeightModal />
      <About />
      <Showcase />
      <Content />
    </section>
  )
}

export default Layout(Home)

function DynamicHeightModal () {
  const [open, setOpen] = useState(false)
  const [modalHeight, setModalHeight] = useState('0px')
  const [heroBottom, setHeroBottom] = useState(0)

  // We will get the hero element to calculate its bottom
  const heroRef = useRef(null)

  // Calculate modal height and hero bottom position
  const calculateHeight = () => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const remainingHeight = viewportHeight - rect.bottom
      setHeroBottom(rect.bottom)
      setModalHeight(`${remainingHeight}px`)
    }
  }

  useEffect(() => {
      calculateHeight()
      window.addEventListener('resize', calculateHeight)
        // document.body.style.overflow = 'hidden'
    return () => window.removeEventListener('resize', calculateHeight)
  }, [])

  return (
    <>
      {/* Render a "dummy" Hero ref container to measure Hero bottom */}
      {/* In practice, you want to pass a ref to your real Hero component */}
      <div
        ref={heroRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '400px',
          pointerEvents: 'none',
          opacity: 0
        }}
      >
        {/* This div just helps get the bottom of the Hero area; replace height with real Hero height */}
      </div>

      {/* Overlay starting from Hero bottom down to bottom */}
      {/* <div
            className="fixed left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
            style={{ top: heroBottom }}
            onClick={() => setOpen(false)}
          /> */}

      {/* Modal fixed to bottom with dynamic height */}
      <div
       data-tour='modal-link'
        style={{
          height: modalHeight,
          top:modalHeight
        }}
        className='fixed h-full w-full inset-0  bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10'
      >
        <div className='bg-white text-black p-6 rounded shadow-lg text-center'>
          <h2 className='text-lg font-semibold mb-2'>Content Hidden</h2>
          <p>Website under developement</p>
        </div>
      </div>
    </>
  )
}
