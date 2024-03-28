"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./chart.module.css";

const data = [
  {
    name: "Mon",
    visit: 2000,
    click: 1390,
  },
  {
    name: "Tue",
    visit: 3000,
    click: 1590,
  },
  {
    name: "Wed",
    visit: 1900,
    click: 2000,
  },
  {
    name: "Thu",
    visit: 4000,
    click: 3390,
  },
  {
    name: "Fri",
    visit: 2500,
    click: 3400,
  },
  {
    name: "Sat",
    visit: 2900,
    click: 1500,
  },
  {
    name: "Sun",
    visit: 3500,
    click: 2100,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background: "#151c2c", border: "none"}}/>
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
