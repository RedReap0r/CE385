// ตรวจสอบคะแนน (0-100)
export const isValidScore = (score) => typeof score === 'number' && score >= 0 && score <= 100;

// เกณฑ์การตัดเกรดเก็บเป็นอาร์เรย์ของอ็อบเจ็กต์ (เรียงจากคะแนนสูงไปต่ำ)
const GRADE_RULE = [
    {min: 80, grade: 'A'},
    {min: 75, grade: 'B+'},
    {min: 70, grade: 'B'},
    {min: 65, grade: 'C+'},
    {min: 60, grade: 'C'},
    {min: 55, grade: 'D+'},
    {min: 50, grade: 'D'},
    {min: 0, grade: 'F'},
];

// แปลงคะแนนเป็นเกรด
export const toGrades = (score) => {
    if (!isValidScore(score)) return 'Invalid score';
    const matched = GRADE_RULE.find((rule) => score >= rule.min);
    return matched.grade  
};

// คำนวณคะแนน Workshop
export const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
  return (raw / full) * weight;
};

// คำนวณคะแนนรวม 5 ส่วน
export const calculateTotal = (workshop, attendance, project, midterm, final) => {
  return workshop + attendance + project + midterm + final;
};

// ทดสอบ สร้างข้อมูลนักศึกษา 3 คน แล้วเรียกฟังก์ชันข้างต้นคำนวณและแสดงผลเป็นตาราง
const studentData = [
    {name: "ชัยพร" , wsRaw: 45, att: 5, pj: 18, mid: 25, final: 25},
    {name: "สมศรี", wsRaw: 60, att: 5, pj: 20, mid: 30, final: 25}, 
    {name: "ลิขิต", wsRaw: 20, att: 3, pj: 10, mid: 15, final: 15}
];

// คำนวณคะแนนรวมและเกรดของนักศึกษาแต่ละคน
const results = studentData.map((stData) => {
    const wsScore = calculateWorkshopScore(stData.wsRaw);
    const totalScore = calculateTotal(wsScore, stData.att, stData.pj, stData.mid, stData.final);
    const grades = toGrades(totalScore);

    return {
        name: stData.name,
        wsRaw: stData.wsRaw,
        wsScore: wsScore,
        totalScore: totalScore,
        grades: grades
    }
});

console.log("---ผลการประเมิน---");
console.table(results); // แสดงผลเป็นตาราง