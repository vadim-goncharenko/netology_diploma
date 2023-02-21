import React from "react";

interface MainContainerProps {
  children: React.ReactNode
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          { children }
        </div>
      </div>
    </main>
  );
};