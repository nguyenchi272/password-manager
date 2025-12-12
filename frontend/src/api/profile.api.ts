import axios from "axios";

// Lấy profile
export const getProfileAPI = () => {
  return axios.get("/profile");
};

// Cập nhật display name + email
export const updateProfileAPI = (name: string, email: string) => {
  return axios.put("/profile", { name, email });
};

// Đổi mật khẩu
export const changePasswordAPI = (
  currentPassword: string,
  newPassword: string
) => {
  return axios.put("/profile/change-password", {
    currentPassword,
    newPassword,
  });
};

// Xóa tài khoản
export const deleteProfileAPI = () => {
  return axios.delete("/profile");
};
