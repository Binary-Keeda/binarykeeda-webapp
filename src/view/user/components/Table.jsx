import { Link } from "react-router-dom";
import { LockRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../../../redux/api/getQuiz";
import {
  resetState,
  setCategory,
  setCurrentPage,
} from "../../../redux/reducers/quizReducer";
import { useEffect } from "react";

const Table = ({ currCategory }) => {
  const { hasMore,category , page, loading, data, currentPage, totalPages } = useSelector(
    (s) => s.quiz
  );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const changehandeler = (e) => {
    dispatch(resetState());
    dispatch(setCategory(e.target.value));
    getQuiz();
  };
  const nextPage = () => {
    if (hasMore) {
      getQuiz();
    } else {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  const prevPage = () => {
    if (currentPage == 1) {
      return;
    } else {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };
  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll custom-scrollbar   bg-primary shadow-md rounded-lg bg-clip-border">
        <table className="w-full overflow-x-scroll text-left table-auto min-w-max">
          <thead>
            <tr className="bg-support">
              <th className="p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50">
                <p className="text-sm font-normal leading-none dark:text-gray-50 text-gray-700">
                  Title
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50">
                <p className="text-sm font-normal leading-none dark:text-gray-50 text-gray-700">
                  Difficulty
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50">
                <p className="text-sm font-normal leading-none dark:text-gray-50 text-gray-700">
                  Duration
                </p>
              </th>
              {/* <th className="p-4 border-b border-slate-200 bg-primary dark:text-gray-50 bg-orange-50"> */}
                {/* <select  onChange={changehandeler} className='text-sm bg-transparent font-normal leading-none dark:text-gray-50 text-gray-700'>
                    <option value="">All</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Core">Core</option>
                    <option value="Miscellaneous">Misc.</option>
                  </select> */}
                {/* <p className="text-sm font-normal leading-none dark:text-gray-50 text-gray-700">
                  {currCategory || "All"}
                </p>
              </th> */}
              <th className="p-4 border-b border-slate-200 bg-support dark:text-gray-50 bg-orange-50">
                <p className="text-sm font-normal leading-none dark:text-gray-50 text-slate-500">
                  Attempt
                </p>
              </th>
            </tr>
          </thead>
          {loading && <>Loading ...</>}
          {!loading && (
            <tbody>
              {data[currentPage]?.map((i, key) => (
                <>
                  <tr
                    key={key}
                    className="hover bg-primary dark:text-gray-50 hover:bg-support border-b border-slate-200"
                  >
                    <td className="p-4 py-5">
                      <p className="block font-semibold text-sm dark:text-gray-50 text-slate-800">
                        {i.title}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm dark:text-gray-50 text-slate-500">
                        {i.difficulty}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm dark:text-gray-50 text-slate-500">
                        {i.duration + " " + "min"}
                      </p>
                    </td>
                    {/* <td className="p-4 py-5">
                      <p className="text-sm dark:text-gray-50 text-slate-500">
                        {i.currCategory}
                      </p>
                    </td> */}
                    <td className="p-4 py-5">
                      {i.isSubmitted ? (
                        <p className="text-sm dark:text-gray-50 text-green-500">
                          Submitted
                        </p>
                      ) : i.isAvailable ? (
                        <>
                          <Link
                            className="text-sm dark:text-gray-50 text-blue-500"
                            to={`/user/solution/${i._id}`}
                          >
                            Attempt
                          </Link>
                        </>
                      ) : (
                        <>
                          <>
                            <p className="text-sm dark:text-gray-50 text-slate-500"></p>
                            <LockRounded color="inherit" />
                          </>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          )}
        </table>

        <div className="flex bg-support justify-between items-center px-4 py-3">
          <div className="text-sm dark:text-gray-50 text-slate-500">
            Showing <b>1-{data[currentPage]?.length}</b>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={prevPage}
              disabled={currentPage == 1}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:text-gray-50 text-slate-500 bg-white border border-slate-200 rounded hover bg-primary dark:text-gray-50:bg-support hover:border-slate-400 transition duration-200 ease"
            >
              Prev
            </button>
            {/* <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease'>
                1
              </button>
              <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:text-gray-50 text-slate-500 bg-white border border-slate-200 rounded hover bg-primary dark:text-gray-50:bg-support hover:border-slate-400 transition duration-200 ease'>
                2
              </button>
              <button className='px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:text-gray-50 text-slate-500 bg-white border border-slate-200 rounded hover bg-primary dark:text-gray-50:bg-support hover:border-slate-400 transition duration-200 ease'>
                3
              </button> */}
            <button
              disabled={!hasMore && currentPage == page - 1}
              onClick={nextPage}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:text-gray-50 text-slate-500 bg-white border border-slate-200 rounded hover bg-primary dark:text-gray-50:bg-support hover:border-slate-400 transition duration-200 ease"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
