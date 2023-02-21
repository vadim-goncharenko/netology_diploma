interface ErrorProps {
  title?: string;
  message: string;
  refetch?: any;
  isLoading?: boolean;
};

export default function Error({ title, message, refetch, isLoading }: ErrorProps) {
  if (isLoading || !message) return null;
  // <Banner />
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">{title || message}</h2>
        <p>{message}</p>
        { refetch && <button onClick={refetch} className="btn btn-outline-primary">Попробовать еще раз...</button> }
      </section>
    </>
  );
};