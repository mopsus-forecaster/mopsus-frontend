import { createContext, useContext, useState } from 'react';
import { _descriptors } from 'chart.js/helpers';
import { deleteBrand, deleteCategory, getBrands, getCategories, onEditCat, reactivateBrand, reactivateCat } from '../../services/settings';
import { mopsusIcons } from '../../icons';
import { ModalContext } from '../modal/ModalContext';
import { LoadingContext } from '../loading/LoadingContext';
export const SettingsContext = createContext(null);

export const INITIAL_FILTERS = {
  id: null,
  name: '',
  description: '',
  is_active: true,
  page: 1,
}
export const SettingsProvider = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [mappedCategory, setMappedCategory] = useState([])
  const [mappedBrand, setMappedBrand] = useState([])
  const [filtersCat, setFiltersCat] = useState(INITIAL_FILTERS);
  const [filtersBrand, setFiltersBrand] = useState(INITIAL_FILTERS);
  const [isLoadingCat, setIsLoadingCat] = useState(false);
  const [isLoadingBrand, setIsLoadingBrand] = useState(true);
  const [totalPagesCategory, setTotalPagesCategory] = useState(null);
  const [totalPagesBrand, setTotalPagesBrand] = useState(null);
  const [totalCountCat, setTotalCountCat] = useState(null);
  const [totalCountBrand, setTotalCountBrand] = useState(null);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const [editOptionCat, setEditOptionCat] = useState(null)
  const [editOptionBrand, setEditOptionBrand] = useState(null)
  const { setShowLoading } = useContext(LoadingContext);
  const [mappedUnits, setMappedUnits] = useState([])


  const getCategory = async (customFilters?) => {
    try {
      setIsLoadingCat(true);
      const { categories, total_pages, total_count } = await getCategories(
        customFilters ? customFilters : filtersCat
      );
      if (categories) {
        const mapped = categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          is_active: category.is_active ? 'Activo' : 'Inactivo',
        }));
        if (total_count) {
          setTotalCountCat(total_count);
        }
        setTotalPagesCategory(total_pages)
        setMappedCategory(mapped);
      }

    } catch ({ errors }) {
      console.error('error' + errors)
    } finally {
      setIsLoadingCat(false);
    }
  };

  const getBrand = async (customFilters?) => {
    try {
      setIsLoadingBrand(true);
      const { marcas, total_pages, total_count } = await getBrands(customFilters ? customFilters : filtersBrand);

      if (marcas) {
        const mapped = marcas.map((marca) => ({
          id: marca.id,
          name: marca.name,
          description: marca.description,
          is_active: marca.is_active ? 'Activo' : 'Inactivo',
        }));
        if (total_count) {
          setTotalCountBrand(total_count);
        }
        setTotalPagesBrand(total_pages)
        setMappedBrand(mapped);
      }

    } catch ({ errors }) {
      console.error('error' + errors)
    } finally {
      setIsLoadingBrand(false);
    }
  }

  const goToNextPage = (totalPages, filters, setFilters, get) => {
    const nextPage =
      filters.page + 1 !== totalPages.current + 1
        ? filters.page + 1
        : totalPages.current;
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    get({ ...filters, page: nextPage });
  };

  const goToPreviousPage = (filters, setFilters, get) => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    get({ ...filters, page: nextPage });
  };

  const goToFirstPage = (filters, setFilters, get) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    get({ ...filters, page: 1 });
  };

  const goToLastPage = (totalPages, filters, setFilters, get) => {
    if (totalPages.current !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages.current,
      }));
      get({ ...filters, page: totalPages.current });
    }
  };

  const handleSetOptionToEditBrand = (setting = null) => {
    if (!setting) {
      setEditOptionBrand(null);
      return;
    }
    setEditOptionBrand(setting);
  };

  const handleSetOptionToEditCat = (setting = null) => {
    if (!setting) {
      setEditOptionCat(null);
      return;
    }
    setEditOptionCat(setting);
  };

  const deleteCatFromTable = (optionToDelete) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await deleteCategory(optionToDelete.id);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getCategory();
                  },
                },
                title: `"${optionToDelete.name}" dado de baja exitosamente`,
                message:
                  'Puede restaurar la categoría desde la tabla de categorías.',
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
              title: `"${optionToDelete.name}" no pudo darse de baja`,
              message:
                'Lo sentimos, no pudimos concretar la operción. Intente mas tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de baja "${optionToDelete.name}"`,
      message: '¿Está seguro que desea dar de baja la categoría?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  const deleteBrandFromTable = (optionToDelete) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await deleteBrand(optionToDelete.id);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getBrand();
                  },
                },
                title: `"${optionToDelete.name}" dado de baja exitosamente`,
                message:
                  'Puede restaurar la marca desde la tabla de marcas.',
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
              title: `"${optionToDelete.name}" no pudo darse de baja`,
              message:
                'Lo sentimos, no pudimos concretar la opercion. Intente mas tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de baja "${optionToDelete.name}"`,
      message: '¿Está seguro que desea dar de baja la marca?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };


  const reactivateSettingFromTableCat = (settingToReactivate) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await reactivateCat(settingToReactivate.id);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getCategory();
                  },
                },
                title: `"${settingToReactivate.name}" dado de alta exitosamente`,
                message:
                  'Puede consultar la categoría desde la tabla de categoría.',
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
              title: `"${settingToReactivate.name}" no pudo darse de alta`,
              message:
                'Lo sentimos, no pudimos concretar la operción. Intente más tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de alta "${settingToReactivate.name}"`,
      message: '¿Está seguro que desea dar de alta la categoría?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };


  const reactivateSettingFromTableBrand = (settingToReactivate) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await reactivateBrand(settingToReactivate.id);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getBrand();
                  },
                },
                title: `"${settingToReactivate.name}" dado de alta exitosamente`,
                message:
                  'Puede consultar la marca desde la tabla de marcas.',
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
              title: `"${settingToReactivate.name}" no pudo darse de alta`,
              message:
                'Lo sentimos, no pudimos concretar la operción. Intente más tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de alta "${settingToReactivate.name}"`,
      message: '¿Está seguro que desea dar de alta la marca?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  return (
    <SettingsContext.Provider
      value={{
        mappedCategory,
        getCategory,
        isLoadingCat,
        isLoadingBrand,
        filtersBrand,
        setFiltersBrand,
        filtersCat,
        setFiltersCat,
        goToNextPage,
        goToFirstPage,
        goToLastPage,
        goToPreviousPage,
        mappedBrand,
        setMappedBrand,
        firstLoad,
        setFirstLoad,
        getBrand,
        totalCountCat,
        totalCountBrand,
        totalPagesCategory,
        totalPagesBrand,
        deleteCatFromTable,
        deleteBrandFromTable,
        handleSetOptionToEditBrand,
        editOptionCat,
        editOptionBrand,
        setEditOptionCat,
        setEditOptionBrand,
        reactivateSettingFromTableCat,
        reactivateSettingFromTableBrand,
        handleSetOptionToEditCat,
        mappedUnits,
        setMappedUnits,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
