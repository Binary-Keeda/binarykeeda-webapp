import React, { useEffect, useState } from "react";

const Sheet210Days = () => {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sheetId = "1NnRFr0xn0cNBac4ix0xKsjCRRK02TbND_IpaOAB73LE";
    const apiKey = "AIzaSyDdhv_BPkl0TiQvmqHwZCdwgKXPEXAgn10"; // Replace with your actual API key
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?ranges=Sheet1&fields=sheets.data.rowData.values(userEnteredValue,hyperlink)&key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const sheets = data.sheets;
        if (!sheets || sheets.length === 0) {
          console.error("No sheets found in the spreadsheet.");
          setLoading(false);
          return;
        }

        const rowData = sheets[0]?.data?.[0]?.rowData;
        if (!rowData || rowData.length === 0) {
          console.error("No row data found in the sheet.");
          setLoading(false);
          return;
        }

        const rows = rowData.map((row) => row.values || []);
        const headers = rows[0].map(
          (cell) => cell?.userEnteredValue?.stringValue || ""
        );

        const grouped = {};

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const entry = {};

          row.forEach((cell, index) => {
            const key = headers[index];
            const value = cell?.userEnteredValue?.stringValue || "";
            const link = cell?.hyperlink || null;
            entry[key] = { text: value, link };
          });

          const topic = entry["Task Assigned ( 10 Hrs Weekly)"]?.text;
          const day = entry["Day"]?.text;
          const resource = entry["Free Resource"];

          if (!topic || topic.trim() === "") continue;

          if (!grouped[topic]) grouped[topic] = [];

          grouped[topic].push({
            day,
            resourceText: resource?.text,
            resourceLink: resource?.link,
          });
        }

        setGroupedData(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sheet data:", err);
        setLoading(false);
      });
  }, []);

  const topicKeys = Object.keys(groupedData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        📅 220 Days Roadmap
      </h1>

      {topicKeys.map((topic, index) => (
        <div key={index} className="mb-12 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
            Topic {index + 1}: {topic}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 border w-3/5">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 border">
                    Free Resource
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedData[topic].map((entry, i) => (
                  <tr
                    key={i}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-3 border text-gray-800 font-medium">
                      {entry.day}
                    </td>
                    <td className="px-6 py-3 border pl-12">
                      {entry.resourceLink ? (
                        <a
                          href={entry.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 underline hover:text-indigo-500 transition"
                        >
                          {entry.resourceText}
                        </a>
                      ) : (
                        <span className="text-gray-400">
                          {entry.resourceText || "No link"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sheet210Days;
