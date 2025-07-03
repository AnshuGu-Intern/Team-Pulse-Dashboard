import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = () => {
  const members = useSelector((state) => state.members);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const statusData = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusData).map(
      (status) => status.charAt(0).toUpperCase() + status.slice(1)
    ),
    datasets: [
      {
        data: Object.values(statusData),
        backgroundColor: ["#10b981", "#f59e0b", "#6366f1", "#a8a29e"],
        borderColor: darkMode ? "#1e293b" : "#f8fafc",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: darkMode ? "#e2e8f0" : "#1e293b",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#1e293b" : "#ffffff",
        titleColor: darkMode ? "#e2e8f0" : "#1e293b",
        bodyColor: darkMode ? "#e2e8f0" : "#1e293b",
        borderColor: darkMode ? "#334155" : "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} member${
              value !== 1 ? "s" : ""
            } (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    cutout: "65%",
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-lg h-80 flex flex-col ${
        darkMode ? "bg-stone-700" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">Team Status Distribution</h3>
      <div className="flex-1">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatusChart;
