import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import Person from "../model/Persons";
import ResponseError from "../response/ResponseError";
import BaseResponse from "../response/BaseResponse";
import status from "../model/enums/status";

export default class PersonController {
    private readonly personModel: Repository<Person>

    constructor() {
        this.personModel = dbConnector.getRepository(Person)
    }

    async getAll(): Promise<Person[]> {
        const persons = await this.personModel.findBy({
            status: status.ACTIVE
        })
        return persons
    }

    async getById(id: number): Promise<Person> {
        const person = await this.personModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!person) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una persona con el id proporcionado"
            )
        }
        return person
    }

    async create(person: Person): Promise<Person> {
        const newPerson = await this.personModel.save({
            name: person.name,
            firstLastName: person.firstLastName,
            secondLastName: person.secondLastName,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear la persona, intente nuevamente."
            )
        }
        return newPerson
    }

    async update(person: Person): Promise<Person> {
        const newPerson = await this.personModel.save({
            id: person.id,
            name: person.name,
            firstLastName: person.firstLastName,
            secondLastName: person.secondLastName,
            status: status.ACTIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar la persona, intente nuevamente."
            )
        }
        return newPerson
    }

    async remove(id: number): Promise<Person> {
        const newPerson = await this.personModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newPerson) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar la persona, intente nuevamente."
            )
        }
        return newPerson
    }

}