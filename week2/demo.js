console.log("Hello, World!");

const name = "แดง ไบเล่ย์", score = "60";

// แบบเก่า
console.log("แบบเก่า : " + name + " ได้ " + score + " คะแนน");
// แบบใหม่
console.log(`แบบใหม่ : ${name} ได้ ${score} คะแนน`);

// ใส่ นิพจน์ ลงไปได้
console.log(`ครึ่งหนึ่งของคะแนนคือ ${score / 2} คะแนน`);
console.log(`ผ่านเกณฑ์หรือไม : ${score >= 50 ? "ผ่าน" : "ไม่ผ่าน"}`);

console.warn("console.warn - คำเตือน");
console.error("console.error - ข้อผิดพลาด");

