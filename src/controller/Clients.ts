import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Client from "../model/Clients";

export default class ClientController {
    private readonly clientModel: Repository<Client>

    constructor() {
        this.clientModel = dbConnector.getRepository(Client)
    }

    async getAll(): Promise<Client[]> {
        const clients = await this.clientModel.findBy({
            status: status.ACTIVE
        })
        return clients
    }

    async getById(id: number): Promise<Client> {
        const person = await this.clientModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!person) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return person
    }

    async create(client: Client): Promise<Client> {
        const newPerson = await this.clientModel.save({
            personalId: client.personalId,
            createdAt: client.createdAt,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newPerson
    }

    async update(client: Client): Promise<Client> {
        const newPerson = await this.clientModel.save({
            id: client.id,
            personalId: client.personalId,
            createdAt: client.createdAt,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newPerson
    }

    async remove(id: number): Promise<Client> {
        const newClient = await this.clientModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newClient) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newClient
    }

}