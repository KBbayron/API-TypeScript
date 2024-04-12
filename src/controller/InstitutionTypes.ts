import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import InstitutionType from "../model/InstitutionTypes";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";

export default class InstitutionTypeController {
    private readonly InstitutionTypeModel: Repository<InstitutionType>

    constructor() {
        this.InstitutionTypeModel = dbConnector.getRepository(InstitutionType)
    }

    async getAll(): Promise<InstitutionType[]> {
        const InstitutionTypes = await this.InstitutionTypeModel.findBy({
            status: status.ACTIVE
        })
        return InstitutionTypes
    }

    async getById(id: number): Promise<InstitutionType> {
        const InstitutionType = await this.InstitutionTypeModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!InstitutionType) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una InstitutionTypea con el id proporcionado"
            )
        }
        return InstitutionType
    }

    async create(InstitutionType: InstitutionType): Promise<InstitutionType> {
        const newInstitutionType = await this.InstitutionTypeModel.save({
            typeId: InstitutionType.typeId,
            name: InstitutionType.name,
            description: InstitutionType.description,
            status: status.ACTIVE
        })
        if (!newInstitutionType) {
            throw new ResponseError(
                400,
                "Error al crear la InstitutionTypea",
                "Ocurrio un error al intentar crear la InstitutionTypea, intente nuevamente."
            )
        }
        return newInstitutionType
    }

    async update(InstitutionType: InstitutionType): Promise<InstitutionType> {
        const newInstitutionType = await this.InstitutionTypeModel.save({
            id: InstitutionType.id,
            typeId: InstitutionType.typeId,
            name: InstitutionType.name,
            description: InstitutionType.description,
            status: status.ACTIVE
        })
        if (!newInstitutionType) {
            throw new ResponseError(
                400,
                "Error al actualizar la InstitutionTypea",
                "Ocurrio un error al intentar actualizar la InstitutionTypea, intente nuevamente."
            )
        }
        return newInstitutionType
    }

    async remove(id: number): Promise<InstitutionType> {
        const newInstitutionType = await this.InstitutionTypeModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newInstitutionType) {
            throw new ResponseError(
                400,
                "Error al eliminar la InstitutionTypea",
                "Ocurrio un error al intentar eliminar la InstitutionTypea, intente nuevamente."
            )
        }
        return newInstitutionType
    }

}