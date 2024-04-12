import { Router } from "express";
import bodyParser from "body-parser";
import ProductCategorie from "../model/ProductCategories";
import ProductCategorieController from "../controller/ProductCategories";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const productCategorieCtrl = new ProductCategorieController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de productCategorieas",
                "Se ha obtenido la lista de productCategorieas exitosamente",
                await productCategorieCtrl.getAll()
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
                "Error al obtener la lista de productCategorieas"
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
                "productCategoriea encontrada",
                "Se ha obtenido la productCategoriea consultada exitosamente",
                await productCategorieCtrl.getById(+id)
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
                "Error al obtener la productCategoriea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { name, code} = req.body
        if (!name || !code) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const productCategorie = new ProductCategorie()
        productCategorie.name = name
        productCategorie.code = code
        return res.status(200).json(
            new BaseResponse(
                "Creacion de productCategoriea",
                "Se ha creado la productCategoriea exitosamente",
                await productCategorieCtrl.create(productCategorie)
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
                "Error al crear la productCategoriea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const { name, code} = req.body
        if (!name || !code) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const productCategorie = new ProductCategorie()
        productCategorie.id = +id
        productCategorie.name = name
        productCategorie.code = code
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de productCategoriea",
                "Se ha actualizado la productCategoriea exitosamente",
                await productCategorieCtrl.update(productCategorie)
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
                "Error al actualizar la productCategoriea"
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
                "Eliminacion de productCategoriea",
                "Se ha eliminado la productCategoriea exitosamente",
                await productCategorieCtrl.remove(+id)
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
                "Error al eliminar la productCategoriea"
            )
        )
    }
})

export default router