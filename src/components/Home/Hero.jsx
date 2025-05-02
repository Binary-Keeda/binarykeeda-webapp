import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Hero() {
    const {user} = useSelector(s=>s.auth)
    return (
        <section className="relative h-[480px] lg:h-[430px] max-h-lvh backdrop-blur-xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-[#000] via-black to-gray-900  z-30"></div>

            {/* Background Video */}
            <video
                className="h-full w-full object-cover object-center"
                autoPlay
                loop
                muted
                playsInline
                src="https://res.cloudinary.com/drzyrq7d5/video/upload/v1742219333/binarykeeda/rvdq564zixtqjspvqeql.mp4"
                aria-hidden="true"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-start justify-center text-start text-white px-10 z-40">
                <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
                    Master Your Skills with Binary Keeda
                </h1>
                <p className="mt-4 text-lg text-start md:text-xl max-w-2xl">
                    Learn, practice, and excel in coding, aptitude, reasoning, and core subjects with expert-curated quizzes and challenges.
                </p>
                <Link to={user ? `/${user.role}` : '/login'} className="mt-7">
                    <button class="rounded-md bg-[#ca5a27] py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white hover:opacity-80 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Start Learning
                    </button>
                </Link>
            </div>
        </section>
    );
}