interface LoaderProps {
  isLoading: boolean
};

export default function Loader({ isLoading = true }: LoaderProps) {
  if (!isLoading) return null;
  //console.log('Loader');
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};