import { createContext, useContext, useState } from "react";
import { ModalContext } from "../modal/ModalContext";
import { deleteIncome, getInventory, getInventoryById } from "../../services/inventory";
import { mopsusIcons } from "../../icons";

export const InventoryContext = createContext(null);

export const INITIAL_FILTERS = {
    date: '',
    isActive: null,
    include_adjustments: null,
    id: null,
    page: 1
}
export const InventoryProvider = ({ children }) => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [totalPages, setTotalPages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const { handleOpen, handleModalChange } = useContext(ModalContext);
    const [incomes, setIncomes] = useState([])
    const [editIncome, setEditIncome] = useState(null)
    const [totalIncomes, setTotalIncomes] = useState(null)

    const getPaginatedInventory = async (customFilters?) => {
        try {
            setIsLoading(true);
            const response = await getInventory(customFilters ? customFilters : filters);
            const { incomes, total_pages, total_incomes } = response;
            if (incomes) {
                const mappedInventorys = incomes.map((income) => ({
                    id: income.id,
                    date: formatDate(income.date),
                    description: income.description || 'Sin descripción',
                    isActive: income.is_active ? 'Activo' : 'Inactivo',
                    isAdjustment: income.is_adjustment ? 'Ajuste' : 'Ingreso',
                    formatId: formatId(income.id)
                }));
                setTotalIncomes(total_incomes)
                setIncomes(mappedInventorys);
                setTotalPages(total_pages);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const formatId = (id) => {
        return id.length > 5 ? id.slice(0, 5) : id;
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
        if (totalPages.current !== null) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                page: totalPages.current,
            }));
            getPaginatedInventory({ ...filters, page: totalPages.current });
        }
    };

    const deleteIncomeFromTable = (index) => {
        const incomeToDelete = incomes[index];
        handleModalChange({
            accept: {
                title: 'Aceptar',
                action: async () => {
                    try {
                        const response = await deleteIncome(incomeToDelete.id);
                        if (response) {
                            handleModalChange({
                                accept: {
                                    title: 'Aceptar',
                                    action: () => {
                                        getPaginatedInventory();
                                    },
                                },
                                title: `Ingreso/Egreso N° "${formatId(incomeToDelete.id)}" dado de baja exitosamente`,
                                message:
                                    'Puede restaurar los ingresos/egresos desde la tabla de inventario.',
                            });
                            handleOpen();
                        }
                    } catch (error) {
                        handleModalChange({
                            accept: {
                                title: 'Aceptar',
                                action: () => { },
                            },
                            title: `Ingreso/Egreso N° "${formatId(incomeToDelete.id)}" no pudo darse de baja`,
                            message:
                                'Lo sentimos, no pudimos concretar la opercion. Intente mas tarde',
                        });
                        handleOpen();
                    }
                },
            },
            title: `Dar de baja Ingreso/Egreso N° "${formatId(incomeToDelete.id)}" `,
            message: '¿Está seguro que desea dar de baja el Ingreso/Egreso?',
            icon: mopsusIcons.warning,
        });
        handleOpen();
    };

    const handleSetIncomeToEdit = async (index) => {
        const incomeDetails = incomes[index];
        if (!incomeDetails.id) {
            setEditIncome(null);
            return;
        }
        try {
            setIsLoadingDetails(true)
            const editIncome = await getInventoryById(incomeDetails.id)
            setEditIncome(editIncome);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingDetails(false)
        }

    };


    return (
        <InventoryContext.Provider value={{
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
            formatId,
            handleSetIncomeToEdit,
            editIncome,
            formatDate,
            totalIncomes,
            isLoadingDetails
        }}>
            {children}
        </InventoryContext.Provider>
    );
};