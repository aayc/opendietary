import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { isLabeledStatement } from "typescript";

type PieChartProps = {
  data: number[];
  labels: string[];
};

const pieChartBgColors = ["#42A5F5", "#66BB6A", "#FFA726"];
const pieChartHoverBgColors = ["#64B5F6", "#81C784", "#FFB74D"];
const PieChart = (props: PieChartProps) => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    setChartData({
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: pieChartBgColors.slice(0, props.data.length),
          hoverBackgroundColor: pieChartHoverBgColors.slice(0, props.data.length),
        },
      ],
    });
  }, [props.data, props.labels]);

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  return <Chart type="pie" data={chartData} options={lightOptions} style={{ width: "40%" }} />;
};

export default PieChart;
