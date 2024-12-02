import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/table.module.scss';
import { mopsusIcons } from '../../../icons';

export const TableFooter = ({
  goToFirstPage,
  goToPreviousPage,
  page,
  totalPages,
  goToNextPage,
  goToLastPage,
  totalElements = 0,
}) => {
  const backButtonDisabled = !(page > 1);
  const nextButtonDisabled = totalPages === page;
  return (
    <tfoot className={styles.tableFooter}>
      <div className={styles.elementsContainer}>
        <p style={{ margin: 'auto 0' }}>Total de registros: {totalElements}</p>
      </div>
      <div className={styles.paginatorContainer}>
        <div className={styles.paginator}>
          <button
            className={
              backButtonDisabled ? styles.buttonDisabled : styles.buttonFooter
            }
            disabled={backButtonDisabled}
          >
            <Icon
              onClick={goToFirstPage}
              fontSize={24}
              icon={mopsusIcons.firstPage}
            ></Icon>
            <Icon
              onClick={goToPreviousPage}
              fontSize={24}
              icon={mopsusIcons.previousPage}
            />
          </button>
          Pagina {page} de {totalPages}
          <button
            className={
              nextButtonDisabled ? styles.buttonDisabled : styles.buttonFooter
            }
            disabled={nextButtonDisabled}
          >
            <Icon
              onClick={goToNextPage}
              fontSize={24}
              icon={mopsusIcons.nextPage}
            ></Icon>
            <Icon
              onClick={goToLastPage}
              fontSize={24}
              icon={mopsusIcons.lastPage}
            ></Icon>
          </button>
        </div>
      </div>
    </tfoot>
  );
};
