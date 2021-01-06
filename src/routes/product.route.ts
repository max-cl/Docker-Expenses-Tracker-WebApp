import { Router, Request, Response } from "express";

// Controllers
import { productController } from "../controllers";

// Validator
import { middlewareValidatorBody, middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/product.schema";

export const product = () => {
    const router = Router();

    // // @route GET /product
    // // @desc Product /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "Product API" });
    });

    // // @route GET /product/getall
    // // @desc Get all Products
    // // @access PUBLIC
    router.get("/getall/:user_id", middlewareValidatorParams(schemas.getAllPoducts, "params"), productController.getProducts);

    // // @route POST /product/create
    // // @desc POST create a new Product
    // // @access PUBLIC
    router.post("/create", middlewareValidatorBody(schemas.createProduct, "body"), productController.createProduct);

    // // @route GET /product/get/:id
    // // @desc GET a Product by ID
    // // @access PUBLIC
    router.get("/get/:user_id/:product_id", middlewareValidatorParams(schemas.getProductById, "params"), productController.getProductById);

    // // @route PUT /product/update
    // // @desc Update Product info
    // // @access PUBLIC
    router.put("/update", middlewareValidatorBody(schemas.updateProduct, "body"), productController.updateProduct);

    // // @route DELETE /product/delete/:user_id/:id
    // // @desc Delete a Product
    // // @access PUBLIC
    router.delete("/delete/:user_id/:product_id", middlewareValidatorParams(schemas.deleteProduct, "params"), productController.deleteProduct);

    return router;
};
