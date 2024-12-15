import { createContext, useContext, useState } from 'react';
import { ModalContext } from '../modal/ModalContext';
import {
  deleteIncome,
  getInventory,
  getInventoryById,
} from '../../services/inventory';
import { mopsusIcons } from '../../icons';
import { LoadingContext } from '../loading/LoadingContext';

export const InventoryContext = createContext(null);

export const INITIAL_FILTERS = {
  dateReceipt: '',
  isActive: null,
  include_adjustments: null,
  id: null,
  page: 1,
};
export const InventoryProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const [incomes, setIncomes] = useState([]);
  const { setShowLoading } = useContext(LoadingContext);
  const [editIncome, setEditIncome] = useState(null);
  const [totalIncomes, setTotalIncomes] = useState(null);
  const [priceUnitary, setPriceUnitary] = useState(null);

  const productPriceUnitary = async (price) => {
    setPriceUnitary(price)
  }

  const getPaginatedInventory = async (customFilters?) => {
    setIsLoading(true);
    try {
      const response = await getInventory(
        customFilters ? customFilters : filters
      );
      const { incomes, total_pages, total_incomes } = response;
      if (incomes) {
        const mappedInventorys = incomes.map((income) => ({
          id: income.id,
          formatId: formatId(income.id),
          date: income.date,
          dateReceipt: income.date_receipt,
          description: income.description || 'Sin descripción',
          isActive: income.is_active ? 'Activo' : 'Inactivo',
          isAdjustment: income.is_adjustment ? 'Ajuste' : 'Ingreso',
          receiptNumber: income.receipt_number,
        }));
        setTotalIncomes(total_incomes);
        setIncomes(mappedInventorys);
        setTotalPages(total_pages);
      }
    } catch (error) {
      setIncomes([]);
      setTotalIncomes(0);
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: null,
      }));
      setTotalPages(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatId = (id) => {
    return id.length > 5 ? id.slice(0, 5) : id;
  };


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };


  const goToNextPage = () => {
    const nextPage =
      filters.page + 1 !== totalPages.current + 1
        ? filters.page + 1
        : totalPages.current;
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getPaginatedInventory({ ...filters, page: nextPage });
  };

  const goToPreviousPage = () => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getPaginatedInventory({ ...filters, page: nextPage });
  };

  const goToFirstPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    getPaginatedInventory({ ...filters, page: 1 });
  };

  const goToLastPage = () => {
    if (totalPages !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages,
      }));
      getPaginatedInventory({ ...filters, page: totalPages });
    }
  };

  const deleteIncomeFromTable = (income) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await deleteIncome(income.id);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getPaginatedInventory();
                  },
                },
                title: `Ingreso/Egreso N° "${(income.id)}" dado de baja exitosamente`,
                message:
                  'Puede restaurar los ingresos/egresos desde la tabla de inventario.',
              });
              handleOpen();
            }
          } catch (error) {
            setShowLoading(false);
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: () => { },
              },
              title: `Ingreso/Egreso N° "${(income.id)}" no pudo darse de baja`,
              message:
                'Lo sentimos, no pudimos concretar la opercion. Intente mas tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de baja Ingreso/Egreso N° "${(income.id)}" `,
      message: '¿Está seguro que desea dar de baja el Ingreso/Egreso?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  const handleSetIncomeToEdit = async (income) => {
    if (!income.id) {
      setEditIncome(null);
      return;
    }
    setIsLoadingDetails(true);
    try {
      const editIncome = await getInventoryById(income.id);
      setEditIncome(editIncome);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        filters,
        totalPages,
        isLoading,
        handleOpen,
        setFilters,
        setTotalPages,
        setIsLoading,
        handleModalChange,
        goToLastPage,
        goToFirstPage,
        goToPreviousPage,
        goToNextPage,
        getPaginatedInventory,
        incomes,
        setIncomes,
        deleteIncomeFromTable,
        handleSetIncomeToEdit,
        editIncome,
        formatDate,
        formatId,
        totalIncomes,
        isLoadingDetails,
        productPriceUnitary,
        priceUnitary
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
