import { ArrowLeft, ArrowLeftIcon, SkullIcon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import api from '../lib/axios.js'
import { formatDate, toLocalMidnight, formatDueDate, stripTime } from '../lib/utils.js'


const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !status.trim() || !priority.trim() || !dueDate.trim()) {
      toast.error("Please fill all fields")
      return
    }

    setLoading(true)

    try {
      await api.post(`./tasks`, {title, description, status, dueDate, priority})
      toast.success("Task created successfully")
      navigate("/")
    } catch (error) {
      console.log("Error creating note")
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating tasks too fast")
      } else {
        toast.error("Failed to create task")
      }
    } finally {
      setLoading(false)
    }
  }



  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Tasks
        </Link>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Task Title" className="input input-bordered"
                  value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea placeholder="Describe your task here..." className="textarea textarea-bordered h-32"
                  value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>



              <div className='flex items-center justify-between gap-4 w-full'>
                <div className='flex items-center gap-4'>
                  <select 
                    className="select select-bordered select-md w-full max-w-fit"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option disabled value="">Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                </select>

                <select 
                  className="select select-bordered select-md w-full max-w-fit"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                    <option disabled value="">Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Completed">Completed</option>
                </select>
                
                <input           
                  type="date" 
                  placeholder="Due date: (yyyy-mm-dd)" 
                  className="input input-bordered"
                  onChange={(e) => setDueDate(e.target.value)}
                  />
              </div>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
              </div> 
            </form>
          </div>
        </div>

      </div>

    </div>
  </div>
}

export default CreatePage