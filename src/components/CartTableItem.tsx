import React from "react"
import { Link } from "react-router-dom";
import { numberWithSpaces } from "../utils/utils";
import { CartItem as CartItemType } from "../types/types";

interface CartTableItemProps {
  item: CartItemType,
  index: number,
  onDelete: React.MouseEventHandler<HTMLButtonElement>
};

export default function CartTableItem({ item, index, onDelete }: CartTableItemProps) {
  return (
    <tr>
      <td>{index}</td>
      <td><Link to={`/products/${item.id}`}>{item.title}</Link></td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{numberWithSpaces(item.price)}&nbsp;руб.</td>
      <td>{numberWithSpaces(item.count * item.price)}&nbsp;руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={ onDelete } >Удалить</button>
      </td>
    </tr>
  );
};