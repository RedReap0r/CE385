const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85, grade: "A" },
  { id: "6502", name: "สมหญิง", major: "IT", score: 90, grade: "A" },
  { id: "6503", name: "สมศรี", major: "CE", score: 78, grade: "B" },
  { id: "6504", name: "สมศักดิ์", major: "IT", score: 92, grade: "A" },
];

// ส่วนที่ 1 — เขียน fetchStudentByIdAsync(id) ที่คืน Promise (ห้ามใช้ async, ใช้ new Promise เท่านั้น)
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสักศึกษาไม่ถูกต้อง"));
    }

    setTimeout(() => {
      const student = students.find((s) => {
        return s.id === id;
      });

      if (student === undefined) {
        return reject(new Error("ไม่พบรหัสนักศึกษา " + id));
      }

      return resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 2 — เรียกใช้ครบ 3 กรณีด้วย .then / .catch ปิดท้ายด้วย .finally
function main() {
  // กรณี ก) id มีจริง
  fetchStudentByIdAsync("6501")
    .then((student) => {
      console.log("Promise สำเร็จ (ก):", student);
    })
    .catch((err) => {
      console.log("Promise Error:", err.message);
    })
    .finally(() => {
      console.log("-- จบการทำงานกรณี ก --\n");
    });

  // กรณี ข) id ไม่มี
  fetchStudentByIdAsync("9999")
    .then((student) => {
      console.log("Promise สำเร็จ:", student);
    })
    .catch((err) => {
      console.log("Promise Error (ข):", err.message);
    })
    .finally(() => {
      console.log("-- จบการทำงานกรณี ข --\n");
    });

  // กรณี ค) id ผิดรูปแบบ
  fetchStudentByIdAsync(1234)
    .then((student) => {
      console.log("Promise สำเร็จ:", student);
    })
    .catch((err) => {
      console.log("Promise Error (ค):", err.message);
    })
    .finally(() => {
      console.log("-- จบการทำงานกรณี ค --\n");
    });

  // ส่วนที่ 3 — เขียน "โซ่" 3 ขั้นตอน ส่งต่อผ่าน return
  console.log("--- เริ่มต้นการส่งต่อข้อมูล (Chaining) ---");
  fetchStudentByIdAsync("6501")
    .then((student) => {
      // ขั้น 1: แปลงเป็น { name, grade }
      return { name: student.name, grade: student.grade };
    })
    .then((data) => {
      // ขั้น 2: แปลงเป็นข้อความรายงาน 1 บรรทัด
      return "นักศึกษาชื่อ " + data.name + " ได้เกรด " + data.grade;
    })
    .then((message) => {
      // ขั้น 3: พิมพ์ออกทาง console
      console.log(message);
    })
    .catch((err) => {
      console.log("Chain Error:", err.message);
    });
}

main();

// ส่วนที่ 4 (โบนัส) — เขียน promisify(fn)
function promisify(fn) {
  return function (id) {
    return new Promise((resolve, reject) => {
      fn(id, (err, result) => {
        if (err !== null) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  };
}
