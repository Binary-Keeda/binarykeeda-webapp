import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Button } from "@mui/material";
import LinearProgressWithLabel from "./LinearLabel";
const pieParams = {
  margin: { right: 5, top: -4 },
  slotProps: { legend: { hidden: true } },
};
export default function ProgressArea({ solutions }) {
  return (
    <div className="flex relative flex-col items-center justify-center flex-[0.5] gap-6 p-6 rounded-xl shadow-lg bg-white bg-opacity-60 dark:bg-gray-800 backdrop-blur-lg">
      <div className="flex flex-col items-center w-full  rounded-xl ">
        <PieChart
          width={300}
          height={240}
          {...pieParams}
          series={[
            {
              data: [
                { value: 130, color: "#9ca3af", label: "All" },
                {
                  value: solutions?.Aptitude?.attempted || 0,
                  color: "#6366f1",
                  label: "Aptitude",
                },
                {
                  value: solutions?.Miscellaneous?.attempted || 0,
                  color: "#14b8a6",
                  label: "Core",
                },
                {
                  value: solutions?.Core?.attempted || 0,
                  color: "#f97316",
                  label: "Misclleneous",
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
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { additionalRadius: -5, color: "gray" },
              //   arcLabel: (item) => `${item.label}`, // shows label in slice
              arcLabelMinAngle: 15,
            },
          ]}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          <label className="text-xs font-medium text-gray-800 dark:text-gray-300">
            Apti
          </label>
          <Box width="100%">
            <LinearProgressWithLabel value={solutions?.Aptitude?.average} />
          </Box>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-800 dark:text-gray-300">
            Core
          </label>
          <Box width="100%">
            <LinearProgressWithLabel value={solutions?.Core?.average} />
          </Box>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-800 dark:text-gray-300">
            Misc
          </label>
          <Box width="100%">
            <LinearProgressWithLabel
              value={solutions?.Miscellaneous?.average}
            />
          </Box>
        </div>
      </div>
      <Button variant="contained" color="primary" sx={{ fontSize: 9 }}>
        View Full stats
      </Button>
    </div>
  );
}
