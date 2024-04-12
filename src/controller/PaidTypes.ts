import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import paidTypes from "../model/PaidTypes";

export default class paidTypesController {
    private readonly paidTypesModel: Repository<paidTypes>

    constructor() {
        this.paidTypesModel = dbConnector.getRepository(paidTypes)
    }

    async getAll(): Promise<paidTypes[]> {
        const paidTypes = await this.paidTypesModel.findBy({
            status: status.ACTIVE
        })
        return paidTypes
    }

    async getById(id: number): Promise<paidTypes> {
        const paidTypes = await this.paidTypesModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!paidTypes) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un paidTypes con el id proporcionado"
            )
        }
        return paidTypes
    }

    async create(paidTypes: paidTypes): Promise<paidTypes> {
        const newpaidTypes = await this.paidTypesModel.save({
            name: paidTypes.name,
            code:paidTypes.name,
            status: status.ACTIVE
        })
        if (!newpaidTypes) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el paidTypes, intente nuevamente."
            )
        }
        return newpaidTypes
    }

    async update(paidTypes: paidTypes): Promise<paidTypes> {
        const newpaidTypes = await this.paidTypesModel.save({
            id: paidTypes.id,
            name: paidTypes.name,
            code:paidTypes.name,
            status: status.ACTIVE
        })
        if (!newpaidTypes) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el paidTypes, intente nuevamente."
            )
        }
        return newpaidTypes
    }

    async remove(id: number): Promise<paidTypes> {
        const newpaidTypes = await this.paidTypesModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newpaidTypes) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el paidTypes, intente nuevamente."
            )
        }
        return newpaidTypes
    }

}