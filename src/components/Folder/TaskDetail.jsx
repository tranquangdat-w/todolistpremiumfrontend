import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import EventIcon from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const TaskDetail = ({ open, onClose }) => {
  const [dueDate, setDueDate] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Typography variant="h6" color="text.primary">
          Đang làm
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ display: 'flex', p: 0 }}>
        {/* Bên trái */}
        <Box sx={{ flex: 2, p: 2 }}>
          {/* Tiêu đề + Checkbox */}
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Checkbox
              icon={
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    border: '2px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
              }
              checkedIcon={
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '4px',
                    bgcolor: 'green',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckIcon sx={{ fontSize: 14 }} />
                </Box>
              }
              sx={{ p: 0 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Tiêu đề
            </Typography>
          </Box>

          {/* Nút */}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button variant="outlined" startIcon={<LabelOutlinedIcon />}>
              Nhãn
            </Button>

            {/* Nút chọn file */}
            <Button
              variant="outlined"
              startIcon={<AttachFileIcon />}
              component="label"
            >
              Đính kèm
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileSelect}
              />
            </Button>
          </Box>

          {/* Danh sách file đính kèm */}
          {attachments.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                    Đính kèm
              </Typography>
              {attachments.map((file, index) => {
                const fileURL = URL.createObjectURL(file);
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ mb: 0.5 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flex: 1 }}
                    >
            📎 {file.name}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      component="a"
                      href={fileURL}
                      download={file.name}
                    >
            Tải xuống
                    </Button>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Ngày hết hạn */}
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" color="text.secondary">
              Ngày hết hạn
            </Typography>

            {/* Icon mở DatePicker */}
            <IconButton
              onClick={() => setPickerOpen(true)}
              sx={{
                bgcolor: '#f0f0f0',
                '&:hover': { bgcolor: '#e0e0e0' }
              }}
            >
              <EventIcon />
            </IconButton>

            {/* Hiển thị kết quả chọn */}
            {dueDate && (
              <Box
                sx={{
                  p: 1,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  minWidth: 140,
                  textAlign: 'center',
                  bgcolor: '#fff'
                }}
              >
                {dayjs(dueDate).format('DD/MM/YYYY HH:mm')}
              </Box>
            )}

            {/* DateTimePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                slotProps={{
                  textField: { style: { display: 'none' } }
                }}
              />
            </LocalizationProvider>
          </Box>

          {/* Mô tả */}
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Mô tả
              </Typography>
              <Button variant="contained" size="small">
                Chỉnh sửa
              </Button>
            </Box>
            <TextField
              multiline
              rows={4}
              fullWidth
              sx={{ mt: 1 }}
              placeholder="Nhập mô tả..."
            />
          </Box>
        </Box>

        {/* Bên phải */}
        <Box sx={{ flex: 1, bgcolor: '#f5f5f5', p: 2 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Comment
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Viết bình luận"
            sx={{ mb: 2, bgcolor: 'white' }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            sx={{ bgcolor: 'white' }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetail;
