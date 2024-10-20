import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';

export const ProductFilters = ({ filters, categories, setFilters, units }) => {
  return (
    <form className={styles.formFilter}>
      <div className={styles.formGroup}>
        <label htmlFor="category_id" className={styles.modalLabel}>
          Categoría
        </label>
        <select
          name=""
          id=""
          className={styles.selectFilter}
          value={filters.category_id || ''}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              category_id: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            Seleccione una categoría
          </option>
          {categories.length > 0 ? (
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.description}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No hay categorías disponibles
            </option>
          )}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="unit_id" className={styles.modalLabel}>
          Unidad
        </label>
        <select
          name=""
          id=""
          className={styles.selectFilter}
          value={filters.unit_id || ''}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              unit_id: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            Seleccione una unidad
          </option>
          {units.length > 0 ? (
            units.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.description}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No hay unidades disponibles
            </option>
          )}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="below_reposition" className={styles.modalLabel}>
          Punto de reposición
        </label>
        <select
          id="below_reposition"
          name="below_reposition"
          className={styles.selectFilter}
          value={filters.below_reposition || ''}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              below_reposition: e.target.value,
            }))
          }
        >
          <option value="">Seleccione un opción</option>
          <option value="true">Por debajo</option>
          <option value="false">Por encima</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price_min" className={styles.modalLabel}>
          Rango de precio
        </label>
        <div className={styles.priceContainer}>
          <input
            type="number"
            id="price_min"
            name="price_min"
            placeholder="Mínimo"
            min={0}
            className={styles.inputPrice}
            value={filters.price_min || ''}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                price_min: e.target.value,
              }))
            }
          />
          <Icon icon={mopsusIcons.guion} fontSize={35} />
          <input
            type="number"
            id="price_max"
            name="price_max"
            placeholder="Máximo"
            min={0}
            className={styles.inputPrice}
            value={filters.price_max || ''}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                price_max: e.target.value,
              }))
            }
          />
        </div>
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
  );
};
