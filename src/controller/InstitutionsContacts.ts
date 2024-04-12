import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import InstitutionContact from "../model/InstitutionsContacts";

export default class InstitutionContactController {
    private readonly InstitutionContactsModel: Repository<InstitutionContact>

    constructor() {
        this.InstitutionContactsModel = dbConnector.getRepository(InstitutionContact)
    }

    async getAll(): Promise<InstitutionContact[]> {
        const InstitutionContacts = await this.InstitutionContactsModel.findBy({
            status: status.ACTIVE
        })
        return InstitutionContacts
    }

    async getById(id: number): Promise<InstitutionContact> {
        const InstitutionContacts = await this.InstitutionContactsModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!InstitutionContacts) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return InstitutionContacts
    }

    async create(InstitutionContacts: InstitutionContact): Promise<InstitutionContact> {
        const newInstitutionContacts = await this.InstitutionContactsModel.save({
            personId: InstitutionContacts.personId,
            startDate: InstitutionContacts.startDate,
            endDate: InstitutionContacts.endDate,
            status: status.ACTIVE
        })
        if (!newInstitutionContacts) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newInstitutionContacts
    }

    async update(InstitutionContacts: InstitutionContact): Promise<InstitutionContact> {
        const newInstitutionContacts = await this.InstitutionContactsModel.save({
            id: InstitutionContacts.id,
            personId: InstitutionContacts.personId,
            startDate: InstitutionContacts.startDate,
            endDate: InstitutionContacts.endDate,
            status: status.ACTIVE
        })
        if (!newInstitutionContacts) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newInstitutionContacts
    }

    async remove(id: number): Promise<InstitutionContact> {
        const newInstitutionContacts = await this.InstitutionContactsModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newInstitutionContacts) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newInstitutionContacts
    }
}