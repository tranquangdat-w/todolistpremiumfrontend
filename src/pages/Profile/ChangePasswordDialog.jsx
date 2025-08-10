/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, InputAdornment, IconButton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { changePasswordAPI } from '~/apis/index';
import { FIELDS_REQUIRED_MESSAGE } from '~/utils/validators';
import { FieldErrorAlert } from '~/components/Form/FieldErrorAlert';

const RedAsterisk = () => <Typography component="span" sx={{ color: 'red' }}>*</Typography>;

const ChangePasswordDialog = ({ open, onClose, userId }) => {
  // Sử dụng react-hook-form với tên field 'cofirmPassword'
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (data) => {
    setIsLoading(true);
    const { oldPassword, newPassword, cofirmPassword } = data;

    if (newPassword !== cofirmPassword) {
      toast.error('Mật khẩu mới và xác nhận không khớp!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await changePasswordAPI(userId, { oldPassword, newPassword, cofirmPassword });
      toast.success(response?.message || 'Đổi mật khẩu thành công!');
      reset();
      onClose();
    } catch (error) {
      toast.error(error?.message || 'Đổi mật khẩu thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        Đổi mật khẩu
      </DialogTitle>
      <DialogContent>
        <Box
          id="form"
          component="form"
          onSubmit={handleSubmit(handleConfirm)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          {/* Mật khẩu cũ */}
          <Typography sx={{ fontWeight: '600', fontSize: 14 }}>
            Mật khẩu cũ <RedAsterisk />
          </Typography>
          <TextField
            placeholder="Nhập mật khẩu cũ"
            type={showOld ? 'text' : 'password'}
            fullWidth
            size="small"
            variant="outlined"
            error={!!errors['oldPassword']}
            sx={{ borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle old password visibility"
                    onClick={() => setShowOld(!showOld)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showOld ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...register('oldPassword', { required: FIELDS_REQUIRED_MESSAGE })}
          />
          <FieldErrorAlert errors={errors} fieldName={'oldPassword'} />

          {/* Mật khẩu mới */}
          <Typography sx={{ fontWeight: '600', fontSize: 14 }}>
            Mật khẩu mới <RedAsterisk />
          </Typography>
          <TextField
            placeholder="Nhập mật khẩu mới"
            type={showNew ? 'text' : 'password'}
            fullWidth
            size="small"
            variant="outlined"
            error={!!errors['newPassword']}
            sx={{ borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={() => setShowNew(!showNew)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...register('newPassword', { required: FIELDS_REQUIRED_MESSAGE })}
          />
          <FieldErrorAlert errors={errors} fieldName={'newPassword'} />

          {/* Xác nhận mật khẩu mới */}
          <Typography sx={{ fontWeight: '600', fontSize: 14 }}>
            Xác nhận mật khẩu mới <RedAsterisk />
          </Typography>
          <TextField
            placeholder="Nhập lại mật khẩu mới"
            type={showConfirm ? 'text' : 'password'}
            fullWidth
            size="small"
            variant="outlined"
            error={!!errors['cofirmPassword']}
            sx={{ borderRadius: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#DFE1E6' } } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirm(!showConfirm)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            {...register('cofirmPassword', { required: FIELDS_REQUIRED_MESSAGE })}
          />
          <FieldErrorAlert errors={errors} fieldName={'cofirmPassword'} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: 'primary.main',
            fontWeight: '600',
            fontSize: 14,
          }}
        >
          Hủy
        </Button>

        <Button
          variant="contained"
          type="submit"
          form="form"
          fullWidth
          disabled={isLoading}
          sx={{
            maxWidth: 200,
            textTransform: 'none',
            fontWeight: '600',
            fontSize: 16,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: 1,
          }}
        >
          {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
