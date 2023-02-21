import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions, selectOrder } from "../app/services/cart/cartSlice";
import { usePostOrderMutation } from "../app/services/shopApi";
import { Order as OrderType } from "../types/types";
import Error from "./Error";
import Loader from "./Loader";

export default function Order() {
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState(false);
  const [ postOrder, { isLoading, isError, isSuccess } ] = usePostOrderMutation();
  const order: OrderType = useSelector(selectOrder);
  const { phone, address } = order.owner;
  const navigate = useNavigate();

  const cardStyle = {
    maxWidth: "30rem",
    margin: "0 auto"
  };

  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    dispatch(cartActions.setOwnerData({ ...order.owner, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('postOrder');
      await postOrder(order).unwrap();
      dispatch(cartActions.orderPosted());
    } catch {
      console.log('postOrder error');
    };
  };

  if (isSuccess) {
    return (
      <section className="order">
        <h2 className="text-center">Заказ успешно размещен</h2>
        <div className="card" style={ cardStyle } >
          <button onClick={ () => navigate("/") } className="btn btn-outline-primary btn-center">Продолжить покупки</button>
        </div>
      </section>
  )};

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={ cardStyle } >
        <form className="card-body" onSubmit={ handleSubmitOrder }>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Ваш телефон"
              value={phone}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              name="address"
              placeholder="Адрес доставки"
              value={address}
              onChange={ handleOrderFormChange }
              />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              name="agreement"
              checked={agreement}
              onChange={ () => setAgreement(prevAgreement => !prevAgreement) }
              />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <Loader isLoading={isLoading} />
          { !isLoading && !isSuccess &&
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={ phone === '' || address === '' || !agreement } >
              Оформить
          </button>
          }
          { isError &&
            <Error message="Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз позже" />
          }
        </form>
      </div>
    </section>
  );
};