import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import productSizes from "../model/ProductSizes";

export default class productSizesController {
    private readonly productSizesModel: Repository<productSizes>

    constructor() {
        this.productSizesModel = dbConnector.getRepository(productSizes)
    }

    async getAll(): Promise<productSizes[]> {
        const productSizes = await this.productSizesModel.findBy({
            status: status.ACTIVE
        })
        return productSizes
    }

    async getById(id: number): Promise<productSizes> {
        const productSizes = await this.productSizesModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!productSizes) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un productSizes con el id proporcionado"
            )
        }
        return productSizes
    }

    async create(productSizes: productSizes): Promise<productSizes> {
        const newproductSizes = await this.productSizesModel.save({
            productId: productSizes.productId,
            sizeId:productSizes.sizeId,
            status: status.ACTIVE
        })
        if (!newproductSizes) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el productSizes, intente nuevamente."
            )
        }
        return newproductSizes
    }

    async update(productSizes: productSizes): Promise<productSizes> {
        const newproductSizes = await this.productSizesModel.save({
            id: productSizes.id,
            productId: productSizes.productId,
            sizeId:productSizes.sizeId,
            status: status.ACTIVE
        })
        if (!newproductSizes) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el productSizes, intente nuevamente."
            )
        }
        return newproductSizes
    }

    async remove(id: number): Promise<productSizes> {
        const newproductSizes = await this.productSizesModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newproductSizes) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el productSizes, intente nuevamente."
            )
        }
        return newproductSizes
    }

}