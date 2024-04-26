"use client";

import Charts from "react-apexcharts";

const AreaChart = () => {
  return (
    <>
      <div className="flex-1">
        <Charts
          type="area"
          width={"100%"}
          height={150}
          series={[
            {
              name: "Revision Session",
              data: [31, 40],
            },
            {
              name: "Quizzes",
              data: [11, 32],
            },
          ]}
          options={{
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: [1, 1],
            },
            xaxis: {
              type: "category",
              categories: ["Jan12", "Feb12"],
            },
            fill: {
              colors: ["#9654F4", "#56CFE1"],
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default AreaChart;
