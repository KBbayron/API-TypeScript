import { Router } from "express";
import bodyParser from "body-parser";
import OrderStatue from "../model/OrderStatues";
import OrderStatueController from "../controller/OrderStatues";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const orderStatueCtrl = new OrderStatueController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de orderStatueas",
                "Se ha obtenido la lista de orderStatueas exitosamente",
                await orderStatueCtrl.getAll()
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
                "Error al obtener la lista de orderStatueas"
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
                "orderStatuea encontrada",
                "Se ha obtenido la orderStatuea consultada exitosamente",
                await orderStatueCtrl.getById(+id)
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
                "Error al obtener la orderStatuea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, code, secondLastName } = req.body
        if (!name || !code || !secondLastName) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderStatue = new OrderStatue()
        orderStatue.name = name
        orderStatue.code = code
        return res.status(200).json(
            new BaseResponse(
                "Creacion de orderStatuea",
                "Se ha creado la orderStatuea exitosamente",
                await orderStatueCtrl.create(orderStatue)
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
                "Error al crear la orderStatuea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, code, secondLastName } = req.body
        if (!id || !name || !code || !secondLastName) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const orderStatue = new OrderStatue()
        orderStatue.id = +id
        orderStatue.name = name
        orderStatue.code = code
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de orderStatuea",
                "Se ha actualizado la orderStatuea exitosamente",
                await orderStatueCtrl.update(orderStatue)
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
                "Error al actualizar la orderStatuea"
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
                "Eliminacion de orderStatuea",
                "Se ha eliminado la orderStatuea exitosamente",
                await orderStatueCtrl.remove(+id)
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
                "Error al eliminar la orderStatuea"
            )
        )
    }
})

export default router