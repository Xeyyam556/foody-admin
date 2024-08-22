
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DoughnutChart = () => {
  const data = {
    labels: ['Kfc', "McDonald's", 'Papa Johns', 'Gosushi'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 4, 5,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
      
        ],
        borderWidth: 3
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;