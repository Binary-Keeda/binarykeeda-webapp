import { lazy, Suspense, useState } from 'react'
import UserDashboard from './Userdashboard'
// import { Helmet } from 'react-helmet-async'
import { PieChart } from '@mui/x-charts/PieChart'
const ProblemSet = lazy(() => import('./components/Problemset'))

function Coding () {
  const [stats, setStats] = useState()
  return (
    <>
      {/* <Helmet>
        <title>Codin Sheet - Binary keeda</title>
      </Helmet> */}
      <section className='flex justify-between gap-5 p-3'>
        <div className='flex-1 w-full font-[Lato] dark:text-white rounded-lg '>
          <h2 className='text-2xl font-semibold '>Binary Keeda DSA Sheet</h2>
          <div className='mt-3 text-mdd dark:text-gray-100'>
            <p>
              This sheet is designed to help you learn DSA from basic to
              advanced in a structured and free manner. Most problems include
              practice links. Some may not, due to platform restrictions. In
              such cases, you can use your IDE or any online compiler. Our focus
              is on delivering quality content to support your learning journey.
            </p>
            <p>
              These are hand-picked questions curated by our experts to ensure
              you focus on the most important concepts and patterns in Data
              Structures and Algorithms. Each question is selected to build your
              problem-solving skills progressively and efficiently.
            </p>
          </div>
          <div className='mt-4'>
           
            <p className='mt-2'>
               <strong className='text-orange-500 font-semibold mr-2'>Note:</strong>
              Both brute-force and optimal approaches are provided for most
              problems. However, it’s recommended that you first try to solve
              the problem on your own before looking at the solutions.
            </p>
          </div>
          <Suspense
            fallback={
              <div className='flex justify-center items-center h-full w-full'>
                <div className='loader2'></div>
              </div>
            }
          >
            <ProblemSet setStats={setStats} />
          </Suspense>
        </div>
        <div className='bg-primary h-min  p-5 dark:bg-support'>
          <PieProgressChart
            done={stats?.done}
            total={stats?.total}
            label='Total'
            colors={{ done: '#5d91f7', remaining: '#e5e7eb' }}
          />
          <PieProgressChart
            done={stats?.easyDone}
            total={stats?.easy}
            label='Easy'
            colors={{ done: '#5d91f7', remaining: '#dae6fe' }}
          />
          <PieProgressChart
            done={stats?.mediumDone}
            total={stats?.medium}
            label='Medium'
            colors={{ done: '#93f5aa', remaining: '#daf4e0' }}
          />
          <PieProgressChart
            done={stats?.hardDone}
            total={stats?.hard}
            label='Hard'
            colors={{ done: '#f87171', remaining: '#fee2e2' }}
          />
        </div>
      </section>
    </>
  )
}

export default Coding
const pieParams = {
  width: 190,
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } },
  height: 160
}
const PieProgressChart = ({ done, total, label, colors }) => {
  return (
    <div className='flex items-center flex-col gap-2'>
      <PieChart
        {...pieParams}
        series={[
          {
            data: [
              { value: done, color: colors.done, label: `${label} Done` },
              {
                value: total - done,
                color: colors.remaining,
                label: `${label} Remaining`
              }
            ],
            innerRadius: 24,
            outerRadius: 60,
            paddingAngle: 0,
            cornerRadius: 4,
            startAngle: -45,
            endAngle: 360,
            cx: 100,
            cy: 100,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { additionalRadius: -5, color: 'gray' },
            // arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 15
          }
        ]}
      />
      <div>
        {label} ({done}/{total})
      </div>
    </div>
  )
}
