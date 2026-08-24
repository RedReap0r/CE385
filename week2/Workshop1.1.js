// ประกาศตัวแปรเก็บข้อมูลส่วนตัว 5 อย่าง (ห้ามใช้ var)
const nickname = "ปรเมศวรื";
const studentId = "67111311";
const age = "21";
const major = "วิศวกรรมคอมพิวเตอร์";
const registeredCourses = "7";

// ประกาศตัวแปรสำหรับคำนวณปีที่จะจบการศึกษา
const currentBaseYear = 2567;
const remainingYears = 2;

// แสดงผลด้วย Template Literal (ห้ามใช้ + ต่อข้อความ)
console.log(`===== บัตรแนะนำตัว =====
ชื่อเล่น       : ${nickname}
รหัสนักศึกษา   : ${studentId}
อายุ         : ${age} ปี
สาขาวิชา     : ${major}
ลงทะเบียน    : ${registeredCourses} วิชา
ปีที่จะจบ     : ${currentBaseYear + remainingYears}
========================`);