import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { IProductViewModel, IShoppingCartState } from "../shared/interfaces";

const initialState: IShoppingCartState = {
    productList: [],
    total: 0.0
}

export const appendProduct = createAction("[PRODUCT] appendProduct", props<IProductViewModel>());
export const removeProduct = createAction("[PRODUCT] removeProduct", props<{ id: number }>());

export const shoppingCartReducer = createReducer(initialState,
    on(removeProduct, (state: IShoppingCartState, item: { id: number}): IShoppingCartState => {
        const copyArray = state.productList.filter(iProduct => iProduct.product.id !== item.id);
        let total = 0.0;
        copyArray.forEach(iProduct => {
            total += iProduct.total;
        });
        return {
            productList: copyArray,
            total
        } as IShoppingCartState;
    }),
    on(appendProduct, (state: IShoppingCartState, product: IProductViewModel): IShoppingCartState => {
        let productMatched = false;
        let copyArray = state.productList.map(iProduct => {
            if (iProduct.product.id === product.id) {
                iProduct.count++;
                iProduct.total += product.price;
                productMatched = true;
            }
            return iProduct;
        });
        if (!productMatched) {
            copyArray = [...state.productList, {
                product,
                count: 1,
                total: product.price
            }];
        }
        let total = 0.0;
        copyArray.forEach(iProduct => {
            total += iProduct.total;
        });
        return {
            productList: copyArray,
            total
        } as IShoppingCartState;
    })
);

const selectShoppingCartFeature = createFeatureSelector<IShoppingCartState>("shoppingCart");
export const selectShoppingCart = createSelector(selectShoppingCartFeature, (state: IShoppingCartState): IShoppingCartState => state);