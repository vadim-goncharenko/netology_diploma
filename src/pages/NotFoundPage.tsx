import Error from "../components/Error";
import Header from "../components/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Error title="Страница не найдена" message="Извините, такая страница не найдена!" />
    </>
  );
};
