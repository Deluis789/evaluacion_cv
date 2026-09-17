import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockEmployees } from "@/services/mock/data/employees";
import type { Employee } from "@/types";

export interface IEmployeeService {
  list(): Promise<Employee[]>;
  getById(id: string): Promise<Employee>;
}

const mockEmployeeService: IEmployeeService = {
  async list() {
    await mockDelay();
    return mockEmployees;
  },
  async getById(id) {
    await mockDelay(200);
    const employee = mockEmployees.find((e) => e.id === id);
    if (!employee) throw { message: "Empleado no encontrado", status: 404 };
    return employee;
  },
};

// GET /api/employees/  |  GET /api/employees/:id/
const realEmployeeService: IEmployeeService = {
  async list() {
    const { data } = await apiClient.get("/employees/");
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/employees/${id}/`);
    return data;
  },
};

export const employeeService: IEmployeeService = env.useMocks
  ? mockEmployeeService
  : realEmployeeService;
