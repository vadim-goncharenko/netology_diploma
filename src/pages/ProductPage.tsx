import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import NoProduct from './NoProductPage';
//import productFactory from '../features/product/productFactory';

export default function ProductPage() {
    const params = useParams();
    if (!(params.id) || isNaN(Number(params.id))) return <NoProduct />;
    const productID = Number(params.id);

    return(
      <Product productID={productID} />
    );

};