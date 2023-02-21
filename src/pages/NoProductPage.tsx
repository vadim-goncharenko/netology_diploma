import Error from "../components/Error";
import Header from "../components/Header";

export default function NoProduct() {
  return (
    <>
      <Header />
      <Error title="Продукт не найден" message="Извините, нет такого продукта!" />
    </>
  );
};