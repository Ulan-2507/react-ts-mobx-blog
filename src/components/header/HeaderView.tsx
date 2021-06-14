import React from "react";
import { NavLink } from "react-router-dom";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";
import { HeaderMenu } from "./header-menu";
import "./header.scss";

export const HeaderView = () => {
  const { articleStore } = useStores();
  const { page, pageSize } = articleStore;
  return (
    <header className="header">
      <NavLink
        className="header__logo"
        to={`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`}
      >
        Realworld Blog
      </NavLink>
      <HeaderMenu />
    </header>
  );
};
