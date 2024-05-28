"use client";

import dynamic from "next/dynamic";

const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart = () => {
  return (
    <>
      <Charts
        type="donut"
        width={"100%"}
        height={"100%"}
        series={[80, 60, 70]}
        options={{
          chart: {
            height: "100%",
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 763,
              options: {
                chart: {
                  width: 150,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        value: {
                          fontWeight: 700,
                          fontFamily: "Mada,sans-serif",
                          fontSize: "20px",
                          color: "#000000",
                          offsetY: 0,
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#9654f4", "#72EFDD", "#FFDA57"],
          stroke: {
            width: 3,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  value: {
                    fontWeight: 700,
                    fontFamily: "Mada,sans-serif",
                    fontSize: "24px",
                    color: "#000000",
                    offsetY: 0,
                  },
                  total: {
                    show: true,
                    color: "#4f4f4f",
                    fontFamily: "Mada,sans-serif",
                    fontSize: "8px",
                    label: "Total Value",
                    formatter: function (w) {
                      const sum = w?.globals?.series.reduce(
                        (acc: number, value: number) => acc + value,
                        0
                      );

                      const average = sum / w?.globals?.series.length;

                      const averagePercentage = Math.round(
                        (average / 100) * 100
                      );

                      return `${averagePercentage}%`;
                    },
                  },
                },
              },
            },
          },
        }}
      />
    </>
  );
};

export default DonutChart;
