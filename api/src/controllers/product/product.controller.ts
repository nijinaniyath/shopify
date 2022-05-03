import { PAGINATION_DEFAULTS } from '@common/constants';
import { HTTP_STATUS, PROUDUCT_MESSAGE } from '@common/constants';
import db from '@db/db';
import { ResponseModel, PaginationResponse } from '@common/response';
import { NotFoundException } from "@common/http-exceptions";
import { Request, Response } from 'express';
interface IProductQuery {
    category?: string;
    name?: string | RegExp;
}
interface IPagination {
    page: string;
    pageSize: string;
}

type IQuery = IProductQuery & IPagination;

class ProductController {
    async create(req: Request, res: Response) {
        const product = new db.Product(req.body);
        await product.save();
        res.status(HTTP_STATUS.CREATED)
            .json(new ResponseModel(product, PROUDUCT_MESSAGE.CREATED));
    }

    async getAll(req: Request<{}, {}, {}, IQuery>, res: Response) {
        const query: IProductQuery = {};
        let { category, name } = req.query;
        const page = parseInt(req.query.page) || PAGINATION_DEFAULTS.PAGE;
        const pageSize = parseInt(req.query.pageSize) || PAGINATION_DEFAULTS.PAGE_SIZE;

        if (category) {
            query.category = category;
        }
        if (name) {
            query.name = new RegExp(`.*${name}.*`, 'i');
        }
        const products = await db.Product.find(query, ["name", "image", "category"])
            .limit(pageSize * 1)
            .skip((page - 1) * pageSize);
        const count = await db.Product.count(query);

        const productResponse = new PaginationResponse(products, PROUDUCT_MESSAGE.RETRIEVE);
        productResponse.pageSize = pageSize;
        productResponse.page = page;
        productResponse.totalItems = count;
        return res.json(productResponse)
    }

    async getById(req: Request, res: Response) {
        const product = await db.Product.findById(req.params.id);
        res.json(new ResponseModel(product, PROUDUCT_MESSAGE.RETRIEVE));
    }

    async update(req: Request, res: Response) {
        const { name, note, image, category } = req.body;
        const product = await db.Product.findById(req.params.id);
        if (!product) {
            throw new NotFoundException("Prouduct with this id not found")
        }
        product.name = name;
        product.note = note;
        product.image = image;
        product.category = category;
        await product.save();
        res.json(new ResponseModel(product, PROUDUCT_MESSAGE.RETRIEVE));
    }
}

export default new ProductController();