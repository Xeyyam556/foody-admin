
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = () => {
  const data = {
    labels: ['Risk 1', 'Risk 2', 'Risk 3', 'Risk 4', 'Risk 5'],
    datasets: [
      {
        label: 'Assigned Risks',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Assigned Risks',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;