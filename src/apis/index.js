import authorizedAxiosInstance from '~/utils/authorizeAxios'

// User APIs
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/register', data)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put('/users/verify', data)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get('/users/refresh_token')
  return response.data
}

export const testAPI = async () => {
  const response = await authorizedAxiosInstance.get('/users/hello')
  return response.data
}

export const requestPasswordResetAPI = async (data) => {
  const response = await authorizedAxiosInstance.get('/reset')
  return response.data
}

export const resetPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.get('/reset')
  return response.data
}
export const changePasswordAPI = async (userId, data) => {
  const response = await authorizedAxiosInstance.put(`/users/${userId}/change_password`, data);
  return response.data;
};

export const updateAvatarAPI = async (userId, file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await authorizedAxiosInstance.put(
    `/users/${userId}/update-avatar`,
    formData
  );

  return response.data;
};


