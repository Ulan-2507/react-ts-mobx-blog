import React from "react";
import { Link } from "react-router-dom";
import RouteURLS from "./CONSTANTS";

export const NotFound = () => {
  const style = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'url("./not-found.png")',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const linkStyle = {
    padding: "8px 12px",
    fontSize: "18px",
    lineHeight: "28px",
    backgroundColor: "white",
    cursor: "pointer",
    border: "1px solid $background-color-base",
    borderRadius: "5px",
  };
  return (
    <div style={style}>
      <Link style={linkStyle} to={RouteURLS.HOME} />
    </div>
  );
};
