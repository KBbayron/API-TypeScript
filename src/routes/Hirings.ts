import { Router } from "express";
import bodyParser from "body-parser";
import Hiring from "../model/Hirings";
import hiringController from "../controller/Hirings";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";


const router = Router()
const hiringCtrl = new hiringController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de personas",
                "Se ha obtenido la lista de personas exitosamente",
                await hiringCtrl.getAll()
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
                "Error al obtener la lista de personas"
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
                "Persona encontrada",
                "Se ha obtenido la persona consultada exitosamente",
                await hiringCtrl.getById(+id)
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
                "Error al obtener la persona"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const {hiringTypeId, salary, endDate, startDate, description } = req.body
        if (!hiringTypeId || !salary || !endDate || !startDate  || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const hiring = new Hiring()
        hiring.hiringTypeId= hiringTypeId
        hiring.salary =salary
        hiring.startDate=startDate
        hiring.endDate=endDate
        hiring.description=description
        return res.status(200).json(
            new BaseResponse(
                "Creacion de persona",
                "Se ha creado la persona exitosamente",
                await hiringCtrl.create(hiring)
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
                "Error al crear la persona"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const {hiringTypeId, salary, endDate, startDate, description } = req.body
        if (!id || !hiringTypeId || !salary || !endDate || !startDate  || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const hiring = new Hiring()
        hiring.id = +id
        hiring.hiringTypeId= hiringTypeId
        hiring.salary =salary
        hiring.startDate=startDate
        hiring.endDate=endDate
        hiring.description=description
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de persona",
                "Se ha actualizado la persona exitosamente",
                await hiringCtrl.update(hiring)
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
                "Error al actualizar la persona"
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
                "Eliminacion de persona",
                "Se ha eliminado la persona exitosamente",
                await hiringCtrl.remove(+id)
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
                "Error al eliminar la persona"
            )
        )
    }
})

export default router