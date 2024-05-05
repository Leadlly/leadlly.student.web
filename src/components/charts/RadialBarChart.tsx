"use client";

import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialBarChart = () => {
  return (
    <>
      <Charts
        type="radialBar"
        width={"100%"}
        height={"100%"}
        series={[70, 30]}
        options={{
          chart: {
            height: "100%",
            type: "radialBar",
          },
          colors: ["#9654F4", "#72EFDD"],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: "45%",
              },
              dataLabels: {
                show: true,
                value: {
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "Mada,sans-serif",
                  offsetY: 5,
                },
                name: {
                  show: false,
                },
                total: {
                  show: true,
                  formatter: function (w) {
                    console.log(w);

                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 59 + "%";
                  },
                },
              },
            },
          },
          labels: ["Sessions", "Quizzes"],
          stroke: {
            lineCap: "round",
          },
        }}
      />

      <div className="-ml-10">
        <div className="flex items-center gap-2">
          <span className=" block w-3 h-3 rounded bg-primary"></span>
          <span className="text-xs capitalize">Sessions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className=" block w-3 h-3 rounded bg-[#72EFDD]"></span>
          <span className="text-xs capitalize">Quizzes</span>
        </div>
      </div>
    </>
  );
};

export default RadialBarChart;
