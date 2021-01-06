import { Request, Response, NextFunction } from "express";
import passport from "passport";

// Services
import { ProductService } from "services/product.service";

// Interfaces
import { ProductCreate, ProductUpdate } from "interfaces/product.interface";

export class ProductController {
    constructor(private productService: ProductService) {}

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const data = await this.productService.getAllProducts();
                    if (data.length > 0) {
                        console.log("DATA: ", data);
                        res.status(200).json({ data });
                    } else {
                        console.log("There is not product for this user");
                        res.status(404).send("There is not product for this user");
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

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.body.user_id, 10)) {
                try {
                    const { product_name, in_stock, price, category_id } = <ProductCreate>req.body;
                    const newProduct = await this.productService.createNewProduct(product_name, in_stock, price, category_id);
                    console.log("DATA: ", newProduct);
                    res.status(200).json(newProduct);
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.error("jwt id and username do not match");
                res.status(403).send("username and jwt token do not match");
            }
        })(req, res, next);
    };

    public getProductById = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const { product_id } = req.params;
                    const data = await this.productService.getProductById(parseInt(product_id, 10));
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

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.body.user_id, 10)) {
                try {
                    const { product_id, category_id, product_name, in_stock, price } = <ProductUpdate>req.body;
                    const productUpdated = await this.productService.updateInfoProduct(product_id, category_id, product_name, in_stock, price);

                    if (productUpdated[0] === 1) {
                        console.log(`Product (id: ${product_id}) was updated.`);
                        res.status(200).json({ message: "success" });
                    } else {
                        console.log(`Product (id: ${product_id}) doesn't exist.`);
                        res.status(200).json({ message: `Product (id: ${product_id}) doesn't exist.` });
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

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if (err) console.log(err);
            if (info !== undefined) {
                console.log(info.message);
                res.status(401).send(info.message);
            } else if (parseInt(user.user_id, 10) === parseInt(req.params.user_id, 10)) {
                try {
                    const { product_id } = req.params;
                    const productDeleted = await this.productService.removeProduct(parseInt(product_id, 10));
                    if (productDeleted === 1) {
                        console.log(`Product (id: ${product_id}) deleted.`);
                        res.status(200).json({ message: "success" });
                    } else {
                        console.log(`Product (id: ${product_id}) doesn't exist.`);
                        res.status(200).json({ message: `Product (id: ${product_id}) doesn't exist.` });
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
