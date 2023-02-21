import { useDispatch } from "react-redux";
import CartTableItem from "./CartTableItem";
import { numberWithSpaces, calcDotProduct } from "../utils/utils";
import { cartActions } from "../app/services/cart/cartSlice";
import { CartItems } from "../types/types";
import { Link } from "react-router-dom";

interface CartTableProps {
  items: CartItems;
};

export default function CartTable({ items }: CartTableProps) {
  const dispatch = useDispatch();

  if (items == null || Object.keys(items).length === 0) {
    return (
      <>
        <br/><br/>
        <h5 className="text-center">Корзина пуста, Вы можете найти подходящие товары в <Link to="/catalog">каталоге</Link></h5>
        <br/><br/>
      </>
    );
  };


  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        { items?.map((item, index) =>
          <CartTableItem
            key={ item.id + item.size }
            item={ item }
            index={ index+1 }
            onDelete={ () => dispatch(cartActions.deleteFromCart({ id: item.id, size: item.size })) }
            />
        )}
        <tr>
          <td colSpan={5} className="text-right">Общая стоимость</td>
          <td>{ numberWithSpaces(calcDotProduct(items, "price", "count")) }&nbsp;руб.</td>
        </tr>
      </tbody>
    </table>
  );
};