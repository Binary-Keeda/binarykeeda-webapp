import { Person } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { ResponsiveChartContainer } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

const pieParams = {
    margin: { right: 5, top: -4 },
    slotProps: { legend: { hidden: true } },
};
export default function UserPieChart() {
    return (
        <>
            <div className='w-full '>
                <p className='flex items-end gap-1' ><Person /> User's Progres</p>
                <hr className='mt-1' />
            </div>
            <PieChart
                width={300}
                height={300}
                {...pieParams}
                series={[
                    {
                        data: [{
                            value: 10,
                            color: 'red',
                            label: "Aptitude"
                        },

                        {
                            value: 20,
                            color: 'blue',
                            label: "Core"
                        }, {
                            value: 30,
                            color: 'green',
                            label: "Misc."
                        },],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 360,
                        cx: 150,
                        slotProps: { legend: { hidden: true } },
                        cy: 150,
                    }
                ]}
            />
            <div>
                <button>
                    <a className='text-xs capitalize hover:underline' href="">
                        view leaderboards
                    </a>
                </button>
            </div>
        </>
    )
}