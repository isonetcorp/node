import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/autenticate.midleware.js";


const router = Router();

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(authenticateToken, userController.getUser)
    .put(authenticateToken, userController.updateUser)
    .patch(authenticateToken, userController.activateInactivate)
    .delete(authenticateToken, userController.deleteUser);

router.get('/:id/tasks', authenticateToken, userController.getTasks);

export default router;