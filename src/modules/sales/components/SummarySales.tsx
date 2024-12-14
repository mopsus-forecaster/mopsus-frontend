import { useContext, useEffect, useState } from 'react';
import styles from '../styles/sales.module.scss';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { RowSummarySales } from './RowSummarySales';
import { createSale } from '../../../services/sales';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { mopsusIcons } from '../../../icons';
import routes from '../../../router/routes';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';

export const SummarySales = () => {
  const { addProduct, setAddProduct } = useContext(SaleContext);
  const { handleModalChange, handleOpen } = useContext(ModalContext);
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { setShowLoading } = useContext(LoadingContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowLoading(true);
      const res = await createSale(addProduct, discount);
      if (res) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              setAddProduct([]);
              navigate(`/${routes.sales}`);
            },
          },
          title: 'Venta registrada con exito',
          message: 'Podra visualizarla en la tabla de ventas',
        });
        handleOpen();
      }
    } catch (error) {
      setShowLoading(false);
      console.log(error);
      handleModalChange({
        accept: {
          title: 'Aceptar',
          action: () => { },
        },
        title: 'Error tecnico',
        message: 'No pudimos concretar su solicitud. Intente mas tarde',
        icon: mopsusIcons.error,
      });
      handleOpen();
    }
  };

  useEffect(() => {
    const newSubTotal = addProduct.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setSubTotal(newSubTotal);

    const newTotal = newSubTotal - newSubTotal * discount;
    setTotal(newTotal);
  }, [addProduct, discount]);
  return (
    <div className={styles.boxTableResumen}>
      <div className={styles.tableContainer}>
        <div className={styles.scrollContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.category}>Artículo</th>
                <th className={styles.category}>Precio (ARS)</th>
                <th className={styles.category}>Cantidad</th>
                <th className={styles.category}>Subtotal (ARS)</th>
                <th className={styles.category}></th>
              </tr>
            </thead>
            <tbody>
              {addProduct && addProduct.length > 0 ? (
                addProduct.map((product) => (
                  <RowSummarySales key={product.id} product={product} />
                ))
              ) : (
                <p className={styles.productListEmptyContainer}>
                  No hay productos en el carrito.
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.resumenContainer}>
        <div>
          <p className={styles.p1}>Resumen</p>
          <hr className={styles.lineResumen} />
        </div>
        <div>
          <div className={styles.resumenContent}>
            <p className={styles.p}>Subtotal (ARS)</p>
            <p className={styles.p}>{subTotal}</p>
          </div>
        </div>

        <div>
          <div className={styles.resumenContent}>
            <p className={styles.p}>Descuento (%)</p>
            <input
              type="number"
              onChange={(e) => setDiscount(Number(e.target.value) / 100)}
              className={styles.inputDesc}
            />
          </div>
          <hr className={styles.lineResumen} />
        </div>
        <div>
          <div className={styles.resumenContent}>
            <p className={styles.p}>Total (ARS)</p>
            <p className={styles.p}>{total}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div>
            <button className={styles.buttonRegsiter} type='submit' onClick={onSubmit}>
              Registrar Ajuste
            </button>
          </div>
          <div>
            <button className={styles.btnCancel} type='button' onClick={() => {
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    navigate('/ventas')
                    setAddProduct([])
                  },
                },
                reject: {
                  title: 'Cancelar',
                  action: () => { },
                },
                title: `Cancelar el registro de la venta`,
                message:
                  '¿Seguro que desea cancelar el registro de la venta?',
              });
              handleOpen();
            }}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
