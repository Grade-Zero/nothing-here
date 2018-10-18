import { OptionalConnection, queryHandler, query, extractSingle } from './connection'
import { Product, Sub, CompleteProduct, ProductPrice, Region, Category, Size } from '../models/sub'
import { PoolConnection } from 'mysql'


export function fetchAllProductsDb (optionalConnection: OptionalConnection, limit?: number): Promise<Product[]> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      const products = await query<Product[]>(client, {
          sql: `SELECT * FROM products`
      })
      return products
    })
}

export function fetchSubsByStoreDb (optionalConnection: OptionalConnection, storeId: number): Promise<Sub[]> {
    return queryHandler(optionalConnection, async function (client: PoolConnection) {
      const subs = await query<Sub[]>(client, {
          sql: `SELECT * FROM price WHERE store_id = ?`,
          values: [storeId]
      })
      return subs
    })
}

export function fetchSizedProductsDb (optionalConnection: OptionalConnection, storeId: number): Promise<CompleteProduct[]> {
    return queryHandler(optionalConnection, async function(client: PoolConnection) {
      const products = await query<Sub[]>(client, {
        sql: `SELECT pri.id, pri.rrp as rrp_fallback, pri.custom_price, pri.out_of_stock, pri.available, r.is_promo, pri.active, r.expiry, pri.is_promo as is_promo_fallback, pri.expiry as expiry_fallback, pro.id as prod_id, pro.name as prod_name, pro.code as prod_code, pro.sub_sizing, pc.id as cat_id, pc.name as cat_name, pc.code as cat_code, cr.parent_id, pc2.name as parent_name, si.id as size_id, si.name as size_name, si.code as size_code, re.id as region_id, re.name as region_name, re.code as region_code, st.name as store_name, st.franchise, r.rrp, r.required FROM price as pri RIGHT JOIN products AS pro ON pro.id = pri.product_id RIGHT JOIN product_categories AS pc ON pc.id = pri.category_id LEFT JOIN product_sizes AS si ON si.id = pri.size_id RIGHT JOIN regions AS re ON re.id = pri.region_id RIGHT JOIN stores AS st ON st.id = pri.store_id LEFT JOIN category_rel AS cr ON cr.child_id = pc.id LEFT JOIN product_categories AS pc2 ON pc2.id = cr.parent_id LEFT JOIN rrp AS r ON r.product_id = pro.id AND r.region_id = pri.region_id AND r.category_id = pri.category_id AND r.size_id = pri.size_id WHERE st.id = ? AND pro.sub_sizing = 1 AND pc.restricted = 0 ORDER BY pro.code ASC, rrp_fallback`,
        values: [storeId]
      })
      return products
    })
}

export function fetchProductByCodeDb (optionalConnection: OptionalConnection, categoryCode: string, productCode: string, storeId: number): Promise<CompleteProduct[]> {
    return queryHandler(optionalConnection, async function(client: PoolConnection) {
      const products = await query<Sub[]>(client, {
        sql: `SELECT pri.id,
        rrp.rrp,
        rrp.code,
        pri.custom_price,
        pri.out_of_stock,
        pri.is_promo,
        pri.active,
        pri.expiry,
        pro.name as prod_name,
        pro.code as prod_code,
        pc.name as cat_name,
        pc.code as cat_code,
        si.name as size_name,
        si.code as size_code,
        re.name as region_name,
        re.code as region_code,
        st.id as store_id,
        st.name as store_name,
        st.franchise
        FROM price as pri
        RIGHT JOIN products AS pro ON pro.id = pri.product_id
        RIGHT JOIN rrp AS rrp ON pri.product_id = rrp.product_id AND pri.size_id = rrp.size_id AND pri.category_id = rrp.category_id AND pri.region_id = rrp.region_id
        RIGHT JOIN product_categories AS pc ON pc.id = pri.category_id
        LEFT JOIN product_sizes AS si ON si.id = pri.size_id
        RIGHT JOIN regions AS re ON re.id = pri.region_id
        RIGHT JOIN stores AS st ON st.id = pri.store_id
        WHERE pc.code = ? AND pro.code = ? AND st.id = ?`,
        values: [categoryCode, productCode, storeId]
      })
      return products
    })
}

