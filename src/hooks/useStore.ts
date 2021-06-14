import { useContext } from "react";
import { RootStore } from "../store/RootStore";
import { StoreContext } from "../store/storeContext";

export const useStores = (): RootStore => useContext(StoreContext);
