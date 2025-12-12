import client from "./client";

export const getProfileAPI = () => {
  return client.get("/account/profile");
};

export const updateNameAPI = (name: string) => {
  return client.put("/account/profile/name", { name });
};

export const updateEmailAPI = (email: string) => {
  return client.put("/account/profile/email", { email });
};

export const updatePasswordAPI = (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  return client.put("/account/profile/password", data);
};

export const deleteAccountAPI = () => {
  return client.delete("/account/delete");
};
