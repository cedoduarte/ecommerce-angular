import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { IDrawerState } from "../shared/interfaces";

const initialState: IDrawerState = {
    opened: false
}

export const toggleDrawer = createAction("[DRAWER] toggleDrawer", props<IDrawerState>());

export const drawerReducer = createReducer(initialState,
    on(toggleDrawer, (state: IDrawerState, item: IDrawerState): IDrawerState => {
        return item;
    })
);

const selectDrawerFeature = createFeatureSelector<IDrawerState>("drawer");
export const selectDrawer = createSelector(selectDrawerFeature, (state: IDrawerState): IDrawerState => state);