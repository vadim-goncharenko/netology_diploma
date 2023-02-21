import React from "react";
import CartTable from "./CartTable";
import useGetCart from "../hooks/useGetCart";

interface CartProps {
  children: React.ReactNode
};

export default function Cart({ children }: CartProps) {
  const items = useGetCart();

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
        <CartTable items={items} />
        { children }
    </section>
  );
};