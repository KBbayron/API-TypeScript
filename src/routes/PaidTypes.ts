import { Router } from "express";
import bodyParser from "body-parser";
import PaidType from "../model/PaidTypes";
import PaidTypeController from "../controller/PaidTypes";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const paidTypeCtrl = new PaidTypeController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de paidTypeas",
                "Se ha obtenido la lista de paidTypeas exitosamente",
                await paidTypeCtrl.getAll()
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
                "Error al obtener la lista de paidTypeas"
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
                "paidTypea encontrada",
                "Se ha obtenido la paidTypea consultada exitosamente",
                await paidTypeCtrl.getById(+id)
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
                "Error al obtener la paidTypea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, code} = req.body
        if (!name || !code ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const paidType = new PaidType()
        paidType.name = name
        paidType.code = code
        return res.status(200).json(
            new BaseResponse(
                "Creacion de paidTypea",
                "Se ha creado la paidTypea exitosamente",
                await paidTypeCtrl.create(paidType)
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
                "Error al crear la paidTypea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, code} = req.body
        if (!id || !name || !code ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const paidType = new PaidType()
        paidType.id = +id
        paidType.name = name
        paidType.code = code
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de paidTypea",
                "Se ha actualizado la paidTypea exitosamente",
                await paidTypeCtrl.update(paidType)
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
                "Error al actualizar la paidTypea"
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
                "Eliminacion de paidTypea",
                "Se ha eliminado la paidTypea exitosamente",
                await paidTypeCtrl.remove(+id)
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
                "Error al eliminar la paidTypea"
            )
        )
    }
})

export default router