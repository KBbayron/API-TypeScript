import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import order from "../model/Orders";

export default class orderController {
    private readonly orderModel: Repository<order>

    constructor() {
        this.orderModel = dbConnector.getRepository(order)
    }

    async getAll(): Promise<order[]> {
        const order = await this.orderModel.findBy({
            status: status.ACTIVE
        })
        return order
    }

    async getById(id: number): Promise<order> {
        const order = await this.orderModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!order) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado un order con el id proporcionado"
            )
        }
        return order
    }

    async create(order: order): Promise<order> {
        const neworder = await this.orderModel.save({
            ClientsId: order.ClientsId,
            EmployeeId: order.EmployeeId,
            OrderStatuesId:order.OrderStatuesId,
            pendingAmount: order.pendingAmount,
            discount: order.discount,
            idPaid:order.idPaid,
            date: order.date,
            status: status.ACTIVE
        })
        if (!neworder) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el order, intente nuevamente."
            )
        }
        return neworder
    }

    async update(order: order): Promise<order> {
        const neworder = await this.orderModel.save({
            id: order.id,
            ClientsId: order.ClientsId,
            EmployeeId: order.EmployeeId,
            OrderStatuesId:order.OrderStatuesId,
            pendingAmount: order.pendingAmount,
            discount: order.discount,
            idPaid:order.idPaid,
            date: order.date,
            status: status.ACTIVE
        })
        if (!neworder) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el order, intente nuevamente."
            )
        }
        return neworder
    }

    async remove(id: number): Promise<order> {
        const neworder = await this.orderModel.save({
            id,
            status: status.INCATIVE
        })
        if (!neworder) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el order, intente nuevamente."
            )
        }
        return neworder
    }

}