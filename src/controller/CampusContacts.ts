import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import CampusContact from "../model/CampusContacts";

export default class CampusContactController {
    private readonly CampusContactModel: Repository<CampusContact>

    constructor() {
        this.CampusContactModel = dbConnector.getRepository(CampusContact)
    }

    async getAll(): Promise<CampusContact[]> {
        const CampusContact = await this.CampusContactModel.findBy({
            status: status.ACTIVE
        })
        return CampusContact
    }

    async getById(id: number): Promise<CampusContact> {
        const CampusContact = await this.CampusContactModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!CampusContact) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return CampusContact
    }

    async create(CampusContact: CampusContact): Promise<CampusContact> {
        const newCampusContact = await this.CampusContactModel.save({
            contactId: CampusContact.contactId,
            campusId:CampusContact. campusId,
            description:CampusContact.description,
            status: status.ACTIVE
        })
        if (!newCampusContact) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newCampusContact
    }

    async update(CampusContact: CampusContact): Promise<CampusContact> {
        const newCampusContact = await this.CampusContactModel.save({
            id: CampusContact.id,
            contactId: CampusContact.contactId,
            campusId:CampusContact. campusId,
            description:CampusContact.description,
            status: status.ACTIVE
        })
        if (!newCampusContact) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newCampusContact
    }

    async remove(id: number): Promise<CampusContact> {
        const newCampusContact = await this.CampusContactModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newCampusContact) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newCampusContact
    }

}