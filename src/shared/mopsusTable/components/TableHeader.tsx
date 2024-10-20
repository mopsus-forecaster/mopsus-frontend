import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
export const TableHeader = ({
  setRows,
  columns,
  rows,
  valueToOrderBy,
  setValueToOrderBy,
  orderDirection,
  setOrderDirection,
}) => {
  const createSortHandler = (property: string) => {
    const isAsc = valueToOrderBy === property && orderDirection === 'asc';
    const newOrderDirection = isAsc ? 'desc' : 'asc';

    setOrderDirection(newOrderDirection);
    setValueToOrderBy(property);

    const sortedRows = [...rows].sort((a, b) => {
      if (newOrderDirection === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });

    setRows(sortedRows);
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ value, text, sort }) => (
          <TableCell
            key={value}
            sx={{
              borderBottom: '1px solid #979797',
              color: '#979797',
              fontFamily: 'Montserrat',
              fontWeight: 600,
            }}
            align="center"
          >
            {sort ? (
              <TableSortLabel
                onClick={() => createSortHandler(value)}
                active={valueToOrderBy === value}
                sx={{
                  opacity: 100,
                  textAlign: 'center',
                  '&.Mui-active': {
                    color: '#979797',
                    fontWeight: 600,
                  },
                  '& .MuiTableSortLabel-icon': {
                    color: '#FFF',
                    fontWeight: 600,
                  },
                  '&.Mui-active .MuiTableSortLabel-icon': {
                    color: '#979797',
                    fontWeight: 600,
                  },
                  '&:hover': {
                    color: '#979797',
                    fontWeight: 600,
                    '& .MuiTableSortLabel-icon': {
                      color: '#979797',
                      fontWeight: 600,
                    },
                  },
                }}
                direction={
                  valueToOrderBy === value
                    ? orderDirection === 'asc'
                      ? 'asc'
                      : 'desc'
                    : 'asc'
                }
              >
                {text}
              </TableSortLabel>
            ) : (
              <span
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat',
                  color: '#979797',
                  opacity: 100,
                }}
              >
                {`${text}`}
              </span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
