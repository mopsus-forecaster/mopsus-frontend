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
}) => {
  return (
    <tfoot className={styles.tableFooter}>
      <div className={styles.paginatorContainer}>
        <div className={styles.paginator}>
          <div>
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
          </div>
          Pagina {page} de {totalPages}
          <div>
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
          </div>
        </div>
      </div>
    </tfoot>
  );
};
