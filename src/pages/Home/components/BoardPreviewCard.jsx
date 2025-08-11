import { useState } from 'react'
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteBoardAPI, updateBoardAPI } from '~/redux/board/boardSlice';

export default function BoardPreviewCard({ board }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);
  const dispatch = useDispatch();

  // Mở menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (boardId) => {
    dispatch(deleteBoardAPI({ boardId }));
    handleMenuClose();
  }

  // Mở popup edit
  const handleEditClick = () => {
    setOpenEdit(true);
    handleMenuClose();
  };

  // Lưu chỉnh sửa
  const handleSave = () => {
    dispatch(updateBoardAPI({ data: { title, description }, boardId: board.id }));
    setOpenEdit(false);
  };
  return (
    <div className="relative h-[100px]">
      <Link to={`/boards/${board.id}`} className="no-underline">
        <Card className="rounded-xl hover:shadow-md transition-all mb-4 h-[100px] bg-slate-50">
          <CardContent className="p-3 h-full">
            <div className="flex items-center h-full justify-between">
              <div className='max-w-[85%] min-w-0 flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                  <Typography variant="subtitle1" className="font-semibold text-xl text-gray-800">
                    {board.title}
                  </Typography>
                  <div className="text-gray-400"> {board.count} thẻ </div>
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-500 truncate"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '400px'
                  }}
                >
                  {board.description}
                </Typography>
              </div>

            </div>
          </CardContent>
        </Card>
      </Link>

      <IconButton className='absolute right-0 top-[50%] -translate-y-[50%] z-2' size="small" onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>


      {/* Menu nhỏ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Sửa tiêu đề & mô tả</MenuItem>
        <MenuItem onClick={() => handleDelete(board.id)}>
          Xóa board
        </MenuItem>
      </Menu>

      {/* Popup edit */}
      <Dialog maxWidth="sm" fullWidth open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Chỉnh sửa board</DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
