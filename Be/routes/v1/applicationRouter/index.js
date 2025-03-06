import { Router } from "express";
import middlewares from "../../../middlewares/index.js";
import UserMiddleware from "../../../middlewares/userMiddleware.js";
import UserController from "../../../controllers/userController.js";
const ApplicationRouter = Router();

ApplicationRouter.post("/registerProvider/:id", middlewares.verifyAccessToken, middlewares.validateAdminOrAccountOwner, UserController.registerProvider); // Đăng ký làm provider. Chờ admin duyệt

export default ApplicationRouter;