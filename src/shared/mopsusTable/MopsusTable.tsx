import { Table, TableContainer } from '@mui/material';
import { useState } from 'react';

import { TableHeader } from './components/TableHeader';
import { Body } from './components/TableBody';
import { TableFooter } from './components/TableFooter';

export const MopsusTable = ({
  rows,
  setRows,
  columns,
  isLoading,
  includeOptions,
  includePagination,
  goToFirstPage,
  goToLastPage,
  goToPreviousPage,
  goToNextPage,
  page,
  totalPages,
  options,
}) => {
  type Order = 'asc' | 'desc';
  const [valueToOrderBy, setValueToOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState<Order>();

  return (
    <>
      <TableContainer
        sx={{
          width: '95%',
          margin: '2% auto',
          height: '50vh',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            width: '12.5px',
            height: '12.5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2e2e2e',
            borderRadius: '12.5px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#555',
            borderRadius: '12.5px',
            border: '2px solid #2e2e2e',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#777',
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: '#2e2e2e',
          },
        }}
      >
        <Table>
          <TableHeader
            columns={columns}
            rows={rows}
            setRows={setRows}
            valueToOrderBy={valueToOrderBy}
            setOrderDirection={setOrderDirection}
            orderDirection={orderDirection}
            setValueToOrderBy={setValueToOrderBy}
          />

          <Body
            columns={columns}
            includeOptions={includeOptions}
            isLoading={isLoading}
            options={options}
            orderDirection={orderDirection}
            rows={rows}
            valueToOrderBy={valueToOrderBy}
          />
        </Table>
      </TableContainer>

      {includePagination && (
        <TableFooter
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
