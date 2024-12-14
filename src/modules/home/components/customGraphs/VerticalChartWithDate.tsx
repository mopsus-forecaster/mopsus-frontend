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
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

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
    labels: (string | number)[];
    dataset: {
      label: string;
      data: number[];
    }[];
  };
  isMoney?: boolean;
  title: string;
  subtitle: string;
  isLoading: boolean;
  onApplyFilters: (...args: any[]) => void;
}

export const VerticalChartWithDate = ({
  data,
  isMoney = false,
  title,
  subtitle,
  isLoading,
  onApplyFilters,
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

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState<string>(formatDate(today));

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDate(value);
  };

  const formattedLabels =
    data &&
    data.labels.map((label) => {
      if (typeof label === 'number') {
        return `${label}h`;
      }

      return label;
    });

  const applyFilters = () => {
    const forecastType = isMoney ? 'money' : 'appearances';

    if (date) {
      onApplyFilters(forecastType, date);
    }
  };

  const chartData = data
    ? {
        labels: formattedLabels, // Usa las etiquetas formateadas
        datasets: data.dataset.map((ds, index) => ({
          ...ds,
          borderColor: colors[index % colors.length],
          backgroundColor: `${colors[index % colors.length]}33`, // Relleno transparente
          fill: 'start',
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
        })),
      }
    : null;

  const options = {
    indexAxis: 'x' as const,
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
              return `$${value.toLocaleString()}`;
            }
            return value.toLocaleString();
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
            if (isMoney) {
              return `$${value.toLocaleString()}`;
            }
            return value.toLocaleString();
          },
        },
        grid: {
          display: true,
          color: '#2D3748',
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
        height: '40vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h2 className={styles.graphicTitle}>{title}</h2>
          <p className={styles.graphicSubtitle}>{subtitle}</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'end',
            gap: '5%',
            marginRight: '5%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                color: 'white',
              }}
            >
              Desde
            </p>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className={styles.inputPrice}
              min={formatDate(today)}
              max={formatDate(maxDate)}
              value={date}
              onChange={handleStartDateChange}
            />
          </div>

          <button onClick={applyFilters} className={styles.buttonAdd}>
            Aplicar
          </button>
        </div>
      </div>

      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isLoading && data ? (
          <Bar data={chartData} options={options} />
        ) : (
          <CircularProgress sx={{ color: '#fff' }} size="4rem" />
        )}
      </div>
    </div>
  );
};
