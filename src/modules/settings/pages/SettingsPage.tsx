import Box from '../../../shared/box';
import styles from '../styles/styles.module.scss'
import { TableSettings } from '../components/TableSettings';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
import { addBrand, addCategory } from '../../../services/settings';
import { INITIAL_FILTERS } from '../../../contexts/Inventory/InventoryContext';
import { MapSettingTablesCat } from '../utils/settingsCat-table-mapper';
import { MapSettingTablesBrand } from '../utils/settingsBrand-table-mapper';

export const SettingsPage = () => {
    const {
        getCategory,
        mappedCategory,
        isLoadingCat,
        isLoadingBrand,
        setMappedCategory,
        mappedBrand,
        setMappedBrand,
        firstLoad,
        setFirstLoad,
        getBrand,
        totalCountCat,
        totalCountBrand,
        totalPagesBrand,
        totalPagesCategory,
        setFiltersBrand,
        setFiltersCat,
        filtersBrand,
        filtersCat,
    } = useContext(SettingsContext)

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

    const getOptions = async () => {
        await getCategory(INITIAL_FILTERS);
        await getBrand(INITIAL_FILTERS)
    }

    useEffect(() => {
        if (firstLoad) {
            const getCategoriesOptions = async () => {
                try {
                    await getOptions()

                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            getCategoriesOptions();
            setFirstLoad(false);
        }
    }, []);

    return (
        <Box>
            <header className={`${styles.header}`}>
                <h1 className={`${styles.title}`}>Opciones</h1>
            </header>
            <section className={styles.Container}>
                <TableSettings
                    title={'Marcas'}
                    optionsTableColumns={optionsTableColumns}
                    isLoading={isLoadingBrand}
                    set={setMappedBrand}
                    endPoint={addBrand}
                    totalPage={totalPagesBrand}
                    totalCount={totalCountBrand}
                    setFilters={setFiltersBrand}
                    get={getBrand}
                    filter={filtersBrand}
                    rows={mappedBrand.map((setting) => MapSettingTablesBrand(setting))}
                    titleMin={'marca'}
                />
                <TableSettings
                    title={'Categorías'}
                    optionsTableColumns={optionsTableColumns}
                    isLoading={isLoadingCat}
                    set={setMappedCategory}
                    endPoint={addCategory}
                    totalPage={totalPagesCategory}
                    totalCount={totalCountCat}
                    setFilters={setFiltersCat}
                    get={getCategory}
                    filter={filtersCat}
                    rows={mappedCategory.map((setting) => MapSettingTablesCat(setting))}
                    titleMin={'categoría'}
                />
            </section>
        </Box>
    )
}