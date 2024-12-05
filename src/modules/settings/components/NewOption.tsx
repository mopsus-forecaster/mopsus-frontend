import { useContext } from 'react';
import { useForm } from '../../../hooks';
import { mopsusIcons } from '../../../icons'
import { getCategories } from '../../../services';
import styles from '../styles/styles.module.scss'
import { Icon } from '@iconify/react/dist/iconify.cjs'
import { ModalContext } from '../../../contexts/modal/ModalContext';

interface FormData {
    name: string;
    description: string;
}

const validateForm = (form: FormData) => {
    const errors: Partial<FormData> = {};
    if (!form.name) {
        errors.name = 'El nombre es requerido'
    }
    if (!form.description) {
        errors.description = 'La descripción es requerido'
    }
    return errors
}


export const NewOption = ({ titleModal, onClose, endPoint }) => {
    const { handleOpen, handleModalChange } = useContext(ModalContext);
    const { form, errors, handleChange } = useForm<FormData>(
        {
            name: '',
            description: '',
        },
        validateForm
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await endPoint(
                form.name,
                form.description
            );

            if (res) {
                handleModalChange({
                    accept: {
                        title: 'Aceptar',
                        action: () => {
                            onClose();
                            getCategories();
                        },
                    },
                    title: 'Producto registrado con éxito',
                    message: 'Podrá ver el producto registrado en la tabla',
                });
                handleOpen();
            }
        } catch ({ errors }) {
            switch (errors[0].status) {
                case 400:
                    handleModalChange({
                        accept: {
                            title: 'Aceptar',
                            action: () => { },
                        },
                        title: 'Error en el registro',
                        message: 'Ya existe un producto con dicho nombre.',
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
    };
    return (
        <div className={styles.modal}>
            <div className={styles.registerContainer}>
                <div className={styles.modalContents}>
                    <Icon
                        fontSize={25}
                        icon={mopsusIcons.closeModal}
                        className={styles.iconClose}
                        onClick={onClose}
                    />
                    <h2 className={styles.titleRegister}>Registrar {titleModal}</h2>
                    <hr className={styles.line2} />
                    <form onSubmit={onSubmit}>
                        <div>

                            <div>
                                <label htmlFor="name" className={styles.modalLabel}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className={styles.modalInput}
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <p className={styles.error}>{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className={styles.modalLabel}>
                                    Descripcion
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    className={styles.modalInput}
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.description && <p className={styles.error}>{errors.description}</p>}
                            </div>

                            <div className={styles.btnBox}>
                                <button
                                    type="submit"
                                    className={`${styles.btn} ${styles.btnRegister}`}
                                >
                                    Registrar {titleModal}
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnCancel}`}
                                    onClick={onClose}
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