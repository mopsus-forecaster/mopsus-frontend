import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
export const MapProductTables = (product) => {
  const {
    deleteProductFromTable,
    reactivateProductFromTable,
    handleSetProductToEdit,
  } = useContext(ProductsContext);

  const editProduct = (
    <Icon
      className={styles.icon}
      style={{ color: '#ffff', fontSize: '1.2rem' }}
      icon={mopsusIcons.edit}
      onClick={() => {
        handleSetProductToEdit(product);
      }}
    />
  );

  const deleteProduct = (
    <Icon
      className={styles.icon}
      style={{ color: '#ffff', fontSize: '1.2rem' }}
      icon={mopsusIcons.trash}
      onClick={() => {
        deleteProductFromTable(product);
      }}
    />
  );

  const reactivateProduct = (
    <Icon
      className={styles.icon}
      style={{ color: '#ffff', fontSize: '1.2rem' }}
      icon={mopsusIcons.undo}
      onClick={() => {
        reactivateProductFromTable(product);
      }}
    />
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
