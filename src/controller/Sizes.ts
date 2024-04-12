import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import sizes from "../model/Sizes";

export default class sizesController {
    private readonly sizesModel: Repository<sizes>

    constructor() {
        this.sizesModel = dbConnector.getRepository(sizes)
    }

    async getAll(): Promise<sizes[]> {
        const sizes = await this.sizesModel.findBy({
            status: status.ACTIVE
        })
        return sizes
    }

    async getById(id: number): Promise<sizes> {
        const sizes = await this.sizesModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!sizes) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un sizes con el id proporcionado"
            )
        }
        return sizes
    }

    async create(sizes: sizes): Promise<sizes> {
        const newsizes = await this.sizesModel.save({
            name: sizes.name,
            code:sizes.name,
            status: status.ACTIVE
        })
        if (!newsizes) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el sizes, intente nuevamente."
            )
        }
        return newsizes
    }

    async update(sizes: sizes): Promise<sizes> {
        const newsizes = await this.sizesModel.save({
            id: sizes.id,
            name: sizes.name,
            code:sizes.name,
            status: status.ACTIVE
        })
        if (!newsizes) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el sizes, intente nuevamente."
            )
        }
        return newsizes
    }

    async remove(id: number): Promise<sizes> {
        const newsizes = await this.sizesModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newsizes) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el sizes, intente nuevamente."
            )
        }
        return newsizes
    }

}