import { AuthController } from "controllers/auth.controller";
import { ProductController } from "controllers/product.controller";
import { OrderController } from "controllers/order.controller";

// Services
import { productService, orderService } from "services";

const authController = new AuthController();
const productController = new ProductController(productService);
const orderControler = new OrderController(orderService);

export { authController, productController, orderControler };
