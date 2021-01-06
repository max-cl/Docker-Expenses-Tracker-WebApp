import { AuthService } from "services/auth.service";
import { ProductService } from "services/product.service";
import { OrderService } from "services/order.service";

// Models
import { db } from "models";

const authService = new AuthService(db);
const productService = new ProductService(db);
const orderService = new OrderService(db);

export { authService, productService, orderService };
