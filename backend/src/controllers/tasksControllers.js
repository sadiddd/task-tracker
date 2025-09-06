import { Task } from "../models/Task.js";

export async function getAllTasks(_, res) {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export async function getTaskByID(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
        } catch (error) {
            console.error("Error fetching task by ID:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
}

export async function createTask(req, res) {
    try {
        const { title, description, status, dueDate, priority } = req.body;
        const newTask = new Task({ title, description, status, dueDate, priority });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate, priority } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status, dueDate, priority },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}