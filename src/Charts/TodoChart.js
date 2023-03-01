import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(...registerables);

const TodoChart = () => {
  const [lists, setlists] = useState([]);
  const loadData = async () => {
    let response = await fetch(
      "https://backendtoto.vercel.app/api/todos/count-by-date",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    console.log(response);
    //console.log(response);
    setlists(response);
  };
  useEffect(() => {
    loadData();
  }, []);

 

  return (
    <div>
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: lists.map((data) => data._id),
            datasets: [
              {
                // Label for bars
                label: "todos added as per date",
                // Data or value of your each variable
                data: lists.map((data) => data.count),
                // Color of each bar
                backgroundColor: ["aqua", "green"],
                // Border color of each bar
                borderColor: ["aqua", "green"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TodoChart;
