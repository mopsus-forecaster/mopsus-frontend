import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useContext, useState } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import { updatePrice } from '../../../services/products';

export const UpdatePrice = ({ brand = [], category = [], setIsOpenUpdate }) => {
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [isIncrease, setIsIncrease] = useState(null);
    const [porcentage, setPorcentage] = useState(null);
    const { handleOpen, handleModalChange } = useContext(ModalContext);
    const { setShowLoading } = useContext(LoadingContext);
    const { getProducts } = useContext(ProductsContext);

    const handleChangePorcentage = (e) => {
        const value = parseFloat(e.target.value);
        setPorcentage(isNaN(value) ? null : value);
    };

    const onClose = () => {
        setIsOpenUpdate(false);
        setType('');
        setId(null);
        setIsIncrease(null);
        setPorcentage(null);
    };

    const handleSelectOption = (e) => {
        setType(e.target.value);
        setId(null);
        setIsIncrease(null);
        setPorcentage(null);
    };

    const handleChangeType = (e) => {
        const value = e.target.value === 'true';
        setIsIncrease(value);
    };

    const handleSecondaryOptionChange = (e) => {
        setId(e.target.value);
    };

    const handleUpdatePrice = () => {
        handleModalChange({
            accept: {
                title: 'Aceptar',
                action: async () => {
                    try {
                        setShowLoading(true);
                        const response = await updatePrice(id, type, isIncrease, porcentage);
                        if (response) {
                            setShowLoading(false);
                            handleModalChange({
                                accept: {
                                    title: 'Aceptar',
                                    action: () => {
                                        getProducts();
                                        setIsOpenUpdate(false);
                                        setType('');
                                        setId(null);
                                        setIsIncrease(null);
                                        setPorcentage(null);
                                    },
                                },
                                title: `Precios Actualizados`,
                                message: 'Puede consultar los productos con los precios actualizados en la tabla.',
                            });
                            handleOpen();
                        }
                    } catch (error) {
                        setShowLoading(false);
                        handleModalChange({
                            accept: {
                                title: 'Aceptar',
                                action: () => { },
                            },
                            title: `No se pudo completar la actualización.`,
                            message: 'Lo sentimos, no pudimos concretar la operación. Intente más tarde',
                        });
                        handleOpen();
                    }
                },
            },
            reject: {
                title: 'Cancelar',
                action: () => { },
            },
            title: 'Confirmar actualización de precios',
            message: `¿Está seguro que desea aplicar un cambio del ${porcentage}% en los precios para ${type === 'brand' ? 'la marca seleccionada' : 'la categoría seleccionada'}?`,
            icon: mopsusIcons.warning,
        });
        handleOpen();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.registerContainer}>
                <div className={styles.registerHeading}>
                    <h2 className={styles.titleRegister}>Actualizar precios</h2>
                    <Icon
                        fontSize={25}
                        icon={mopsusIcons.closeModal}
                        className={styles.iconClose}
                        onClick={onClose}
                    />
                </div>

                <hr className={styles.line10} />

                <form className={styles.formUpdate} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                        <label htmlFor="type" className={styles.modalLabel}>
                            Tipo de actualización
                        </label>
                        <select
                            name="type"
                            id="type"
                            className={styles.selectFilter}
                            value={type}
                            onChange={handleSelectOption}
                        >
                            <option value="" disabled>
                                Seleccione un tipo
                            </option>
                            <option value="brand">Marca</option>
                            <option value="category">Categoría</option>
                        </select>
                    </div>

                    {type === 'brand' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="brand" className={styles.modalLabel}>
                                Marca
                            </label>
                            <select
                                name="brand"
                                id="brand"
                                className={styles.selectFilter}
                                value={id === null ? '' : id}
                                onChange={handleSecondaryOptionChange}
                            >
                                <option value="" disabled>
                                    Seleccione una marca
                                </option>
                                {brand.length > 0 ? (
                                    brand.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No hay marcas disponibles
                                    </option>
                                )}
                            </select>
                        </div>
                    )}

                    {type === 'category' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="category" className={styles.modalLabel}>
                                Categoría
                            </label>
                            <select
                                name="category"
                                id="category"
                                className={styles.selectFilter}
                                value={id === null ? '' : id}
                                onChange={handleSecondaryOptionChange}
                            >
                                <option value="" disabled>
                                    Seleccione una categoría
                                </option>
                                {category.length > 0 ? (
                                    category.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No hay categorías disponibles
                                    </option>
                                )}
                            </select>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="isIncrease" className={styles.modalLabel}>
                            Tipo de actualización
                        </label>
                        <select
                            name="isIncrease"
                            id="isIncrease"
                            className={styles.selectFilter}
                            value={isIncrease === null ? '' : isIncrease}
                            onChange={handleChangeType}
                        >
                            <option value="" disabled>
                                Seleccione un tipo de cambio
                            </option>
                            <option value="true">Aumento</option>
                            <option value="false">Disminución</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="percentage" className={styles.modalLabel}>
                            Porcentaje (%)
                        </label>
                        <input
                            id="percentage"
                            name="percentage"
                            type="number"
                            value={porcentage || ''}
                            className={styles.inputPorcentaje}
                            placeholder="Ingrese el porcentaje"
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e') {
                                    e.preventDefault();
                                }
                            }}
                            onChange={handleChangePorcentage}
                        />
                    </div>

                    <div className={styles.btnBox}>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnRegister}`}
                            onClick={handleUpdatePrice}
                        >
                            Aplicar
                        </button>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnCancel}`}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
