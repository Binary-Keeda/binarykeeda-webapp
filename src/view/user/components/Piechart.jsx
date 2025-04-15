import { Button } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

const pieParams = {
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } }
}
export default function UserPieChart () {
  return (
    <div className='flex flex-col items-center w-full  rounded-xl '>
      <PieChart
        width={300}
        height={240}
        {...pieParams}
        series={[
          {
            data: [
              { value: 10, color: '#6366f1' },
              { value: 20, color: '#14b8a6' },
              { value: 30, color: '#f97316' },
              { value: 130, color: '#9ca3af' }
            ],
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 360,
            cx: 150,
            cy: 110,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { additionalRadius: -5, color: 'gray' },
            //   arcLabel: (item) => `${item.label}`, // shows label in slice
            arcLabelMinAngle: 15
          }
        ]}
      />
    
    </div>
  )
}
