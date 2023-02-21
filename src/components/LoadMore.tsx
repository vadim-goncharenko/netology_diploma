import React from "react";

interface LoadMoreProps {
  onClick: React.MouseEventHandler
};

export default function LoadMore({ onClick }: LoadMoreProps) {
  if (!onClick) return null;
  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={onClick} >Загрузить ещё</button>
    </div>
  );
};