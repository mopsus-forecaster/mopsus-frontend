import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mui/material';

export const MapSalesTable = (
  sale,
  deleteSaleFromTable,
  handleSetSaleToDetails
) => {
  console.log(sale);
  const deleteSale = (
    <Tooltip title="Anular venta">
      <Icon
        className={styles.icon}
        style={{ color: '#ffff', fontSize: '1.2rem' }}
        icon={mopsusIcons.trash}
        onClick={() => {
          deleteSaleFromTable(sale);
        }}
      />
    </Tooltip>
  );

  const viewSale = (
    <Tooltip title="Ver detalles de venta">
      <Icon
        className={styles.icon}
        style={{ color: '#ffff', fontSize: '1.2rem' }}
        icon={mopsusIcons.details}
        onClick={() => {
          handleSetSaleToDetails(sale);
        }}
      />
    </Tooltip>
  );

  const options = (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      {viewSale}
      {sale.isActive === 'Activo' ? deleteSale : null}
    </div>
  );
  return {
    formatId: sale.formatId,
    saleDate: sale.saleDate,
    isActive: sale.isActive,
    total: sale.total,
    discount: sale.discount,
    products: sale.products,
    options,
  };
};
