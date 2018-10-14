import { Product, Sub, CompleteProduct, ProductPrice } from '../models/sub'
import { fetchAllProductsDb, fetchSubsByStoreDb, fetchSizedProductsDb, fetchProductByCodeDb, fetchRrpByFullCodeDb, fetchReducedProductDb, fetchPriceRrpByCodeDb } from '../db/sub'

export async function fetchAllProducts(): Promise<Product[]> {
    return fetchAllProductsDb(null);
}

export async function fetchSubsByStore(storeId: number): Promise<Sub[]> {
    return fetchSubsByStoreDb(null, storeId)
}

export async function fetchSizedProducts(storeId: number): Promise<CompleteProduct[]> {
    return fetchSizedProductsDb(null, storeId)
}

export async function fetchProductByCode(categoryCode: string, productCode: string, storeId: number): Promise<CompleteProduct[]> {
    return fetchProductByCodeDb(null, categoryCode, productCode, storeId)
}

export async function fetchRrpByFullCode(code: string): Promise<CompleteProduct[]> {
    return fetchRrpByFullCodeDb(null, code)
}

export async function fetchReducedProduct(categoryCode: string, productCode: string, storeId: number): Promise<CompleteProduct[]> {
    return fetchReducedProductDb(null, categoryCode, productCode, storeId)
}

export async function fetchPriceRrpByCode(code: string, storeId: number): Promise<ProductPrice[]> {
    return fetchPriceRrpByCodeDb(null, code, storeId)
}
