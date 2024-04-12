import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Hiring from "../model/Hirings";

export default class HiringController {
    private readonly HiringModel: Repository<Hiring>

    constructor() {
        this.HiringModel = dbConnector.getRepository(Hiring)
    }

    async getAll(): Promise<Hiring[]> {
        const Hiring = await this.HiringModel.findBy({
            status: status.ACTIVE
        })
        return Hiring
    }

    async getById(id: number): Promise<Hiring> {
        const Hiring = await this.HiringModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!Hiring) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return Hiring
    }

    async create(Hiring: Hiring): Promise<Hiring> {
        const newHiring = await this.HiringModel.save({
            employeeId: Hiring.employeeId,
            hiringTypeId: Hiring.hiringTypeId,
            salary: Hiring.salary,
            startDate: Hiring.startDate,
            endDate: Hiring.endDate,
            description: Hiring.description,
            status: status.ACTIVE
        })
        if (!newHiring) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newHiring
    }

    async update(Hiring: Hiring): Promise<Hiring> {
        const newHiring = await this.HiringModel.save({
            id: Hiring.id,
            employeeId: Hiring.employeeId,
            hiringTypeId: Hiring.hiringTypeId,
            salary: Hiring.salary,
            startDate: Hiring.startDate,
            endDate: Hiring.endDate,
            description: Hiring.description,
            status: status.ACTIVE
        })
        if (!newHiring) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newHiring
    }

    async remove(id: number): Promise<Hiring> {
        const newHiring = await this.HiringModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newHiring) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newHiring
    }
}