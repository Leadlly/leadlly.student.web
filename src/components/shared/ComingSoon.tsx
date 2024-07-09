import React from "react";
import Header from "./Header";

const ComingSoon = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-transparent bg-gradient-to-br from-white to-primary bg-clip-text font-bold text-page-title">
        {pageTitle}
      </h1>
      <Header
        title="Coming Soon"
        className="w-full justify-center"
        titleClassName="text-transparent bg-gradient-to-br from-white to-primary bg-clip-text font-bold"
      />
    </section>
  );
};

export default ComingSoon;
