import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoardAPI } from '~/redux/board/boardSlice';

const FormCreateBoard = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
    };

    const handleSave = () => {
        dispatch(createBoardAPI({ data: { title: title, description: description } }))
        handleClose()
    };
    return (
        <Dialog Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle>Tạo mới board</DialogTitle>
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
                <Button onClick={handleClose} color="inherit">
                    Hủy
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default FormCreateBoard