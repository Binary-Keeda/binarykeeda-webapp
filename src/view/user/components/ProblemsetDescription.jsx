import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fullData from "../data/codingsolution.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  // Slide toggles
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const decodedTopic = decodeURIComponent(topicName);
    const decodedTitle = decodeURIComponent(problemTitle);

    const topicData = fullData.find((t) => t.topicName === decodedTopic);
    if (!topicData) return;

    const problem =
      topicData.problems?.find((p) => p.title === decodedTitle) ||
      topicData.tasks?.find((t) => t.title === decodedTitle);

    if (problem) {
      setDescription(problem);
    }
  }, [topicName, problemTitle]);

  if (!description) return <div className="p-6">Loading...</div>;

  return (
    <div
      className="w-full px-6 py-8 bg-white rounded-lg shadow-lg"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", letterSpacing: "0.02em" }}
    >
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-wide leading-tight">
        {description.title}
      </h1>

      {/* Description */}
      <p className="mb-8 text-lg text-gray-700 leading-relaxed font-medium tracking-normal">
        {description.description}
      </p>

      {/* Accordion: Algorithm Steps */}
      {description.algorithm?.length > 0 && (
        <div className="mb-6 border rounded-md bg-gray-900 text-white overflow-hidden transition-all duration-500 ease-in-out">
          <button
            onClick={() => setShowAlgorithm(!showAlgorithm)}
            className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
            aria-expanded={showAlgorithm}
          >
            Algorithm Steps
            <span className="text-xl">{showAlgorithm ? "▲" : "▼"}</span>
          </button>
          <div
            className={`px-6 bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
              showAlgorithm ? "max-h-screen py-4" : "max-h-0"
            }`}
          >
            <ol className="list-decimal list-inside space-y-2 font-sans text-base tracking-wide">
              {description.algorithm.map((step, idx) => (
                <li key={idx} className="whitespace-pre-line">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Accordion: Analysis */}
      {description.analysis && (
        <div className="mb-6 border rounded-md bg-gray-900 text-white overflow-hidden transition-all duration-500 ease-in-out">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
            aria-expanded={showAnalysis}
          >
            Analysis
            <span className="text-xl">{showAnalysis ? "▲" : "▼"}</span>
          </button>
          <div
            className={`px-6 bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
              showAnalysis ? "max-h-screen py-4" : "max-h-0"
            } space-y-6`}
          >
            {/* Best Case */}
            {description.analysis.best_case && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg font-medium">
                <h3 className="text-xl font-bold mb-2 tracking-wide">
                  Best Case
                </h3>
                <ul className="list-disc list-inside mb-2">
                  {description.analysis.best_case.scenarios.map((sc, i) => (
                    <li key={i}>{sc}</li>
                  ))}
                </ul>
                <p>
                  <strong>Example:</strong> Array: [
                  {description.analysis.best_case.example.array.join(", ")}],
                  Min: {description.analysis.best_case.example.min}, Max:{" "}
                  {description.analysis.best_case.example.max}
                </p>
                <p>
                  <strong>Time Complexity:</strong> Find Min & Max -{" "}
                  {
                    description.analysis.best_case.time_complexity
                      .find_min_max
                  }
                  , GCD -{" "}
                  {description.analysis.best_case.time_complexity.find_gcd}
                </p>
              </div>
            )}

            {/* Worst Case */}
            {description.analysis.worst_case && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg font-medium">
                <h3 className="text-xl font-bold mb-2 tracking-wide">
                  Worst Case
                </h3>
                <ul className="list-disc list-inside mb-2">
                  {description.analysis.worst_case.scenarios.map((sc, i) => (
                    <li key={i}>{sc}</li>
                  ))}
                </ul>
                <p>
                  <strong>Example:</strong> Array: [
                  {description.analysis.worst_case.example.array.join(", ")}],
                  Min: {description.analysis.worst_case.example.min}, Max:{" "}
                  {description.analysis.worst_case.example.max}
                </p>
                <p>
                  <strong>Time Complexity:</strong> Find Min & Max -{" "}
                  {
                    description.analysis.worst_case.time_complexity
                      .find_min_max
                  }
                  , GCD -{" "}
                  {description.analysis.worst_case.time_complexity.gcd}
                </p>
              </div>
            )}

            {/* Time Complexity Comparison */}
            {description.time_complexity_comparison && (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold mb-2 text-white tracking-wide">
                  Time Complexity Comparison
                </h3>
                <table className="w-full text-sm text-left border-collapse text-white">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Step</th>
                      <th className="px-4 py-2 border">Description</th>
                      <th className="px-4 py-2 border">Best Case</th>
                      <th className="px-4 py-2 border">Worst Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {description.time_complexity_comparison.map((item, i) => (
                      <tr key={i} className="bg-gray-800">
                        <td className="px-4 py-2 border">{item.step}</td>
                        <td className="px-4 py-2 border">{item.Description}</td>
                        <td className="px-4 py-2 border">{item.best_case}</td>
                        <td className="px-4 py-2 border">{item.worst_case}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accordion: Notes */}
      {description.notes?.length > 0 && (
        <div className="mb-6 border rounded-md bg-gray-900 text-white overflow-hidden transition-all duration-500 ease-in-out">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
            aria-expanded={showNotes}
          >
            Notes
            <span className="text-xl">{showNotes ? "▲" : "▼"}</span>
          </button>
          <div
            className={`px-6 bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
              showNotes ? "max-h-screen py-4" : "max-h-0"
            }`}
          >
            <ul className="list-disc list-inside space-y-2 font-sans text-base tracking-wide">
              {description.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Accordion: Code Solutions */}
      {(description.java_code || description.cpp_code) && (
        <div className="mb-6 border rounded-md bg-gray-900 text-white overflow-hidden transition-all duration-500 ease-in-out">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-4 py-3 text-left text-lg font-semibold flex justify-between items-center cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300"
            aria-expanded={showCode}
          >
            Code Solutions
            <span className="text-xl">{showCode ? "▲" : "▼"}</span>
          </button>
          <div
            className={`px-6 bg-gray-800 transition-max-height duration-500 ease-in-out overflow-hidden ${
              showCode ? "max-h-screen py-4" : "max-h-0"
            }`}
          >
            {/* Tabs + Copy Button in one row */}
            <div className="flex items-center mb-4">
              {description.java_code && (
                <button
                  className={`px-4 py-2 mr-2 rounded font-semibold tracking-wide transition-colors duration-300 ${
                    activeCodeTab === "java"
                      ? "bg-blue-600 text-white  decoration-2"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={() => setActiveCodeTab("java")}
                >
                  Java
                </button>
              )}
              {description.cpp_code && (
                <button
                  className={`px-4 py-2 rounded font-semibold tracking-wide transition-colors duration-300 ${
                    activeCodeTab === "cpp"
                      ? "bg-blue-600 text-white decoration-2"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={() => setActiveCodeTab("cpp")}
                >
                  C++
                </button>
              )}

              {/* Spacer pushes copy button to the right */}
              <div className="flex-grow" />

              <CopyButton
                code={
                  activeCodeTab === "java"
                    ? description.java_code
                    : description.cpp_code
                }
              />
            </div>

            {/* Code Viewer */}
            <div className="bg-black rounded-lg shadow-lg">
              <div className="overflow-x-auto rounded-b-lg">
                <SyntaxHighlighter
                  language={activeCodeTab === "java" ? "java" : "cpp"}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    backgroundColor: "#1e1e1e",
                    fontSize: "0.9rem",
                    maxHeight: "500px",
                    overflowX: "auto",
                    fontFamily:
                      "'Source Code Pro', monospace, 'Courier New', Courier, monospace",
                  }}
                  wrapLines={true}
                  showLineNumbers={true}
                >
                  {activeCodeTab === "java"
                    ? description.java_code
                    : description.cpp_code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
