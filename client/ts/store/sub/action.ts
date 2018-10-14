import { Product, Sub } from '../../../../api/models/sub'
export enum SubActionTypes {
    SET_FETCHED_PRODUCTS = 'SET_FETCHED_PRODUCTS',
    SET_FETCHED_SUBS = 'SET_FETCHED_SUBS'
}
export const actions = {
    setProducts: (products: Product[]) => ({
        type: SubActionTypes.SET_FETCHED_PRODUCTS as SubActionTypes.SET_FETCHED_PRODUCTS,
        products: products
    }),
    setSubs: (subs: Sub[]) => ({
        type: SubActionTypes.SET_FETCHED_SUBS as SubActionTypes.SET_FETCHED_SUBS,
        subs: subs
    })
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>
