import { Router } from "express";
import bodyParser from "body-parser";
import OrderPaid from "../model/OrderPaids";
import OrderPaidController from "../controller/OrderPaids";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const orderPaidCtrl = new OrderPaidController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de orderPaidas",
                "Se ha obtenido la lista de orderPaidas exitosamente",
                await orderPaidCtrl.getAll()
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
                "Error al obtener la lista de orderPaidas"
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
                "orderPaida encontrada",
                "Se ha obtenido la orderPaida consultada exitosamente",
                await orderPaidCtrl.getById(+id)
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
                "Error al obtener la orderPaida"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { typeId, orderId, paidTypeId,amount } = req.body
        if (!typeId || !orderId|| !paidTypeId || !amount) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderPaid = new OrderPaid()
        orderPaid.typeId = typeId
        orderPaid.orderId = orderId
        orderPaid.paidTypeId = paidTypeId
        orderPaid.amount = amount
        return res.status(200).json(
            new BaseResponse(
                "Creacion de orderPaida",
                "Se ha creado la orderPaida exitosamente",
                await orderPaidCtrl.create(orderPaid)
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
                "Error al crear la orderPaida"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { typeId, orderId, paidTypeId,amount } = req.body
        if (!id ||!typeId || !orderId|| !paidTypeId || !amount) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderPaid = new OrderPaid()
        orderPaid.typeId = typeId
        orderPaid.orderId = orderId
        orderPaid.paidTypeId = paidTypeId
        orderPaid.amount = amount
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de orderPaida",
                "Se ha actualizado la orderPaida exitosamente",
                await orderPaidCtrl.update(orderPaid)
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
                "Error al actualizar la orderPaida"
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
                "Eliminacion de orderPaida",
                "Se ha eliminado la orderPaida exitosamente",
                await orderPaidCtrl.remove(+id)
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
                "Error al eliminar la orderPaida"
            )
        )
    }
})

export default router