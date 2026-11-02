import axios from "axios";
import { api } from "./client";
import type { Student, StudentInput } from "../types/students";

export async function listStudents(): Promise<Student[]> {
  const res = await api.get<{ data: Student[] }>("/students", {
    params: { limit: 100 },
  });
  return res.data.data;
}

export async function createStudent(input: StudentInput): Promise<Student> {
  const res = await api.post<{ data: Student }>("/students", input);
  return res.data.data;
}

export async function updateStudent(id: string, input: StudentInput): Promise<Student> {
  const res = await api.patch<{ data: Student }>(`/students/${id}`, input);
  return res.data.data;
}

export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/students/${id}`);
}

type ApiErrorBody = {
  error?: {
    message?: string;
    details?: unknown;
  };
};

export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return "เกิดข้อผิดพลาดที่ไม่คาดคิด";
  }

  if (!error.response) {
    return "ติดต่อ backend ไม่ได้ — ตรวจสอบว่าเซิร์ฟเวอร์เปิดอยู่ หรือโดน CORS บล็อก";
  }

  const { message, details } = error.response.data?.error ?? {};
  if (Array.isArray(details)) {
    const messages = details
      .map((detail: unknown) => {
        if (
          typeof detail === "object" &&
          detail !== null &&
          "message" in detail &&
          typeof detail.message === "string"
        ) {
          return detail.message;
        }
        return "";
      })
      .filter(Boolean);

    if (messages.length > 0) return messages.join(" · ");
  }

  return message ?? error.message;
}