import { useEffect, useState } from "react";
import problemset from "../data/coding_with_difficulty.json";
import { Article, ExpandMore, Shuffle } from "@mui/icons-material";
import { IconButton, LinearProgress } from "@mui/material";
import {} from "@mui/material";
import { Link } from "react-router-dom";
export default ({ setStats }) => {
  const [problems, setProblems] = useState([]);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    setProblems(problemset);
    const stored = JSON.parse(localStorage.getItem("completed")) || {};
    setCompleted(stored);
  }, []);

  const handleCheckboxChange = (topicIdx, problemIdx) => {
    const newCompleted = { ...completed };

    if (!newCompleted[`topic-${topicIdx}`])
      newCompleted[`topic-${topicIdx}`] = [];

    const idx = newCompleted[`topic-${topicIdx}`].indexOf(problemIdx);
    if (idx === -1) {
      newCompleted[`topic-${topicIdx}`].push(problemIdx);
    } else {
      newCompleted[`topic-${topicIdx}`].splice(idx, 1);
    }

    setCompleted(newCompleted);
    localStorage.setItem("completed", JSON.stringify(newCompleted));
  };

  const getGlobalStats = () => {
    let total = 0;
    let done = 0;

    let easy = 0,
      medium = 0,
      hard = 0;
    let easyDone = 0,
      mediumDone = 0,
      hardDone = 0;

    problems.forEach((topic, topicIdx) => {
      topic.problems.forEach((p, problemIdx) => {
        total++;

        const isCompleted =
          completed[`topic-${topicIdx}`]?.includes(problemIdx);

        // Count difficulty
        switch (p.difficulty) {
          case "Easy":
            easy++;
            if (isCompleted) easyDone++;
            break;
          case "Medium":
            medium++;
            if (isCompleted) mediumDone++;
            break;
          case "Hard":
            hard++;
            if (isCompleted) hardDone++;
            break;
          default:
            break;
        }

        // Count total done
        if (isCompleted) done++;
      });
    });

    return {
      total,
      done,
      easy,
      easyDone,
      medium,
      mediumDone,
      hard,
      hardDone,
    };
  };

  useEffect(() => {
    if (problems.length > 0) {
      setStats(getGlobalStats());
    }
  }, [problems]);

  useEffect(() => {
    setStats(getGlobalStats());
  }, [completed]);
  const { total, done, easy, medium, hard } = getGlobalStats();

  return (
    <main className="mt-10 flex flex-col">
      <div className="relative flex w-full mb-5 justify-between px-7 py-5 rounded-lg text-gray-700 bg-primary dark:bg-support bg-clip-border">
        <div>
          <h5 className="text-xl font-semibold">DSA Sheet</h5>
          <p className="text-base">Track progress across all topics</p>
        </div>
        <div className="h-10">
          <IconButton color="inherit">
            <Shuffle color="inherit" />
          </IconButton>
        </div>
      </div>

      {problems?.map((p, idx) => (
        <Accordion
          key={idx}
          idx={idx}
          data={p.problems}
          title={p.topicName}
          completed={completed[`topic-${idx}`] || []}
          handleCheck={(problemIdx) => handleCheckboxChange(idx, problemIdx)}
        />
      ))}
    </main>
  );
};
const Accordion = ({ title, idx, data, completed, handleCheck }) => {
  const [showData, setShowData] = useState(false);

  return (
    <div className={`w-full flex-col bg-primary dark:bg-support border-b`}>
      <button
        onClick={() => setShowData((prev) => !prev)}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-7 py-3 sm:py-5 w-full gap-2 sm:gap-4"
      >
        {/* Left Side: Expand Icon + Topic + Title */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto min-w-0 gap-1 sm:gap-4">
          {/* Line 1: Expand Icon + Topic */}
          <div className="flex items-center flex-shrink-0 w-[100px] sm:w-[120px] min-w-[100px]">
            <ExpandMore
              className={`flex-shrink-0 transition-transform duration-300 ${
                showData ? "rotate-360" : "-rotate-90"
              }`}
            />
            <span className="ml-2 font-semibold text-lg">{`Topic ${
              idx + 1
            }`}</span>
          </div>

          {/* Line 2: Title (stacked under Topic on mobile, inline on desktop) */}
          <div className="ml-8 sm:ml-0 sm:mt-0">
            <span
              className="font-semibold text-base sm:text-lg text-left block text-ellipsis overflow-hidden"
              title={title}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Right Side: Progress Bar + Count */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto sm:min-w-[200px]">
          <LinearProgress
            variant="determinate"
            value={(completed.length / data.length) * 100}
            sx={{
              height: 8,
              width: "100%",
              minWidth: 150,
              maxWidth: 370,
              borderRadius: 5,
              backgroundColor: "#inherit",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: "#f7931e",
              },
            }}
          />
          <span className="text-sm sm:text-base w-full text-right sm:text-left">
            {completed.length} / {data.length}
          </span>
        </div>
      </button>

      {showData && (
        <div className="px-4 sm:px-7 pb-4">
          <ProblemTable
            data={data}
            completed={completed}
            handleCheck={handleCheck}
          />
        </div>
      )}
    </div>
  );
};

const ProblemTable = ({ data, completed, handleCheck }) => {
  return (
    <div className="relative mt-4 overflow-x-auto flex flex-col w-full h-full dark:text-white dark:bg-bg-secondary text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            {["Problem", "Difficulty", "Article", "Link", "Status"].map((h) => (
              <th
                key={h}
                className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((problem, idx) =>
            problem.title ? (
              <>
                <tr key={idx}>
                  <td className="p-4 border-b max-w-[180px] sm:max-w-[300px] overflow-hidden line-clamp-2">
                    {problem.title}
                  </td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-md ${
                        problem.difficulty === "Easy"
                          ? "bg-blue-500/20 text-blue-900"
                          : problem.difficulty === "Medium"
                          ? "bg-green-500/20 text-green-900"
                          : "bg-red-500/20 text-red-900"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="p-4 border-b">
                    <Link>
                      <Article />
                    </Link>
                  </td>
                  <td className="p-4 border-b">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td className="p-4 border-b">
                    <input
                      type="checkbox"
                      checked={completed.includes(idx)}
                      onChange={() => handleCheck(idx)}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td className="p-4 border-b">{problem.task}</td>
                  <td className="p-4 border-b"></td>
                  <td className="p-4 border-b"></td>
                  <td className="p-4 border-b"></td>
                  <td className="p-4 border-b"></td>
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
