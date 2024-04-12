import { Router } from "express";
import bodyParser from "body-parser";
import JobTitlePermissions from "../model/JobTitlesPermissions";
import JobTitlePermissionsController from "../controller/JobTitlesPermissions";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const JobTitlePermissionsCtrl = new JobTitlePermissionsController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de JobTitlePermissionsas",
                "Se ha obtenido la lista de JobTitlePermissionsas exitosamente",
                await JobTitlePermissionsCtrl.getAll()
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
                "Error al obtener la lista de JobTitlePermissionsas"
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
                "JobTitlePermissionsa encontrada",
                "Se ha obtenido la JobTitlePermissionsa consultada exitosamente",
                await JobTitlePermissionsCtrl.getById(+id)
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
                "Error al obtener la JobTitlePermissionsa"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { personId, institutionId, startDate, endDate} = req.body
        if (!personId || !institutionId || !startDate || !endDate) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const jobTitlePermissions = new JobTitlePermissions()
        jobTitlePermissions.personId = personId
        jobTitlePermissions.institutionId = institutionId
        jobTitlePermissions.startDate = startDate
        jobTitlePermissions.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Creacion de JobTitlePermissionsa",
                "Se ha creado la JobTitlePermissionsa exitosamente",
                await JobTitlePermissionsCtrl.create(jobTitlePermissions)
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
                "Error al crear la JobTitlePermissionsa"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { personId, institutionId, startDate,  endDate} = req.body
        if (!id || !personId || !institutionId || !startDate || !endDate) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const jobTitlePermissions = new JobTitlePermissions()
        jobTitlePermissions.id = +id
        jobTitlePermissions.personId = personId
        jobTitlePermissions.institutionId = institutionId
        jobTitlePermissions.startDate = startDate
        jobTitlePermissions.endDate = endDate
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de JobTitlePermissionsa",
                "Se ha actualizado la JobTitlePermissionsa exitosamente",
                await JobTitlePermissionsCtrl.update(jobTitlePermissions)
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
                "Error al actualizar la JobTitlePermissionsa"
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
                "Eliminacion de JobTitlePermissionsa",
                "Se ha eliminado la JobTitlePermissionsa exitosamente",
                await JobTitlePermissionsCtrl.remove(+id)
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
                "Error al eliminar la JobTitlePermissionsa"
            )
        )
    }
})

export default router