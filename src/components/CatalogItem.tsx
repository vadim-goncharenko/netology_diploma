// Represents an element in catalog list

import { Link } from "react-router-dom";
import { CatalogItem as CatalogItemType } from "../types/types";

interface CatalogItemProps {
  item: CatalogItemType;
};

export default function CatalogItem({ item }: CatalogItemProps) {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img
          src={item.images[0]}
          className="card-img-top img-fluid img-fix"
          alt={item.title}
          />
        <div className="card-body">
          <p className="card-text title-fix">{item.title}</p>
          <p className="card-text price-fix">{item.price} руб.</p>
          <Link to={`/products/${item.id}`} className="btn btn-outline-primary btn-fix">Заказать</Link>
        </div>
      </div>
    </div>
  );
};