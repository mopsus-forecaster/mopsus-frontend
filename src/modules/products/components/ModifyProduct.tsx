import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/products.module.scss'
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from "../../../hooks";
import { getCategories, getUnits, onEditProduct } from "../../../services/products";
import { ModalContext } from "../../../contexts/modal/ModalContext";
import { ProductsContext } from "../../../contexts/Products/ProductsContext";


interface FormData {
    title: string;
    price: number | string;
    reposition_point: number | string;
    stock: number | string;
    category: string;
    unit: string;
}



export const ModifyProduct = ({ editProduct, setEditProduct }) => {
    const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
        {
            title: editProduct.productName,
            price: editProduct.price,
            reposition_point: editProduct.repositionPoint,
            stock: editProduct.stock,
            category: editProduct.category,
            unit: editProduct.measureUnitId,
        }
    );
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const { handleModalChange, handleOpen } = useContext(ModalContext);
    const { getProducts } = useContext(ProductsContext);


    useEffect(() => {
        const getCategoriesOptions = async () => {
            try {
                const { categorias } = await getCategories();
                if (categorias) {
                    setCategories(categorias);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getUnitsOptions = async () => {
            try {
                const { unidades } = await getUnits();
                if (unidades) {
                    setUnits(unidades);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getCategoriesOptions();
        getUnitsOptions();
    }, []);


    const onSubmit = (e) => {
        e.preventDefault()
        handleModalChange({
            accept: {
                title: 'Editar producto',
                action: async () => {
                    try {
                        const category = categories.filter(c => c.name === form.category)

                        const res = await onEditProduct(
                            editProduct.id,
                            form.title,
                            category[0].id,
                            form.unit,
                            form.reposition_point,
                            form.price
                        )

                        if (res)
                            handleModalChange({
                                accept: {
                                    title: 'Aceptar',
                                    action: () => {
                                        setEditProduct()
                                        getProducts()
                                    },
                                },
                                title: `${form.title} editado exitósamente`,
                                message: 'Puede consultar el producto en la tabla de productos.',

                            });
                        handleOpen();
                    } catch ({ errors }) {
                        console.log(errors)
                        switch (errors[0].status) {
                            case 404:
                                handleModalChange({
                                    accept: {
                                        title: 'Aceptar',
                                        action: () => { },
                                    },
                                    title: 'Producto no encontrado',
                                    message: 'El producto que intenta editar no fue encontrado. Intente más tarde',
                                    icon: mopsusIcons.error,
                                });
                                handleOpen();
                                break;

                            default:
                                handleModalChange({
                                    accept: {
                                        title: 'Aceptar',
                                        action: () => { },
                                    },
                                    title: 'Error técnico',
                                    message:
                                        'Lo sentimos, no pudimos completar su solicitud. Intente más tarde',
                                    icon: mopsusIcons.error,
                                });
                                handleOpen();

                                break;
                        }
                    }

                },
            },
            reject: {
                title: 'Cancelar',
                action: () => {

                },
            },

            title: `Edición del producto ${form.title}`,
            message: '¿Está seguro que desea editar el producto?',
            icon: mopsusIcons.warning,
        });
        handleOpen();
    }

    return (
        <div className={styles.modal}>
            <div className={styles.registerContainer}>
                <div className={styles.modalContents}>
                    <Icon
                        fontSize={25}
                        icon={mopsusIcons.closeModal}
                        className={styles.iconClose}
                        onClick={() => setEditProduct()}
                    />
                    <h2 className={styles.titleRegister}>Modificar Producto</h2>
                    <hr className={styles.line} />
                    <form onSubmit={(e) => handleSubmit(onSubmit(e))}>
                        <div>
                            <div>
                                <label htmlFor="category" className={styles.modalLabel}>
                                    Categorías
                                </label>
                                <select
                                    onChange={handleChange}
                                    value={form.category}
                                    name="category"
                                    id="category"
                                    className={styles.select}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecciona una categoría
                                    </option>
                                    {categories.length > 0 ? (
                                        categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name} - {c.description}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No hay categorías disponibles
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="unit" className={styles.modalLabel}>
                                    Unidad de medida
                                </label>
                                <select
                                    name="unit"
                                    id="unit"
                                    value={form.unit}
                                    onChange={handleChange}
                                    className={styles.select}
                                    required>
                                    <option value="" disabled>
                                        Selecciona una unidad
                                    </option>
                                    {units.length > 0 ? (
                                        units.map((unit) => (
                                            <option key={unit.id} value={unit.id}>
                                                {unit.name} - {unit.description}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No hay unidades disponibles
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="title" className={styles.modalLabel}>
                                    Nombre del producto
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className={styles.modalInput}
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.title && <p className={styles.error}>{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="price" className={styles.modalLabel}>
                                    Precio de venta
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    className={styles.modalInput}
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.price && <p className={styles.error}>{errors.price}</p>}
                            </div>

                            <div>
                                <label htmlFor="reposition_point" className={styles.modalLabel}>
                                    Punto de reposición
                                </label>
                                <input
                                    type="number"
                                    name="reposition_point"
                                    className={styles.modalInput}
                                    min="0"
                                    value={form.reposition_point}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.reposition_point && (
                                    <p className={styles.error}>{errors.reposition_point}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="stock" className={styles.modalLabel}>
                                    Stock actual
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    className={styles.modalInputDesabled}
                                    min="0"
                                    value={form.stock}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className={styles.btnBox}>
                                <button
                                    type="submit"
                                    className={`${styles.btn} ${styles.btnRegister}`}
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnCancel}`}
                                    onClick={() => { setEditProduct() }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}