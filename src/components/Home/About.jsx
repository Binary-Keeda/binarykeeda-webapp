import React from "react";

export default function About() {
    return (
        <div className="relative  overflow-hidden">
            {/* Background Gradients */}
            <div aria-hidden="true" className="absolute blur-xl backdrop:blur-lg inset-0 flex justify-start">
                <div className="absolute -top-20 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300 via-purple-200 to-violet-300 opacity-40 blur-3xl rounded-full dark:from-violet-800 dark:via-violet-600 dark:to-purple-900"></div>
                <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-tl from-blue-300 via-blue-200 to-blue-400 opacity-30 blur-3xl rounded-full dark:from-indigo-800 dark:via-indigo-700 dark:to-blue-900"></div>
                <div className="absolute bottom-0 left-[10px] w-[800px] h-[800px] bg-gradient-to-tl from-blue-300 via-blue-200 to-blue-400 opacity-30 blur-3xl rounded-full dark:from-indigo-800 dark:via-indigo-700 dark:to-blue-900"></div>
                <div classname="absolute -bottom-10  w-screen h-[800px]  opacity-30 blur-3xl rounded-full dark:from-indigo-800 dark:via-indigo-700 dark:to-blue-900"></div>
            </div>
            {/* Content */}
            <div className="relative z-10 max-w-[85rem]  px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="max-w-3xl text-start ">
                    {/* Heading */}
                    <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                        About Our Journey
                    </p>

                    {/* Title */}
                    <div className="mt-5">
                        <h1 className="text-gray-800 text-4xl md:text-5xl font-semibold dark:text-white">
                            Empowering Change, One Step at a Time
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="mt-5">
                        <p className="text-lg text-gray-600 dark:text-neutral-400">
                            Our mission is to revolutionize web development by offering
                            cutting-edge solutions and user-friendly designs. From humble
                            beginnings, we've grown into a team dedicated to innovation and
                            excellence.
                        </p>
                        <p className="mt-4 text-lg text-gray-600 dark:text-neutral-400">
                            We believe in the power of technology to make a difference.
                            Whether it's through intuitive UI components or seamless digital
                            experiences, we're here to push boundaries and redefine
                            possibilities.
                        </p>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="mt-1 flex justify-start gap-3">
                        <a href="#buttons-with-link" className="mt-7">
                            <button class="rounded-md bg-[#0249ad] py-3 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white hover:opacity-80 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Register Now
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
