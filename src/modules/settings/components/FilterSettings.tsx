import styles from '../styles/styles.module.scss'

export const FilterSettings = ({ filters, setFilters }) => {
    return (
        <form className={styles.formFilter}>
            <div className={styles.formGroup}>
                <label htmlFor="is_active" className={styles.modalLabel}>
                    Estado
                </label>
                <select
                    id="is_active"
                    name="is_active"
                    className={styles.selectFilter}
                    value={
                        filters.is_active === null ? 'all' : filters.is_active
                    }
                    onChange={(e) =>
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            is_active:
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
