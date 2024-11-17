import { Doughnut } from 'react-chartjs-2';
import styles from '../../styles/home.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

export const DoughnutChart = ({
  data,
  isMoney = false,
  title,
  subtitle,
}: ChartProps) => {
  const colors = [
    '#7367F0',
    '#28C76F',
    '#FF4C51',
    '#FFA800',
    '#FF914D',
    '#39C0ED',
    '#E91E63',
    '#9C27B0',
    '#3F51B5',
    '#4CAF50',
    '#FFC107',
    '#795548',
    '#607D8B',
    '#8E44AD',
    '#27AE60',
    '#D35400',
    '#F39C12',
    '#3498DB',
    '#C0392B',
    '#16A085',
    '#34495E',
  ];

  const chartData = {
    labels: data.labels,
    datasets: data.dataset.map((ds) => ({
      ...ds,
      backgroundColor: colors.slice(0, data.labels.length),
      borderColor: '#161616',
      borderWidth: 2,
    })),
  };

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
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
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161616',
        padding: '2rem',
        borderRadius: '10px',
        width: '45%',
        height: '50%',
      }}
    >
      <h2 className={styles.graphicTitle}>{title}</h2>
      <p className={styles.graphicSubtitle}>{subtitle}</p>
      <div style={{ height: '100%', width: '100%' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};
