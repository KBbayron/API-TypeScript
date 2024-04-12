import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import orderDetail from "../model/OrderDetails";

export default class orderDetailController {
    private readonly orderDetailModel: Repository<orderDetail>

    constructor() {
        this.orderDetailModel = dbConnector.getRepository(orderDetail)
    }

    async getAll(): Promise<orderDetail[]> {
        const orderDetail = await this.orderDetailModel.findBy({
            status: status.ACTIVE
        })
        return orderDetail
    }

    async getById(id: number): Promise<orderDetail> {
        const orderDetail = await this.orderDetailModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!orderDetail) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un orderDetail con el id proporcionado"
            )
        }
        return orderDetail
    }

    async create(orderDetail: orderDetail): Promise<orderDetail> {
        const neworderDetail = await this.orderDetailModel.save({
            orderId: orderDetail.orderId,
            productId: orderDetail.productId,
            quantity:orderDetail.quantity,
            description:orderDetail.description,
            amount: orderDetail.amount,
            status: status.ACTIVE
        })
        if (!neworderDetail) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el orderDetail, intente nuevamente."
            )
        }
        return neworderDetail
    }

    async update(orderDetail: orderDetail): Promise<orderDetail> {
        const neworderDetail = await this.orderDetailModel.save({
            id: orderDetail.id,
            orderId: orderDetail.orderId,
            productId: orderDetail.productId,
            quantity:orderDetail.quantity,
            description:orderDetail.description,
            amount: orderDetail.amount,
            status: status.ACTIVE
        })
        if (!neworderDetail) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el orderDetail, intente nuevamente."
            )
        }
        return neworderDetail
    }

    async remove(id: number): Promise<orderDetail> {
        const neworderDetail = await this.orderDetailModel.save({
            id,
            status: status.INCATIVE
        })
        if (!neworderDetail) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el orderDetail, intente nuevamente."
            )
        }
        return neworderDetail
    }
}