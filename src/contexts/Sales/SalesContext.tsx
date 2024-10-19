import { Children, createContext, useState } from "react";
import { getAllSales } from '../../services/sales'

export const SaleContext = createContext(null)

export const SalesProvider = ({ children }) => {
    /*     const [isLoading, setIsLoading] = useState(false)
        const [filters, setFilters] = useState(null);
        const [mappedSales, setMappedSales] = useState([])
    
        const getSales = async (coustomFilters?) => {
            try {
                setIsLoading(true)
                const { sales } = await getAllSales(
                    coustomFilters ? coustomFilters : filters
                )
                if (sales) {
                    const mapped = sales.map((sales) => {
    
                    })
    
                    setMappedSales(mapped)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        } */
    return (
/*         <SaleContext.Provider value={mappedSales, getSales, isLoading, filters, setFilters, setMappedSales}>
            {children}
        </SaleContext.Provider> */
    )
}