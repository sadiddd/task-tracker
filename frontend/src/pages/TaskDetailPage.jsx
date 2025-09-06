import { useNavigate, useParams } from 'react-router'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {LoaderIcon, Trash2Icon} from "lucide-react"
import api from '../lib/axios.js'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { formatDate, toLocalMidnight, formatDueDate } from '../lib/utils.js'

const TaskDetailPage = () => {

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [priority, setPriority] = useState("")

  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`./tasks/${id}`)
        setTask(response.data)
      } catch (error) {
        console.log("Error fetching task", error)
        toast.error("Failed to load the task")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you would like to delete this task?")) return

    try {
      await api.delete(`./tasks/${id}`)
      toast.success("Task deleted successfully")
      navigate("/")
    } catch (error) {
      console.log("Error in handleDelete", error)
      toast.error("Failed to delete task")
    }
  }
  const handleSave = async () => {
    if(!task.title.trim() || !task.description.trim() || !task.dueDate.trim()) {
      toast.error("Please fill all fields")
      return;
    }

    setSaving(true)

    try {
      await api.put(`./tasks/${id}`, task)
      toast.success("Task updated successfully")
      navigate("/")
    } catch (error) {
      console.log("Error in handleSave", error)
      toast.error("Failed to update task")
    }
  }


  if(loading) {
    return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='size-10 animate-spin' />
    </div>
    )
  }
  
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className='h-5 w-5'/>
              Back to Tasks
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Task
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body"></div>
              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Task Title'
                  className='input input-bordered'
                  value={task.title}
                  onChange={(e) => setTask({...task, title: e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  placeholder='Write your task here...'
                  className='textarea textarea-bordered h-32'
                  value={task.description}
                  onChange={(e) => setTask({...task, description: e.target.value})}
                ></textarea>
              </div>

              <div className='flex items-center justify-between gap-4 w-full'>
                <div className='flex items-center gap-4'>
                <select 
                  className="select select-bordered select-md w-full max-w-fit"
                  value={task.priority}
                  onChange={(e) => setTask({...task, priority: e.target.value})}
                >
                    <option disabled>{task.priority}</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                </select>

                <select 
                  className="select select-bordered select-md w-full max-w-fit"
                  value={task.status}
                  onChange={(e) => setTask({...task, status: e.target.value})}
                >
                    <option disabled>{task.status}</option>
                      <option value="Pending">Pending</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Completed">Completed</option>
                </select>

                  <input           
                  type="Date" 
                  placeholder="Due date: (yyyy-mm-dd)" 
                  className="input input-bordered"
                  value={task.dueDate ? task.dueDate.split("T")[0] : ""}
                  onChange={(e) => setTask({...task, dueDate: e.target.value})}
                  />
                </div>
              
                <div className="card-actions justify-end">
                  <button className='btn btn-primary btn-md' disabled={saving} onClick={handleSave}> 
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>    

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TaskDetailPage