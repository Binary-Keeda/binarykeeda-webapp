const inputClass = "bg-[#2f3134] text-xs ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium "

const Register = () => {
  return (
    <>
      <section className="fixed flex justify-center items-center flex-col top-0 z-30 bg-[#1d1e20] h-screen w-screen" >
        <div className="mb-10" >
          <img className="h-16 rounded-md" src="/assets/logo/A37A874D-8E55-4BCC-BDF4-EBFA65B2F790_1_201_a.jpeg" alt="" />
        </div>
        <div>
          <a  href="http://localhost:5000/auth/google/" className={`${inputClass} flex text-xs gap-3 items-center mt-3 mb-2 justify-center `} >
            <Logo />
            Continue with Google
          </a>
        </div>
        <div className="flex text-gray-300 items-center mt-2 gap-1" >
          <hr className="text-gray-300 bg-gray-300 w-[120px]" />
          or
          <hr className="text-gray-300 bg-gray-300 w-[120px]" />
        </div>
        <form className="max-w-screen-sm flex flex-col gap-3 items-center p-4 m-2 w-screen transition-all duration-500 " >
          <input placeholder="Enter Email" type="text" className={`${inputClass}`} name="" id="" />
          <button className="bg-[#2f3134] ease-linear duration-100 hover:bg-[#3d4043] rounded-md w-[310px] text-gray-300 border-[rgb(214 218 227 / 4%)] p-4 font-medium text-xs" >
            Submit
          </button>
          <span className="text-xs text-gray-300" href="#">Already a user? <a href="/login" className="underline">Login</a></span>
        </form>
        <a className="text-center text-gray-400 fixed bottom-10 px-5 text-xs hover:underline" href="">By continuing, you agree to Pragyanm Terms of Service and Privacy Policy.</a>
      </section>
    </>
  )
}

export default Register;



const Logo = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="-3 0 262 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
};

