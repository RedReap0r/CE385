const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85 },
  { id: "6502", name: "สมหญิง", major: "IT", score: 90 },
  { id: "6503", name: "สมศรี", major: "CE", score: 78 },
  { id: "6504", name: "สมศักดิ์", major: "IT", score: 92 },
];

// ส่วนที่ 2 — เขียนฟังก์ชัน fetchStudentById(id, callback) ตามธรรมเนียม error-first
function fetchStudentById(id, callback) {
  // เงื่อนไข: id ไม่ใช่ string หรือว่าง
  if (typeof id !== "string" || id.trim() === "") {
    return callback(new Error("รหัสักศึกษาไม่ถูกต้อง"));
  }

  setTimeout(() => {
    const student = students.find((s) => {
      return s.id === id;
    });

    // เงื่อนไข: ค้นแล้วไม่พบ
    if (student === undefined) {
      return callback(new Error("ไม่พบรหัสนักศึกษา " + id));
    }

    // เงื่อนไข: พบ (คืนสำเนาเสมอ)
    return callback(null, { ...student });
  }, 300);
}

// ส่วนที่ 3 — เรียกใช้ครบ 3 กรณี ก) idที่มีจริง ข) idไม่มี ค) idผิดรูปแบบ แล้วพิมพ์ผลทุกกรณี
function main() {
  // ก) id ที่มีจริง
  fetchStudentById("6501", (err, student) => {
    if (err !== null) {
      console.log("Error:", err.message);
      return;
    }
    console.log("พบข้อมูล (ก):", student);
  });

  // ข) id ที่ไม่มี
  fetchStudentById("9999", (err, student) => {
    if (err !== null) {
      console.log("Error (ข):", err.message);
      return;
    }
    console.log("พบข้อมูล:", student);
  });

  // ค) id ผิดรูปแบบ (เช่น เป็นตัวเลข 42)
  fetchStudentById(42, (err, student) => {
    if (err !== null) {
      console.log("Error (ค):", err.message);
      return;
    }
    console.log("พบข้อมูล:", student);
  });
}


main(); 
