import { MopsusTable } from "../../../shared/mopsusTable/MopsusTable"
import styles from "../styles/products.module.scss"
import stylesSettings from '../../settings/styles/styles.module.scss'
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../contexts/settings/SettingsContext";
import { MapNewProductTables } from "../utils/newproduct-table-mapper";

export const TablelSelect = ({ setFilters, isLoading, rows, set, totalPage, totalCount, filters, title, select, buscador, get }) => {
    const optionsTableColumns = [
        {
            text: 'Nombre',
            value: 'name',
            sort: true,
        },
        {
            text: 'Descripción',
            value: 'description',
            sort: true,
        },
        {
            text: 'Opciones',
            value: 'options',
            sort: false,
        },
    ];

    const {
        goToNextPage,
        goToFirstPage,
        goToLastPage,
        goToPreviousPage,
        getCategory,
        getBrand,
    } = useContext(SettingsContext)

    const [search, setSearch] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters((prevFilters) => {
                const newFilters = {
                    ...prevFilters,
                    name: search ? search : '',
                };
                if (title === 'Categorías') {
                    getCategory(newFilters)
                }
                if (title === 'Marcas') {
                    getBrand(newFilters);
                }


                return newFilters;
            });
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);
    return (
        <>
            <div className={stylesSettings.tableTitleBtnContainer}>
                <p className={styles.title2}>{title ? title : 'Información de categorías, marcas y unidades'}</p>
            </div>
            {
                buscador && (
                    <section className={styles.tableActionsContainertable}>
                        <div className={stylesSettings.tableSearchComponent}>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className={styles.tableSearchInput}
                                placeholder="Buscar por nombre..."
                                type="text"
                            />
                        </div>
                    </section>
                )
            }
            <div className={stylesSettings.lineContainer}>
                <hr className={stylesSettings.lineTable} />
            </div>
            <div className={styles.tabla}>
                <MopsusTable
                    columns={optionsTableColumns}
                    goToFirstPage={() => { goToFirstPage(filters, setFilters, get) }}
                    goToLastPage={() => { goToLastPage(totalPage, filters, setFilters, get) }}
                    goToNextPage={() => { goToNextPage(totalPage, filters, setFilters, get) }}
                    goToPreviousPage={() => { goToPreviousPage(filters, setFilters, get) }}
                    includeOptions={false}
                    includePagination={true}
                    isLoading={isLoading}
                    page={filters.page}
                    rows={rows.map((settings) => MapNewProductTables(title, settings, select))}
                    setRows={set}
                    totalPages={totalPage}
                    totalElements={totalCount}
                />
            </div>
        </>
    )
}