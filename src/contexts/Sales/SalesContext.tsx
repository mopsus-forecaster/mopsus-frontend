import { createContext, useState } from "react";

export const SaleContext = createContext(null);

export const SalesProvider = ({ children }) => {
    const [addProduct, setAddProduct] = useState([]);
    const [subTotal, setSubTotal] = useState(0)

    const addProductToSale = product => {
        const productInSale = addProduct.findIndex(item => item.id === product.id);

        if (productInSale >= 0) {
            const newCart = structuredClone(addProduct);
            newCart[productInSale].quantity = 1;
            setAddProduct(newCart);
            console.log(addProduct)
        } else {
            setAddProduct(prevState => [
                ...prevState,
                {
                    ...product,
                    quantity: 1,
                },
            ]);
        }



    };

    const increaseProductQuantity = id => {
        setAddProduct(prevState =>
            prevState.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseProductQuantity = id => {
        setAddProduct(prevState =>
            prevState.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const removeProductFromSale = id => {
        setAddProduct(prevState => prevState.filter(item => item.id !== id));
    };

    return (
        <SaleContext.Provider
            value={{
                addProduct,
                setAddProduct,
                addProductToSale,
                increaseProductQuantity,
                decreaseProductQuantity,
                removeProductFromSale,
            }}
        >
            {children}
        </SaleContext.Provider>
    );
};
