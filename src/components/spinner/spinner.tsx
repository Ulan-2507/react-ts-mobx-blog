import React from "react";
import { useStores } from "../../hooks/useStore";
import "./spinner.scss";

const Spinner: React.FC = () => {
  const { articleStore } = useStores();
  const { isLoading } = articleStore;
  if (isLoading) {
    return (
      <div className="loader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
