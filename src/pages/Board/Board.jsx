import { Card, CardContent, Typography, Button, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { testAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'
import TaskDetail from '~/components/Folder/TaskDetail';

import ViewSelect from '~/components/ViewSelection/ViewSelect';
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableChartIcon from "@mui/icons-material/TableChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { set } from 'lodash';
import TableView from './TableView';
import DashboardView from './DashboardView';
const Board = () => {
    const dispatch = useDispatch()
    const [openEdit, setOpenEdit] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUserAPI())
    }

    const handleHello = () => {
        testAPI().then((res) => console.log(res))
    }

    const [lists, setLists] = useState([
        { id: 1, title: 'Cần làm', cards: [] },
        { id: 2, title: 'Đang làm', cards: [{ id: 1, title: 'Tiêu đề' }, { id: 2, title: 'Tiêu đề' }] },
        { id: 3, title: 'Đã xong', cards: [] },
    ]);
    
    const [selectedView, setSelectedView] = useState("board");
    const views = [
        { value: "board", label: "Board", icon: <ViewModuleIcon /> },
        { value: "table", label: "Table", icon: <TableChartIcon /> },
        { value: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    ];


    return (
        <div className="px-8  bg-[#0079bf] min-h-screen rounded-[40px] relative">
            <div className="absolute top-0 left-0 right-0 w-full bg-blue-800 flex items-center justify-between px-8 py-4">
                <h1 className="text-white text-2xl font-bold">
                    Mock project
                </h1>
                <ViewSelect
                    options={views}
                    selectedOption={selectedView}
                    setSelectedOption={setSelectedView}
                />
            </div>

            <div className="flex gap-4 overflow-x-auto py-20">
                {selectedView === "board" && (
                    <>
                    {lists.map((list) => (
                    <div
                        key={list.id}
                        className="bg-gray-200 rounded-2xl h-fit w-64 flex-shrink-0 p-2"
                    >
                        <Typography variant="subtitle1" className="font-bold mb-2">{list.title}</Typography>
                        {list.cards.map((card) => (
                        <Card key={card.id} className="mt-2 !rounded-2xl">
                            <CardContent className="flex items-center justify-between !p-2">
                            <div className="flex items-center gap-2">
                                <Checkbox size="small" />
                                <Typography>{card.title}</Typography>
                            </div>
                            <IconButton onClick={() => setOpenEdit(true)} size="small">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            </CardContent>
                        </Card>
                        ))}
                        {openEdit && (
                        <TaskDetail
                            open={openEdit}
                            onClose={() => setOpenEdit(false)}
                        />
                        )}
                        <Button
                        size="small"
                        fullWidth
                        className="mt-1 normal-case text-black"
                        >
                        + Thêm thẻ
                        </Button>
                    </div>
                    ))}

                    <Button
                    variant="contained"
                    className="!bg-slate-200 hover:bg-blue-100 normal-case h-fit !text-[#0079bf] !rounded-xl flex-shrink-0"
                    >
                    + Thêm danh sách khác
                    </Button>
                    </>
                )}

                {selectedView === "table" && <TableView />}
                {selectedView === "dashboard" && <DashboardView />}
            </div>
        </div>
    );
}

export default Board;
