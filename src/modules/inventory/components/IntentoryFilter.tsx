import { mopsusIcons } from '../../../icons'
import styles from '../../sales/styles/sales.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js'

export const InventoryFilter = ({ filters, setFilters }) => {

    return(
        <form className={styles.formFilter}>
      <div className={styles.formGroup}>
        <label htmlFor="initial_date" className={styles.modalLabel}>
          Fecha
        </label>
        <div className={styles.priceContainer}>
          <input
            type="date"
            name="initial_date"
            className={styles.inputPrice}
            value={filters.saleDateStart}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                incomesDateStart: e.target.value,
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
                incomeDateEnd: e.target.value,
              }))
            }
          />
          </div>
          </div>
        </form>
    )
}