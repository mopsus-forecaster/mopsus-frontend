import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
export const MapSettingTablesBrand = (setting) => {
    const {
        handleSetOptionToEditBrand,
        deleteBrandFromTable,
        reactivateSettingFromTableBrand,
    } = useContext(SettingsContext);

    const editSetting = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.edit}
            onClick={() => {
                handleSetOptionToEditBrand(setting);
            }}
        />
    );

    const deleteSettingBrand = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.trash}
            onClick={() => {
                deleteBrandFromTable(setting);
            }}
        />
    );

    const reactivateSettingBrand = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.undo}
            onClick={() => {
                reactivateSettingFromTableBrand(setting);
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
            {editSetting}
            {setting.is_active === 'Activo' ? deleteSettingBrand : reactivateSettingBrand}
        </div>
    );

    return {
        name: setting.name,
        description: setting.description,
        is_active: setting.is_active === 'Activo' ? 'Activo' : 'Inactivo',
        options,
    };
};
