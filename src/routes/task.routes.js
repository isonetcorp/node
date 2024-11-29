import { Router } from "express";
import taskController from "../controllers/task.controller.js";

const router = Router();

router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

router.route('/:id')
    .get(taskController.getTask)
    .post(taskController.createTask)
    .put(taskController.updateTask)
    .patch(taskController.taskDone)
    .delete(taskController.deleteTask);

export default router;