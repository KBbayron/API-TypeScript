import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Institution from "../model/Institutions";

export default class InstitutionController {
    private readonly InstitutionModel: Repository<Institution>

    constructor() {
        this.InstitutionModel = dbConnector.getRepository(Institution)
    }

    async getAll(): Promise<Institution[]> {
        const Institution = await this.InstitutionModel.findBy({
            status: status.ACTIVE
        })
        return Institution
    }

    async getById(id: number): Promise<Institution> {
        const Institution = await this.InstitutionModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!Institution) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return Institution
    }

    async create(Institution: Institution): Promise<Institution> {
        const newInstitution = await this.InstitutionModel.save({
            typeId: Institution.typeId,
            description: Institution.description,
            name: Institution.name,
            status: status.ACTIVE
        })
        if (!newInstitution) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newInstitution
    }

    async update(Institution: Institution): Promise<Institution> {
        const newInstitution = await this.InstitutionModel.save({
            id: Institution.id,
            typeId: Institution.typeId,
            description: Institution.description,
            name: Institution.name,
            status: status.ACTIVE
        })
        if (!newInstitution) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newInstitution
    }

    async remove(id: number): Promise<Institution> {
        const newInstitution = await this.InstitutionModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newInstitution) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newInstitution
    }
}