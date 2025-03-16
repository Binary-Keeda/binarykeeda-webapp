const Loaader = () => {
    return (
        <div className='flex gap-2 justify-center items-center h-screen w-screen'>
            <div className='h-3 w-3 rounded-full bg-gray-800 animate-bounce' style={{ animationDelay: "0s" }}></div>
            <div className='h-3 w-3 rounded-full bg-gray-800 animate-bounce' style={{ animationDelay: "0.3s" }}></div>
            <div className='h-3 w-3 rounded-full bg-gray-800 animate-bounce'></div>
        </div>
    );
};

export default Loaader;