import { Router, Application } from "express";
import { Service } from "typedi";

@Service()
export class ProductRouter {
    router = Router();

    constructor(app: Application) {}
}
