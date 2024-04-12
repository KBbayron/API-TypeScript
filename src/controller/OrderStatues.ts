import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import orderStatues from "../model/OrderStatues";

export default class orderStatuesController {
    private readonly orderStatuesModel: Repository<orderStatues>

    constructor() {
        this.orderStatuesModel = dbConnector.getRepository(orderStatues)
    }

    async getAll(): Promise<orderStatues[]> {
        const orderStatues = await this.orderStatuesModel.findBy({
            status: status.ACTIVE
        })
        return orderStatues
    }

    async getById(id: number): Promise<orderStatues> {
        const orderStatues = await this.orderStatuesModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!orderStatues) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un orderStatues con el id proporcionado"
            )
        }
        return orderStatues
    }

    async create(orderStatues: orderStatues): Promise<orderStatues> {
        const neworderStatues = await this.orderStatuesModel.save({
            name: orderStatues.name,
            code:orderStatues.name,
            status: status.ACTIVE
        })
        if (!neworderStatues) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el orderStatues, intente nuevamente."
            )
        }
        return neworderStatues
    }

    async update(orderStatues: orderStatues): Promise<orderStatues> {
        const neworderStatues = await this.orderStatuesModel.save({
            id: orderStatues.id,
            name: orderStatues.name,
            code:orderStatues.name,
            status: status.ACTIVE
        })
        if (!neworderStatues) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el orderStatues, intente nuevamente."
            )
        }
        return neworderStatues
    }

    async remove(id: number): Promise<orderStatues> {
        const neworderStatues = await this.orderStatuesModel.save({
            id,
            status: status.INCATIVE
        })
        if (!neworderStatues) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el orderStatues, intente nuevamente."
            )
        }
        return neworderStatues
    }

}