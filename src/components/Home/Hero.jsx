import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
    slidesToShow: 4,
    infinite: true,
    speed: 500,
    arrows: true,
    
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1 }
        }
    ]
};
  
export default function Hero() {
    const QUIZ_TYPES = [
        { label: "Aptitude", value: "Aptitude" },
        { label: "Reasoning", value: "Reasoning" },
        { label: "Core", value: "Core" },
        { label: "Quantitative", value: "Quantitative" },

    ]
    return (
        <section className='backdrop-blur-xl min-h-[480px] max-h-lvh '>
            {/* <div className='bg-gradient-to-tr from-sky-50 via-sky-100 to-sky-50  absolute h-full w-full left-0 -z-10 blur-xl'></div> */}
            <div className='pt-7 pb-5 lg:px-6 px-4 ' >
                <h1 className='text-3xl font-bold' >
                    Discover Wisdom, Master Skills – Welcome to Pragyanam
                </h1>
                <div className="flex gap-4 pl-1">

                    {QUIZ_TYPES.map((i, idx) => {
                        return (
                            <>
                                <button key={idx} className={`pb-1 ${id == 0 ? 'border-b-[2px]  border-collapse rounded-xs border-black' : ''} text-gray-600 hover:text-black  flex items-center gap-2 mt-4`}>
                                    <h1 className="text-sm text-inherit">
                                        {i.label}
                                    </h1>
                                </button>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className='h-full px-6 py-10  w-full bg-[#000]'>
                <h1 className='text-5xl mb-2 text-gray-200' >
                    Unlock Wisdom with Pragyanam
                </h1>
                <p className='text-md block text-gray-200'>
                    Learn, quiz, code, and connect—all in one platform. Start your journey to mastery today.
                </p>
                <div className='mt-5' >
                    <Slider  {...settings}>
                        {[0, 0, 0, 0].map((i, idx) => {
                            return (
                                <div key={idx} className='flex bg-gray-400 h-[280px] rounded-md gap-4 mt-4'>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    )
}
