import { Router } from "express";
import bodyParser from "body-parser";
import ProductSize from "../model/ProductSizes";
import ProductSizeController from "../controller/ProductSizes";
import BaseResponse from "../response/BaseResponse";
import ResponseError from "../response/ResponseError";

const router = Router()
const productSizeCtrl = new ProductSizeController()
const jsonParser = bodyParser.json();

router.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            new BaseResponse(
                "Lista de productSizeas",
                "Se ha obtenido la lista de productSizeas exitosamente",
                await productSizeCtrl.getAll()
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
                "Error al obtener la lista de productSizeas"
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
                "productSizea encontrada",
                "Se ha obtenido la productSizea consultada exitosamente",
                await productSizeCtrl.getById(+id)
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
                "Error al obtener la productSizea"
            )
        )
    }
})

router.post('/', jsonParser, async (req: any, res: any) => {
    try {
        const { productId, sizeId } = req.body
        if ( !productId || !sizeId) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const productSize = new ProductSize()
        productSize.productId = productId
        productSize.sizeId = sizeId
        return res.status(200).json(
            new BaseResponse(
                "Creacion de productSizea",
                "Se ha creado la productSizea exitosamente",
                await productSizeCtrl.create(productSize)
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
                "Error al crear la productSizea"
            )
        )
    }
})

router.put('/:id', jsonParser, async (req: any, res: any) => {
    try {
        const { id } = req.params
        const {  productId, sizeId } = req.body
        if (!id || !productId || !sizeId) {
            throw new ResponseError(
                500,
                "Datos insuficientes",
                "No se han proporcionado los datos minimos requeridos para ejecutar la transaccion."
            )
        }
        const productSize = new ProductSize()
        productSize.id = +id
        productSize.productId = productId
        productSize.sizeId = sizeId
        return res.status(200).json(
            new BaseResponse(
                "Actualizacion de productSizea",
                "Se ha actualizado la productSizea exitosamente",
                await productSizeCtrl.update(productSize)
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
                "Error al actualizar la productSizea"
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
                "Eliminacion de productSizea",
                "Se ha eliminado la productSizea exitosamente",
                await productSizeCtrl.remove(+id)
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
                "Error al eliminar la productSizea"
            )
        )
    }
})

export default router