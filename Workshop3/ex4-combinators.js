// เครื่องมือจำลอง (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)),
      ms,
    );
  });

async function main() {
  console.log("--- เริ่มต้นจำลองสถานการณ์ Combinator ---\n");

  // สถานการณ์ 1: หน้าแรก: "โปรไฟล์" (300ms) + "ตารางเรียน" (400ms) + "ประกาศ" (500ms)
  // ใช้ Promise.all เพราะต้องการข้อมูลครบทุกชิ้น ถ้าชิ้นใดชิ้นหนึ่งพัง ถือว่าพังทั้งหมด
  try {
    const results1 = await Promise.all([
      wait(300, "โปรไฟล์"),
      wait(400, "ตารางเรียน"),
      wait(500, "ประกาศ"), // สามารถลองเปลี่ยน willFail = true ที่นี่ได้
    ]);
    console.log("สถานการณ์ 1 สำเร็จ -> เปิดหน้าแรก: ", results1.join(", "));
  } catch (err) {
    console.log("สถานการณ์ 1 ล้มเหลว -> หน้าแรกเปิดไม่ได้:", err.message);
  }

  // สถานการณ์ 2: แจ้งเตือนผลสอบ: "อีเมล" (300ms สำเร็จ) - "SMS" (500ms ล้มเหลว) - "แอป" (400ms สำเร็จ)
  // ใช้ Promise.allSettled เพราะต้องการรายงานผลทุกช่อง ช่องที่ล้มเหลวห้ามทำรายงานพัง
  const results2 = await Promise.allSettled([
    wait(300, "อีเมล", false),
    wait(500, "SMS", true), // จำลองให้ล้มเหลว
    wait(400, "แอป", false),
  ]);
  console.log("สถานการณ์ 2 ผลลัพธ์ (allSettled):");
  results2.forEach((res, index) => {
    if (res.status === "fulfilled") {
      console.log(`  - ช่องที่ ${index + 1}: สำเร็จ (${res.value})`);
    } else {
      console.log(`  - ช่องที่ ${index + 1}: ล้มเหลว (${res.reason.message})`);
    }
  });
  console.log("");

  // สถานการณ์ 3: mirror server: mirror-A (300ms ล้มเหลว) - mirror-B (600ms สำเร็จ)
  // ใช้ Promise.any เพราะต้องการข้อมูลจากตัวแรกที่สำเร็จ (ถ้าตัวแรกพัง ข้ามไปเอาตัวถัดไปที่สำเร็จ)
  try {
    const firstSuccess = await Promise.any([
      wait(300, "mirror-A", true),
      wait(600, "mirror-B", false),
    ]);
    console.log("สถานการณ์ 3 สำเร็จ -> ใช้ข้อมูลจาก:", firstSuccess);
  } catch (err) {
    console.log("สถานการณ์ 3 ล้มเหลวทั้งหมด");
  }

  // สถานการณ์ 4: ค้นหา: ฐานข้อมูล (1200ms สำเร็จ) แต่ผู้ใช้ได้ 800ms (เกิน 800ms ให้ใช้แคชแทน)
  // สร้างฟังก์ชัน timeoutPromise เพื่อจำกัดเวลา
  const timeoutPromise = (ms) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout เกินกำหนดเวลา"));
      }, ms);
    });
  };

  try {
    // ใช้ Promise.race ระหว่างฐานข้อมูลกับตัวจำกัดเวลา 800ms
    const searchResult = await Promise.race([
      wait(1200, "ข้อมูลจากฐานข้อมูล"),
      timeoutPromise(800),
    ]);
    console.log("สถานการณ์ 4 สำเร็จ:", searchResult);
  } catch (err) {
    console.log("สถานการณ์ 4 ใช้แคชเก่าแทน (เนื่องจาก:", err.message, ")");
  }
}

main();

/*
  Comment อธิบายเหตุผลการเลือกใช้:
  1) สถานการณ์ 1 ใช้ Promise.all: เพราะหน้าเว็บต้องใช้ข้อมูลครบทุกส่วน (โปรไฟล์, ตารางเรียน, ประกาศ) หากส่วนใดส่วนหนึ่งโหลดไม่ได้ หน้าแรกจะแสดงผลไม่สมบูรณ์
  2) สถานการณ์ 2 ใช้ Promise.allSettled: เพราะระบบแจ้งเตือนต้องการสรุปผลทุกช่องทางการส่ง โดยไม่สนใจว่าช่องทางใดช่องทางหนึ่งจะส่งไม่ผ่าน
  3) สถานการณ์ 3 ใช้ Promise.any: เพราะระบบ Mirror ต้องการเพียงเซิร์ฟเวอร์สำรองตัวแรกที่ตอบสนองสำเร็จทันที
  4) สถานการณ์ 4 ใช้ Promise.race ร่วมกับ timeout: เพื่อจับเวลาว่าถ้าฐานข้อมูลตอบช้าเกิน 800ms จะสั่งตัดการรอและหันไปใช้ข้อมูลจากแคชแทน
*/
