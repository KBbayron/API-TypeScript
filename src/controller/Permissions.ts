import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import permission from "../model/Permissions";

export default class permissionController {
    private readonly permissionModel: Repository<permission>

    constructor() {
        this.permissionModel = dbConnector.getRepository(permission)
    }

    async getAll(): Promise<permission[]> {
        const permission = await this.permissionModel.findBy({
            status: status.ACTIVE
        })
        return permission
    }

    async getById(id: number): Promise<permission> {
        const permission = await this.permissionModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!permission) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un permission con el id proporcionado"
            )
        }
        return permission
    }

    async create(permission: permission): Promise<permission> {
        const newpermission = await this.permissionModel.save({
            name: permission.name,
            code:permission.name,
            status: status.ACTIVE
        })
        if (!newpermission) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el permission, intente nuevamente."
            )
        }
        return newpermission
    }

    async update(permission: permission): Promise<permission> {
        const newpermission = await this.permissionModel.save({
            id: permission.id,
            name: permission.name,
            code:permission.name,
            status: status.ACTIVE
        })
        if (!newpermission) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el permission, intente nuevamente."
            )
        }
        return newpermission
    }

    async remove(id: number): Promise<permission> {
        const newpermission = await this.permissionModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newpermission) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el permission, intente nuevamente."
            )
        }
        return newpermission
    }

}