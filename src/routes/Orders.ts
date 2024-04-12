import { Router } from "express";
import bodyParser from "body-parser";
import Order from "../model/Orders";
import OrderController from "../controller/Orders";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const OrderCtrl = new OrderController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de Orderas",
                "Se ha obtenido la lista de Orderas exitosamente",
                await OrderCtrl.getAll()
            )
        )
    } catch (error) {
        if (error instanceof ResponseError) {
            return res.status(404).json(Object.assign(error))
        }
        return res.status(500).json(
            new ResponseError(
                500,
                "Error!",
                "Error al obtener la lista de Orderas"
            )
        )
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        return res.status(200).json(
            new BaseResponse(
                "Ordera encontrada",
                "Se ha obtenido la Ordera consultada exitosamente",
                await OrderCtrl.getById(+id)
            )
        )
    } catch (error) {
        if (error instanceof ResponseError) {
            return res.status(404).json(Object.assign(error))
        }
        return res.status(500).json(
            new ResponseError(
                500,
                "Error!",
                "Error al obtener la Ordera"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { ClientsId, EmployeeId, OrderStatuesId,pendingAmount  ,discount  ,idPaid  ,date  } = req.body
        if (!ClientsId || !EmployeeId || !OrderStatuesId || !pendingAmount  || !discount  || !idPaid || ! date) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const order = new Order()
        order.ClientsId = ClientsId
        order.EmployeeId = EmployeeId
        order.OrderStatuesId = OrderStatuesId
        order.pendingAmount = pendingAmount
        order.discount = discount
        order.idPaid = idPaid
        order. date =  date
        return res.status(200).json(
            new BaseResponse(
                "Creacion de Ordera",
                "Se ha creado la Ordera exitosamente",
                await OrderCtrl.create(order)
            )
        )
    } catch (error) {
        if (error instanceof ResponseError) {
            return res.status(404).json(Object.assign(error))
        }
        return res.status(500).json(
            new ResponseError(
                500,
                "Error!",
                "Error al crear la Ordera"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { ClientsId, EmployeeId, OrderStatuesId,pendingAmount  ,discount  ,idPaid  ,date  } = req.body
        if (!ClientsId || !EmployeeId || !OrderStatuesId || !pendingAmount  || !discount  || !idPaid || ! date) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const order = new Order()
        order.id = +id
        order.ClientsId = ClientsId
        order.EmployeeId = EmployeeId
        order.OrderStatuesId = OrderStatuesId
        order.pendingAmount = pendingAmount
        order.discount = discount
        order.idPaid = idPaid
        order. date =  date
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de Ordera",
                "Se ha actualizado la Ordera exitosamente",
                await OrderCtrl.update(order)
            )
        )
    } catch (error) {
        if (error instanceof ResponseError) {
            return res.status(404).json(Object.assign(error))
        }
        return res.status(500).json(
            new ResponseError(
                500,
                "Error!",
                "Error al actualizar la Ordera"
            )
        )
    }
})

router.delete('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        return res.status(200).json(
            new BaseResponse(
                "Eliminacion de Ordera",
                "Se ha eliminado la Ordera exitosamente",
                await OrderCtrl.remove(+id)
            )
        )
    } catch (error) {
        if (error instanceof ResponseError) {
            return res.status(404).json(Object.assign(error))
        }
        return res.status(500).json(
            new ResponseError(
                500,
                "Error!",
                "Error al eliminar la Ordera"
            )
        )
    }
})

export default router