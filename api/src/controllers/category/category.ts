import { NotFoundException } from './../../common/http-exceptions';

import { Request, Response } from 'express';
import { HTTP_STATUS } from '@common/constants';
import db from '@db/db';
import { ResponseModel } from '@common/response';

class CategoryController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body;
        const category = new db.Category({ name, description });
        await category.save();
        res.status(HTTP_STATUS.CREATED)
            .json(new ResponseModel(category, "Category created successfully"));
    }

    async getAll(req: Request, res: Response) {
        const categories = await db.Category.find();
        res.json(new ResponseModel(categories, "categories fetch success"));
    }

    async getById(req: Request, res: Response) {
        const id = req.params.id;
        const category = await db.Category.findById(id);
        if (!category) {
            throw new NotFoundException("Item not found");
        }

        res.json(new ResponseModel(category, "category retrieve success",));
    }


}

export default new CategoryController();