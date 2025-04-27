import React, { useState } from 'react'
import Card from './Card'
import { motion } from 'framer-motion'
import { fadeIn } from './Home'
export default function Showcase () {
  const projects = [
    {
      id: 1,
      title: 'Practice Quizzes',
      icon:'/icons/quiz.png',
      content:
        'Interactive quizzes to help you strengthen your knowledge across various subjects and skills.',
      image:
        'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-01.jpg'
    },
    {
      id: 2,
      title: 'Roadmaps',
      icon:'/icons/roadmap.png',
      content:
        'Detailed learning paths to guide you step-by-step in mastering your desired field or skill.',
      image:
        'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-02.jpg'
    },
    {
      id: 3,
      title: 'Mentorship',
      icon: '/icons/mentorship.png' ,
      content:
        'One-on-one or group mentoring sessions with industry experts to accelerate your growth.',
      image:
        'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-03.jpg'
    },
    {
      id: 4,
      title: 'Jobs & Hackathon',
      icon:'/icons/jobs.png',
      content:
        'Professional design services, including logos, business cards, and branding to elevate your business.',
      image:
        'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-04.jpg'
    }
  ]

  return (
    <motion.section
    id='features'
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeIn}
      className='pt-20 lg:pt-[60px] dark:bg-dark'
    >
    <div className='w-full max-w-7xl px-5 md:px-5 lg:px-5 mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className=' mb-[60px] text-gray-900 w-full text-start'>
              <h2 className='mb-4  text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>
                Dream big , Learn More
              </h2>
              {/* <p className='text-body-color text-base dark:text-dark-6'>
                Your Journey Begins Here
              </p> */}
            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-5'>
          {projects.map(project => (
            // <div key={project.id} className='w-full px-4 md:w-1/2 xl:w-1/4'>
            //   <div className='relative mb-5'>
            //     <div className='shadow-xl overflow-hidden rounded-[10px]'>
            //       <img
            //         src={project.image}
            //         alt={project.content}
            //         className='w-full shadow-xl'
            //       />
            //     </div>
            //     <div className='relative shadow-md z-10 mx-7 -mt-20 rounded-lg bg-white dark:bg-dark-2 py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark'>
            //       <span className='text-primary mb-2 block text-sm font-medium'>
            //         {project.content.charAt(0).toUpperCase() +
            //           project.content.slice(1)}
            //       </span>
            //       <h3 className='text-dark dark:text-white mb-5 text-xl font-bold'>
            //         {project.title}
            //       </h3>
            //       <a
            //         href='#'
            //         className='text-body-color dark:text-dark-6 hover:border-primary hover:bg-primary inline-block rounded-md border border-stroke dark:border-dark-3 py-[10px] px-7 text-sm font-medium transition hover:text-gray-900'
            //       >
            //         View Details
            //       </a>
            //     </div>
            //   </div>
            // </div>
            <Card
            icon={project.icon || null}
              description={project.content}
              heading={project.title}
              index={project.id}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
