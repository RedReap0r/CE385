import { useEffect, useState } from "react";
import StudentForm from "./component/StudentForm";
import StudentTable from "./component/StudentTable";
import {
  createStudent,
  deleteStudent,
  getErrorMessage,
  listStudents,
  updateStudent,
} from "./api/students";
import type { Student, StudentInput } from "./types/students";
export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editing, setEditing] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // R — โหลดรายชื่อจาก ชื่ backend ครั้งเรั้ ดียวตอนห ดี น้าเน้ ปิดขึ้นมา ขึ้ ([] = ไม่ต้ม่ องต้ ทํา ซ้ํา )
  useEffect(() => {
    listStudents()
      .then((data) => setStudents(data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);
  // C / U — ฟอร์มเ ร์ รียกรี ฟังก์ชัก์ นชั นี้ · นี้ ถ้าถ้ backend ตอบ error จะโยนกลับไปใ ลั ห้ฟอห้ ร์มแสดง ร์
  async function handleSubmit(input: StudentInput) {
    if (editing) {
      await updateStudent(editing.id, input);
      setEditing(null);
    } else {
      await createStudent(input);
    }
    setStudents(await listStudents()); // โหลดใหม่ใม่ ห้ตารางตรง ห้ กับฐาน กั ข้อข้มูลมู
  }
  // D — ถามก่อนลบเสมอ ก่
  async function handleDelete(student: Student) {
    if (!confirm(`ลบ ${student.name} ใช่ไหม?`)) return;
    try {
      await deleteStudent(student.id);
      setStudents(await listStudents());
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          ระบบจัดการนักศึกษา
        </h1>
        <p className="text-slate-500">
          CE385 สัปดาห์ที่ 13 — React + TypeScript + Tailwind + Axios
        </p>
      </header>
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-red-700">{error}</div>
      )}
      {/* key เปลี่ยน = React สร้างฟอร์มให้ ม่ ค่าใน ค่าใน ช่องกรอก ช่ จึงเป็นลี่ยนตามคน ลี่ ที่กดแก้ไข */}
      <StudentForm
        key={editing ? editing.id : "new"}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />
      <section className="overflow-hidden rounded-xl bg-white shadow">
        {loading ? (
          <p className="p-8 text-center text-slate-500">กําลังโหลด...</p>
        ) : (
          <StudentTable
            students={students}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}
