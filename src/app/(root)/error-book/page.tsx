
  import React from "react";
import ErrorBookContainer from "./components/ErrorBookContainer";

  const ErrorBook = () => {
    return (
      <div className="max-h-screen">
        <h1 className="text-5xl font-semibold py-4">Error Book</h1>

        <ErrorBookContainer />
      </div>
    );  
  };

  export default ErrorBook;
