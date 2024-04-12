import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import orderPaids from "../model/OrderPaids";

export default class orderPaidsController {
    private readonly orderPaidsModel: Repository<orderPaids>

    constructor() {
        this.orderPaidsModel = dbConnector.getRepository(orderPaids)
    }

    async getAll(): Promise<orderPaids[]> {
        const orderPaids = await this.orderPaidsModel.findBy({
            status: status.ACTIVE
        })
        return orderPaids
    }

    async getById(id: number): Promise<orderPaids> {
        const orderPaids = await this.orderPaidsModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!orderPaids) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un orderPaids con el id proporcionado"
            )
        }
        return orderPaids
    }

    async create(orderPaids: orderPaids): Promise<orderPaids> {
        const neworderPaids = await this.orderPaidsModel.save({
            typeId: orderPaids.typeId,
            orderId: orderPaids.orderId,
            paidTypeId:orderPaids.paidTypeId,
            amount:orderPaids.amount,
            status: status.ACTIVE
        })
        if (!neworderPaids) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el orderPaids, intente nuevamente."
            )
        }
        return neworderPaids
    }

    async update(orderPaids: orderPaids): Promise<orderPaids> {
        const neworderPaids = await this.orderPaidsModel.save({
            typeId: orderPaids.typeId,
            orderId: orderPaids.orderId,
            paidTypeId:orderPaids.paidTypeId,
            amount:orderPaids.amount,
            status: status.ACTIVE
        })
        if (!neworderPaids) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el orderPaids, intente nuevamente."
            )
        }
        return neworderPaids
    }

    async remove(id: number): Promise<orderPaids> {
        const neworderPaids = await this.orderPaidsModel.save({
            id,
            status: status.INCATIVE
        })
        if (!neworderPaids) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el orderPaids, intente nuevamente."
            )
        }
        return neworderPaids
    }

}