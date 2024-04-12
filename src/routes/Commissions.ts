import { Router } from "express";
import bodyParser from "body-parser";
import Commision from "../model/Commissions";
import CommisionController from "../controller/Commision";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const commisionCtrl = new CommisionController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de commisionas",
                "Se ha obtenido la lista de commisionas exitosamente",
                await commisionCtrl.getAll()
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
                "Error al obtener la lista de commisionas"
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
                "commisiona encontrada",
                "Se ha obtenido la commisiona consultada exitosamente",
                await commisionCtrl.getById(+id)
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
                "Error al obtener la commisiona"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { institutionId, percentage, startDate, endDate } = req.body
        if (!institutionId || !percentage || !startDate ||!endDate) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const commision = new Commision()
        commision.institutionId = institutionId
        commision.percentage = percentage
        commision.startDate = startDate
        commision.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Creacion de commisiona",
                "Se ha creado la commisiona exitosamente",
                await commisionCtrl.create(commision)
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
                "Error al crear la commisiona"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { institutionId, percentage, startDate, endDate } = req.body
        if (!institutionId || !percentage || !startDate ||!endDate) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const commision = new Commision()
        commision.id = +id
        commision.institutionId = institutionId
        commision.percentage = percentage
        commision.startDate = startDate
        commision.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de commisiona",
                "Se ha actualizado la commisiona exitosamente",
                await commisionCtrl.update(commision)
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
                "Error al actualizar la commisiona"
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
                "Eliminacion de commisiona",
                "Se ha eliminado la commisiona exitosamente",
                await commisionCtrl.remove(+id)
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
                "Error al eliminar la commisiona"
            )
        )
    }
})

export default router