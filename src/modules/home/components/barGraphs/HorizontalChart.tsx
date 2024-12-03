import { Bar } from 'react-chartjs-2';
import styles from '../../styles/home.module.scss';
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

interface ChartProps {
  data: {
    labels: string[];
    dataset: {
      label: string;
      data: number[];
    }[];
  };
  isMoney?: boolean;
  title: string;
  subtitle: string;
}

export const HorizontalChart = ({
  data,
  isMoney = false,
  title,
  subtitle,
}: ChartProps) => {
  const colors = [
    '#5A52C3',
    '#219456',
    '#C53B3D',
    '#CC8700',
    '#CC743B',
    '#2D96B8',
    '#B0174E',
    '#7A1E91',
    '#323B8A',
    '#3B8040',
    '#CC9A06',
    '#644137',
    '#4D616B',
    '#732F8A',
    '#1F8C4C',
    '#A54200',
    '#C27F0F',
    '#2873A1',
    '#992629',
    '#12826A',
    '#2A3748',
  ];

  const chartData = {
    labels: data.labels,
    datasets: data.dataset.map((ds) => ({
      ...ds,
      backgroundColor: colors.slice(0, data.labels.length),
      borderRadius: 8,
    })),
  };

  const options = {
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 0,
            family: 'Inter',
          },
          color: '#DFE3E8',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            if (isMoney) {
              return `$${value}`;
            }
            return value;
          },
        },
        backgroundColor: '#2D3748',
        titleColor: '#F7FAFC',
        bodyColor: '#F7FAFC',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
            family: 'Inter',
          },
          color: '#A0AEC0',
          callback: (value: any) => {
            if (value >= 1000) {
              return isMoney ? `$${value / 1000}K` : `${value / 1000}K`;
            }
            return isMoney ? `$${value}` : value;
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
            family: 'Inter',
          },
          color: '#A0AEC0',
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161616',
        padding: '2rem',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
      }}
    >
      <h2 className={styles.graphicTitle}>{title}</h2>
      <p className={styles.graphicSubtitle}>{subtitle}</p>
      <div style={{ height: '100%', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
