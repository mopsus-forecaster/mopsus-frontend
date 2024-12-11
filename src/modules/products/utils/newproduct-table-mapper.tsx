import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';


export const MapNewProductTables = (title, settings, select) => {
    const {
        handleSelectSetting,
        handleNotSelectSetting
    } = useContext(ProductsContext);
    console.log(select)
    const addSetting = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.no}
            onClick={() => {
                handleSelectSetting(title, settings)
            }}
        />
    );

    const delectSetting = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.yes}
            onClick={() => {
                handleNotSelectSetting(title)
            }}
        />
    );


    const options = (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
            }}
        >

            {select === settings.id ? delectSetting : addSetting}
        </div>
    );

    return {
        name: settings.name,
        description: settings.description,
        options,
    };
};
