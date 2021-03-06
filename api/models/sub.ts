export interface Product {
    id: number,
    name: string,
    code: string,
    description: string,
    display_name: string,
    active: number,
    sub_sizing: number
}

export interface Region {
    id: number,
    name: string,
    code: string
}

export interface Category {
    id: number,
    name: string,
    code: string,
    parent: number | null,
    is_promo: number,
    hidden: number,
    sub_sizing: number,
    restricted: number
}

export interface Size {
    id: number,
    name: string,
    code: string
}

export interface Sub {
    id: number,
    code: string,
    product_id: number,
    category_id: number,
    size_id: number,
    store_id: number,
    region_id: number,
    rrp: number,
    rrp_id: number,
    custom_price: number,
    out_of_stock: number,
    available: number,
    is_promo: number,
    mop: string,
    active: number,
    expiry: Date
}

export interface CompleteProduct {
    id: number,
    rrp_fallback: number,
    code: null | string,
    custom_price: number,
    out_of_stock: number,
    available: number,
    is_promo: number,
    active: number,
    expiry: null | Date,
    is_promo_fallback: number,
    expiry_fallback: null | Date,
    prod_id: number,
    prod_name: string,
    prod_code: string,
    sub_sizing: number,
    cat_id: number,
    cat_name: string,
    cat_code: string,
    parent_id: number,
    parent_name: string,
    size_id: number,
    size_name: string,
    size_code: string,
    region_id: number,
    region_name: string,
    region_code: string,
    store_name: string,
    franchise: null | number,
    rrp: number,
    required: number
}

export interface ProductPrice {
    rrp: number | string,
    price: null | number | string
}

export interface Store {
    id: number,
    name: string,
    store_number?: string,
    region: number,
    subregion: number,
    device_id?: string,
    full_address?: string,
    suburb?: string,
    state?: string,
    postcode?: string,
    option?: number,
    direction?: number,
    tag_drinks?: number,
    tag_breakfast_drinks?: number,
    tag_breakfast_offer?: number,
    tag_smoothies?: number,
    franchise?: number,
    suspended: number
}

export interface Device {
    id: number,
    store_id: number,
    device_name: string
}

export interface PostFetch {
    name: string,
    codes: string[]
}
