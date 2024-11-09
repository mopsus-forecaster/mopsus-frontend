import { Icon } from '@iconify/react/dist/iconify.js';
import {
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import styles from '../styles/table.module.scss';

export const Body = ({
  isLoading,
  columns,
  rows,
  orderDirection,
  valueToOrderBy,
  includeOptions,
  options,
}) => {
  type Order = 'asc' | 'desc';

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<
    T extends Record<Key, number | string>,
    Key extends keyof T,
  >(order: Order, orderBy: Key): (a: T, b: T) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            sx={{
              border: 'none',
              color: '#fff',
              fontFamily: 'Montserrat',
            }}
            align="center"
          >
            <CircularProgress
              sx={{
                margin: '7.5% auto 1rem auto',
                color: '#4a7370',
                opacity: 100,
              }}
            />
            <p>Cargando datos...</p>
          </TableCell>
        </TableRow>
      ) : rows && rows.length > 0 ? (
        stableSort(rows, getComparator(orderDirection, valueToOrderBy)).map(
          (row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    border: 'none',
                    color: '#ffff',
                    fontFamily: 'Montserrat',
                  }}
                  align="center"
                  key={column.value}
                >
                  {includeOptions && column.value === 'options' ? (
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                      }}
                    >
                      {options.map((option) => (
                        <Icon
                          className={styles.icon}
                          style={{ color: '#ffff', fontSize: '1.2rem' }}
                          icon={option.icon}
                          onClick={() => option.onClick(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    row[column.value]
                  )}
                </TableCell>
              ))}
            </TableRow>
          )
        )
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            sx={{
              border: 'none',
              color: '#fff',
              fontFamily: 'Montserrat',
            }}
            align="center"
          >
            <p
              style={{
                color: '#ffff',
                textAlign: 'center',
                marginTop: '10rem',
              }}
            >
              No se encontraron datos
            </p>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
