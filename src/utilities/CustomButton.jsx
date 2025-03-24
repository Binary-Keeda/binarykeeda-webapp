export const CustomButton = ({title , size}) => {
    return <>
    <button className={`bg-[rgba(29,30,32,1)] text-gray-200 rounded-md p-2 w-[${size}] `} >
        {title}
    </button>
    </>
}