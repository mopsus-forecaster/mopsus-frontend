import styles from '../styles/sales.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';

export const SalesFilter = ({ filters, setFilters }) => {
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
                        value={filters.initial_date}
                        onChange={(e) => setFilters((prevFilters) => ({
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
                        value={filters.end_date}
                        onChange={(e) => setFilters((prevFilters) => ({
                            ...prevFilters,
                            saleDateEnd: e.target.value,
                        }))}
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
                    value={filters.is_active}
                    onChange={(e) =>
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            isActive: e.target.value === 'all' ? null : e.target.value,
                        }))
                    }
                >
                    <option value="">--</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                    <option value="all">Todos</option>
                </select>
            </div>
        </form>
    );
};