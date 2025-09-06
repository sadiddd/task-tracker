import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In-progress', 'Completed'], default: 'Pending' },
  dueDate: { type: Date, required: true},
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);