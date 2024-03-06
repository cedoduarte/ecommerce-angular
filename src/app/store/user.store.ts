import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { IUserState } from "../shared/interfaces";

const initialState: IUserState = {
    user: null,
    loggedin: false
}

export const setUser = createAction("[USER] setUser", props<IUserState>());

export const userReducer = createReducer(initialState,
    on(setUser, (state: IUserState, item: IUserState): IUserState => {
        localStorage.setItem("loggedin", JSON.stringify(item.loggedin));
        localStorage.setItem("user", JSON.stringify(item.user));
        return item;
    })
);

const selectUserFeature = createFeatureSelector<IUserState>("user");
export const selectUser = createSelector(selectUserFeature, (state: IUserState): IUserState => state);