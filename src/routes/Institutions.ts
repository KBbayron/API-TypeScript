import { Router } from "express";
import bodyParser from "body-parser";
import Institution from "../model/Institutions";
import InstitutionController from "../controller/Institutions";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const InstitutionCtrl = new InstitutionController ()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de Institutionas",
                "Se ha obtenido la lista de Institutionas exitosamente",
                await InstitutionCtrl.getAll()
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
                "Error al obtener la lista de Institutionas"
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
                "Institutiona encontrada",
                "Se ha obtenido la Institutiona consultada exitosamente",
                await InstitutionCtrl.getById(+id)
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
                "Error al obtener la Institutiona"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { typeId, description, name } = req.body
        if (!typeId|| !description || !name) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institution = new Institution()
        institution.typeId = typeId
        institution.description = description
        institution.name = name
        return res.status(200).json(
            new BaseResponse(
                "Creacion de Institutiona",
                "Se ha creado la Institutiona exitosamente",
                await InstitutionCtrl.create(institution)
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
                "Error al crear la Institutiona"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { typeId, description, name } = req.body
        if (!id ||!typeId|| !description || !name) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institution = new Institution()
        institution.id = +id
        institution.typeId = typeId
        institution.description = description
        institution.name = name
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de Institutiona",
                "Se ha actualizado la Institutiona exitosamente",
                await InstitutionCtrl.update(institution)
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
                "Error al actualizar la Institutiona"
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
                "Eliminacion de Institutiona",
                "Se ha eliminado la Institutiona exitosamente",
                await InstitutionCtrl.remove(+id)
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
                "Error al eliminar la Institutiona"
            )
        )
    }
})

export default router