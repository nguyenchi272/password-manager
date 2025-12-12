import { create } from "zustand";
import { AuthApi } from "../api/auth.api";
import { client } from "../api/client";

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
   error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await client.post("/auth/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      set({
        token,
        user: res.data.user,
        loading: false,
        error: null,
      });

      return true;
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || "Login failed",
      });
      return false;
    }
  },

  register: async (email, password) => {
    set({ loading: true });
    try {
      const res = await AuthApi.register({ email, password });
      set({ user: res.data.user, token: res.data.token, loading: false });
      return true;
    } catch (e) {
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  loadUser: async () => {
    try {
      const res = await client.get("/profile");
      set({ user: res.data });
    } catch {
      set({ user: null });
    }
  },

}));


