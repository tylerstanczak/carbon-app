import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Word Influence Analysis',
    },
  },
};

export const WordAnalysis = ({ influentialWords }) => {
    let borderColors = []
    let backgroundColors = []
    for (let influence of influentialWords.values()) {
       if (influence > 0) {
        borderColors.push('rgb(53, 162, 235)');
        backgroundColors.push('rgba(53, 162, 235, 0.5)');
       }
       else {
        borderColors.push('rgb(255, 99, 132)');
        backgroundColors.push('rgba(255, 99, 132, 0.5)');
       }
    }
    
    const data = {
        labels: Object.keys(influentialWords),
        datasets: [
          {
            data: influentialWords.map(word => influentialWords[word]),
            borderColor: borderColors,
            backgroundColor: backgroundColors,
          }
        ],
      };
  return <Bar options={options} data={data} />;
}