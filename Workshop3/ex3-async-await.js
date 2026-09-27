const students = [
  { id: "6501", name: "สมชาย", major: "CE", score: 85, grade: "A" },
  { id: "6502", name: "สมหญิง", major: "IT", score: 90, grade: "A" },
  { id: "6503", name: "สมครี", major: "CE", score: 78, grade: "B" },
];

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== "string" || id.trim() === "") {
      return reject(new Error("รหัสักศึกษาไม่ถูกต้อง"));
    }
    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (student === undefined) {
        return reject(new Error("ไม่พบรหัสนักศึกษา " + id));
      }
      return resolve({ ...student });
    }, 300);
  });
}

// ส่วนที่ 1 — reportSequential(): ดึงนักศึกษา 3 คน "ทีละคน" ด้วย await ใน for...of
async function reportSequential() {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log("Sequential พบ:", student.name);
  }

  const endTime = Date.now();
  console.log(
    "ใช้เวลาแบบลำดับ (Sequential): " + (endTime - startTime) + " ms\n",
  );
}

// ส่วนที่ 2 — reportParallel(): ดึง 3 คนพร้อมกันด้วย Promise.all + map
async function reportParallel() {
  const ids = ["6501", "6502", "6503"];
  const startTime = Date.now();

  const promises = ids.map((id) => {
    return fetchStudentByIdAsync(id);
  });

  const results = await Promise.all(promises);
  for (const student of results) {
    console.log("Parallel พบ:", student.name);
  }

  const endTime = Date.now();
  console.log("ใช้เวลาแบบขนาน (Parallel): " + (endTime - startTime) + " ms\n");
}

// ส่วนที่ 3 — safeReport(id) ครบ try-catch-finally
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log("พบข้อมูล: " + student.name + " (เกรด " + student.grade + ")");
  } catch (err) {
    console.log("ตรวจไม่พบ: " + err.message);
  } finally {
    console.log("-- จบการตรวจสอบ " + id + " --\n");
  }
}

async function main() {
  await reportSequential();
  await reportParallel();

  // ทดสอบ safeReport ทั้ง id ที่พบและไม่พบ
  await safeReport("6501");
  await safeReport("9999");
}

main();
