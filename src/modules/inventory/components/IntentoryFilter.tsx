import { mopsusIcons } from '../../../icons'
import styles from '../../sales/styles/sales.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js'

export const InventoryFilter = ({ filters, setFilters }) => {

  return (
    <>
      <form className={styles.formFilter}>

        <div className={styles.formGroup}>
          <label htmlFor="start_date" className={styles.modalLabel}>
            Fecha
          </label>
          <div className={styles.priceContainer}>
            <input
              type="date"
              name="start_date"
              className={styles.inputPrice}
              value={filters.saleDateStart}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  start_date: e.target.value,
                }))
              }
            />
            <Icon icon={mopsusIcons.guion} fontSize={35} />
            <input
              type="date"
              id="end_date"
              name="end_date"
              className={styles.inputPrice}
              value={filters.saleDateEnd}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  end_date: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="is_adjustment" className={styles.modalLabel}>
            Ajustes
          </label>
          <select
            id="is_adjustment"
            name="is_adjustment"
            className={styles.selectFilter}
            value={filters.is_adjustment}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                is_adjustment: e.target.value,
              }))
            }
          >
            <option value="">--</option>
            <option value="false">Ingresos</option>
            <option value="true">Ajustes</option>
            <option value="">Todos</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="is_active" className={styles.modalLabel}>
            Estado
          </label>
          <select
            id="is_active"
            name="is_active"
            className={styles.selectFilter}
            value={filters.is_active || 'all'}
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
    </>
  )
}