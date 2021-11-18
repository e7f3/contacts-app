import React from "react";
import Loader from "react-loader-spinner";

function Spinner(props) {
  return (
    <div className="loader">
      <Loader type="ThreeDots" color="#5f78ff" height={100} width={100} />;
    </div>
  );
}

export default Spinner;
