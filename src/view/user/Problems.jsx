import React from 'react';
import questions from './solving/sample.json';
import { Link } from 'react-router-dom';
const Problems = () => {
    return (
        <>
            <div className='relative flex flex-col w-full h-full overflow-scroll custom-scrollbar dark:bg-gray-800 dark:text-gray-50 text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
                <table className='w-full overflow-x-scroll text-left table-auto min-w-max'>
                    <thead>
                        <tr>
                            <th className='p-4 border-b border-slate-200 dark:bg-gray-800 dark:text-gray-50 bg-slate-50'>
                                <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                                    Title
                                </p>
                            </th>
                            <th className='p-4 border-b border-slate-200 dark:bg-gray-800 dark:text-gray-50 bg-slate-50'>
                                <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                                    Difficulty
                                </p>
                            </th>
                            <th className='p-4 border-b border-slate-200 dark:bg-gray-800 dark:text-gray-50 bg-slate-50'>
                                <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                                    Description
                                </p>
                            </th>
                            <th className='p-4 border-b border-slate-200 dark:bg-gray-800 dark:text-gray-50 bg-slate-50'>
                                <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-500'>
                                    Link
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map(e =>
                            <tr key={e._id} className='p-4 border-b border-slate-200 dark:bg-gray-800 hover:bg-gray-50'>
                                <td className='p-4 border-b border-slate-200 dark:bg-gray-800 '>
                                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-
                            500'>
                                        {e.title}
                                    </p>

                                </td>
                                <td className='p-4 border-b border-slate-200 dark:bg-gray-800 '>
                                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-
                            500'>
                                        {e.difficulty}                                    </p>

                                </td>
                                <td className='p-4 border-b border-slate-200 dark:bg-gray-800 '>
                                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-
                            500'>
                                        <Link>
                                            Description
                                        </Link>
                                    </p>

                                </td>
                                <td className='p-4 border-b border-slate-200 dark:bg-gray-800 '>
                                    <p className='text-sm font-normal leading-none dark:text-gray-50 text-slate-
                            500'>
                                        <Link to={'/coding/'+e._id}>Link</Link>
                                    </p>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Problems;
