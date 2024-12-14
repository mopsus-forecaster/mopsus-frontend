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
import { useContext, useState } from 'react';
import { HomeContext } from '../../../../contexts/home/HomeContext';
import { CircularProgress } from '@mui/material';

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
    labels: string[]; // Fechas en formato YYYY-MM-DD
    dataset: {
      label: string;
      data: number[];
    }[];
  };
  isMoney?: boolean;
  title: string;
  subtitle: string;
  isLoading: boolean;
}

export const SalesForecastingGraph = ({
  data,
  isMoney = false,
  title,
  subtitle,
  isLoading,
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

  const { getSalesForecasting } = useContext(HomeContext);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  const oneWeekAfter = new Date();
  oneWeekAfter.setDate(today.getDate() + 7);
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convierte las etiquetas de `YYYY-MM-DD` a `DD/MM`
  const formattedLabels =
    data &&
    data.labels.map((label) => {
      const [year, month, day] = label.split('-');
      return `${day}/${month}/${year.slice(0, -2)}`;
    });

  const [startDate, setStartDate] = useState<string>(formatDate(today));
  const [endDate, setEndDate] = useState<string>(formatDate(oneWeekAfter));

  const appplyFilters = () => {
    const forecastType = isMoney ? 'money' : 'appearances';

    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      getSalesForecasting(forecastType, startDate, endDate);
    }
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const chartData = (data) => {
    if (data)
      return {
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
      };
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
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
            return `Pronóstico: ${value} unidades `;
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
          callback: (_, index: number) => formattedLabels[index], // Usa las etiquetas formateadas
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
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

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
              Hasta
            </p>

            <input
              type="date"
              id="end_date"
              name="end_date"
              className={styles.inputPrice}
              min={formatDate(today)}
              max={formatDate(maxDate)}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button onClick={appplyFilters} className={styles.buttonAdd}>
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
          <Line data={chartData(data)} options={options} />
        ) : (
          <CircularProgress sx={{ color: '#fff' }} size="4rem" />
        )}
      </div>
    </div>
  );
};
