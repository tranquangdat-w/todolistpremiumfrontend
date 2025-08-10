import { Bell, User, Plus } from 'lucide-react';
import logo from '../../assets/trello.svg';

export default function Navbar() {
    return (
        <nav className="bg-white shadow z-10 px-8 py-2 fixed left-0 right-0 top-0 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className=" w-8 h-8 flex items-center justify-center text-white font-bold">
                    <img src={logo} alt="" className='object-cover size-8' />
                </div>
            </div>

            <div className='flex items-center w-[40%] gap-2 justify-center'>
                {/* Search */}
                <div className="w-[75%] mx-4">
                    <input
                        type="text"
                        placeholder="Value"
                        className="w-full border border-slate-300 rounded-full px-4 py-1 outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Actions */}
                <button className="bg-blue-600 w-[20%] text-white px-4 py-1 rounded-lg flex justify-center items-center gap-1 hover:bg-blue-700">
                    <Plus size={16} /> Tạo mới
                </button>

            </div>
            <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <User size={18} />
                </div>
            </div>
        </nav>
    );
}
