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
      display: true,
      position: 'right'
    },
    title: {
      display: true,
      text: 'Word Influence Analysis',
    },
  },
  labels: {
    callbacks: {

    }
  },
  tooltips: {
    callbacks: {
        label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var index = tooltipItem.index;
            return dataset.labels[index] + ': ' + dataset.data[index];
        }
    }
}
};

export const WordAnalysis = ({ influentialWords }) => {
  const sortedWords = [], positiveData = [], negativeData = [];
  for (let word in influentialWords) {
    sortedWords.push({ x: influentialWords[word], y: word });
  }
  sortedWords.sort(( a, b) => b.delta - a.delta);
  sortedWords.forEach( word => {
    if (word.x > 0) {
      positiveData.push(word);
    } else {
      negativeData.push(word);
    }
  })
    const data = {
        datasets: [
          {
            label: 'Positive Delta',
            data: positiveData,
            borderColor: 'rgb(53, 162, 235)', // Blue
            backgroundColor: 'rgba(53, 162, 235, 0.5)', // Blue
          },
          {
            label: 'Negative Delta',
            data: negativeData,
            borderColor: 'rgb(255, 99, 132)', // Red
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red
          },
        ],
      };
  return <Bar options={options} data={data} />;
}