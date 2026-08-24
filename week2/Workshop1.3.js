// ส่วนที่ 1: สร้างตัวแปรเก็บคะแนนดิบ
const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const finalExam = 24;

// เก็บตัวแปรที่เป็นค่าคงที่เอาไว้สำหรับแปลงคะแนนWorkshop
const workshopRawMax = 60;
const workshopWeight = 20;
const MaxTotal = 100;
const TargetScore = 80;

// ส่วนที่ 2: คำนวณคะแนนWorkshop
// แปลงคะแนน Workshop ตามสูตร
const workshopScore = (workshopRaw / workshopRawMax) * workshopWeight;

// คำนวณคะแนนรวม
const TotalScore = workshopScore + attendance + project + midterm + finalExam;

// คำนวณคะแนนรวมเป็นเปอร์เซ็น
const TotalScorePercent = (TotalScore / MaxTotal) * 100;

// คำนวณว่าขาดอีกกี่คะแนนถึงจะได้ 80 คะแนน
const ScoreToTarget = TargetScore - TotalScore;

// ส่วนที่ 3: แสดงผลลัพธ์
console.log(`=== ผลการคำนวณคะแนนรวม ===
คะแนน Workshop (แปลงแล้ว) : ${workshopScore.toFixed(2)} / ${workshopWeight}
คะแนน Attendance           : ${attendance} / 10
คะแนน Project              : ${project} / 20
คะแนน Midterm             : ${midterm} / 20
คะแนน Final Exam          : ${finalExam} / 30
คะแนนรวมทั้งหมด          : ${TotalScore.toFixed(2)} / ${MaxTotal}
คะแนนรวมเป็นเปอร์เซ็น   : ${TotalScorePercent.toFixed(2)} %
คะแนนที่ต้องได้เพื่อ 80  : ${ScoreToTarget > 0 ? ScoreToTarget.toFixed(2) : 0} คะแนน
==============================`);