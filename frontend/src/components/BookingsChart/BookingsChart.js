import React from "react";
import classes from "./BookingsChart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 100,
    max: 200,
  },
  Expensive: {
    min: 200,
    max: 100000,
  },
};

function BookingsChart({ bookings }) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Count",
        data: [],
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookigs = bookings.reduce((prev, currentBooking) => {
      if (
        currentBooking.event.price > BOOKINGS_BUCKETS[bucket].min &&
        currentBooking.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    chartData.labels.push(bucket);
    chartData.datasets[0].data.push(filteredBookigs);
  }

  return (
    <div className={classes.BookingsChart}>
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default BookingsChart;
