import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Header from "./components/header";
import Spinner from "./components/spinner";
import { useStores } from "./hooks/useStore";
import { RouterConfig } from "./navigation/RouterConfig";
import { getToken } from "./services/apiServices";
import "./CONSTANTS/_style-colors.scss";

const App: React.FC = observer(() => {
  const { userStore } = useStores();
  const { getCurrentUser } = userStore;
  useEffect(() => {
    const token = getToken();
    if (token) {
      getCurrentUser();
    }
  }, [getCurrentUser]);
  return (
    <>
      <Header />
      <main className="main">
        <RouterConfig />
      </main>
      <Spinner />
    </>
  );
});

export default App;
