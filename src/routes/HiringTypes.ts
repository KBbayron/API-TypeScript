import { Router } from "express";
import bodyParser from "body-parser";
import hiringTypeController from "../controller/HiringTypes";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";
import HiringType from "../model/HiringTypes";

const router = Router()
const hiringTypeCtrl = new hiringTypeController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de hiringTypeas",
                "Se ha obtenido la lista de hiringTypeas exitosamente",
                await hiringTypeCtrl.getAll()
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
                "Error al obtener la lista de hiringTypeas"
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
                "hiringTypea encontrada",
                "Se ha obtenido la hiringTypea consultada exitosamente",
                await hiringTypeCtrl.getById(+id)
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
                "Error al obtener la hiringType"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, code } = req.body
        if (!name || !code) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const hiringType = new HiringType()
        hiringType.name = name
        hiringType.code = code
        return res.status(200).json(
            new BaseResponse(
                "Creacion de hiringTypea",
                "Se ha creado la hiringType exitosamente",
                await hiringTypeCtrl.create(hiringType)
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
                "Error al crear la hiringTypea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, code } = req.body
        if (!id ||!name || !code) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const hiringType = new HiringType()
        hiringType.id = +id
        hiringType.name = name
        hiringType.code = code
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de hiringTypea",
                "Se ha actualizado la hiringTypea exitosamente",
                await hiringTypeCtrl.update(hiringType)
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
                "Error al actualizar la hiringTypea"
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
                "Eliminacion de hiringTypea",
                "Se ha eliminado la hiringTypea exitosamente",
                await hiringTypeCtrl.remove(+id)
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
                "Error al eliminar la hiringTypea"
            )
        )
    }
})

export default router