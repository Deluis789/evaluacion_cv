import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockUsers } from "@/services/mock/data/users";
import type { AuthSession, User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IAuthService {
  login(payload: LoginPayload): Promise<AuthSession>;
  me(token: string): Promise<User>;
}

const DEMO_EMAIL = "admin@talentai.local";
const DEMO_PASSWORD = "12345678";

const mockAuthService: IAuthService = {
  async login({ email, password }) {
    await mockDelay();
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw { message: "Credenciales inválidas. Verifica tu email y contraseña." };
    }
    const user = mockUsers[0];
    return { user, token: "mock-jwt-token" };
  },
  async me() {
    await mockDelay(200);
    return mockUsers[0];
  },
};

// POST /api/auth/login/  |  GET /api/auth/me/
const realAuthService: IAuthService = {
  async login(payload) {
    const { data } = await apiClient.post("/auth/login/", payload);
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      console.log("Token guardado manualmente en login:", data.token);
    }
    return data;
  },
  async me() {
    const { data } = await apiClient.get("/auth/me/");
    return data;
  },
};

export const authService: IAuthService = env.useMocks ? mockAuthService : realAuthService;
