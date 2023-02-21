// Represents a detailed product (aka 'catalog item') description (for product page)

import { useGetProductQuery } from "../app/services/shopApi";
import Error from "./Error";
import Loader from "./Loader";
import ProductSizeList from "./ProductSizeList";

interface ProductProps {
  productID: number
};

export default function Product({productID}: ProductProps) {
  const { data, isFetching, error, refetch } = useGetProductQuery(productID);
  if (error) {
    return <Error message="Ошибка получения продукта" refetch={refetch} isLoading={isFetching} />
  };
  if (isFetching) {
    return <Loader isLoading={isFetching} />
  };
  if (!data) return null;
  const { title, images, sku, manufacturer, color, material, season, reason } = data;

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            src={images[0]}
            className="img-fluid"
            alt={title}
            />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{reason}</td>
              </tr>
            </tbody>
          </table>
          <ProductSizeList product={data} />
        </div>
      </div>
    </section>
  );
};
