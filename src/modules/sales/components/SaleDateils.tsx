import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../styles/sales.module.scss';
import { RowSaleDetails } from './RowSaleDetails';
import { useContext } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 20,
  },
  table: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  tableCell: {
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  totalBox: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
});

function InvoicePDF({ saleDetails, mappedProducts }) {
  const { saleDate, products, discount, total } = saleDetails;
  const subtotal = products.reduce(
    (acc, product) => acc + product.historic_price * product.quantity,
    0
  );

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Factura de Venta</Text>
          <Text style={pdfStyles.subtitle}>Fecha: {saleDate}</Text>
        </View>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.tableCell, pdfStyles.tableHeader]}>
              Producto
            </Text>
            <Text style={[pdfStyles.tableCell, pdfStyles.tableHeader]}>
              Precio
            </Text>
            <Text style={[pdfStyles.tableCell, pdfStyles.tableHeader]}>
              Cantidad
            </Text>
            <Text style={[pdfStyles.tableCell, pdfStyles.tableHeader]}>
              Unidad
            </Text>
            <Text style={[pdfStyles.tableCell, pdfStyles.tableHeader]}>
              Total
            </Text>
          </View>
          {products.map((product, index) => {
            const { productName, measureUnitDescription } =
              mappedProducts.find((item) => item.id === product.product_id) ||
              {};

            return (
              <View key={index} style={pdfStyles.tableRow}>
                <Text style={pdfStyles.tableCell}>{productName}</Text>
                <Text style={pdfStyles.tableCell}>
                  ${product.historic_price.toFixed(2)}
                </Text>
                <Text style={pdfStyles.tableCell}>{product.quantity}</Text>
                <Text style={pdfStyles.tableCell}>
                  {measureUnitDescription}
                </Text>
                <Text style={pdfStyles.tableCell}>
                  ${(product.historic_price * product.quantity).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={pdfStyles.totalBox}>
          <Text style={pdfStyles.totalText}>
            Subtotal: ${subtotal.toFixed(2)}
          </Text>
          <Text style={pdfStyles.totalText}>Descuento: {discount}</Text>
          <Text style={pdfStyles.totalText}>Total: ${total.toFixed(2)}</Text>
        </View>
        <Text style={pdfStyles.footer}>
          © Mopsus 2024. Todos los derechos reservados.
        </Text>
      </Page>
    </Document>
  );
}

export const SaleDetails = ({ saleDetails, handleSetSaleToDetails }) => {
  const { mappedProducts } = useContext(ProductsContext);

  const generatePDF = async () => {
    const blob = await pdf(
      <InvoicePDF saleDetails={saleDetails} mappedProducts={mappedProducts} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const { saleDate, products, discount, total } = saleDetails;
  const subtotal = products.reduce(
    (acc, product) => acc + product.historic_price * product.quantity,
    0
  );

  return (
    <div className={styles.modal}>
      <div className={styles.detailsContainer}>
        <div className={styles.modalContents}>
          <header className={styles.headerDetails}>
            <section>
              <div className={styles.title}>Detalle de ventas</div>
              <div>{saleDate}</div>
            </section>
            <section>
              <Icon
                fontSize={25}
                icon={mopsusIcons.closeModal}
                className={styles.iconClose}
                onClick={() => handleSetSaleToDetails()}
              />
            </section>
          </header>
          <div className={styles.listSales}>
            <table className={styles.tableSaleDetails}>
              <thead className={styles.theadSaleDetails}>
                <tr>
                  <th className={styles.thSaleDetails}>Producto</th>
                  <th className={styles.thSaleDetails}>Precio</th>
                  <th className={styles.thSaleDetails}>Cantidad</th>
                  <th className={styles.thSaleDetails}>Unidad</th>
                  <th className={styles.thSaleDetails}>Total</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <RowSaleDetails key={index} product={product} />
                  ))
                ) : (
                  <tr>
                    <td className={styles.productListEmptyContainer}>
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.boxResults}>
            <div className={styles.results}>
              <p className={styles.infoResults}>Subtotal</p>
              <p className={styles.infoResults}>${subtotal.toFixed(2)}</p>
            </div>
            <div className={`${styles.results} ${styles.resultsGris}`}>
              <p className={styles.infoResults}>Descuento</p>
              <p className={styles.infoResults}>{discount}</p>
            </div>
            <div className={`${styles.results} ${styles.resultsGris}`}>
              <p className={styles.infoResults}>Total</p>
              <p className={styles.infoResults}>${total}</p>
            </div>
          </div>
          <button className={styles.buttonAdd} onClick={generatePDF}>
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
};
