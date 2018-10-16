import * as express from 'express'
import { StandardResponse } from '../models/standard'
import { Product, Sub, CompleteProduct, ProductPrice } from '../models/sub'
import { Route, Get, Tags, Query, Post, Request, Body } from 'tsoa'
import { fetchAllProducts, fetchSubsByStore, fetchSizedProducts, fetchProductByCode, fetchRrpByFullCode, fetchReducedProduct, fetchPriceRrpByCode, fetchSpecificProduct, fetchCodesByIds } from '../services/sub';


@Route('sub')
export class SubController {

    @Get('products')
    @Tags('Open')
    public async Products(): Promise<StandardResponse<Product[]>> {
        let data = await fetchAllProducts()
        console.log('controller data', data)
        return {data, meta: {}};
    }

    @Get('subs')
    @Tags('Open')
    public async Subs(
        @Query() storeId: number,
    ): Promise<StandardResponse<Sub[]>> {
        let data = await fetchSubsByStore(storeId)
        return {data, meta: {}}
    }

    @Get('sizedProducts')
    @Tags('Open')
    public async SizedProducts(
        @Query() storeId: number,
    ): Promise<StandardResponse<CompleteProduct[]>> {
        let data = await fetchSizedProducts(storeId)
        return {data, meta: {}}
    }

    @Get('productByCode')
    @Tags('Open')
    public async ProductByCode(
        @Query() categoryCode: string,
        @Query() productCode: string,
        @Query() storeId: number
    ): Promise<StandardResponse<CompleteProduct[]>> {
        let data = await fetchProductByCode(categoryCode, productCode, storeId)
        return {data, meta: {}}
    }

    @Get('rrpByFullCode')
    @Tags('Open')
    public async RrpByFullCode(
        @Query() code: string
    ): Promise<StandardResponse<CompleteProduct[]>> {
        let data = await fetchRrpByFullCode(code)
        return {data, meta: {}}
    }

    @Get('productByCodeReduced')
    @Tags('Open')
    public async ProductByCodeReduced(
        @Query() categoryCode: string,
        @Query() productCode: string,
        @Query() storeId: number
    ): Promise<StandardResponse<CompleteProduct[]>> {
        let data = await fetchReducedProduct(categoryCode, productCode, storeId)
        return {data, meta: {}}
    }

    @Get('productPriceRrpByCode')
    @Tags('Open')
    public async fetchPriceRrpByCode(
        @Query() code: string,
        @Query() storeId: number
    ): Promise<StandardResponse<ProductPrice[]>> {
        let data = await fetchPriceRrpByCode(code, storeId)
        return {data, meta: {}}
    }

    // @Get('addFullCode')
    // @Tags('Open')
    // public async addFullCode(
    //     @Query() regionId: number,
    //     @Query() categoryId: number,
    //     @Query() sizeId: number,
    //     @Query() productId: number
    // ): Promise<StandardResponse<boolean>> {
    //     let data = await addFullProductCode(regionId, categoryId, sizeId, productId)
    //     return {data, meta: {}}
    // }

    @Get('specificProduct')
    @Tags('Open')
    public async specificProduct(
        @Query() regionId: number,
        @Query() categoryId: number,
        @Query() sizeId: number,
        @Query() productId: number
    ): Promise<StandardResponse<Sub[]|null>> {
        let data = await fetchSpecificProduct(regionId, categoryId, sizeId, productId)
        return {data, meta: {}}
    }

    @Get('code')
    @Tags('Open')
    public async code(
        @Query() regionId: number,
        @Query() categoryId: number,
        @Query() sizeId: number,
        @Query() productId: number
    ): Promise<StandardResponse<string>> {
        let data = await fetchCodesByIds(regionId, categoryId, sizeId, productId)
        return {data, meta: {}}
    }

    // @Get('fetchByid/{id}')
    // @Tags('Open')
    // public async FetchComicById(
    //     @Request() request: express.Request,
    //     id: number
    // ): Promise<StandardResponse<ComicDb>> {
    //     let data = await fetchComicById(id)
    //     return {data, meta: {}};
    // }

    // @Post('comic')
    // @Tags('Open')
    // public async InsertComic(
    //     @Request() request: express.Request,
    //     @Body() body: Comic,
    // ): Promise<StandardResponse<boolean>> {
    //     let inserted = await insertComic(body)
    //     let val = true
    //     return {data: val, meta: {}}
    // }
}
