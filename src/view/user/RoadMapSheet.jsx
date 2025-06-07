import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsonData from "./data/grouped_topics.json";
import { ExpandMore } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import React from "react";

export default function RoadMapSheet() {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("day")) || {};
    setCompleted(stored);
  }, []);

  const handleCheckboxChange = (topicIdx, problemIdx) => {
    try {
      setCompleted((prev) => {
        const updated = { ...prev };
        const key = `day-${topicIdx}`;
        if (!updated[key]) updated[key] = [];

        const index = updated[key].indexOf(problemIdx);
        if (index === -1) {
          updated[key].push(problemIdx);
        } else {
          updated[key].splice(index, 1);
        }

        localStorage.setItem("day", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Error updating checkbox state:", e);
    }
  };

  return (
    <section className="flex justify-between gap-5 p-3">
      <div className="flex-1 w-full flex-col flex font-[Lato] dark:text-white rounded-lg">
        <Intro />
        <div className="mt-6">
          {Object.entries(jsonData).map(([topic, data], index) => (
            <Accordion
              key={index}
              title={topic}
              idx={index}
              completed={completed[`day-${index}`] || []}
              data={data}
              handleCheck={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Accordion = ({ title, idx, data, completed, handleCheck }) => {
  const [showData, setShowData] = useState(false);
  const progressValue = (completed.length / data.length) * 100;

  return (
    <div className="w-full flex flex-col bg-primary dark:bg-support border-b">
      <button
        onClick={() => setShowData((prev) => !prev)}
        className="w-full px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        {/* Topic Number & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 w-full">
          <div className="flex items-center">
            <ExpandMore
              className={`transition-transform duration-300 ${
                showData ? "rotate-360" : "-rotate-90"
              }`}
            />
            <span className="ml-2 font-semibold text-lg">{`Topic ${
              idx + 1
            }`}</span>
          </div>
          <div className="ml-8 sm:ml-0 mt-1 sm:mt-0">
            <span className="font-semibold text-lg text-left block">
              {title}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="w-full sm:w-64 lg:w-[300px]">
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#inherit",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor: "#f7931e",
                },
              }}
            />
          </div>
          <span className="text-sm text-gray-200 text-right sm:text-left">
            {completed.length} / {data.length}
          </span>
        </div>
      </button>

      {showData && (
        <div className="px-7 pb-4">
          <ProblemTable
            topicIdx={idx}
            data={data}
            completed={completed}
            handleCheck={handleCheck}
          />
        </div>
      )}
    </div>
  );
};

const ProblemTable = ({ data, topicIdx, completed, handleCheck }) => {
  return (
    <div className="relative border-t mt-4 flex flex-col w-full h-full dark:text-white dark:bg-bg-secondary text-gray-700 bg-white shadow-md rounded-xl bg-clip-border overflow-x-auto">
      <table className="min-w-[900px] w-full rounded-md text-left table-auto">
        <thead>
          <tr>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Day
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Type
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Content
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Links
            </th>
            <th className="p-4 border-b bg-blue-gray-50/50 text-sm opacity-70">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((problem, idx) => {
            const isCompleted = completed.includes(idx);
            return (
              <React.Fragment key={idx}>
                <tr>
                  <td className="p-4 border-b" rowSpan={2}>
                    {problem.Day}
                  </td>
                  <td className="p-4 border-b font-semibold">Task</td>
                  <td className="p-4 border-b">{problem.Task}</td>
                  <td className="p-4 border-b">
                    {problem?.Resource?.hyperlink && (
                      <a
                        href={problem.Resource.hyperlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {problem.Resource.value}
                      </a>
                    )}
                  </td>
                  <td className="p-4 border-b" rowSpan={2}>
                    <input
                      type="checkbox"
                      aria-checked={isCompleted}
                      checked={isCompleted}
                      onChange={() => handleCheck(topicIdx, idx)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b font-semibold">Project</td>
                  <td className="p-4 border-b">{problem.ProjectWork}</td>
                  <td className="p-4 border-b">
                    <a
                      href={problem.ProjectResource.hyperlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {problem.ProjectResource.value}
                    </a>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Intro = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Binary Keeda Placement Roadmap</h2>
      <div className="mt-3 dark:text-gray-100">
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          Welcome to the BinaryKeeda 210 Prep Sheet! This structured plan covers
          core subjects and aptitude essentials tailored for placement
          preparation. Track your progress, explore curated resources, and
          systematically complete each topic to strengthen your foundation.
        </p>
      </div>
      <div className="mb-3">
        <p>
          <strong className="text-orange-500">Note:</strong> Complete the topics
          sequentially. Each topic includes subtopics and free resources. Mark
          them done as you go. Weekly goal: 20 hrs (10 study + 10 projects).
        </p>
      </div>
    </>
  );
};
