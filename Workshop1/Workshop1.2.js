// ส่วนที่ 1: สร้างตัวแปรให้ครบ 6 ชนิด
const myString = "สวัสดี";
const myNumber = 100;
const myBoolean = true;
const myUndefined = undefined;
const myNull = null;
const myArray = [0, 1, 2, 3, 4];

console.log("=== ส่วนที่ 1 ===");
console.log(`ค่า: ${myString} | ชนิด: ${typeof myString}`);
console.log(`ค่า: ${myNumber} | ชนิด: ${typeof myNumber}`);
console.log(`ค่า: ${myBoolean} | ชนิด: ${typeof myBoolean}`);
console.log(`ค่า: ${myUndefined} | ชนิด: ${typeof myUndefined}`);
console.log(`ค่า: ${myNull} | ชนิด: ${typeof myNull}`); 
console.log(`ค่า: ${myArray} | ชนิด: ${typeof myArray}`); // หมายเหตุ: typeof array ใน JavaScript จะได้ผลลัพธ์เป็น "object"


// ส่วนที่ 2: ตอบคำถามด้วยโค้ด
console.log("\n=== ส่วนที่ 2 ===");

// 1.typeof null
console.log(`1. typeof null ได้ผลคือ: ${typeof null}`);
console.log(`   ถูกต้องตามความเป็นจริงหรือไม่: ไม่ถูกต้อง มันเป็นข้อผิดพลาด ที่มีมาตั้งแต่ยุคแรกเริ่มของ JavaScript ที่มองค่า null เป็น object`);

// 2.ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า
let unassignedVariable;
console.log(`2. ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า มีชนิดเป็น: ${typeof unassignedVariable}`);

// 3.typeof NaN
const notANumberValue = Number("abc");
console.log(`3. typeof NaN (สร้างจาก Number("abc")) ได้ผลคือ: ${typeof notANumberValue}`);
console.log(`3.1 ตรวจสอบว่า เป็น NaN หรือไม่: ${Number.isNaN(notANumberValue)}`);


// ส่วนที่ 3: การแปลงชนิด
console.log("\n=== ส่วนที่ 3 ===");
const inputAge = "20";
const inputScore = "85.5";

// แปลง inputAge เป็นตัวเลขแล้วบวก 5
const calculatedAge = Number(inputAge) + 5;
console.log(`แปลง inputAge แล้วบวก 5 ได้: ${calculatedAge}`);

// แปลง inputScore แล้วแสดงผลทศนิยม 1 ตำแหน่ง
const formattedScore = Number(inputScore).toFixed(1);
console.log(`แสดง inputScore ทศนิยม 1 ตำแหน่ง: ${formattedScore}`);

// แสดงความแตกต่างของการเปรียบเทียบแบบ Strict Equality (===)
console.log(`inputAge === 20 ได้ผล: ${inputAge === 20}`);
console.log(`Number(inputAge) === 20 ได้ผล: ${Number(inputAge) === 20}`);
console.log(`อธิบาย: === จะตรวจสอบทั้ง "ค่า" และ "ชนิดข้อมูล" 
- บรรทัดแรกได้ false เพราะเทียบ string กับ number 
- บรรทัดสองได้ true เพราะใช้ Number() แปลง string ให้เป็น number ก่อนนำไปเปรียบเทียบแล้ว`);