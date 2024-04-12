import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Corporation from "../model/Corporations";

export default class CorporationController {
    private readonly CorporationModel: Repository<Corporation>

    constructor() {
        this.CorporationModel = dbConnector.getRepository(Corporation)
    }

    async getAll(): Promise<Corporation[]> {
        const Corporations = await this.CorporationModel.findBy({
            status: status.ACTIVE
        })
        return Corporations
    }

    async getById(id: number): Promise<Corporation> {
        const person = await this.CorporationModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!person) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una Corporatione con el id proporcionado"
            )
        }
        return person
    }

    async create(Corporation: Corporation): Promise<Corporation> {
        const newPerson = await this.CorporationModel.save({
            name: Corporation.name,
            code: Corporation.code,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el Corporatione, intente nuevamente."
            )
        }
        return newPerson
    }

    async update(Corporation: Corporation): Promise<Corporation> {
        const newPerson = await this.CorporationModel.save({
            id: Corporation.id,
            name: Corporation.name,
            code: Corporation.code,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el Corporatione, intente nuevamente."
            )
        }
        return newPerson
    }

    async remove(id: number): Promise<Corporation> {
        const newCorporation = await this.CorporationModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newCorporation) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el Corporatione, intente nuevamente."
            )
        }
        return newCorporation
    }

}