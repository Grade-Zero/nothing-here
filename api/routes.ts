/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { SubController } from './controllers/sub';
import { AuthenticationController } from './controllers/authentication';
import { UserController } from './controllers/user';
import { expressAuthentication } from './utils/authentication';

const models: TsoaRoute.Models = {
    "Product": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "display_name": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "sub_sizing": { "dataType": "double", "required": true },
        },
    },
    "StandardResponseProduct[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "Product" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "Sub": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "code": { "dataType": "string", "required": true },
            "product_id": { "dataType": "double", "required": true },
            "category_id": { "dataType": "double", "required": true },
            "size_id": { "dataType": "double", "required": true },
            "store_id": { "dataType": "double", "required": true },
            "region_id": { "dataType": "double", "required": true },
            "rrp": { "dataType": "double", "required": true },
            "rrp_id": { "dataType": "double", "required": true },
            "custom_price": { "dataType": "double", "required": true },
            "out_of_stock": { "dataType": "double", "required": true },
            "available": { "dataType": "double", "required": true },
            "is_promo": { "dataType": "double", "required": true },
            "mop": { "dataType": "string", "required": true },
            "active": { "dataType": "double", "required": true },
            "expiry": { "dataType": "datetime", "required": true },
        },
    },
    "StandardResponseSub[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "Sub" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "CompleteProduct": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "rrp_fallback": { "dataType": "double", "required": true },
            "code": { "dataType": "object", "required": true },
            "custom_price": { "dataType": "double", "required": true },
            "out_of_stock": { "dataType": "double", "required": true },
            "available": { "dataType": "double", "required": true },
            "is_promo": { "dataType": "double", "required": true },
            "active": { "dataType": "double", "required": true },
            "expiry": { "dataType": "object", "required": true },
            "is_promo_fallback": { "dataType": "double", "required": true },
            "expiry_fallback": { "dataType": "object", "required": true },
            "prod_id": { "dataType": "double", "required": true },
            "prod_name": { "dataType": "string", "required": true },
            "prod_code": { "dataType": "string", "required": true },
            "sub_sizing": { "dataType": "double", "required": true },
            "cat_id": { "dataType": "double", "required": true },
            "cat_name": { "dataType": "string", "required": true },
            "cat_code": { "dataType": "string", "required": true },
            "parent_id": { "dataType": "double", "required": true },
            "parent_name": { "dataType": "string", "required": true },
            "size_id": { "dataType": "double", "required": true },
            "size_name": { "dataType": "string", "required": true },
            "size_code": { "dataType": "string", "required": true },
            "region_id": { "dataType": "double", "required": true },
            "region_name": { "dataType": "string", "required": true },
            "region_code": { "dataType": "string", "required": true },
            "store_name": { "dataType": "string", "required": true },
            "franchise": { "dataType": "object", "required": true },
            "rrp": { "dataType": "double", "required": true },
            "required": { "dataType": "double", "required": true },
        },
    },
    "StandardResponseCompleteProduct[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "CompleteProduct" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseobject": {
        "properties": {
            "data": { "dataType": "object", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "ProductPrice": {
        "properties": {
            "rrp": { "dataType": "object", "required": true },
            "price": { "dataType": "object", "required": true },
        },
    },
    "StandardResponseProductPrice": {
        "properties": {
            "data": { "ref": "ProductPrice", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseboolean": {
        "properties": {
            "data": { "dataType": "boolean", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "LoginResApi": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "sessionId": { "dataType": "string", "required": true },
        },
    },
    "StandardResponseLoginResApi": {
        "properties": {
            "data": { "ref": "LoginResApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "LoginReqApi": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
    },
    "LogoutResApi": {
        "properties": {
            "success": { "dataType": "boolean", "required": true },
        },
    },
    "StandardResponseLogoutResApi": {
        "properties": {
            "data": { "ref": "LogoutResApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "UserApi": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "company_id": { "dataType": "double", "required": true },
            "username": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "first_name": { "dataType": "string" },
            "last_name": { "dataType": "string" },
            "token": { "dataType": "string" },
        },
    },
    "StandardResponseUserApi": {
        "properties": {
            "data": { "ref": "UserApi", "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
    "StandardResponseUserApi[]": {
        "properties": {
            "data": { "dataType": "array", "array": { "ref": "UserApi" }, "required": true },
            "meta": { "dataType": "any", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/v1/sub/products',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.Products.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/subs',
        function(request: any, response: any, next: any) {
            const args = {
                storeId: { "in": "query", "name": "storeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.Subs.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/sizedProducts',
        function(request: any, response: any, next: any) {
            const args = {
                storeId: { "in": "query", "name": "storeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.SizedProducts.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/productByCode',
        function(request: any, response: any, next: any) {
            const args = {
                categoryCode: { "in": "query", "name": "categoryCode", "required": true, "dataType": "string" },
                productCode: { "in": "query", "name": "productCode", "required": true, "dataType": "string" },
                storeId: { "in": "query", "name": "storeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.ProductByCode.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/rrpByFullCode',
        function(request: any, response: any, next: any) {
            const args = {
                code: { "in": "query", "name": "code", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.RrpByFullCode.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/rrpById',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "query", "name": "id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.RrpById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/productByCodeReduced',
        function(request: any, response: any, next: any) {
            const args = {
                categoryCode: { "in": "query", "name": "categoryCode", "required": true, "dataType": "string" },
                productCode: { "in": "query", "name": "productCode", "required": true, "dataType": "string" },
                storeId: { "in": "query", "name": "storeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.ProductByCodeReduced.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/productPriceRrpByCode',
        function(request: any, response: any, next: any) {
            const args = {
                code: { "in": "query", "name": "code", "required": true, "dataType": "string" },
                storeId: { "in": "query", "name": "storeId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.fetchPriceRrpByCode.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/addFullCode',
        function(request: any, response: any, next: any) {
            const args = {
                regionId: { "in": "query", "name": "regionId", "required": true, "dataType": "double" },
                categoryId: { "in": "query", "name": "categoryId", "required": true, "dataType": "double" },
                sizeId: { "in": "query", "name": "sizeId", "required": true, "dataType": "double" },
                productId: { "in": "query", "name": "productId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.addFullCode.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/specificProduct',
        function(request: any, response: any, next: any) {
            const args = {
                regionId: { "in": "query", "name": "regionId", "required": true, "dataType": "double" },
                categoryId: { "in": "query", "name": "categoryId", "required": true, "dataType": "double" },
                sizeId: { "in": "query", "name": "sizeId", "required": true, "dataType": "double" },
                productId: { "in": "query", "name": "productId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.specificProduct.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/code',
        function(request: any, response: any, next: any) {
            const args = {
                regionId: { "in": "query", "name": "regionId", "required": true, "dataType": "double" },
                categoryId: { "in": "query", "name": "categoryId", "required": true, "dataType": "double" },
                sizeId: { "in": "query", "name": "sizeId", "required": true, "dataType": "double" },
                productId: { "in": "query", "name": "productId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.code.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/sub/productsAddCode',
        function(request: any, response: any, next: any) {
            const args = {
                start: { "in": "query", "name": "start", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new SubController();


            const promise = controller.productsCode.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/authentication/login',
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "LoginReqApi" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.Login.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/authentication/valid_session',
        authenticateMiddleware([{ "name": "subway_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.ValidSession.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/v1/authentication/logout',
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new AuthenticationController();


            const promise = controller.Logout.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/user/active',
        authenticateMiddleware([{ "name": "subway_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.ById.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/v1/user/list/by_companyid/:companyId',
        authenticateMiddleware([{ "name": "subway_session" }]),
        function(request: any, response: any, next: any) {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
                companyId: { "in": "path", "name": "companyId", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.UserList.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, response: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                expressAuthentication(request, secMethod.name, secMethod.scopes).then((user: any) => {
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        request['user'] = user;
                        next();
                    }
                })
                    .catch((error: any) => {
                        responded++;
                        if (responded == security.length && !success) {
                            response.status(401);
                            next(error)
                        }
                    })
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
