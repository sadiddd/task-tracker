import React, { useEffect, useState } from 'react'
import TasksNotFound from '../components/TasksNotFound'
import NavBar from '../components/NavBar'
import TaskCard from '../components/TaskCard'
import axios from "axios"
import toast from "react-hot-toast"
import api from "../lib/axios"

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect (() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks")
        console.log(res.data)
        setTasks(res.data)
      } catch (error) {
        console.log("Error fetching notes", error)
        toast.error("Failed to load notes")
      } finally {
        setLoading(false)
      }
    }
    fetchTasks();
  }, [])

return (
    <div className="bg-base-100 min-h-screen">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {tasks.length === 0 && <TasksNotFound />}

        {tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} setTasks={setTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;