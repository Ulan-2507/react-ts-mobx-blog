import { observer } from "mobx-react-lite";
import React from "react";
import { HeaderView } from "./HeaderView";

export const HeaderContainer: React.FC = observer(() => {
  return <HeaderView />;
});
