// --- ส่วนที่ 1: สร้างตัวแปรเก็บคะแนนดิบ ---
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

// เก็บตัวเลขเกณฑ์คงที่ไว้ในตัวแปร const (ห้ามพิมพ์ตัวเลขดิบกลางสูตร)
const MAX_WORKSHOP_RAW = 60;
const WORKSHOP_WEIGHT = 20;
const MAX_TOTAL_SCORE = 100;
const TARGET_SCORE = 80;

// --- ส่วนที่ 2: คำนวณ ---
// อธิบายสูตร: แปลงคะแนน Workshop โดยนำคะแนนดิบหารด้วยคะแนนเต็มดิบ แล้วคูณด้วยน้ำหนักคะแนนจริง
const workshopScore = (workshopRaw / MAX_WORKSHOP_RAW) * WORKSHOP_WEIGHT;

// อธิบายสูตร: คำนวณคะแนนรวมทั้งหมด โดยนำคะแนนทุกส่วนมารวมกัน
const totalScore = workshopScore + attendance + project + midterm + final;

// อธิบายสูตร: คำนวณเปอร์เซ็นต์ โดยนำคะแนนรวมหารด้วยคะแนนเต็มทั้งหมด แล้วคูณ 100
const percentage = (totalScore / MAX_TOTAL_SCORE) * 100;

// อธิบายสูตร: คำนวณคะแนนที่ขาดเพื่อไปถึงเป้าหมาย 80 คะแนน
const pointsNeeded = TARGET_SCORE - totalScore;

// --- ส่วนที่ 3: แสดงผลใบสรุปคะแนนด้วย Template Literal (ทศนิยม 2 ตำแหน่ง) ---
console.log(`===== ใบสรุปคะแนนวิชา CE385 =====
คะแนน Workshop (ปรับสัดส่วน): ${workshopScore.toFixed(2)}
คะแนนเข้าเรียน            : ${attendance.toFixed(2)}
คะแนนโปรเจค              : ${project.toFixed(2)}
คะแนนสอบกลางภาค          : ${midterm.toFixed(2)}
คะแนนสอบปลายภาค          : ${final.toFixed(2)}
---------------------------------
คะแนนรวมทั้งหมด            : ${totalScore.toFixed(2)} / ${MAX_TOTAL_SCORE}
คิดเป็นเปอร์เซ็นต์           : ${percentage.toFixed(2)}%
ขาดอีกเพื่อให้ได้ ${TARGET_SCORE} คะแนน    : ${pointsNeeded.toFixed(2)}
=================================`);