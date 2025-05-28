import { useSelector } from "react-redux"
import { getSubmissions } from "../utils/getSubmissions"
import { Link } from "react-router-dom"
import { Assessment } from "@mui/icons-material"
import { useEffect } from "react"

const Submissions = () => {
    const { solutions } = useSelector(s => s.solution)

    useEffect(() => {
        getSubmissions()
    }, [])
    return (
        <section className=' bg-white mt-9 shadow-lg rounded-lg gap-6   flex flex-col '>

            <div className='relative flex flex-col  w-full h-full custom-scrollbar overflow-scroll    bg-white shadow-md  bg-clip-border'>
                <table className='w-full text-left table-auto min-w-max'>
                    <thead className="bg-support rounded-t-lg">
                        <tr>
                            <td className='p-4 border-b border-slate-200 '>
                                <p className='text-sm font-normal leading-none '>
                                    Quiz Name
                                </p>
                            </td>
                       
                            <td className='p-4 border-b border-slate-200 '>
                                <p className='text-sm font-normal leading-none '>
                                    Submitted At
                                </p>
                            </td>
                      
                            <td className='p-4 border-b border-slate-200 '>
                                <p className='text-sm font-normal leading-none '>
                                    Preview
                                </p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {solutions?.map(item => {
                            return (
                                <tr
                                    key={item._id}
                                    className='hover bg-primary border-b border-slate-200'
                                >
                                    <td className='p-4 py-5'>
                                        <p className='block font-semibold text-sm  dark:text-white text-slate-800'>
                                            {item.quizId.title}
                                        </p>
                                    </td>
                           
                                    <td className='p-4 py-5'>
                                        <p className='block font-semibold text-sm  dark:text-white text-slate-800'>
                                            {formatDateTime(item.updatedAt)}
                                        </p>
                                    </td>
                                    <td className='p-4 py-5'>
                                        <Link
                                            to={`/user/preview/${item._id}`}
                                            className='block font-semibold text-sm  dark:text-white text-slate-800'
                                        >
                                            <Assessment />
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {(solutions?.length == 0 || solutions == null) &&
                    <div className='py-5'>
                        <Link to={'/user/practice'} className='text-sm text-gray-600 p-5 my-5'>Go to practice section</Link>
                    </div>
                }
            </div>
        </section>
    )
}

export default Submissions;

function formatDateTime(dateInput) {
    const createdAt = new Date(dateInput)

    // Format date as "27 JAN 2024"
    const day = createdAt.getDate()
    const month = createdAt
        .toLocaleString('default', { month: 'short' })
        .toUpperCase()
    const year = createdAt.getFullYear()

    // Get hours and minutes
    const hours = String(createdAt.getHours()).padStart(2, '0') // Ensure 2-digit format
    const minutes = String(createdAt.getMinutes()).padStart(2, '0') // Ensure 2-digit format

    // Combine into the desired format
    return `${day} ${month} ${year}, ${hours}:${minutes}`
}