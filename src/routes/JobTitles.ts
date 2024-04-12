import { Router } from "express";
import bodyParser from "body-parser";
import JobTitle from "../model/JobTitles";
import JobTitleController from "../controller/JobTitles";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const JobTitleCtrl = new JobTitleController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de JobTitleas",
                "Se ha obtenido la lista de JobTitleas exitosamente",
                await JobTitleCtrl.getAll()
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
                "Error al obtener la lista de JobTitleas"
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
                "JobTitlea encontrada",
                "Se ha obtenido la JobTitlea consultada exitosamente",
                await JobTitleCtrl.getById(+id)
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
                "Error al obtener la JobTitlea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, code,} = req.body
        if (!name || !code) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const jobTitle = new JobTitle()
        jobTitle.name = name
        jobTitle.code = code
        return res.status(200).json(
            new BaseResponse(
                "Creacion de JobTitlea",
                "Se ha creado la JobTitlea exitosamente",
                await JobTitleCtrl.create(jobTitle)
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
                "Error al crear la JobTitlea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, code } = req.body
        if (!id || !name || !code ) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const jobTitle = new JobTitle()
        jobTitle.id = +id
        jobTitle.name = name
        jobTitle.code = code
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de JobTitlea",
                "Se ha actualizado la JobTitlea exitosamente",
                await JobTitleCtrl.update(jobTitle)
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
                "Error al actualizar la JobTitlea"
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
                "Eliminacion de JobTitlea",
                "Se ha eliminado la JobTitlea exitosamente",
                await JobTitleCtrl.remove(+id)
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
                "Error al eliminar la JobTitlea"
            )
        )
    }
})

export default router