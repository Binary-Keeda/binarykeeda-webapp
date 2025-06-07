import { lazy, Suspense, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const ProblemSet = lazy(() => import("./components/Problemset"));

function Coding() {
  const [stats, setStats] = useState();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 1024);
      setHideSidebar(width < 890);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        className={`flex gap-5 p-3 ${
          hideSidebar ? "flex-col" : "flex-row justify-between"
        }`}
      >
        {/* Left section */}
        <div
          className={`font-[Lato] dark:text-white rounded-lg ${
            hideSidebar ? "w-full" : "flex-1 mr-80"
          }`}
        >
          <h2 className="text-2xl font-semibold">Binary Keeda DSA Sheet</h2>
          <div className="mt-3 text-mdd dark:text-gray-100">
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
          <div className="mt-4">
            <p className="mt-2">
              <strong className="text-orange-500 font-semibold mr-2">
                Note:
              </strong>
              Both brute-force and optimal approaches are provided for most
              problems. However, it's recommended that you first try to solve
              the problem on your own before looking at the solutions.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full w-full">
                <div className="loader2"></div>
              </div>
            }
          >
            <ProblemSet
              setStats={setStats}
              hideSidebar={hideSidebar}
              isSmallScreen={isSmallScreen}
            />
          </Suspense>
        </div>

        {/* Right fixed sidebar - hidden below 850px */}
        {!hideSidebar && (
          <div
            className="bg-primary dark:bg-support p-5  rounded-lg flex-col gap-6"
            style={{
              position: "fixed",
              top: "5rem",
              right: "1.5rem",
              width: isSmallScreen ? "290px" : "288px",
              maxHeight: "calc(100vh - 6rem)",
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
              display: "flex",
            }}
          >
            <PieProgressChart
              done={stats?.done}
              total={stats?.total}
              label="Total"
              colors={{ done: "#5d91f7", remaining: "#e5e7eb" }}
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.easyDone}
              total={stats?.easy}
              label="Easy"
              colors={{ done: "#5d91f7", remaining: "#dae6fe" }}
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.mediumDone}
              total={stats?.medium}
              label="Medium"
              colors={{ done: "#93f5aa", remaining: "#daf4e0" }}
              isSmallScreen={isSmallScreen}
            />
            <PieProgressChart
              done={stats?.hardDone}
              total={stats?.hard}
              label="Hard"
              colors={{ done: "#f87171", remaining: "#fee2e2" }}
              isSmallScreen={isSmallScreen}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default Coding;

const PieProgressChart = ({ done, total, label, colors, isSmallScreen }) => {
  const chartSize = isSmallScreen ? 130 : 170;
  const containerWidth = isSmallScreen ? "170px" : "190px";
  const containerHeight = isSmallScreen ? "100px" : "100px";
  const outerRadius = isSmallScreen ? 45 : 55;
  const innerRadius = isSmallScreen ? 18 : 20;
  const fontSize = isSmallScreen ? "12px" : "14px";

  return (
    <div
      className="flex flex-col items-center gap-2 "
      style={{ width: containerWidth }}
    >
      <div
        style={{
          height: containerHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart
          width={chartSize}
          height={chartSize}
          margin={{ right: 5, top: -4 }}
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              data: [
                { value: done, color: colors.done, label: `Done` },
                {
                  value: Math.max(0, total - done),
                  color: colors.remaining,
                  label: `Remaining`,
                },
              ],
              innerRadius: innerRadius,
              outerRadius: outerRadius,
              paddingAngle: 0,
              cornerRadius: 4,
              startAngle: -45,
              endAngle: 360,
              cx: chartSize / 2,
              cy: chartSize / 2,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { additionalRadius: -5, color: "gray" },
              arcLabelMinAngle: 15,
            },
          ]}
        />
      </div>
      <div
        className="text-center w-full truncate"
        style={{ fontSize }}
        title={`${label} (${done}/${total})`}
      >
        {label} ({done}/{total})
      </div>
    </div>
  );
};
