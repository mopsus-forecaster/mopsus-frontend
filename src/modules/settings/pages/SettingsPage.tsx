import Box from '../../../shared/box';
import styles from '../styles/styles.module.scss'
import { mopsusIcons } from '../../../icons';
import { TableSettings } from '../components/TableSettings';
import { useContext, useEffect, useState } from 'react';
import { FilterSettings } from '../components/FilterSettings';
import { Filter } from '../../../shared/filter/Filter';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
import { addBrand, addCategory, getBrands, getCategories } from '../../../services/settings';
import { INITIAL_FILTERS } from '../../../contexts/Inventory/InventoryContext';

export const SettingsPage = () => {
    const [search, setSearch] = useState(null);
    const [isOpenFilter, setIsOpenFilter] = useState(false);


    const { getCategory, mappedCategory, isLoading, setMappedCategory, mappedBrand, setMappedBrand, firstLoad, setFirstLoad, getBrand, goToNextPage, goToPreviousPage, goToFirstPage, goToLastPage } = useContext(SettingsContext)

    const optionsTableColumns = [
        {
            text: 'Nombre',
            value: 'name',
            sort: true,
        },
        {
            text: 'Estado',
            value: 'is_active',
            sort: true,
        },
        {
            text: 'Opciones',
            value: 'options',
            sort: false,
        }
    ];

    const options = [
        {
            icon: mopsusIcons.edit,
            onClick: () => { },
        },
        {
            icon: mopsusIcons.trash,
            onClick: () => { },
        },
    ];

    useEffect(() => {
        if (firstLoad) {
            const getCategoriesOptions = async () => {
                try {
                    await getCategory(INITIAL_FILTERS);
                    await getBrand(INITIAL_FILTERS)
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            getCategoriesOptions();
            setFirstLoad(false);
        }
    }, [firstLoad, setFirstLoad, setMappedCategory]);

    return (
        <Box>
            <header className={`${styles.header}`}>
                <h1 className={`${styles.title}`}>Opciones</h1>
            </header>
            <section className={styles.Container}>
                <TableSettings title={'Marcas'} mapped={mappedBrand} optionsTableColumns={optionsTableColumns} isLoading={isLoading} set={setMappedBrand} options={options} endPoint={addBrand} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
                <TableSettings title={'Categorias'} mapped={mappedCategory} optionsTableColumns={optionsTableColumns} isLoading={isLoading} set={setMappedCategory} options={options} endPoint={addCategory} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} />
            </section>
            {isOpenFilter && (
                <Filter
                    isOpen={isOpenFilter}
                    setIsOpen={setIsOpenFilter}
                    onApplyFilters={() => {
                        setIsOpenFilter(false);
                    }}
                    onDeleteFilters={() => {

                        setIsOpenFilter(false);
                    }}
                >
                    <FilterSettings filters={undefined} setFilters={undefined}></FilterSettings>
                </Filter>
            )}
        </Box>
    )
}