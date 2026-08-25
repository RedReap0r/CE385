// ฟังก์ชันแปลงคะแนนเป็นเกรด
function toGrade(score) {
  if (score < 0 || score > 100) {
    return "คะแนนไม่ถูกต้อง";
  }

// กำหนดตัวแปรเก็บเกรด
let grade;
  if (score >= 80) {
    grade = "A";
  }
  if (score >= 75) {
    grade = "B+";
  }
  if (score >= 70) {
    grade = "B";
  }
  if (score >= 65) {
    grade = "C+";    
  }
  if (score >= 60) {
    grade = "C";
  }
  if (score >= 55) {
    grade = "D+";
  }
  if (score >= 50) {
    grade = "D";
  }
  else {
    grade = "F";
  }
  return (`คะแนนรวม: ${score} | เกรด: ${grade}`);
}

// ทดสอบฟังก์ชันด้วยคะแนนตัวอย่าง
const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];
console.log("=== ผลการทดสอบตัดเกรด ===");

for (const currentScore of testScores) {
  if (currentScore < 0 || currentScore > 100) {
    console.log(`คะแนน ${currentScore} ไม่ถูกต้อง`);
  } else {
    console.log(toGrade(currentScore));
  }
}