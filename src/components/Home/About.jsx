import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from './Efffects'
export default function About () {
  return (
    <>
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        id='about'
        className='pt-16 pb-10 relative '
      >
        <div className='w-full max-w-7xl px-5 md:px-5 lg:px-5 mx-auto'>
          <div className='w-full justify-start items-center gap-12 flex sm:flex-row-reverse flex-col'>
            <div className='w-full flex-[.6] justify-center items-start gap-6  lg:order-first order-last'>
              <div className='lg:justify-center sm:justify-end justify-center items-start gap-2.5 flex'>
                {/* <img
                  className='rounded-xl object-cover'
                  src='https://pagedone.io/asset/uploads/1717741205.png'
                  alt='Techease Quiz Platform Image'
                /> */}
                <video src="/animations/a1.mp4" className=" h-[300px] md:h-[360px] rounded-xl"  autoPlay loop muted playsInline  ></video>
              </div>
              {/* <img
                className='sm:ml-0 ml-auto rounded-xl object-cover'
                src='https://pagedone.io/asset/uploads/1717741215.png'
                alt='Quiz Portal Image'
              /> */}
            </div>

            {/* Content Section */}
            <div className='w-full flex-1 flex-col justify-center lg:items-start items-center gap-10 inline-flex'>
              <div className='w-full flex-col justify-center items-start gap-8 flex'>
                <div className='w-full flex-col justify-start lg:items-start items-center gap-3 flex'>
                  <h2 className='text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center'>
                    About Us
                  </h2>
                  <p className='text-gray-700 text-lg font-normal leading-relaxed lg:text-start text-center'>
                    Techease empowers students with quizzes, roadmaps, and
                    guidance sessions, simplifying learning and career planning.
                    Join us to unlock your potential, excel academically, and
                    achieve your goals with expert-curated resources.
                  </p>
                </div>
                <div className='w-full hidden  lg:justify-start justify-center items-center sm:gap-10 gap-5 md:inline-flex'>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <h3 className='text-gray-900 text-4xl font-bold font-manrope leading-normal'>
                      50+
                    </h3>
                    <h6 className='text-gray-500 text-lg font-normal leading-relaxed'>
                      Interactive Quizzes
                    </h6>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <h4 className='text-gray-900 text-4xl font-bold font-manrope leading-normal'>
                      1000+
                    </h4>
                    <h6 className='text-gray-500 text-lg font-normal leading-relaxed'>
                      Users
                    </h6>
                  </div>
                  <div className='flex-col justify-start items-start inline-flex'>
                    <h4 className='text-gray-900 text-4xl font-bold font-manrope leading-normal'>
                      95%
                    </h4>
                    <h6 className='text-gray-500 text-lg font-normal leading-relaxed'>
                      User Satisfaction
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

// // Replace with actual image pat
// export default function Outing () {
//   return (
//     <section id='about' className='bg-white pt-20 pb-10 dark:bg-gray-900'>
//       <div className='gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-5 lg:px-6'>
//         <div className=' text-[#111] sm:text-lg dark:text-gray-400'>
//           <h2 className='mb-4  text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
//             Empowering Young Minds Through Education
//           </h2>
//           <p className='mb-4'>
//             At Tons Valley Education Trust Unit Guniyal Gaon Girls Education
//             Center, we are dedicated to providing quality education and
//             fostering the holistic development of young girls in our community.
//             Our commitment goes beyond academics; we nurture future leaders,
//             innovators, and change-makers.
//           </p>
//           <p>
//             Through our initiatives, we create opportunities for girls to
//             explore their potential, learn essential life skills, and gain the
//             confidence to achieve their dreams. Join us in our mission to
//             empower the next generation.
//           </p>
//         </div>
//         <div className='grid grid-cols-2 gap-4 mt-8'>
//           <img
//             className='w-full rounded-lg'
//             src={'/assets/hero.png'}
//             alt='Students during an outing 1'
//           />
//           <img
//             className='mt-4 w-full lg:mt-10 rounded-lg'
//             src={'/assets/about2.jpg'}
//             alt='Students during an outing 2'
//           />
//         </div>
//       </div>
//     </section>
//   )
// }
