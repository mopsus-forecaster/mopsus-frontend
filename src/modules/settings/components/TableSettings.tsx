import { useContext, useEffect, useState } from 'react'
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable'
import styles from '../styles/styles.module.scss'
import { NewOption } from './NewOption';
import { INITIAL_FILTERS, SettingsContext } from '../../../contexts/settings/SettingsContext';
import { mopsusIcons } from '../../../icons';
import { Filter } from '../../../shared/filter/Filter';
import { FilterSettings } from './FilterSettings';
import { Icon } from '@iconify/react/dist/iconify.cjs';
import { ModifySetting } from './ModifySetting';
import { onEditBrand, onEditCat } from '../../../services/settings';


export const TableSettings = ({ rows, title, optionsTableColumns, isLoading, set, endPoint, totalPage, totalCount, setFilters, get, filter, titleMin }) => {
    const [search, setSearch] = useState(null);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [newOption, setNewOption] = useState(false)
    const {
        goToNextPage,
        goToFirstPage,
        goToLastPage,
        goToPreviousPage,
        firstLoad,
        editOptionBrand,
        editOptionCat,
        handleSetOptionToEditBrand,
        handleSetOptionToEditCat,

    } = useContext(SettingsContext)


    const handleNewOption = (e) => {
        e.preventDefault();
        setNewOption(true)
    }


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!firstLoad) {
                setFilters((prevFilters) => {
                    const newFilters = {
                        ...prevFilters,
                        name: search ? search : null,
                    };

                    get(newFilters);

                    return newFilters;
                });
            }
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [search]);

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.tableTitleBtnContainer}>
                <p className={styles.title2}>{title}</p>
            </div>
            <section className={styles.tableActionsContainer}>
                <div className={styles.tableSearchComponent}>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className={styles.tableSearchInput}
                        placeholder="Buscar por nombre..."
                        type="text"
                    />
                    <button
                        className={styles.filterButton}
                        onClick={() => setIsOpenFilter(true)}
                    >
                        <Icon fontSize={24} icon={mopsusIcons.filters} />
                        Filtros
                    </button>
                </div>
                <div>
                    <button className={styles.btnAdd} onClick={handleNewOption}>Agregar</button>
                </div>

            </section>
            <div className={styles.lineContainer}>
                <hr className={styles.lineTable} />
            </div>

            <MopsusTable
                columns={optionsTableColumns}
                goToFirstPage={() => { goToFirstPage(filter, setFilters, get) }}
                goToLastPage={() => { goToLastPage(totalPage, filter, setFilters, get) }}
                goToNextPage={() => { goToNextPage(totalPage, filter, setFilters, get) }}
                goToPreviousPage={() => { goToPreviousPage(filter, setFilters, get) }}
                includeOptions={false}
                includePagination={true}
                isLoading={isLoading}
                page={filter.page}
                rows={rows}
                setRows={set}
                totalPages={totalPage}
                totalElements={totalCount}
            />
            {
                newOption && (
                    <NewOption titleModal={title} onClose={() => setNewOption(false)} endPoint={endPoint} title={titleMin} />
                )
            }
            {isOpenFilter && (
                <Filter
                    isOpen={isOpenFilter}
                    setIsOpen={setIsOpenFilter}
                    onApplyFilters={() => {
                        get(filter);
                        setIsOpenFilter(false);
                    }}
                    onDeleteFilters={() => {
                        setIsOpenFilter(false);
                        get(INITIAL_FILTERS);
                    }}
                >
                    <FilterSettings filters={filter} setFilters={setFilters} />
                </Filter>
            )}

            {editOptionBrand && (
                <ModifySetting
                    editOption={editOptionBrand}
                    setEditOption={handleSetOptionToEditBrand}
                    edit={onEditBrand}
                    titleMin={'marca'}
                />

            )}

            {editOptionCat && (
                <ModifySetting
                    editOption={editOptionCat}
                    setEditOption={handleSetOptionToEditCat}
                    edit={onEditCat}
                    titleMin={'categoría'}
                />
            )}
        </div >
    )
}