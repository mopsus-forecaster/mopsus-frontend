import styles from '../styles/inventory.module.scss'
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { useContext, useState } from 'react';
import { RowAdjustmentSummary } from './RowAdjustmentSummary'
import { createAdjustment } from '../../../services/inventory'
import { mopsusIcons } from '../../../icons';



export const AdjustmentSummary = () => {
    const { addProduct, setAddProduct } = useContext(SaleContext);
    const { handleModalChange, handleOpen } = useContext(ModalContext);
    const [description, setDescription] = useState('')
    const navigate = useNavigate();

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
            const res = await createAdjustment(addProduct, description);
            console.log('entra al trys')
            if (res) {
                handleModalChange({
                    accept: {
                        title: 'Aceptar',
                        action: () => {
                            setAddProduct([]);
                            navigate(`/inventario`);
                        },
                    },
                    title: 'Ajuste registrado con éxito',
                    message: 'Podrá visualizarlo en la tabla de ingresos',
                });
                handleOpen();
            }
        } catch (error) {
            handleModalChange({
                accept: {
                    title: 'Aceptar',
                    action: () => { },
                },
                title: 'Error técnico',
                message: 'No pudimos concretar su solicitud. Intente más tarde.',
                icon: mopsusIcons.error,
            });
            handleOpen();
        }
    };

    return (
        <div className={styles.boxTableResumen}>

            <div className={styles.tableContainer}>
                <header>
                    <div className={styles.contentBox}>
                        <p className={styles.titleBox}>Productos Agregados al Ajuste</p>
                        <hr className={styles.line2} />
                    </div>
                </header>
                <div className={styles.margin}>
                    <div className={styles.scrollContainer}>
                        <table className={styles.table}>
                            <thead className={styles.thead}>
                                <tr className={styles.trTable}>
                                    <th className={styles.thAdjustment}>Artículo</th>
                                    <th className={styles.thAdjustment}>Unidad</th>
                                    <th className={styles.thAdjustment}>Cantidad</th>
                                    <th className={styles.thAdjustment}>Ingreso/Egreso</th>
                                    <th className={styles.thAdjustment}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addProduct && addProduct.length > 0 ? (
                                    addProduct.map((product) => (
                                        <RowAdjustmentSummary key={product.id} product={product} />
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
                        <p className={styles.titleBox}>Información del ajuste</p>
                        <hr className={styles.line2} />
                    </div>
                </header>
                <div className={styles.contentBox}>
                    <p className={styles.titleBox}>Motivo de ajuste</p>
                    <textarea
                        id="comment"
                        name="description"
                        rows={4}
                        placeholder="Escriba su comentario..."
                        maxLength={500}
                        value={description}
                        className={styles.commentBox}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.buttonRegsiter} onClick={onSubmit}>
                        Registrar Ingreso
                    </button>
                </div>
            </div>
        </div>
    );
};