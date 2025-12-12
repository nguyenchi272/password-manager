import { client } from "./client";

// Lấy profile
export const getProfileAPI = () => {
  return client.get("/profile");
};

// Cập nhật display name + email
export const updateProfileAPI = (name: string, email: string) => {
  return client.put("/profile", { name, email });
};

// Đổi mật khẩu
export const changePasswordAPI = (
  currentPassword: string,
  newPassword: string
) => {
  return client.put("/profile/change-password", {
    currentPassword,
    newPassword,
  });
};

// Xóa tài khoản
export const deleteProfileAPI = () => {
  return client.delete("/profile");
};
