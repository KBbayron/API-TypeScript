import { Router } from "express";
import bodyParser from "body-parser";
import InstitutionType from "../model/InstitutionTypes";
import InstitutionTypeController from "../controller/InstitutionTypes";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const InstitutionTypeCtrl = new InstitutionTypeController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de InstitutionTypeas",
                "Se ha obtenido la lista de InstitutionTypeas exitosamente",
                await InstitutionTypeCtrl.getAll()
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
                "Error al obtener la lista de InstitutionTypeas"
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
                "InstitutionTypea encontrada",
                "Se ha obtenido la InstitutionTypea consultada exitosamente",
                await InstitutionTypeCtrl.getById(+id)
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
                "Error al obtener la InstitutionTypea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, typeId, description } = req.body
        if (!name || !typeId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institutionType = new InstitutionType()
        institutionType.name = name
        institutionType.typeId = typeId
        institutionType.description = description
        return res.status(200).json(
            new BaseResponse(
                "Creacion de InstitutionTypea",
                "Se ha creado la InstitutionTypea exitosamente",
                await InstitutionTypeCtrl.create(institutionType)
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
                "Error al crear la InstitutionTypea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, typeId, description } = req.body
        if (!id || !name || !typeId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institutionType = new InstitutionType()
        institutionType.id = +id
        institutionType.name = name
        institutionType.typeId = typeId
        institutionType.description = description
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de InstitutionTypea",
                "Se ha actualizado la InstitutionTypea exitosamente",
                await InstitutionTypeCtrl.update(institutionType)
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
                "Error al actualizar la InstitutionTypea"
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
                "Eliminacion de InstitutionTypea",
                "Se ha eliminado la InstitutionTypea exitosamente",
                await InstitutionTypeCtrl.remove(+id)
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
                "Error al eliminar la InstitutionTypea"
            )
        )
    }
})

export default router