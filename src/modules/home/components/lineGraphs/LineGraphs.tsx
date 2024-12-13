import { Line } from 'react-chartjs-2';
import styles from '../../styles/home.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export const LineChart = ({
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
    datasets: data.dataset.map((ds, index) => ({
      ...ds,
      borderColor: colors[index % colors.length], // Color de la línea
      backgroundColor: `${colors[index % colors.length]}80`, // Color con opacidad
      fill: 'start', // Pintar el área bajo la curva desde el eje
      tension: 0.4, // Suavizado de la curva
      pointRadius: 4, // Tamaño de los puntos
      pointHoverRadius: 6, // Tamaño de los puntos al pasar el cursor
    })),
  };

  const options = {
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
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
      y: {
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
