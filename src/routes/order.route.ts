import { Router, Request, Response } from "express";

// Controllers
import { orderControler } from "../controllers";

// Validator
import { middlewareValidatorBody, middlewareValidatorParams } from "validator/middleware.validator";
import schemas from "../validator/schemas/order.schema";

export const order = () => {
    const router = Router();

    // // @route GET /order
    // // @desc ORDER /
    // // @access PUBLIC
    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "Orders API" });
    });

    // @route GET /order/getall/:user_id
    // @desc Get all ORDERS
    // @access PUBLIC
    router.get("/:user_id", middlewareValidatorParams(schemas.getOrders, "params"), orderControler.getOrders);

    // @route POST /order/create
    // @desc POST create a new ORDER
    // @access PUBLIC
    router.post("/", middlewareValidatorBody(schemas.createOrder, "body"), orderControler.createOrder);

    // @route GET /order/get/:user_id/:order_id
    // @desc GET a ORDER by ID
    // @access PUBLIC
    router.get("/:user_id/:order_id", middlewareValidatorParams(schemas.getOrderById, "params"), orderControler.getOrderById);

    // @route PUT /order/update
    // @desc Update ORDER info
    // @access PUBLIC
    router.put("/", middlewareValidatorBody(schemas.updateOrderProduct, "body"), orderControler.updateOrderProduct);

    // @route DELETE /order/delete/product/:user_id/:odetail_id
    // @desc Delete a PRODUCT from an ORDER
    // @access PUBLIC
    router.delete("/product/:user_id/:odetail_id", middlewareValidatorParams(schemas.deleteProductOrder, "params"), orderControler.deleteProductOrder);

    // @route DELETE /order/delete/product/:user_id/:odetail_id
    // @desc Delete an ORDER
    // @access PUBLIC
    router.delete("/:user_id/:order_id", middlewareValidatorParams(schemas.deleteOrder, "params"), orderControler.deleteOrder);

    return router;
};
