import { createContext, useRef, useState } from 'react';
import { _descriptors } from 'chart.js/helpers';
import { getBrands, getCategories } from '../../services/settings';
export const SettingsContext = createContext(null);

export const INITIAL_FILTERS = {
  id: null,
  name: '',
  is_active: null,
  page: 1,
}
export const SettingsProvider = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [mappedCategory, setMappedCategory] = useState([])
  const [mappedBrand, setMappedBrand] = useState([])
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = useRef(null);
  //const { handleOpen, handleModalChange } = useContext(ModalContext);


  const getCategory = async (customFilters?) => {
    try {
      setIsLoading(true);
      const { categories, total_pages, total_count } = await getCategories(customFilters);


      if (categories) {
        const mapped = categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          is_active: category.is_active ? 'Activo' : 'Inactivo',
        }));
        if (totalPages.current === null || totalPages.current !== total_pages) {
          totalPages.current = total_pages;
        }
        setMappedCategory(mapped);
      }

    } catch ({ errors }) {
      console.error('error' + errors)
    } finally {
      setIsLoading(false);
    }
  };

  const getBrand = async (customFilters?) => {
    try {
      setIsLoading(true);
      const { marcas, total_pages, total_count } = await getBrands(customFilters);
      console.log(marcas)

      if (marcas) {
        const mapped = marcas.map((marca) => ({
          id: marca.id,
          name: marca.name,
          description: marca.description,
          is_active: marca.is_active ? 'Activo' : 'Inactivo',
        }));
        if (totalPages.current === null || totalPages.current !== total_pages) {
          totalPages.current = total_pages;
        }
        setMappedBrand(mapped);
      }

    } catch ({ errors }) {
      console.error('error' + errors)
    } finally {
      setIsLoading(false);
    }
  }

  const goToNextPage = () => {
    const nextPage =
      filters.page + 1 !== totalPages.current + 1
        ? filters.page + 1
        : totalPages.current;
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getCategory({ ...filters, page: nextPage });
  };

  const goToPreviousPage = () => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getCategory({ ...filters, page: nextPage });
  };

  const goToFirstPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    getCategory({ ...filters, page: 1 });
  };

  const goToLastPage = () => {
    if (totalPages.current !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages.current,
      }));
      getCategory({ ...filters, page: totalPages.current });
    }
  };

  /*   const handleSetProductToEdit = (index = null) => {
      if (!index && index != 0) {
        setEditProduct(null);
        return;
      }
      setEditProduct(mappedProducts[index]);
    }; */

  /*  const deleteProductFromTable = (index) => {
     const productToDelete = mappedProducts[index];
     handleModalChange({
       accept: {
         title: 'Aceptar',
         action: async () => {
           try {
             const response = await deleteProduct(productToDelete.id);
             if (response) {
               handleModalChange({
                 accept: {
                   title: 'Aceptar',
                   action: () => {
                     getProducts();
                   },
                 },
                 title: `"${productToDelete.productName}" dado de baja exitosamente`,
                 message:
                   'Puede restaurar el producto desde la tabla de productos.',
               });
               handleOpen();
             }
           } catch (error) {
             handleModalChange({
               accept: {
                 title: 'Aceptar',
                 action: () => { },
               },
               title: `"${productToDelete.productName}" no pudo darse de baja`,
               message:
                 'Lo sentimos, no pudimos concretar la opercion. Intente mas tarde',
             });
             handleOpen();
           }
         },
       },
       title: `Dar de baja "${productToDelete.productName}"`,
       message: '¿Está seguro que desea dar de baja el producto?',
       icon: mopsusIcons.warning,
     });
     handleOpen();
   }; */

  return (
    <SettingsContext.Provider
      value={{
        mappedCategory,
        getCategory,
        totalPages,
        isLoading,
        filters,
        setFilters,
        goToNextPage,
        goToFirstPage,
        goToLastPage,
        goToPreviousPage,
        mappedBrand,
        setMappedBrand,
        firstLoad,
        setFirstLoad,
        getBrand
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
