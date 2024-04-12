import { Router } from "express";
import bodyParser from "body-parser";
import CampusContacts from "../model/CampusContacts";
import CampusContactsController from "../controller/CampusContacts";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";


const router = Router()
const campusCtrl = new CampusContactsController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de personas",
                "Se ha obtenido la lista de personas exitosamente",
                await campusCtrl.getAll()
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
                await campusCtrl.getById(+id)
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
        const { contactId, name, campusId, description  } = req.body
        if (!contactId || !name || !campusId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const campusContacts = new CampusContacts()

        campusContacts.contactId= contactId
        campusContacts.campusId =campusId
        campusContacts.description=description
        return res.status(200).json(
            new BaseResponse(
                "Creacion de persona",
                "Se ha creado la persona exitosamente",
                await campusCtrl.create(campusContacts)
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
        const { contactId, name, campusId, description } = req.body
        if (!id || !contactId || !name || !campusId || !description) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const campusContacts = new CampusContacts()
        campusContacts.id = +id
        campusContacts.contactId= contactId
        campusContacts.campusId =campusId
        campusContacts.description=description
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de persona",
                "Se ha actualizado la persona exitosamente",
                await campusCtrl.update(campusContacts)
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
                await campusCtrl.remove(+id)
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