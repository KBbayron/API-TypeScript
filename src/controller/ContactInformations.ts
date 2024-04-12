import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import ContactInformations from "../model/ContactInformations";

export default class ContactInformationsController {
    private readonly ContactInformationsModel: Repository<ContactInformations>

    constructor() {
        this.ContactInformationsModel = dbConnector.getRepository(ContactInformations)
    }

    async getAll(): Promise<ContactInformations[]> {
        const ContactInformationss = await this.ContactInformationsModel.findBy({
            status: status.ACTIVE
        })
        return ContactInformationss
    }

    async getById(id: number): Promise<ContactInformations> {
        const person = await this.ContactInformationsModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!person) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una ContactInformationse con el id proporcionado"
            )
        }
        return person
    }

    async create(ContactInformations: ContactInformations): Promise<ContactInformations> {
        const newPerson = await this.ContactInformationsModel.save({
            name: ContactInformations.name,
            code: ContactInformations.code,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el ContactInformationse, intente nuevamente."
            )
        }
        return newPerson
    }

    async update(ContactInformations: ContactInformations): Promise<ContactInformations> {
        const newPerson = await this.ContactInformationsModel.save({
            id: ContactInformations.id,
            name: ContactInformations.name,
            code: ContactInformations.code,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el ContactInformationse, intente nuevamente."
            )
        }
        return newPerson
    }

    async remove(id: number): Promise<ContactInformations> {
        const newContactInformations = await this.ContactInformationsModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newContactInformations) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el ContactInformationse, intente nuevamente."
            )
        }
        return newContactInformations
    }

}