import {PlusIcon} from "lucide-react"
import { Link } from 'react-router';

const NavBar = () => {
    return (
    <header className = "bg-neutral border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-ghost font-mono tracking-tighter'>Task Tracker</h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className="size-5" />
                    <span>New Task</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
    );
};

export default NavBar