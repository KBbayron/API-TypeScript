import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import personalContact from "../model/PersonalContacts";

export default class personalContactController {
    private readonly personalContactModel: Repository<personalContact>

    constructor() {
        this.personalContactModel = dbConnector.getRepository(personalContact)
    }

    async getAll(): Promise<personalContact[]> {
        const personalContact = await this.personalContactModel.findBy({
            status: status.ACTIVE
        })
        return personalContact
    }

    async getById(id: number): Promise<personalContact> {
        const personalContact = await this.personalContactModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!personalContact) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un personalContact con el id proporcionado"
            )
        }
        return personalContact
    }

    async create(personalContact: personalContact): Promise<personalContact> {
        const newpersonalContact = await this.personalContactModel.save({
            personId: personalContact.personId,
            contactId: personalContact.contactId,
            description:personalContact.description,
            status: status.ACTIVE
        })
        if (!newpersonalContact) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el personalContact, intente nuevamente."
            )
        }
        return newpersonalContact
    }

    async update(personalContact: personalContact): Promise<personalContact> {
        const newpersonalContact = await this.personalContactModel.save({
            id: personalContact.id,
            personId: personalContact.personId,
            contactId: personalContact.contactId,
            description:personalContact.description,
            status: status.ACTIVE
        })
        if (!newpersonalContact) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el personalContact, intente nuevamente."
            )
        }
        return newpersonalContact
    }

    async remove(id: number): Promise<personalContact> {
        const newpersonalContact = await this.personalContactModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newpersonalContact) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el personalContact, intente nuevamente."
            )
        }
        return newpersonalContact
    }

}