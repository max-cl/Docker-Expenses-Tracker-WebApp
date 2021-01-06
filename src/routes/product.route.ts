import { Router, Request, Response } from "express";

// Controllers
import { productController } from "../controllers";

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
    router.get("/getall/:user_id", productController.getProducts);

    // // @route POST /product/create
    // // @desc POST create a new Product
    // // @access PUBLIC
    router.post("/create", productController.createProduct);

    // // @route GET /product/get/:id
    // // @desc GET a Product by ID
    // // @access PUBLIC
    router.get("/get/:user_id/:product_id", productController.getProductById);

    // // @route PUT /product/update
    // // @desc Update Product info
    // // @access PUBLIC
    router.put("/update", productController.updateProduct);

    // // @route DELETE /product/delete/:user_id/:id
    // // @desc Delete a Product
    // // @access PUBLIC
    router.delete("/delete/:user_id/:product_id", productController.deleteProduct);

    return router;
};
