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
import { useContext, useState, useEffect } from 'react';
import { HomeContext } from '../../../../contexts/home/HomeContext';

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
}

export const SalesForecastingGraph = ({
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

  const { getSalesForecasting } = useContext(HomeContext);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Convierte las etiquetas de `YYYY-MM-DD` a `DD/MM`
  const formattedLabels = data.labels.map((label) => {
    const [year, month, day] = label.split('-');
    return `${day}/${month}/${year.slice(0, -2)}`;
  });

  const [startDate, setStartDate] = useState<string>(formatDate(today));
  const [endDate, setEndDate] = useState<string>(formatDate(maxDate));

  useEffect(() => {
    const forecastType = isMoney ? 'money' : 'appearances';

    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      getSalesForecasting(forecastType, startDate, endDate);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (new Date(value) <= new Date(endDate)) {
      setStartDate(value);
    } else {
      alert("La fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.");
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (new Date(value) >= new Date(startDate)) {
      setEndDate(value);
    } else {
      alert("La fecha 'Hasta' no puede ser menor que la fecha 'Desde'.");
    }
  };

  const chartData = {
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
            const labelDate = data.labels[tooltipItem.dataIndex];
            return `Pronóstico: ${value} unidades (${labelDate})`;
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
          callback: (value: any, index: number) => formattedLabels[index], // Usa las etiquetas formateadas
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
        height: 'auto',
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
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '5%',
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
        </div>
      </div>

      <div style={{ height: '100%', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