export function fetchRrpByFullCodeDb (optionalConnection: OptionalConnection, code: string): Promise<CompleteProduct[]> {
    return queryHandler(optionalConnection, async function(client: PoolConnection) {
      const products = await query<Sub[]>(client, {
        sql: `SELECT * FROM rrp WHERE code = ?`,
        values: [code]
      })
      return products
    })
}

export function fetchRrpByIdDb (optionalConnection: OptionalConnection, id: number): Promise<Sub> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const product = await query<Sub[]>(client, {
      sql: `SELECT * FROM rrp WHERE id = ?`,
      values: [id]
    })
    return extractSingle<Sub>(product)
  })
}

export function fetchReducedProductDb (optionalConnection: OptionalConnection, categoryCode: string, productCode: string, storeId: number): Promise<CompleteProduct[]> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const products = await query<Sub[]>(client, {
      sql: `SELECT rrp.rrp, pri.custom_price, pro.code as prod_code, pc.code as cat_code, st.id as store_id FROM price as pri
      RIGHT JOIN products AS pro ON pro.id = pri.product_id
      RIGHT JOIN product_categories AS pc ON pc.id = pri.category_id
      LEFT JOIN product_sizes AS si ON si.id = pri.size_id
      RIGHT JOIN regions AS re ON re.id = pri.region_id
      RIGHT JOIN rrp AS rrp ON pri.product_id = rrp.product_id AND pri.size_id = rrp.size_id AND pri.category_id = rrp.category_id AND pri.region_id = rrp.region_id
      RIGHT JOIN stores AS st ON st.id = pri.store_id
      WHERE pc.code = ? AND pro.code = ? AND st.id = ?`,
      values: [categoryCode, productCode, storeId]
    })
    return products
  })
}

export function fetchPriceRrpByCodeDb (optionalConnection: OptionalConnection, code: string, storeId: number): Promise<ProductPrice> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const products = await query<ProductPrice[]>(client, {
      sql: `SELECT r.rrp, p.custom_price AS price FROM rrp as r
      RIGHT JOIN price as p ON p.rrp_id = r.id
      WHERE r.code = ?
      AND p.store_id = ?`,
      values: [code, storeId]
    })
    return extractSingle<ProductPrice>(products)
  })
}

export function fetchSpecificProductDb(optionalConnection: OptionalConnection, regionId: number, categoryId: number, sizeId: number, productId: number): Promise<Sub[]|null> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const products = await query<Sub[]>(client, {
      sql: `SELECT * FROM rrp
      WHERE region_id = ? AND category_id = ? AND size_id = ? AND product_id = ?`,
      values: [regionId, categoryId, sizeId, productId]
    })
    return products
  })
}

export function fetchRegionById(optionalConnection: OptionalConnection, regionId: number): Promise<Region[]> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const region = await query<Region>(client, {
      sql: `SELECT * FROM regions WHERE id = ?`,
      values: [regionId]
    })
    return region
  })
}

export function fetchCategoryById(optionalConnection: OptionalConnection, categoryId: number): Promise<Category[]> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const category = await query<Category>(client, {
      sql: `SELECT * FROM product_categories WHERE id = ?`,
      values: [categoryId]
    })
    return category
  })
}

export function fetchSizeById(optionalConnection: OptionalConnection, sizeId: number): Promise<Size[]> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const size = await query<Size>(client, {
      sql: `SELECT * FROM product_sizes WHERE id = ?`,
      values: [sizeId]
    })
    return size
  })
}

export function fetchProductById(optionalConnection: OptionalConnection, productId: number): Promise<Product[]> {
  return queryHandler(optionalConnection, async function(client: PoolConnection) {
    const product = await query<Product>(client, {
      sql: `SELECT * FROM products WHERE id = ?`,
      values: [productId]
    })
    return product
  })
}

export function updateRrpCode (optionalConnection: OptionalConnection, rrpId: number, code: string): Promise<undefined> {
  return queryHandler(optionalConnection, async function (connection: PoolConnection) {
      await query<any>(connection, {
          sql: `UPDATE rrp SET code = ? WHERE id = ?`,
          values: [String(code), rrpId]
      })
  })
}
