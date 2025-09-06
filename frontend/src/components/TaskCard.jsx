import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const TaskCard = ({task, setTasks}) => {
    
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete this task?")) {
            return
        }

        try {
            await api.delete(`./tasks/${id}`)
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))
            toast.success("Task deleted successfully")
        } catch (error) {
            console.log("Error in deleting task", error)
            toast.error("Failed to delete task")
        }
    }
    
    return <Link to={`/task/${task._id}`}
        className="card bg-neutral hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary">
            <div className="card-body">
                <h4>
                    <div className='badge badge-primary mr-3'>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1) } Priority</div>
                    <div className='badge badge-secondary'>{task.status}</div>
                </h4>
                <h3 className="card-title text-base-content">{task.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{task.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        Due:{" "}
                        {formatDate(new Date(task.dueDate))}
                    </span>
                    <div className="flex items-center gap-x-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, task._id)}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    }


export default TaskCard