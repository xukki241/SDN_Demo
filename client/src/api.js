import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3006/api",
});

export const getStudents = () => api.get("/students");
export const addStudent = (student) => api.post("/students", student);
export const updateStudent = (id, student) => api.patch(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
