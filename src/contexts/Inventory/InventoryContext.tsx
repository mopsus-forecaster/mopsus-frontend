import { createContext, useContext, useState } from "react";
import { ModalContext } from "../modal/ModalContext";
import { getInventory, getInventoryById } from "../../services/inventory";

export const InventoryContext = createContext(null);

export const INITIAL_FILTERS = {
    date: '',
    isActive: null,
    isAdjustment: null,
    id: null,
    page: 1
}
export const InventoryProvider = ({ children }) => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [totalPages, setTotalPages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleOpen, handleModalChange } = useContext(ModalContext);
    const [inventory, setInventory] = useState([])
    const { inventoryDetails, setInventoryDetails } = useState([])

    const getPaginatedInventory = async (customFilters?) => {
        if (!customFilters) {
            try {
                setIsLoading(true);
                const inventory = await getInventory(customFilters ? customFilters : filters);

                if (inventory) {
                    const mappedInventory = inventory.map((inventory) => ({
                        date: formatDate(inventory.date),
                        description: inventory.description,
                        isActive: inventory.is_active ? 'Activo' : 'Inactivo',
                        isAdjustment: inventory.is_adjustment ? 'Egreso' : 'Ingreso',
                        id: inventory.id,
                    }));
                    setInventory([...mappedInventory]);

                }
            } catch (error) {
                console.log(error);
                console.log('este es el error' + error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSetInventoryToDetails = async (index = null) => {
        if (!index && index !== 0) {
            setInventoryDetails(null);
            return;
        }

        const inventoryDetails = inventory[index];

        try {
            const inventorySelect = await getInventoryById(inventoryDetails.id);

            if (inventorySelect) {
                const mappedInventory = {
                    date: formatDate(inventorySelect.date),
                    description: inventorySelect.description,
                    isActive: inventorySelect.is_active ? 'Activo' : 'Inactivo',
                    isAdjustment: inventorySelect.is_adjustment ? 'Egreso' : 'Ingreso',
                    id: inventorySelect.id,
                };
                setInventoryDetails(mappedInventory);
                console.log(mappedInventory)
            }
        } catch (error) {
            console.error('Error al obtener los detalles de la venta:', error);
        }
    };



    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

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
        getInventory({ ...filters, page: nextPage });
    };

    const goToPreviousPage = () => {
        const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

        setFilters((prevFilters) => ({
            ...prevFilters,
            page: nextPage,
        }));
        getInventory({ ...filters, page: nextPage });
    };

    const goToFirstPage = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            page: 1,
        }));
        getInventory({ ...filters, page: 1 });
    };

    const goToLastPage = () => {
        if (totalPages.current !== null) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                page: totalPages.current,
            }));
            getInventory({ ...filters, page: totalPages.current });
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
            inventory,
            setInventory,
            handleSetInventoryToDetails
        }}>
            {children}
        </InventoryContext.Provider>
    );
};