import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"

import tasksRoutes from './src/routes/tasksRoutes.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cors({
    // origin: "http://localhost:5173",
}
))

app.use("/api/tasks", tasksRoutes);

connectDB().then(() => {
    app.listen(5001, () => {
        console.log('Server is running on http://localhost:5001');
});
})


