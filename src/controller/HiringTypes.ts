import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import HiringType from "../model/HiringTypes";

export default class HiringTypeController {
    private readonly HiringTypeModel: Repository<HiringType>

    constructor() {
        this.HiringTypeModel = dbConnector.getRepository(HiringType)
    }

    async getAll(): Promise<HiringType[]> {
        const HiringType = await this.HiringTypeModel.findBy({
            status: status.ACTIVE
        })
        return HiringType
    }

    async getById(id: number): Promise<HiringType> {
        const HiringType = await this.HiringTypeModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!HiringType) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return HiringType
    }

    async create(HiringType: HiringType): Promise<HiringType> {
        const newHiringType = await this.HiringTypeModel.save({
            name: HiringType.name,
            code: HiringType.code,
            status: status.ACTIVE
        })
        if (!newHiringType) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newHiringType
    }

    async update(HiringType: HiringType): Promise<HiringType> {
        const newHiringType = await this.HiringTypeModel.save({
            id: HiringType.id,
            name: HiringType.name,
            code: HiringType.code,
            status: status.ACTIVE
        })
        if (!newHiringType) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newHiringType
    }

    async remove(id: number): Promise<HiringType> {
        const newHiringType = await this.HiringTypeModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newHiringType) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newHiringType
    }
}