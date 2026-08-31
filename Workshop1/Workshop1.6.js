// ---------- ส่วนที่ 1: ฟังก์ชัน login ----------
function login(inputUser, inputPass, role, isActive, age) {
  const validUsername = "admin";
  const validPassword = "ce385pass";

  // ลำดับที่ 1: ตรวจ username / password ก่อนเสมอ
  if (inputUser !== validUsername || inputPass !== validPassword) {
    return { code: 401, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
  }

  // ลำดับที่ 2: ตรวจว่าบัญชีถูกระงับหรือไม่
  if (isActive === false) {
    return { code: 403, message: "บัญชีนี้ถูกระงับการใช้งาน" };
  }

  // ลำดับที่ 3: ตรวจอายุ (โจทย์ไม่ได้ระบุรหัสสำหรับกรณีนี้ จึงใส่ code เป็น null)
  if (age < 18) {
    return { code: null, message: "อายุไม่ถึงเกณฑ์" };
  }

  // ลำดับที่ 4 และ 5: ผ่านทุกเงื่อนไขแล้ว ตรวจ role เพื่อคืนข้อความตามสิทธิ์
  if (role === "อาจารย์") {
    return { code: 200, message: "เข้าสู่ระบบสำเร็จ (สิทธิ์ผู้สอน)" };
  }

  if (role === "นักศึกษา") {
    return { code: 200, message: "เข้าสู่ระบบสำเร็จ (สิทธิ์นักศึกษา)" };
  }

  // กรณี role ไม่ตรงกับทั้งสองค่าที่กำหนด (เผื่อไว้ ไม่ให้ฟังก์ชันคืนค่า undefined)
  return { code: 400, message: "บทบาท (role) ไม่ถูกต้อง" };
}

// ---------- ส่วนที่ 2: ทดสอบฟังก์ชันอย่างน้อย 6 กรณี ----------

// 1. สำเร็จ (อาจารย์)
console.log("1) อาจารย์ล็อกอินสำเร็จ:", login("admin", "ce385pass", "อาจารย์", true, 30));

// 2. สำเร็จ (นักศึกษา)
console.log("2) นักศึกษาล็อกอินสำเร็จ:", login("admin", "ce385pass", "นักศึกษา", true, 20));

// 3. รหัสผ่านผิด
console.log("3) รหัสผ่านผิด:", login("admin", "wrongpass", "อาจารย์", true, 30));

// 4. ชื่อผู้ใช้ผิด
console.log("4) ชื่อผู้ใช้ผิด:", login("wronguser", "ce385pass", "นักศึกษา", true, 20));

// 5. บัญชีถูกระงับ
console.log("5) บัญชีถูกระงับ:", login("admin", "ce385pass", "นักศึกษา", false, 20));

// 6. อายุไม่ถึงเกณฑ์
console.log("6) อายุไม่ถึงเกณฑ์:", login("admin", "ce385pass", "นักศึกษา", true, 15));

