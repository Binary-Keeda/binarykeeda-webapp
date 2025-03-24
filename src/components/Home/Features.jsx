import React from 'react';
import Typical from 'react-typical';

export default function Features() {
    const CARDS = [
        {
            head: "Personalized Learning",
            description: "Tailored courses designed to meet individual learning needs with interactive content.",
            img: "https://source.unsplash.com/400x300/?elearning,education"
        },
        {
            head: "Expert-Led Courses",
            description: "Learn from industry professionals and experienced educators with hands-on guidance.",
            img: "https://source.unsplash.com/400x300/?teacher,classroom"
        },
        {
            head: "Flexible Learning Paths",
            description: "Access courses anytime, anywhere, with self-paced learning modules.",
            img: "https://source.unsplash.com/400x300/?laptop,student"
        },
        {
            head: "Career-Focused Curriculum",
            description: "Gain in-demand skills and certifications to enhance job opportunities and career growth.",
            img: "https://source.unsplash.com/400x300/?career,success"
        }
    ];

    return (
        <section className='flex flex-col gap-10 py-10 pb-24 px-5 md:px-10 bg-gradient-to-t from-blue-100 via-white to-white' >
            <h1 className='text-2xl lg:text-4xl text-gray-900 drop-shadow-sm font-bold'>
                Your Career as a{' '}
                <span className='text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text'>
                    <Typical 
                        steps={['QA Tester', 1500, 'Software Engineer', 1500, 'Web Developer', 2000, 'Data Scientist', 2000]} 
                        loop={Infinity} 
                        wrapper="span" 
                    />
                </span>
            </h1>

            <section className='grid md:grid-cols-2  grid-cols-1 lg:grid-cols-4 gap-4'>
                {CARDS.map((i, idx) => (
                    <div className='flex shadow-lg flex-col hover:shadow-xl transition-all duration-200 hover:scale-105 h-[330px] rounded-[22px]' key={idx}>
                        <img className='h-[200px] object-cover rounded-t-[22px]' src={"https://30dc.graphy.com/s/store/courses/64ff7f1be4b0607f6f9001f6/cover.jpg?v=2"} alt={i.head} />
                        <div className='p-6'>
                            <h1 className='text-gray-900'>{i.head}</h1>
                            <p className='text-xs text-gray-600 mt-1'>{i.description}</p>
                            <a className='text-xs text-gray-600 underline' href="">Know more </a>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
