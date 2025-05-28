import React, { useEffect, useState } from "react";
import problemset from "../data/coding.json";
import { ArrowRight, KeyboardArrowRight, MenuOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProblemSet() {
  const [progress, setProgress] = useState({
    noOfProblems: 0,
    problemsSolved: 0,
  });
  const [problemByTopic, setProblemByTopic] = useState({});
  const [showProgress, setShowProgress] = useState(false);

  const selectTask = (name, topic) => {
    const key = `${name}+${topic}`;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, "selected");
    }
    updateProgress();
  };

  const selectQuestion = (name, topic) => {
    const key = `${name}+${topic}`;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, "selected");
    }
    updateProgress();
  };

  const updateProgress = () => {
    let total = 0;
    let completed = 0;
    let problemsByTopic = {};

    problemset.forEach((topic) => {
      problemsByTopic[topic.topicName] = 0;

      topic.tasks?.forEach((task) => {
        total++;
        if (localStorage.getItem(`${task.title}+${topic.topicName}`)) {
          completed++;
        }
      });

      topic.problems?.forEach((problem) => {
        total++;
        const key = `${problem.title}+${topic.topicName}`;
        if (localStorage.getItem(key)) {
          completed++;
          problemsByTopic[topic.topicName]++;
        }
      });
    });

    setProblemByTopic(problemsByTopic);
    setProgress({ noOfProblems: total, problemsSolved: completed });
  };

  useEffect(() => {
    updateProgress();
  }, []);

  const progressPercentage =
    progress.noOfProblems > 0
      ? Math.round((progress.problemsSolved / progress.noOfProblems) * 100)
      : 0;

  return (
    <div className="flex flex-col w-full ">
      {/* Progress Header Section - Sticky */}
      <div className="sticky px-6 py-4 dark:bg-support  top-[73px] z-50 bg-primary pb-4 pt-3 border-b border-gray-200 dark:border-gray-700">
        <div className="text-left">
          {progress.problemsSolved > 0 ? (
            <p className="text-xl font-medium text-gray-800 dark:text-gray-300 italic">
              You're making progress!{" "}
              <span className="font-bold text-[#db5602]">
                {progress.problemsSolved}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#db5602]">
                {progress.noOfProblems}
              </span>{" "}
              problems completed (
              <span className="font-bold">{progressPercentage}%</span>)
            </p>
          ) : (
            <p className="text-xl font-medium text-gray-800 dark:text-gray-300">
              <span className="font-bold text-[#db5602]">
                {progress.noOfProblems}
              </span>{" "}
              problems waiting to be solved!
            </p>
          )}
        </div>
        <div className="w-full mt-3 px-2">
          <div className="w-full h-2.5 bg-primary  rounded-full overflow-hidden">
            <div
              className="h-2.5 bg-gradient-to-r from-[#db5602] to-orange-500 rounded-full transition-all duration-700 ease-in-out shadow-inner"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Problems List Section */}
      <div className="flex-1 flex flex-col gap-3 w-full mt-3">
        {problemset.map((topic, index) => (
          <div
            key={index}
            className="rounded-lg bg-clip-border shadow-md bg-primary text-gray-900 dark:text-gray-50 bg-white transition-shadow duration-300"
          >
            <h3 className="text-2xl px-6 py-5 font-bold leading-none border-slate-100 text-gray-800 dark:text-gray-50 bg-orange-50 dark:bg-support">
              {`Topic ${index + 1}: ${topic.topicName}`}
            </h3>

            <hr className="dark:border-gray-600" />

            <div>
              {topic.tasks?.map((task, idx) => (
                <div
                  className="flex hover:bg-gray-50 hover:dark:bg-gray-600 justify-between dark:text-gray-50 items-center border-b dark:border-gray-700 py-5 px-6 last:border-b-0"
                  key={idx}
                >
                  <p className="text-lg px-4 font-normal leading-none dark:text-gray-50 text-gray-800">
                    {task.title ? idx + ". " : ""} {task?.title || task?.task}
                  </p>
                  {task.title && (
                    <div className="flex px-4 gap-8 items-center">
                      <a
                        href="#"
                        className="hover:underline text-base font-medium"
                      >
                        Description
                      </a>
                      <a
                        className="text-sky-700 hover:underline text-base font-medium"
                        href={task?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                      <input
                        checked={
                          !!localStorage.getItem(
                            `${task.title}+${topic.topicName}`
                          )
                        }
                        type="checkbox"
                        className="cursor-pointer w-5 h-5"
                        onChange={() =>
                          selectTask(task?.title, topic.topicName)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}

              {topic.problems?.map((problem, idx) => (
                <div
                  className="flex hover:bg-support  justify-between dark:text-gray-50 items-center border-b dark:border-gray-700 py-5 px-6 last:border-b-0"
                  key={idx}
                >
                  <p className="text-lg px-4 font-normal leading-none dark:text-gray-50 text-gray-700">
                    {problem?.title}
                  </p>
                  <div className="flex px-4 gap-8 items-center">
                    <a
                      href="#"
                      className="hover:underline text-base font-medium"
                    >
                      Description
                    </a>
                    <a
                      className="text-sky-700 hover:underline text-base font-medium"
                      href={problem?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                    <input
                      checked={
                        !!localStorage.getItem(
                          `${problem.title}+${topic.topicName}`
                        )
                      }
                      type="checkbox"
                      className="cursor-pointer w-5 h-5"
                      onChange={() =>
                        selectQuestion(problem?.title, topic.topicName)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
