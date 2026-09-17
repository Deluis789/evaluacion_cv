import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockUsers } from "@/services/mock/data/users";
import type { User } from "@/types";

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: User["role"];
}

export interface IUserService {
  list(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(payload: CreateUserPayload): Promise<User>;
  update(id: string, payload: Partial<CreateUserPayload>): Promise<User>;
  remove(id: string): Promise<void>;
}

let usersStore = [...mockUsers];

const mockUserService: IUserService = {
  async list() {
    await mockDelay();
    return usersStore;
  },
  async getById(id) {
    await mockDelay(200);
    const user = usersStore.find((u) => u.id === id);
    if (!user) throw { message: "Usuario no encontrado", status: 404 };
    return user;
  },
  async create(payload) {
    await mockDelay();
    const newUser: User = {
      id: `user-${usersStore.length + 1}`,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    usersStore = [newUser, ...usersStore];
    return newUser;
  },
  async update(id, payload) {
    await mockDelay();
    usersStore = usersStore.map((u) => (u.id === id ? { ...u, ...payload } : u));
    return usersStore.find((u) => u.id === id)!;
  },
  async remove(id) {
    await mockDelay();
    usersStore = usersStore.filter((u) => u.id !== id);
  },
};

// GET/POST /api/users/  |  GET/PATCH/DELETE /api/users/:id/
const realUserService: IUserService = {
  async list() {
    const { data } = await apiClient.get("/users/");
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/users/${id}/`);
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/users/", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await apiClient.patch(`/users/${id}/`, payload);
    return data;
  },
  async remove(id) {
    await apiClient.delete(`/users/${id}/`);
  },
};

export const userService: IUserService = env.useMocks ? mockUserService : realUserService;
