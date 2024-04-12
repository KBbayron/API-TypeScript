import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import productCategorie from "../model/ProductCategories";

export default class productCategorieController {
    private readonly productCategorieModel: Repository<productCategorie>

    constructor() {
        this.productCategorieModel = dbConnector.getRepository(productCategorie)
    }

    async getAll(): Promise<productCategorie[]> {
        const productCategorie = await this.productCategorieModel.findBy({
            status: status.ACTIVE
        })
        return productCategorie
    }

    async getById(id: number): Promise<productCategorie> {
        const productCategorie = await this.productCategorieModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!productCategorie) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un productCategorie con el id proporcionado"
            )
        }
        return productCategorie
    }

    async create(productCategorie: productCategorie): Promise<productCategorie> {
        const newproductCategorie = await this.productCategorieModel.save({
            name: productCategorie.name,
            code:productCategorie.name,
            status: status.ACTIVE
        })
        if (!newproductCategorie) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el productCategorie, intente nuevamente."
            )
        }
        return newproductCategorie
    }

    async update(productCategorie: productCategorie): Promise<productCategorie> {
        const newproductCategorie = await this.productCategorieModel.save({
            id: productCategorie.id,
            name: productCategorie.name,
            code:productCategorie.name,
            status: status.ACTIVE
        })
        if (!newproductCategorie) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el productCategorie, intente nuevamente."
            )
        }
        return newproductCategorie
    }

    async remove(id: number): Promise<productCategorie> {
        const newproductCategorie = await this.productCategorieModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newproductCategorie) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el productCategorie, intente nuevamente."
            )
        }
        return newproductCategorie
    }

}