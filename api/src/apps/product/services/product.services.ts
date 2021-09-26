import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { Product, ProductCreateInput, ProductUpdateInput } from "..";
import { Users } from "../../auth";

@Service()
export class ProductService {
    constructor(
        @Inject() private readonly products: Repository<Product>,
        @Inject() private readonly users: Repository<Users>
    ) {}

    async getProducts(): Promise<Product[]> {
        return await this.products.find({ relations: ["user"] });
    }

    async createProduct(data: ProductCreateInput): Promise<Product> {
        const user = await this.users.findOneOrFail(data.user);
        const product = this.products.create({ ...data, user });
        return await product.save();
    }

    async getProductById(id: number): Promise<Product> {
        return await this.products.findOneOrFail({ relations: ["user"], where: { id } });
    }

    async update(id: number, data: ProductUpdateInput): Promise<void> {
        const user = await this.users.findOneOrFail(data.user);
        await this.products.update({ id }, { ...data, user });
    }

    async delete(id: number): Promise<void> {
        await this.users.delete({ id });
    }
}
