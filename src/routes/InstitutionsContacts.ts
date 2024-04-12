import { Router } from "express";
import bodyParser from "body-parser";
import InstitutionContact from "../model/InstitutionsContacts";
import InstitutionContactController from "../controller/InstitutionsContacts";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const InstitutionContactCtrl = new InstitutionContactController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de InstitutionContactas",
                "Se ha obtenido la lista de InstitutionContactas exitosamente",
                await InstitutionContactCtrl.getAll()
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
                "Error al obtener la lista de InstitutionContactas"
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
                "InstitutionContacta encontrada",
                "Se ha obtenido la InstitutionContacta consultada exitosamente",
                await InstitutionContactCtrl.getById(+id)
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
                "Error al obtener la InstitutionContacta"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { personId, institutionId, startDate, endDate } = req.body
        if (!personId|| !institutionId || !startDate || !endDate ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institutionContact = new InstitutionContact()
        institutionContact.personId = personId
        institutionContact.institutionId = institutionId
        institutionContact.startDate = startDate
        institutionContact.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Creacion de InstitutionContacta",
                "Se ha creado la InstitutionContacta exitosamente",
                await InstitutionContactCtrl.create(institutionContact)
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
                "Error al crear la InstitutionContacta"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { personId, institutionId, startDate, endDate } = req.body
        if (!id || !personId|| !institutionId || !startDate || !endDate) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const institutionContact = new InstitutionContact()
        institutionContact.id = +id
        institutionContact.personId = personId
        institutionContact.institutionId = institutionId
        institutionContact.startDate = startDate
        institutionContact.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de InstitutionContacta",
                "Se ha actualizado la InstitutionContacta exitosamente",
                await InstitutionContactCtrl.update(institutionContact)
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
                "Error al actualizar la InstitutionContacta"
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
                "Eliminacion de InstitutionContacta",
                "Se ha eliminado la InstitutionContacta exitosamente",
                await InstitutionContactCtrl.remove(+id)
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
                "Error al eliminar la InstitutionContacta"
            )
        )
    }
})

export default router