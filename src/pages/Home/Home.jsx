import { Card, CardContent, Typography, Button, IconButton, Checkbox, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { testAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { Settings } from "@mui/icons-material";
import { View } from 'lucide-react';
import ViewSelect from '~/components/ViewSelection/ViewSelect';
const Home = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  const handleHello = () => {
    testAPI().then((res) => console.log(res))
  }

  const [selectedOption, setSelectedOption] = useState('all');
  const handleSelectChange = (e) => setSelectedOption(e.target.value);
  
  // tạo thông báo ban đầu cho user
  // const (showModal, setShowModal) = useState(true);
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };


  const [lists, setLists] = useState([
    { id: 1, title: 'Cần làm', cards: [] },
    { id: 2, title: 'Đang làm', cards: [{ id: 1, title: 'Tiêu đề' }, { id: 2, title: 'Tiêu đề' }] },
    { id: 3, title: 'Đã xong', cards: [] },
  ]);

  return (
    <div className="px-8  bg-[#0079bf] min-h-screen rounded-[40px] relative">
      <div className="text-white text-2xl font-bold bg-blue-800 py-4 px-8 absolute top-0 left-0 right-0 w-full flex items-center justify-between">
        <h1>Mock Project</h1>
        <ViewSelect />
      </div>
      <h1>Mock project</h1>

      <div className="flex gap-4 overflow-x-auto py-20">
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
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
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
      </div>
    </div>
  );
}

export default Home
