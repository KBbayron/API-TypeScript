import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import commision from "../model/Commissions";

export default class commisionController {
    private readonly commisionModel: Repository<commision>

    constructor() {
        this.commisionModel = dbConnector.getRepository(commision)
    }

    async getAll(): Promise<commision[]> {
        const commisions = await this.commisionModel.findBy({
            status: status.ACTIVE
        })
        return commisions
    }

    async getById(id: number): Promise<commision> {
        const commision = await this.commisionModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!commision) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una commisione con el id proporcionado"
            )
        }
        return commision
    }

    async create(commision: commision): Promise<commision> {
        const newcommision = await this.commisionModel.save({
            institutionId: commision.institutionId,
            percentage: commision.percentage,
            endDate: commision.endDate,
            startDate: commision.startDate,
            status: status.ACTIVE
        })
        if (!newcommision) {
            throw new ResponseError(
                400,
                "Error al crear la commisiona",
                "Ocurrio un error al intentar crear el commisione, intente nuevamente."
            )
        }
        return newcommision
    }

    async update(commision: commision): Promise<commision> {
        const newcommision = await this.commisionModel.save({
            id: commision.id,
            institutionId: commision.institutionId,
            percentage: commision.percentage,
            endDate: commision.endDate,
            startDate: commision.startDate,
            status: status.ACTIVE
        })
        if (!newcommision) {
            throw new ResponseError(
                400,
                "Error al actualizar la commisiona",
                "Ocurrio un error al intentar actualizar el commisione, intente nuevamente."
            )
        }
        return newcommision
    }

    async remove(id: number): Promise<commision> {
        const newcommision = await this.commisionModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newcommision) {
            throw new ResponseError(
                400,
                "Error al eliminar la commisiona",
                "Ocurrio un error al intentar eliminar el commisione, intente nuevamente."
            )
        }
        return newcommision
    }

}