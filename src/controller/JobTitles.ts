import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import jobTitles from "../model/JobTitles";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";

export default class jobTitlesController {
    private readonly jobTitlesModel: Repository<jobTitles>

    constructor() {
        this.jobTitlesModel = dbConnector.getRepository(jobTitles)
    }

    async getAll(): Promise<jobTitles[]> {
        const jobTitless = await this.jobTitlesModel.findBy({
            status: status.ACTIVE
        })
        return jobTitless
    }

    async getById(id: number): Promise<jobTitles> {
        const jobTitles = await this.jobTitlesModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!jobTitles) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una jobTitlesa con el id proporcionado"
            )
        }
        return jobTitles
    }

    async create(jobTitles: jobTitles): Promise<jobTitles> {
        const newjobTitles = await this.jobTitlesModel.save({
            name: jobTitles.name,
            code: jobTitles.code,
            status: status.ACTIVE
        })
        if (!newjobTitles) {
            throw new ResponseError(
                400,
                "Error al crear la jobTitlesa",
                "Ocurrio un error al intentar crear la jobTitlesa, intente nuevamente."
            )
        }
        return newjobTitles
    }

    async update(jobTitles: jobTitles): Promise<jobTitles> {
        const newjobTitles = await this.jobTitlesModel.save({
            id: jobTitles.id,
            name: jobTitles.name,
            code: jobTitles.code,
            status: status.ACTIVE
        })
        if (!newjobTitles) {
            throw new ResponseError(
                400,
                "Error al actualizar la jobTitlesa",
                "Ocurrio un error al intentar actualizar la jobTitlesa, intente nuevamente."
            )
        }
        return newjobTitles
    }

    async remove(id: number): Promise<jobTitles> {
        const newjobTitles = await this.jobTitlesModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newjobTitles) {
            throw new ResponseError(
                400,
                "Error al eliminar la jobTitlesa",
                "Ocurrio un error al intentar eliminar la jobTitlesa, intente nuevamente."
            )
        }
        return newjobTitles
    }

}