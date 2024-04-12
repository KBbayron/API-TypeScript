import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import product from "../model/Products";

export default class productController {
    private readonly productModel: Repository<product>

    constructor() {
        this.productModel = dbConnector.getRepository(product)
    }

    async getAll(): Promise<product[]> {
        const product = await this.productModel.findBy({
            status: status.ACTIVE
        })
        return product
    }

    async getById(id: number): Promise<product> {
        const product = await this.productModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!product) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un product con el id proporcionado"
            )
        }
        return product
    }

    async create(product: product): Promise<product> {
        const newproduct = await this.productModel.save({
            categoryId: product.categoryId,
            institutionId: product.institutionId,
            description: product.description,
            image: product.image,
            name:product.name,
            status: status.ACTIVE
        })
        if (!newproduct) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el product, intente nuevamente."
            )
        }
        return newproduct
    }

    async update(product: product): Promise<product> {
        const newproduct = await this.productModel.save({
            categoryId: product.categoryId,
            institutionId: product.institutionId,
            description: product.description,
            image: product.image,
            name:product.name,
            status: status.ACTIVE
        })
        if (!newproduct) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el product, intente nuevamente."
            )
        }
        return newproduct
    }

    async remove(id: number): Promise<product> {
        const newproduct = await this.productModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newproduct) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el product, intente nuevamente."
            )
        }
        return newproduct
    }

}