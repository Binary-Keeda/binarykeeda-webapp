import { PieChart } from '@mui/x-charts/PieChart';

const pieParams = {
    margin: { right: 5, top: -4 },
    slotProps: { legend: { hidden: true } },
};
export default function UserPieChart() {
    return (
        <div className='shadow-lg w-full p-6 rounded-xl  bg-white'>

            <PieChart
                width={300}
                height={240}
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
                        },
                        {
                            value: 30,
                            color: 'green',
                            label: "Misc."
                        },
                        {
                            value: 130,
                            color: 'gray',
                            label: "Un attempted"
                        },

                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 360,
                        cx: 150,
                        slotProps: { legend: { hidden: true } },
                        cy: 110,
                    }
                ]}
            />
                <button className='bg-sky-700 py-2 mx-auto text-white px-10 flex justify-center items-center' >
                    <a className='text-xs  capitalize hover:underline' href="">
                        view leaderboards
                    </a>
                </button>
        </div>
    )
}