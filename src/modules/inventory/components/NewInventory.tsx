import Box from '../../../shared/box';
import styles from '../styles/inventory.module.scss';
import { ProductFind } from '../../inventory/components/ProductFind';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { InventortSummary } from './InventorySummary'


export const NewInventorty = () => {
    const [search, setSearch] = useState('');
    const { setFilters, getProductsAll, filters } = useContext(ProductsContext);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters((prevFilters) => ({ ...prevFilters, title: search, page: null }));
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);

    useEffect(() => {
        getProductsAll();
    }, [filters]);

    return (
        <Box>
            <header className={styles.header}>
                <h1 className={styles.title}>Registrar Ingreso</h1>
                <section className={styles.tableActionsContainerBuscar}>
                    <div className={styles.tableSearchComponent}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            className={styles.tableSearchInput}
                            placeholder="Buscar por nombre de producto"
                        />
                    </div>
                </section>
            </header>
            <div className={styles.boxContainer}>
                <ProductFind />
            </div>
            <div className={styles.boxContainer}>
                <InventortSummary></InventortSummary>
            </div>
        </Box>
    );
};
