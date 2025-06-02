import { PieChart } from '@mui/x-charts/PieChart'
import { Box, Button } from '@mui/material'
import LinearProgressWithLabel from './LinearLabel'
const pieParams = {
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } }
}

export default function ProgressArea({ solutions }) {
  const aptitude = solutions?.Aptitude?.attempted || 0;
  const core = solutions?.Core?.attempted || 0;
  const misc = solutions?.Miscellaneous?.attempted || 0;

  const isEmpty = aptitude === 0 && core === 0 && misc === 0;

  return (
    <div className='flex relative flex-col items-center justify-center flex-[0.5] gap-6 p-6 rounded-xl shadow-lg bg-primary dark:bg-support bg-opacity-60 backdrop-blur-lg'>
      {isEmpty ? (
        <p className='text-center text-gray-600 dark:text-gray-300 font-semibold'>
          Not enough data to display progress
        </p>
      ) : (
        <>
          <div className='flex flex-col items-center w-full  rounded-xl '>
            <div className='flex flex-col gap-2 w-full mt-4'>
              {[
                {
                  label: 'Aptitude',
                  color: '#6366f1',
                  value: aptitude,
                },
                {
                  label: 'Core',
                  color: '#14b8a6',
                  value: core,
                },
                {
                  label: 'Miscellaneous',
                  color: '#f97316',
                  value: misc,
                },
              ].map((item) => (
                <div key={item.label} className='flex items-center gap-2 text-sm'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-gray-700 dark:text-gray-200 font-medium'>
                    {item.label}: {item.value}
                  </span>
                </div>
              ))}
            </div>

            <PieChart
              width={300}
              height={240}
              {...pieParams}
              series={[
                {
                  data: [
                    {
                      value: aptitude,
                      color: '#6366f1',
                      label: 'Aptitude',
                    },
                    {
                      value: core,
                      color: '#14b8a6',
                      label: 'Core',
                    },
                    {
                      value: misc,
                      color: '#f97316',
                      label: 'Miscellaneous',
                    },
                  ],
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 0,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 360,
                  cx: 150,
                  cy: 110,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { additionalRadius: -5, color: 'gray' },
                  // arcLabel: (item) => `${item.value}`,
                  arcLabelMinAngle: 15,
                },
              ]}
            />
          </div>

          <div className='flex flex-col w-full'>
            <div className='flex flex-col w-full'>
              <label className='text-xs font-medium text-gray-800 dark:text-gray-300'>
                Apti
              </label>
              <Box width='100%'>
                <LinearProgressWithLabel value={solutions?.Aptitude?.average} />
              </Box>
            </div>

            <div className='flex flex-col w-full'>
              <label className='text-xs font-semibold text-gray-800 dark:text-gray-300'>
                Core
              </label>
              <Box width='100%'>
                <LinearProgressWithLabel value={solutions?.Core?.average} />
              </Box>
            </div>

            <div className='flex flex-col w-full'>
              <label className='text-xs font-semibold text-gray-800 dark:text-gray-300'>
                Misc
              </label>
              <Box width='100%'>
                <LinearProgressWithLabel
                  value={solutions?.Miscellaneous?.average}
                />
              </Box>
            </div>
          </div>

          {/* <Button variant='contained' color='primary' sx={{ fontSize: 9 }}>
            View Full stats
          </Button> */}
        </>
      )}
    </div>
  );
}
