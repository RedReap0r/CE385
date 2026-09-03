export const students = [
  { id: "101", name: "สมหญิง", major: "CE", score: 85, contact: { email: "สมหญิง@ce.com", phone: "0811111111" } },
  { id: "102", name: "สมชาย", major: "IT", score: 45, contact: { email: "สมชาย@it.com", phone: "0822222222" } },
  { id: "103", name: "สมศรี", major: "CE", score: 70, contact: { email: "สมศรี@ce.com", phone: "0833333333" } },
  { id: "104", name: "แก้ว", major: "IT", score: 92, contact: { email: "แก้ว@it.com", phone: "0844444444" } },
  { id: "105", name: "ปกรณ์", major: "CE", score: 48, contact: { email: "ปกรณ์@ce.com", phone: "0855555555" } },
  { id: "106", name: "ฟ้า", major: "IT", score: 60, contact: { email: "ฟ้า@it.com", phone: "0866666666" } }
];

// ฟังก์ชันช่วยจำแนกเกรด (ใช้สำหรับ countByGrade)
const getGrade = (score) => {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

// ==========================================
// ส่วนที่ 1 — เขียนฟังก์ชัน (ห้ามใช้ for หรือ while เลย)
// ==========================================

export const getNames = (arr) => arr.map((student) => student.name);

export const getPassedStudents = (arr) =>
  arr.filter((student) => student.score >= 50);

// reduce มีค่าเริ่มต้นเป็น 0
export const getTotalScore = (arr) =>
  arr.reduce((total, student) => total + student.score, 0);

// array ว่างต้องคืน 0 ไม่ใช่ NaN
export const getAverageScore = (arr) =>
  arr.length === 0 ? 0 : Number((getTotalScore(arr) / arr.length).toFixed(2));

// ตาม Hint: ให้ค่าเริ่มต้นเป็น {} แล้วสะสมทีละคน
export const countByGrade = (arr) =>
  arr.reduce((counts, student) => {
    const grade = getGrade(student.score);
    counts[grade] = (counts[grade] || 0) + 1;
    return counts;
  }, {});

// reduce ต้องมีค่าเริ่มต้น (ใช้ null เพื่อรองรับ Array ว่าง)
export const getTopStudent = (arr) =>
  arr.reduce((topStudent, student) => {
    if (topStudent === null || student.score > topStudent.score) {
      return student;
    }
    return topStudent;
  }, null);


// ==========================================
// ส่วนที่ 2 — ท่อข้อมูลต่อกัน (บรรทัดเดียว)
// ==========================================
// หาคะแนนเฉลี่ยของนักศึกษาสาขา CE ที่สอบผ่าน (filter -> map -> reduce)
const cePassedAverage = students
  .filter((student) => student.major === "CE" && student.score >= 50)
  .map((student) => student.score)
  .reduce((total, score, index, scores) => {
    return total + score / scores.length;
  }, 0);

console.log("--- ส่วนที่ 1 ---");
console.log("รายชื่อนักศึกษา:", getNames(students));
console.log("นักศึกษาที่สอบผ่าน:", getPassedStudents(students));
console.log("คะแนนรวม:", getTotalScore(students));
console.log("คะแนนเฉลี่ย:", getAverageScore(students));
console.log("จำนวนนักศึกษาแต่ละเกรด:", countByGrade(students));
console.log("นักศึกษาคะแนนสูงสุด:", getTopStudent(students));

console.log("--- ส่วนที่ 2 ---");
console.log("คะแนนเฉลี่ย CE ที่สอบผ่าน:", cePassedAverage.toFixed(2));


// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีขอบ (Edge Case)
// ==========================================
console.log("--- ทดสอบ Array ว่าง [] ---");
const emptyStudents = [];

console.log("getNames:", getNames(emptyStudents));
console.log("getPassedStudents:", getPassedStudents(emptyStudents));
console.log("getTotalScore:", getTotalScore(emptyStudents));
console.log("getAverageScore:", getAverageScore(emptyStudents));
console.log("countByGrade:", countByGrade(emptyStudents));
console.log("getTopStudent:", getTopStudent(emptyStudents));