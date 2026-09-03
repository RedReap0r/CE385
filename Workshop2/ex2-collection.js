// สร้างข้อมูลนักศึกษาเป็นอาร์เรย์ของอ็อบเจ็กต์
export const students = [
  { id: "101", name: "สมหญิง", major: "CE", score: 85, contact: { email: "สมหญิง@ce.com", phone: "0811111111" } },
  { id: "102", name: "สมชาย",   major: "IT", score: 45, contact: { email: "สมชาย@it.com", phone: "0822222222" } },
  { id: "103", name: "สมศรี", major: "CE", score: 70, contact: { email: "สมศรี@ce.com", phone: "0833333333" } },
  { id: "104", name: "แก้ว", major: "IT", score: 92, contact: { email: "แก้ว@it.com", phone: "0844444444" } },
  { id: "105", name: "ปกรณ์",   major: "CE", score: 48, contact: { email: "ปกรณ์@ce.com", phone: "0855555555" } },
  { id: "106", name: "ฟ้า", major: "IT", score: 60, contact: { email: "ฟ้า@it.com", phone: "0866666666" } }
];

// ค้นหานักศึกษาตามรหัสนักศึกษา 
export const findById = (studentsArray, Id) => studentsArray.find(s => s.id === Id);

// ค้นหานักศึกษาตามสาขา
export const findByMajor = (studentsArray, major) => studentsArray.filter(s => s.major === major);

// เรียงลำดับนักศึกษาตามคะแนน
export const hasFailingStudent  = (studentsArray) => studentsArray.some(s => s.score < 50);


// getEmail: รับอาร์เรย์ของนักศึกษาและรหัสนักศึกษา แล้วคืนค่าอีเมลของนักศึกษาคนนั้น (ถ้าไม่พบให้คืนค่า "ไม่พบข้อมูลนักศึกษา")
export const getEmail = (studentsArray, id) => {
    const student = findById(studentsArray, id);

  return student?.contact?.email ?? "ไม่พบข้อมูลนักศึกษา";
};

export const getEmails = getEmail;

// ทดสอบเพิ่มนักศึกษาใหม่ลงในอาร์เรย์ 
const newStudent = { id: "107", name: "น้ำฝน", major: "CE", score: 75 }; 
export const updatedStudents = [...students, newStudent];

// ทดสอบฟังก์ชันที่สร้างขึ้น
console.log("--- ทดสอบกรณีไม่พบข้อมูล ---");
console.log("findById(students, \"9999\"):", findById(students, "9999"));
console.log("getEmail(students, \"9999\"):", getEmail(students, "9999"));

console.log("--- ทดสอบนักศึกษาที่ไม่มี contact ---");
console.log("getEmail(updatedStudents, \"107\"):", getEmail(updatedStudents, "107"));