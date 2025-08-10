import { useRef, useState } from 'react';
import {
  Box, Button, Avatar, Typography, Paper, Divider, Grid,
  IconButton, Tooltip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChangePasswordDialog from './ChangePasswordDialog';
import { updateAvatarAPI } from '~/apis/index'; 

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser); // Lấy dữ liệu người dùng từ Redux
  const fileInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || 'https://via.placeholder.com/150');

  // State để quản lý dialog
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const handleChangePassword = () => {
    setOpenChangePasswordDialog(true); // Mở dialog
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false); // Đóng dialog
  };

  const handleChangeAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);

      try {
        const data = await updateAvatarAPI(currentUser?.id || currentUser?._id, file);
        console.log('Update avatar thành công:', data);

        if (data?.user?.avatar) {
          setAvatarUrl(data.user.avatar);   
        }
      } catch (error) {
        console.error('Lỗi update avatar:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      {/* Avatar + background */}
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.light',
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={avatarUrl}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Tooltip title="Đổi avatar">
            <IconButton
              size="small"
              color="primary"
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                bgcolor: 'white',
                boxShadow: 1,
                '&:hover': { bgcolor: 'grey.100' }
              }}
              onClick={handleChangeAvatarClick}
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Input file ẩn */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelected}
            style={{ display: 'none' }}
          />
        </Box>
      </Paper>

      {/* Giới thiệu về bạn */}
      <Paper sx={{ mt: 3, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Giới thiệu về bạn
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {/* Họ tên */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Họ tên</Typography>
            <Typography>{currentUser?.name || 'Chưa có thông tin'}</Typography>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Email</Typography>
            <Typography>{currentUser?.email || 'Chưa có thông tin'}</Typography>
          </Grid>

          {/* Ngày tạo */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Tạo vào ngày</Typography>
            <Typography>{currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('vi-VN') : 'Chưa có thông tin'}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={handleChangePassword}>
              Đổi mật khẩu
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog đổi mật khẩu */}
      <ChangePasswordDialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePasswordDialog}
        userId={currentUser?.id || currentUser?._id} // Truyền userId từ currentUser
      />
    </Box>
  );
};

export default Profile;