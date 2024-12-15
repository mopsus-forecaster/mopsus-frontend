import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { Tooltip } from '@mui/material';
export const MapProductTables = (product) => {
  const {
    deleteProductFromTable,
    reactivateProductFromTable,
    handleSetProductToEdit,
  } = useContext(ProductsContext);

  const editProduct = (
    <Tooltip title="Editar producto">
      <Icon
        className={styles.icon}
        style={{ color: '#ffff', fontSize: '1.2rem' }}
        icon={mopsusIcons.edit}
        onClick={() => {
          handleSetProductToEdit(product);
        }}
      />
    </Tooltip>
  );

  const deleteProduct = (
    <Tooltip title="Dar de baja producto">
      <Icon
        className={styles.icon}
        style={{ color: '#ffff', fontSize: '1.2rem' }}
        icon={mopsusIcons.trash}
        onClick={() => {
          deleteProductFromTable(product);
        }}
      />
    </Tooltip>
  );

  const reactivateProduct = (
    <Tooltip title="Dar de alta producto">
      <Icon
        className={styles.icon}
        style={{ color: '#ffff', fontSize: '1.2rem' }}
        icon={mopsusIcons.undo}
        onClick={() => {
          reactivateProductFromTable(product);
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
      {editProduct}
      {product.state === 'Activo' ? deleteProduct : reactivateProduct}
    </div>
  );

  return {
    measureUnitId: product.measureUnitId,
    measureUnitDescription: product.measureUnitDescription,
    productName: product.productName,
    price: product.price,
    stock: product.stock,
    repositionPoint: product.repositionPoint,
    category: product.category,
    state: product.state === 'Activo' ? 'Activo' : 'Inactivo',
    brand: product.brand,
    barcode: product.barcode,
    options,
  };
};
