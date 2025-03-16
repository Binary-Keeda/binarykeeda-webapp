import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 75 },
  { name: "May", value: 90 },
];

const LineGraph = () => {
  return (
    < > 
      <ResponsiveContainer className={"rounded-lg shadow-lg h-full p-4"} width="100%" >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraph;
