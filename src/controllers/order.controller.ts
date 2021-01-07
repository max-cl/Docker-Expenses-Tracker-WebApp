import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Services
import { OrderService } from "services/order.service";

// Interfaces
import { IOrderCreate, IOrderProductUpdate } from "interfaces/order.interface";

export class OrderController {
    constructor(private orderService: OrderService) {}

    public getOrders = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const data = await this.orderService.getAllOrders();
                    if (data.length > 0) {
                        console.log("DATA: ", data);
                        res.status(200).json({ data });
                    } else {
                        console.log("There is not orders for this user");
                        res.status(404).send("There is not orders for this user");
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public createOrder = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.body.user_id, 10)) {
                try {
                    const { user_id, products } = <IOrderCreate>req.body;
                    const newOrder = await this.orderService.createNewOrder(user_id, products);
                    console.log("DATA: ", newOrder);
                    res.status(201).json({ newOrder, message: "Order created" });
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const { order_id, user_id } = req.params;
                    const data = await this.orderService.getOrderById(parseInt(order_id, 10), parseInt(user_id, 10));
                    if (data.length > 0) {
                        console.log("Found it");
                        res.status(200).json({ data });
                    } else {
                        console.log("There is not data for this ID");
                        res.status(404).send("There is not data for this ID");
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public updateOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.body.user_id, 10)) {
                try {
                    const { odetail_id, quantity } = <IOrderProductUpdate>req.body;
                    const productUpdated = await this.orderService.updateProductFromOrder(odetail_id, quantity);

                    if (productUpdated[0] === 1) {
                        console.log(`Product was updated.`);
                        res.status(200).json({ message: "success" });
                    } else {
                        console.log(`Product doesn't exist.`);
                        res.status(200).json({ message: `Product doesn't exist.` });
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public deleteProductOrder = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const { odetail_id } = req.params;
                    const productDeleted = await this.orderService.removeProductFromOrder(parseInt(odetail_id, 10));
                    if (productDeleted === 1) {
                        console.log(`Product deleted.`);
                        res.status(200).json({ message: "success" });
                    } else {
                        console.log(`Product doesn't exist.`);
                        res.status(200).json({ message: `Product doesn't exist.` });
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const { order_id } = req.params;
                    const productDeleted = await this.orderService.removeOrder(parseInt(order_id, 10));
                    if (productDeleted === 1) {
                        console.log(`Order deleted.`);
                        res.status(200).json({ message: "success" });
                    } else {
                        console.log(`Order doesn't exist.`);
                        res.status(200).json({ message: `Order doesn't exist.` });
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };
}
