import api from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
  accessToken: string;
}

export const authService = {
  async login(data: LoginPayload) {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterPayload) {
    const response = await api.post("/users", {
      ...data,
      role: data.role || "USER",
    });
    return response.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
};

