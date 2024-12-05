import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
export const MapSettingTablesCat = (setting) => {
    const {
        handleSetOptionToEditCat,
        deleteCatFromTable,
        reactivateSettingFromTableCat,
    } = useContext(SettingsContext);

    const editSetting = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.edit}
            onClick={() => {
                handleSetOptionToEditCat(setting);
            }}
        />
    );

    const deleteSettingCat = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.trash}
            onClick={() => {
                deleteCatFromTable(setting);
            }}
        />
    );

    const reactivateSettingCat = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.undo}
            onClick={() => {
                reactivateSettingFromTableCat(setting);
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
            {setting.is_active === 'Activo' ? deleteSettingCat : reactivateSettingCat}
        </div>
    );

    return {
        name: setting.name,
        description: setting.description,
        is_active: setting.is_active === 'Activo' ? 'Activo' : 'Inactivo',
        options,
    };
};
