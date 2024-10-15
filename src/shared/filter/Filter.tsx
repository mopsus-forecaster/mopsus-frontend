import React, { useEffect } from "react";
import styles from './styles/filter.module.scss'
import { Icon } from "@iconify/react/dist/iconify.js";
import { mopsusIcons } from "../../icons";

type FiltersProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onApplyFilters: () => void;
    onDeleteFilters: () => void;
};

export const Filter: React.FC<FiltersProps> = ({
    isOpen,
    setIsOpen,
    children,
    onApplyFilters = () => {

    },
    onDeleteFilters = () => {

    },
}) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [setIsOpen]);

    const handleClickOutside = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.target === event.currentTarget) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isOpen && (
                <section
                    className={styles.modalFilter}
                    onClick={handleClickOutside}
                >
                    <article className={styles.filtersModal}>
                        <div>
                            <div className={styles.headerContainer}>
                                <Icon
                                    icon={mopsusIcons.closeModal}
                                    onClick={() => setIsOpen(false)}
                                    className={styles.iconCloseFilter}
                                    fontSize={20}
                                />
                                <h1 className={styles.titleRegister}>Filtra tu búsqueda</h1>
                                <hr className={styles.line} />
                            </div>
                            {children}
                        </div>
                        <footer className={styles.footer}>
                            <button onClick={onApplyFilters} className={`${styles.btn} ${styles.btnRegister}`}>
                                Aplicar filtros
                            </button>
                            <button onClick={onDeleteFilters} className={`${styles.btn} ${styles.btnCancel}`}>
                                Borrar filtros
                            </button>
                        </footer>
                    </article>
                </section>
            )}
        </>
    );
};