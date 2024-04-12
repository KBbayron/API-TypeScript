import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import jobTitlesPermission from "../model/JobTitlesPermissions";

export default class jobTitlesPermissionController {
    private readonly jobTitlesPermissionModel: Repository<jobTitlesPermission>

    constructor() {
        this.jobTitlesPermissionModel = dbConnector.getRepository(jobTitlesPermission)
    }

    async getAll(): Promise<jobTitlesPermission[]> {
        const jobTitlesPermission = await this.jobTitlesPermissionModel.findBy({
            status: status.ACTIVE
        })
        return jobTitlesPermission
    }

    async getById(id: number): Promise<jobTitlesPermission> {
        const jobTitlesPermission = await this.jobTitlesPermissionModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!jobTitlesPermission) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un jobTitlesPermission con el id proporcionado"
            )
        }
        return jobTitlesPermission
    }

    async create(jobTitlesPermission: jobTitlesPermission): Promise<jobTitlesPermission> {
        const newjobTitlesPermission = await this.jobTitlesPermissionModel.save({
            personId: jobTitlesPermission.personId,
            institutionId: jobTitlesPermission.institutionId,
            startDate:jobTitlesPermission.startDate,
            endtDate:jobTitlesPermission.endDate,
            status: status.ACTIVE
        })
        if (!newjobTitlesPermission) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el jobTitlesPermission, intente nuevamente."
            )
        }
        return newjobTitlesPermission
    }

    async update(jobTitlesPermission: jobTitlesPermission): Promise<jobTitlesPermission> {
        const newjobTitlesPermission = await this.jobTitlesPermissionModel.save({
            id: jobTitlesPermission.id,
            personId: jobTitlesPermission.personId,
            institutionId: jobTitlesPermission.institutionId,
            startDate:jobTitlesPermission.startDate,
            endtDate:jobTitlesPermission.endDate,
            status: status.ACTIVE
        })
        if (!newjobTitlesPermission) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el jobTitlesPermission, intente nuevamente."
            )
        }
        return newjobTitlesPermission
    }

    async remove(id: number): Promise<jobTitlesPermission> {
        const newjobTitlesPermission = await this.jobTitlesPermissionModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newjobTitlesPermission) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el jobTitlesPermission, intente nuevamente."
            )
        }
        return newjobTitlesPermission
    }

}