import styles from '../styles/inventory.module.scss';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { useContext, useState } from 'react';
import { RowInventorySummary } from './RowInventorySummary';
import { createInventory } from '../../../services/inventory';
import { mopsusIcons } from '../../../icons';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';

export const InventortSummary = () => {
  const { addProduct, setAddProduct } = useContext(SaleContext);
  const { handleModalChange, handleOpen } = useContext(ModalContext);
  const [description, setDescription] = useState('');
  const [dateReceipt, setDateReceipt] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const navigate = useNavigate();
  const { setShowLoading } = useContext(LoadingContext);

  // Función para formatear la fecha
  const formatDate = (date) => {
    const d = new Date(date);
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return formattedDate;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (addProduct.length === 0) {
      handleModalChange({
        accept: {
          title: 'Aceptar',
          action: () => { },
        },
        title: 'Datos incompletos',
        message: 'Debe haber almenos un producto agregado.',
        icon: mopsusIcons.warning,
      });
      handleOpen();
      return;
    }

    try {
      setShowLoading(true);
      const formattedDate = formatDate(dateReceipt); // Formatear la fecha antes de enviarla
      const res = await createInventory(description, addProduct, formattedDate, receiptNumber);
      if (res) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              setAddProduct([]);
              navigate(`/inventario`);
            },
          },
          title: 'Ingreso registrado con éxito',
          message: 'Podrá visualizarla en la tabla de stock',
        });
        handleOpen();
      }
    } catch (error) {
      setShowLoading(false);
      handleModalChange({
        accept: {
          title: 'Aceptar',
          action: () => { setAddProduct([]) },
        },
        title: 'Error técnico',
        message: 'No pudimos concretar su solicitud. Intente más tarde.',
        icon: mopsusIcons.error,
      });
      handleOpen();
      setAddProduct([]);
    }
  };

  return (
    <div className={styles.boxTableResumen}>
      <div className={styles.tableContainer}>
        <header>
          <div className={styles.contentBox}>
            <p className={styles.titleBox}>Productos Agregados al Ingreso</p>
            <hr className={styles.line2} />
          </div>
        </header>
        <div className={styles.margin}>
          <div className={styles.scrollContainer}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.trTable}>
                  <th className={styles.category}>Artículo</th>
                  <th className={styles.category}>Unidad</th>
                  <th className={styles.category}>Cantidad</th>
                  <th className={styles.category}>Precio Unitario <br />(ARS)</th>
                  <th className={styles.category}></th>
                </tr>
              </thead>
              <tbody>
                {addProduct && addProduct.length > 0 ? (
                  addProduct.map((product) => (
                    <RowInventorySummary key={product.id} product={product} />
                  ))
                ) : (
                  <p className={styles.productListEmptyContainer}>
                    No se agregaron productos
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.verticalLine}></div>
      <div className={styles.resumenContainer}>
        <header className={styles.marginHeader}>
          <div className={styles.contentBox}>
            <div className={styles.resumen}>
              <p className={styles.titleBox}>Información del ingreso</p>
              <input
                type="date"
                name='date_receipt'
                onChange={(e) => setDateReceipt(e.target.value)}
                className={styles.inputDate}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <hr className={styles.line2} />
          </div>
        </header>
        <div className={styles.contentBox}>
          <div className={styles.resumenContent}>
            <p className={styles.p}>Nro de comprobante</p>
            <input
              type="number"
              name='receiptNumber'
              onChange={(e) => setReceiptNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              className={styles.inputNroCompro}
            />
          </div>
        </div>
        <div className={styles.contentBox}>
          <p className={styles.titleBox}>Descripción</p>
          <textarea
            id="comment"
            name="description"
            rows={1}
            placeholder="Escriba su comentario..."
            maxLength={500}
            value={description}
            className={styles.commentBox}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.btnContainer}>
          <div>
            <button className={styles.buttonRegsiter} type='submit' onClick={onSubmit}>
              Registrar Ingreso
            </button>
          </div>
          <div>
            <button className={styles.btnCancel} type='button' onClick={() => {
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    navigate('/inventario')
                    setAddProduct([])
                  },
                },
                reject: {
                  title: 'Cancelar',
                  action: () => { },
                },
                title: `Cancelar el registro del ingreso`,
                message:
                  '¿Seguro que desea cancelar el registro del ingreso?',
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
