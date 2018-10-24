import * as _ from 'lodash'
import { Product, Sub, CompleteProduct, ProductPrice, Device, PostFetch } from '../models/sub'
import { fetchAllProductsDb, fetchSubsByStoreDb, fetchSizedProductsDb, fetchProductByCodeDb, fetchRrpByFullCodeDb, fetchReducedProductDb, fetchPriceRrpByCodeDb, fetchSpecificProductDb, fetchRegionById, fetchCategoryById, fetchSizeById, fetchProductById, updateRrpCode, fetchRrpByIdDb, fetchStoreIdByNameDb } from '../db/sub'

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

export async function fetchStoreIdByName(storeName: string): Promise<Device> {
    return fetchStoreIdByNameDb(null, storeName)
}

export async function fetchPriceRrpByCode(code: string, storeId: number): Promise<ProductPrice> {
    let product: ProductPrice = await fetchPriceRrpByCodeDb(null, code, storeId)
    product = {...product, rrp: Number(product.rrp).toFixed(2)}
    if (product.price) {
        product = {...product, price: Number(product.price).toFixed(2)}
    } else {
        product = {...product, price: Number(product.rrp).toFixed(2)}
    }
    return product
}

export async function fetchPriceRrpByCodeStoreName(code: string, storeName: string): Promise<ProductPrice> {
    let store: Device = await fetchStoreIdByName(storeName)
    let product = await fetchPriceRrpByCode(code, store.store_id)
    return product
}

export async function fetchProductPrices(body: PostFetch): Promise<ProductPrice[]> {
    let store: Device = await fetchStoreIdByName(body.name)
    let prices = []
    for (let i = 0; i < body.codes.length; i++) {
        let product = await fetchPriceRrpByCode(body.codes[i], store.store_id)
        prices.push(product)
    }
    return prices
}

export async function fetchCodesByIds(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<string|null> {
    let region = await fetchRegionById(null, regionId)
    let category = await fetchCategoryById(null, categoryId)
    let size = await fetchSizeById(null, sizeId)
    let product = await fetchProductById(null, productId)
    let val: string|null = ''
    if (!_.isNil(region) && region.length > 0) {
        val += region[0].code + '-'
    }
    if (!_.isNil(category) && category.length > 0) {
        val += category[0].code + '-'
    }
    if (!_.isNil(size) && size.length > 0) {
        val += size[0].code + '-'
    }
    if (!_.isNil(product) && product.length > 0) {
        val += product[0].code
    }
    if (val.length < 1) {
        val = null
    }
    // if (!_.isNil(region) && region.length > 0 && !_.isNil(category) && category.length > 0 && !_.isNil(size) && size.length > 0 && !_.isNil(product) && product.length > 0) {
    //     let val = region[0].code + '-' + category[0].code + '-' + size[0].code + '-' + product[0].code
    //     return val
    // }
    return val
}

export async function fetchSpecificProduct(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<Sub[]|null> {
    let product = await fetchSpecificProductDb(null, regionId, categoryId, sizeId, productId)
    let code = await fetchCodesByIds(regionId, categoryId, sizeId, productId)

    return product
}

export async function addFullProductCode(regionId: number, categoryId: number, sizeId: number, productId: number): Promise<boolean> {
    let product = await fetchSpecificProductDb(null, regionId, categoryId, sizeId, productId)
    let code = await fetchCodesByIds(regionId, categoryId, sizeId, productId)
    if (!_.isNull(product) && product.length > 0) {
        if (!_.isNull(code)) {
            let res = updateRrpCode(null, product[0].id, code)
        }
        // return res
    }
    return true
//     } else {
//         return undefined
//     }
}

export async function updateProductsCode(start: number): Promise<boolean> {
    for (let i = start; i < (start + 100); i++) {
        let rrpRow: Sub = await fetchRrpByIdDb(null, i)
        if (!_.isNull(rrpRow)) {
            if (_.isNull(rrpRow.code)) {
                let code = await fetchCodesByIds(rrpRow.region_id, rrpRow.category_id, rrpRow.size_id, rrpRow.product_id)
                if (!_.isNull(code)) {
                    let res = updateRrpCode(null, rrpRow.id, code)
                }
            }
        }
    }
    return true
}

export async function fetchRrpById(id: number): Promise<Sub|null> {
    let product = await fetchRrpByIdDb(null, id)
    return product
}

export async function updateSingleProductCode(regionCode: string, categoryCode: string, sizeCode: string, productCode: string): Promise<boolean> {
    // let rrp = await fetchRrpByCodes(regionCode, categoryCode, sizeCode, productCode)
    // await addFullProductCode(regionCode, categoryCode, sizeCode, productCode)
    return true
}

export async function updateAllProductsCode(inc: string): Promise<boolean> {
    let regionId = 1
    let categoryId = 1
    let sizeId = 1
    let productId = 1
    let done = false
    for (let i = 0; i < 2000; i++) {
        await addFullProductCode(regionId, categoryId, sizeId, productId)
        // if (productId < sizeId) {
        //     productId++
        // } else if (sizeId < categoryId) {
        //     sizeId++
        // } else if (categoryId < regionId) {
        //     categoryId++
        // } else {
        //     regionId++
        // }
        // if (inc === 'product') {
        //     productId++
        // } else if (inc === 'size') {
        //     sizeId++
        // } else if (inc === 'category') {
        //     categoryId++
        // } else {
        //     regionId++
        // }
        regionId = _.random(1, 3)
        categoryId = _.random(1, 35)
        sizeId = _.random(1, 2)
        productId = _.random(1, 150)
        if (i === 500) {
            regionId = 1
            categoryId = 14
            sizeId = 4
            productId = 22
        }
        // console.log(regionId + '-' + categoryId + '-' + sizeId + '-' + productId)
    }

    return true
}
