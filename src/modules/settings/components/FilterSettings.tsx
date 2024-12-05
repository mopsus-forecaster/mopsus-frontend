import styles from '../styles/styles.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';

export const FilterSettings = ({ filters, setFilters }) => {
    return (
        <form className={styles.formFilter}>
            <div className={styles.formGroup}>
                <label htmlFor="initial_date" className={styles.modalLabel}>
                    Fecha
                </label>
                <div className={styles.priceContainer}>
                    <input
                        type="date"
                        name="initial_date"
                        className={styles.inputPrice}
                        value={filters.saleDateStart}
                        onChange={(e) =>
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                saleDateStart: e.target.value,
                            }))
                        }
                    />
                    <Icon icon={mopsusIcons.guion} fontSize={35} />
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        className={styles.inputPrice}
                        value={filters.saleDateEnd}
                        onChange={(e) =>
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                saleDateEnd: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="is_active" className={styles.modalLabel}>
                    Estado
                </label>
                <select
                    id="is_active"
                    name="is_active"
                    className={styles.selectFilter}
                    value={
                        filters.isActive === null ? 'all' : filters.isActive.toString()
                    }
                    onChange={(e) =>
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            isActive:
                                e.target.value === 'all'
                                    ? null
                                    : e.target.value === 'true'
                                        ? true
                                        : false,
                        }))
                    }
                >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                    <option value="all">Todos</option>
                </select>
            </div>
        </form>
    );
};
