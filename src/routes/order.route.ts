import { Router, Request, Response } from "express";

// Controllers
import { orderControler } from "../controllers";

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
    router.get("/getall/:user_id", orderControler.getOrders);

    // @route POST /order/create
    // @desc POST create a new ORDER
    // @access PUBLIC
    router.post("/create", orderControler.createOrder);

    // @route GET /order/get/:order_id/:user_id
    // @desc GET a ORDER by ID
    // @access PUBLIC
    router.get("/get/:order_id/:user_id", orderControler.getOrderById);

    // @route PUT /order/update
    // @desc Update ORDER info
    // @access PUBLIC
    router.put("/update", orderControler.updateOrderProduct);

    // @route DELETE /order/delete/product/:user_id/:odetail_id
    // @desc Delete a PRODUCT from an ORDER
    // @access PUBLIC
    router.delete("/delete/product/:user_id/:odetail_id", orderControler.deleteProductOrder);

    // @route DELETE /order/delete/product/:user_id/:odetail_id
    // @desc Delete an ORDER
    // @access PUBLIC
    router.delete("/delete/order/:user_id/:order_id", orderControler.deleteOrder);

    return router;
};
