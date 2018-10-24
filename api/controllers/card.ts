import * as express from 'express'
import { StandardResponse } from '../models/standard'
import { Route, Post, Tags, Body, Request } from 'tsoa';
import { PostFetch, ProductPrice } from '../models/sub';
import { fetchProductPrices } from '../services/sub';

@Route('card')
export class CardController {

    @Post('productPrices')
    @Tags('Open')
    public async fetchProductsPrices(
        @Request() request: express.Request,
        @Body() body: PostFetch,
    ): Promise<ProductPrice[]> {
        // Much easier to change this than to change the card to handle StandardResponse
        return await fetchProductPrices(body)
    }
}
