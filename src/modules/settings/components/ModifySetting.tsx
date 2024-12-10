import { useContext } from 'react';
import styles from '../styles/styles.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '../../../hooks';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';

interface FormData {
    id: number | string;
    name: number | string;
    description: number | string;
}

export const ModifySetting = ({ editOption, setEditOption, edit, titleMin }) => {
    const { form, errors, handleChange } = useForm<FormData>({
        id: editOption.id,
        name: editOption.name,
        description: editOption.description,
    });
    const { getCategory, getBrand } = useContext(SettingsContext);
    const { handleModalChange, handleOpen } = useContext(ModalContext);
    const { setShowLoading } = useContext(LoadingContext);

    const onSubmit = (e) => {
        e.preventDefault();
        handleModalChange({
            accept: {
                title: 'Editar ' + titleMin,
                action: async () => {
                    try {
                        setShowLoading(true);

                        const res = await edit(
                            editOption.id,
                            form.name,
                            form.description
                        );

                        if (res) {
                            setShowLoading(false);

                            handleModalChange({
                                accept: {
                                    title: 'Aceptar',
                                    action: () => {
                                        setEditOption();
                                        if (titleMin == 'categoría') {
                                            getCategory()
                                        } else {
                                            getBrand()
                                        }
                                    },
                                },
                                title: `${form.name} editado exitósamente`,
                                message:
                                    `Puede consultar la ${titleMin} en la tabla.`,
                            });
                            handleOpen();
                        }
                    } catch ({ errors }) {
                        setShowLoading(false);
                        console.log(errors);
                        switch (errors[0].status) {
                            case 404:
                                handleModalChange({
                                    accept: {
                                        title: 'Aceptar',
                                        action: () => { },
                                    },
                                    title: `La ${titleMin} no se encontró`,
                                    message:
                                        `La ${titleMin} que intenta editar no fue encontrado. Intente más tarde`,
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
                action: () => { },
            },

            title: `Edición de la ${titleMin}: ${form.name}`,
            message: `¿Está seguro que desea editar la ${titleMin}?`,
            icon: mopsusIcons.warning,
        });
        handleOpen();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.registerContainer}>
                <div className={styles.modalContents}>
                    <Icon
                        fontSize={25}
                        icon={mopsusIcons.closeModal}
                        className={styles.iconClose}
                        onClick={() => setEditOption()}
                    />
                    <h2 className={styles.titleRegister}>Modificar {titleMin}</h2>
                    <hr className={styles.line} />
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div>
                            <label htmlFor="name" className={styles.modalLabel}>
                                Nombre
                            </label>
                            <input
                                type="name"
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
                                Descripción
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
                        <div>
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
                                    onClick={() => {
                                        handleModalChange({
                                            accept: {
                                                title: 'Aceptar',
                                                action: () => {
                                                    setEditOption();
                                                },
                                            },
                                            reject: {
                                                title: 'Cancelar',
                                                action: () => { },
                                            },
                                            title: `Cancelar la modificación de la ${titleMin}`,
                                            message:
                                                `¿Seguro que desea cancelar la modificación la ${titleMin}?`,
                                        });
                                        handleOpen();
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
