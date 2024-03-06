import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../shared/interfaces";
import { shoppingCartReducer } from "./shopping-cart.store";
import { userReducer } from "./user.store";
import { drawerReducer } from "./drawer.store";

export const reducers: ActionReducerMap<IAppState> = {
  shoppingCart: shoppingCartReducer,
  user: userReducer,
  drawer: drawerReducer
};
