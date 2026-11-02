// สิ่งสิ่ ที่ backend ที่ ส่งกส่ ลับมา ลั
export type Student = {
id: string;
code: string;
name: string;
email: string;
score: number;
active: boolean;
createdAt: string; // วันวั ที่ในที่ JSON เป็นข้อความ ข้ ไม่ใม่ ช่ Date ช่
updatedAt: string;
};
// สิ่งสิ่ ที่ฟอที่ ร์มร์ ส่งไปตอนเ ส่ พิ่มหพิ่ รือแรื ก้ไขก้ — ไม่มีม่ id มี และวันวั ที่ เพราะ backend สร้างใ ร้ ห้
export type StudentInput = {
code: string;
name: string;
email: string;
score: number;
active: boolean;
};