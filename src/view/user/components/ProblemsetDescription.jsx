import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fullData from "../data/codingsolution.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

export default function ProblemDescription() {
  function CopyButton({ code }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    };
    return (
      <button
        onClick={handleCopy}
        className={`bg-gray-800 text-white text-xs px-4 py-1 rounded-md shadow-md hover:bg-gray-700 transition duration-300 
          ${copied ? "animate-pulse font-semibold" : "font-normal"}`}
        title="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    );
  }

  const { topicName, problemTitle } = useParams();
  const [description, setDescription] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState("java");

  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const decodedTopic = decodeURIComponent(topicName);
    const decodedTitle = decodeURIComponent(problemTitle);
    const topicData = fullData.find((t) => t.topicName === decodedTopic);
    if (!topicData) return;
    const problem = topicData.problems?.find((p) => p.title === decodedTitle);
    if (problem) {
      const javaMatch = problem.code?.match(
        /JAVA CODE:\s*([\s\S]*?)\nC\+\+ CODE:/
      );
      const cppMatch = problem.code?.match(/C\+\+ CODE:\s*([\s\S]*)/);

      setDescription({
        title: problem.title,
        description: problem.description,
        algorithm: problem.algorithm,
        analysis: problem.analysis,
        comparison: problem.comparison,
        code: {
          java: javaMatch ? javaMatch[1].trim() : "",
          cpp: cppMatch ? cppMatch[1].trim() : "",
        },
      });
    }
  }, [topicName, problemTitle]);

  if (!description) return <div className="p-6 dark:text-white">Not Found</div>;

  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className="text-[1.8rem] font-extrabold text-black dark:text-white mt-4 mb-2"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-[1.5rem] font-bold text-gray-800 dark:text-gray-100 mt-3 mb-2"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-[1.3rem] font-semibold text-gray-700 dark:text-gray-200 mt-2 mb-1"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="text-[1.1rem] text-gray-900 dark:text-gray-300 leading-[1.6] mb-3"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc list-inside pl-5 text-[1.1rem] text-gray-900 dark:text-gray-300 mb-3"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li className="mb-1 leading-[1.6]" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      return (
        <code
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-red-300 px-1 py-0.5 rounded text-[1rem] font-mono"
          {...props}
        >
          {children}
        </code>
      );
      // Uncomment if you later want block code handling too
      // if (inline) {
      //   return (
      //     <code className="...">{children}</code>
      //   );
      // } else {
      //   return (
      //     <pre className="..."><code>{children}</code></pre>
      //   );
      // }
    },
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table
          className="w-full table-auto min-w-[600px] border-collapse border border-gray-400 dark:border-gray-600 text-[1rem] text-left"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead
        className="bg-gray-200 dark:bg-gray-700 font-semibold"
        {...props}
      />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr
        className="border-b border-gray-300 dark:border-gray-600"
        {...props}
      />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-3 py-2 border border-gray-400 dark:border-gray-600 text-left font-semibold bg-gray-100 dark:bg-gray-700"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left"
        {...props}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong className="text-black dark:text-white font-semibold" {...props} />
    ),
  };

  return (
    <div className="w-full px-6 py-8 bg-white text-black dark:bg-support dark:text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6">{description.title}</h1>

      {/* Problem Description */}
      <div className="mb-6 leading-relaxed space-y-5 text-lg">
        <ReactMarkdown components={markdownComponents}>
          {description.description}
        </ReactMarkdown>
      </div>

      {/* Algorithm */}
      <div className="mb-6 h-full border rounded-md bg-gray-100 dark:bg-support overflow-hidden">
        <button
          onClick={() => setShowAlgorithm(!showAlgorithm)}
          className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Algorithm Steps <span>{showAlgorithm ? "▲" : "▼"}</span>
        </button>
        <div
          className={`${
            showAlgorithm ? "max-h py-4" : "max-h-0"
          } px-6 overflow-hidden transition-all duration-500 leading-relaxed space-y-2`}
        >
          <ReactMarkdown components={markdownComponents}>
            {description.algorithm}
          </ReactMarkdown>
        </div>
      </div>

      {/* Time Complexity Analysis */}
      <div className="mb-6 border rounded-md bg-gray-100 dark:bg-support overflow-hidden">
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Time Complexity Analysis <span>{showAnalysis ? "▲" : "▼"}</span>
        </button>
        <div
          className={`${
            showAnalysis ? "max-h py-4" : "max-h-0"
          } px-6 overflow-hidden transition-all duration-500 leading-relaxed space-y-2`}
        >
          <ReactMarkdown components={markdownComponents}>
            {description.analysis}
          </ReactMarkdown>
        </div>
      </div>

      {/* Time Complexity Comparison */}
      <div className="mb-6 border rounded-md bg-gray-100 dark:bg-support overflow-hidden">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Time Complexity Comparison <span>{showComparison ? "▲" : "▼"}</span>
        </button>

        <div
          className={`${
            showComparison ? "max-h-screen py-4" : "max-h-0"
          } px-6 overflow-hidden transition-all duration-500`}
        >
          {showComparison && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border border-gray-300 dark:border-gray-600 text-sm md:text-base text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                      Algorithm
                    </th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                      Time Complexity
                    </th>
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                      Space Complexity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {description.comparison.map((row, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-50 dark:even:bg-gray-800 text-gray-800 dark:text-gray-200"
                    >
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                        {row.algorithm}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                        {row.time}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                        {row.space}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Code Samples */}
      <div className="mb-6 border rounded-md bg-gray-100 dark:bg-support overflow-hidden">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Code Samples <span>{showCode ? "▲" : "▼"}</span>
        </button>
        <div
          className={`${
            showCode ? "max-h-screen py-4" : "max-h-0"
          } px-6 overflow-hidden transition-all duration-500`}
        >
          <div className="flex items-center mb-4">
            {description.code?.java && (
              <button
                className={`px-4 py-2 mr-2 rounded font-semibold ${
                  activeCodeTab === "java"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() => setActiveCodeTab("java")}
              >
                Java
              </button>
            )}
            {description.code?.cpp && (
              <button
                className={`px-4 py-2 rounded font-semibold ${
                  activeCodeTab === "cpp"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() => setActiveCodeTab("cpp")}
              >
                C++
              </button>
            )}
            <div className="flex-grow" />
            <CopyButton
              code={
                activeCodeTab === "java"
                  ? description.code?.java
                  : description.code?.cpp
              }
            />
          </div>

          <div className="bg-black rounded-lg shadow-lg overflow-auto max-h-[600px]">
            <SyntaxHighlighter
              language={activeCodeTab}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                backgroundColor: "#1e1e1e",
                fontSize: "0.9rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
              wrapLines={true}
              wrapLongLines={true}
              showLineNumbers
            >
              {activeCodeTab === "java"
                ? description.code?.java
                : description.code?.cpp}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
