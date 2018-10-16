import { Product, Sub, CompleteProduct, ProductPrice } from '../models/sub'
import { fetchAllProductsDb, fetchSubsByStoreDb, fetchSizedProductsDb, fetchProductByCodeDb, fetchRrpByFullCodeDb, fetchReducedProductDb, fetchPriceRrpByCodeDb, fetchSpecificProductDb, fetchRegionById, fetchCategoryById, fetchSizeById, fetchProductById } from '../db/sub'

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

export async function fetchCodesByIds(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<string> {
    let region = await fetchRegionById(null, regionId)
    let category = await fetchCategoryById(null, categoryId)
    let size = await fetchSizeById(null, sizeId)
    let product = await fetchProductById(null, productId)
    let val = region[0].code + '-' + category[0].code + '-' + size[0].code + '-' + product[0].code
    return val
}

export async function fetchSpecificProduct(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<Sub[]|null> {
    let product = await fetchSpecificProductDb(null, regionId, categoryId, sizeId, productId)
    return product
}

// export async function addFullProductCode(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<boolean> {

// }
