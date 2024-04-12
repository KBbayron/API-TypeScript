import { Router } from "express";
import bodyParser from "body-parser";
import ContactInformation from "../model/ContactInformations";
import ContactInformationsController from "../controller/ContactInformations";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const ContactsInformationCtrl = new ContactInformationsController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de personas",
                "Se ha obtenido la lista de personas exitosamente",
                await ContactsInformationCtrl.getAll()
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
                await ContactsInformationCtrl.getById(+id)
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
        const {  name, code } = req.body
        if (!name || !code ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const contactsInformation = new ContactInformation()
        contactsInformation.name= name
        contactsInformation.code  =code 
        return res.status(200).json(
            new BaseResponse(
                "Creacion de persona",
                "Se ha creado la persona exitosamente",
                await ContactsInformationCtrl.create(contactsInformation)
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
        const {  name, code } = req.body
        if (!id || !name || !code ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const contactsInformation = new ContactInformation()

        contactsInformation.id = +id
        contactsInformation.code = code 
        contactsInformation.name =name
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de persona",
                "Se ha actualizado la persona exitosamente",
                await ContactsInformationCtrl.update(contactsInformation)
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
                await ContactsInformationCtrl.remove(+id)
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