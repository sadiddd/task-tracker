import express from 'express';
import { getAllTasks, getTaskByID, createTask, updateTask, deleteTask } from '../controllers/tasksControllers.js';

const router = express.Router();

router.get("/", getAllTasks)
router.get("/:id", getTaskByID)
router.post("/", createTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router;