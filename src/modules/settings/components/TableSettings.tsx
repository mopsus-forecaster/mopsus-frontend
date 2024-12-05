import { useContext, useEffect, useState } from 'react'
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable'
import styles from '../styles/styles.module.scss'
import { NewOption } from './NewOption';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
import { mopsusIcons } from '../../../icons';
import { Filter } from '../../../shared/filter/Filter';
import { FilterSettings } from './FilterSettings';
import { Icon } from '@iconify/react/dist/iconify.cjs';
import { INITIAL_FILTERS } from '../../../contexts/Inventory/InventoryContext';
import { ModifySetting } from './ModifySetting';
import { getBrands, onEditBrand, onEditCat, getCategories } from '../../../services/settings';


export const TableSettings = ({ title, mapped, optionsTableColumns, isLoading, set, endPoint, totalPage, totalCount, deleteFuntion, setFilters, get, filter, setEdition }) => {
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
        handleSetOptionToEdit,
    } = useContext(SettingsContext)


    const handleNewOption = (e) => {
        e.preventDefault();
        setNewOption(true)
    }

    const options = [
        {
            icon: mopsusIcons.edit,
            onClick: (index) => handleSetOptionToEdit(index, mapped, setEdition),
        },
        {
            icon: mopsusIcons.trash,
            onClick: deleteFuntion,
        },
    ];

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
                includeOptions={true}
                includePagination={true}
                isLoading={isLoading}
                options={options}
                page={filter.page}
                rows={mapped}
                setRows={set}
                totalPages={totalPage}
                totalElements={totalCount}
            />
            {
                newOption && (
                    <NewOption titleModal={title} onClose={() => setNewOption(false)} endPoint={endPoint} />
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
                        setFilters(INITIAL_FILTERS);
                        get(INITIAL_FILTERS);
                        setIsOpenFilter(false);
                    }}
                >
                    <FilterSettings filters={filter} setFilters={setFilters} />
                </Filter>
            )}

            {editOptionBrand && (
                <ModifySetting
                    editOption={editOptionBrand}
                    setEditOption={handleSetOptionToEdit}
                    get={getBrands}
                    handleEdit={onEditBrand}
                    title={'marca'}
                />
            )}

            {editOptionCat && (
                <ModifySetting
                    editOption={editOptionCat}
                    setEditOption={handleSetOptionToEdit}
                    get={getCategories}
                    handleEdit={onEditCat}
                    title={'categoría'}
                />
            )}
        </div >
    )
}