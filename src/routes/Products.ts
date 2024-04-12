import { Router } from "express";
import bodyParser from "body-parser";
import Product from "../model/Products";
import ProductController from "../controller/Products";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const productCtrl = new ProductController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de productas",
                "Se ha obtenido la lista de productas exitosamente",
                await productCtrl.getAll()
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
                "Error al obtener la lista de productas"
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
                "producta encontrada",
                "Se ha obtenido la producta consultada exitosamente",
                await productCtrl.getById(+id)
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
                "Error al obtener la producta"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { categoryId, institutionId, name, description,image } = req.body
        if (!categoryId || !institutionId || !name || !description || !image) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const product = new Product()
        product.categoryId = categoryId
        product.institutionId = institutionId
        product.name = name
        product.description = description
        product.image = image
        return res.status(200).json(
            new BaseResponse(
                "Creacion de producta",
                "Se ha creado la producta exitosamente",
                await productCtrl.create(product)
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
                "Error al crear la producta"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { categoryId, institutionId, name, description,image } = req.body
        if (!id || !categoryId || !institutionId || !name || !description || !image) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const product = new Product()
        product.id = +id
        product.categoryId = categoryId
        product.institutionId = institutionId
        product.name = name
        product.description = description
        product.image = image
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de producta",
                "Se ha actualizado la producta exitosamente",
                await productCtrl.update(product)
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
                "Error al actualizar la producta"
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
                "Eliminacion de producta",
                "Se ha eliminado la producta exitosamente",
                await productCtrl.remove(+id)
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
                "Error al eliminar la producta"
            )
        )
    }
})

export default router