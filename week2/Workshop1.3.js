// ส่วนที่ 1: สร้างตัวแปรเก็บคะแนนดิบ
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const finalExam = 24;

// เก็บตัวแปรที่เป็นค่าคงที่เอาไว้สำหรับแปลงคะแนนWorkshop
const workshopRawMax = 60;
const workshopWeight = 20;
const maxTotal = 100;
const targetScore = 80;

// ส่วนที่ 2: คำนวณคะแนนWorkshop
// แปลงคะแนน Workshop ตามสูตร
const workshopScore = (workshopRaw / workshopRawMax) * workshopWeight;

// คำนวณคะแนนรวม
const totalScore = workshopScore + attendance + project + midterm + finalExam;

// คำนวณคะแนนรวมเป็นเปอร์เซ็น
const totalScorePercent = (totalScore / maxTotal) * 100;

// คำนวณว่าขาดอีกกี่คะแนนถึงจะได้ 80 คะแนน
const scoreToTarget = targetScore - totalScore;

// ส่วนที่ 3: แสดงผลลัพธ์
console.log(`===== ใบสรุปคะแนนวิชา CE385 =====
คะแนน Workshop (ปรับสัดส่วน): ${workshopScore.toFixed(2)}
คะแนนเข้าเรียน            : ${attendance.toFixed(2)}
คะแนนโปรเจค              : ${project.toFixed(2)}
คะแนนสอบกลางภาค          : ${midterm.toFixed(2)}
คะแนนสอบปลายภาค          : ${finalExam.toFixed(2)}
---------------------------------
คะแนนรวมทั้งหมด            : ${totalScore.toFixed(2)} / ${maxTotal}
คิดเป็นเปอร์เซ็นต์           : ${totalScorePercent.toFixed(2)}%
ขาดอีกเพื่อให้ได้ ${targetScore} คะแนน    : ${scoreToTarget.toFixed(2)}
=================================`);