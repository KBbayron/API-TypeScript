import { Router } from "express";
import bodyParser from "body-parser";
import PersonaContact from "../model/PersonalContacts";
import PersonaContactController from "../controller/PersonalContacts";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const personaContactCtrl = new PersonaContactController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de personaContactas",
                "Se ha obtenido la lista de personaContactas exitosamente",
                await personaContactCtrl.getAll()
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
                "Error al obtener la lista de personaContactas"
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
                "personaContacta encontrada",
                "Se ha obtenido la personaContacta consultada exitosamente",
                await personaContactCtrl.getById(+id)
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
                "Error al obtener la personaContacta"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { personId, contactId, description } = req.body
        if ( !personId || !contactId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const personaContact = new PersonaContact()
        personaContact.personId = personId
        personaContact.contactId = contactId
        personaContact.description = description
        return res.status(200).json(
            new BaseResponse(
                "Creacion de personaContacta",
                "Se ha creado la personaContacta exitosamente",
                await personaContactCtrl.create(personaContact)
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
                "Error al crear la personaContacta"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { personId, contactId, description } = req.body
        if (!id || !personId || !contactId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const personaContact = new PersonaContact()
        personaContact.id = +id
        personaContact.personId = personId
        personaContact.contactId = contactId
        personaContact.description = description
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de personaContacta",
                "Se ha actualizado la personaContacta exitosamente",
                await personaContactCtrl.update(personaContact)
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
                "Error al actualizar la personaContacta"
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
                "Eliminacion de personaContacta",
                "Se ha eliminado la personaContacta exitosamente",
                await personaContactCtrl.remove(+id)
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
                "Error al eliminar la personaContacta"
            )
        )
    }
})

export default router