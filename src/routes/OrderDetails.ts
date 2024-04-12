import { Router } from "express";
import bodyParser from "body-parser";
import OrderDetails from "../model/OrderDetails";
import orderDetailsController from "../controller/OrderDetails";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const orderDetailsCtrl = new orderDetailsController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de orderDetailsas",
                "Se ha obtenido la lista de orderDetailsas exitosamente",
                await orderDetailsCtrl.getAll()
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
                "Error al obtener la lista de orderDetailsas"
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
                "orderDetailsa encontrada",
                "Se ha obtenido la orderDetailsa consultada exitosamente",
                await orderDetailsCtrl.getById(+id)
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
                "Error al obtener la orderDetailsa"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { orderId, productId, quantity, description, amount} = req.body
        if ( !orderId || !productId || !quantity || !description || !amount) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderDetails = new OrderDetails()
        orderDetails.orderId = orderId
        orderDetails.productId = productId
        orderDetails.quantity = quantity
        orderDetails.description = description
        orderDetails.amount = amount
        return res.status(200).json(
            new BaseResponse(
                "Creacion de orderDetailsa",
                "Se ha creado la orderDetailsa exitosamente",
                await orderDetailsCtrl.create(orderDetails)
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
                "Error al crear la orderDetailsa"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { orderId, productId, quantity, description, amount} = req.body
        if (!id || !orderId || !productId || !quantity || !description || !amount) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderDetails = new OrderDetails()
        orderDetails.id = +id
        orderDetails.orderId = orderId
        orderDetails.productId = productId
        orderDetails.quantity = quantity
        orderDetails.description = description
        orderDetails.amount = amount
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de orderDetailsa",
                "Se ha actualizado la orderDetailsa exitosamente",
                await orderDetailsCtrl.update(orderDetails)
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
                "Error al actualizar la orderDetailsa"
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
                "Eliminacion de orderDetailsa",
                "Se ha eliminado la orderDetailsa exitosamente",
                await orderDetailsCtrl.remove(+id)
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
                "Error al eliminar la orderDetailsa"
            )
        )
    }
})

export default router