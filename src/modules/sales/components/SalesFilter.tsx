import styles from '../styles/sales.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import { useState } from 'react';

export const SalesFilter = ({ filters, setFilters }) => {
    const [error, setError] = useState('');
    const handleDateChange = (e) => {
        const { name, value } = e.target;


        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));


        if (name === 'initial_date' || name === 'end_date') {
            const initialDate = new Date(filters.initial_date);
            const endDate = new Date(filters.end_date);
            if (initialDate && endDate && initialDate >= endDate) {
                setError('La fecha inicial debe ser anterior a la fecha final.');
            } else {
                setError('');
            }
        }
    };

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
                        onChange={handleDateChange}
                    />
                    <Icon icon={mopsusIcons.guion} fontSize={35} />
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        className={styles.inputPrice}
                        value={filters.end_date}
                        onChange={handleDateChange}
                    />
                </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

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
                            is_active: e.target.value === 'all' ? null : e.target.value,
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