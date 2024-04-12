import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Campus from "../model/Campus";

export default class CampusController {
    private readonly CampusModel: Repository<Campus>

    constructor() {
        this.CampusModel = dbConnector.getRepository(Campus)
    }

    async getAll(): Promise<Campus[]> {
        const Campus = await this.CampusModel.findBy({
            status: status.ACTIVE
        })
        return Campus
    }

    async getById(id: number): Promise<Campus> {
        const Campus = await this.CampusModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!Campus) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un campus con el id proporcionado"
            )
        }
        return Campus
    }

    async create(Campus: Campus): Promise<Campus> {
        const newCampus = await this.CampusModel.save({
            corporationId: Campus.corporationId,
            name: Campus.name,
            code:Campus.name,
            status: status.ACTIVE
        })
        if (!newCampus) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el campus, intente nuevamente."
            )
        }
        return newCampus
    }

    async update(Campus: Campus): Promise<Campus> {
        const newCampus = await this.CampusModel.save({
            id: Campus.id,
            corporationId: Campus.corporationId,
            name: Campus.name,
            code:Campus.name,
            status: status.ACTIVE
        })
        if (!newCampus) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el campus, intente nuevamente."
            )
        }
        return newCampus
    }

    async remove(id: number): Promise<Campus> {
        const newCampus = await this.CampusModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newCampus) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el campus, intente nuevamente."
            )
        }
        return newCampus
    }

}