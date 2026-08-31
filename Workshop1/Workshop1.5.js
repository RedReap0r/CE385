// ฟังก์ชันค้นหาราคาเมนู
function getMenuPrice(menu) {
    switch (menu) {
        case "ข้าวผัด": // ใช้ fallthrough เพื่อให้ราคาของข้าวผัด ข้าวมันไก่และข้าวหมูแดงเหมือนกัน 
        case "ข้าวมันไก่":
        case "ข้าวหมูแดง":
            return 50;
        case "ผัดไทย":
            return 60;
        case "ต้มยำกุ้ง":
            return 120;
        default:
            return 0; // เมนูอื่นๆ (ไม่มีในรายการ)
    }
}
// ฟังก์ชันหาตัวคูณขนาด
function getSizeMultiplier(size) {
    switch (size) {
        case "ธรรมดา":
            return 1;
        case "พิเศษ":
            return 1.5;
        case "จัมโบ้":
            return 2;
        default:
            return 1; // ขนาดอื่นๆเป็นธรรมดา
    }
}
const orders = [
    { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
    { menu: "ต้มยำกุ้ง", size: "ธรรมดา", qty: 1 },
    { menu: "ข้าวผัด", size: "จัมโบ้", qty: 3 },
    { menu: "ส้มตำ", size: "พิเศษ", qty: 1 }, // ส้มตำ คือ เมนูนี้ไม่มีในรายการ
    { menu: "ข้าวหมูแดง", size: "ธรรมดา", qty: 2 }    
];
let totalBill = 0;
console.log("=== สรุปรายการสั่งอาหาร ===");

// วนลูปเพื่อคำนวณราคาของแต่ละรายการสั่งอาหาร
for (const order of orders) {
    const basePrice = getMenuPrice(order.menu);
    const sizeMultiplier = getSizeMultiplier(order.size);
    
    //สูตร: ราคาเมนู x ตัวคูณขนาด x จำนวน
    const itemTotalPrice = basePrice * sizeMultiplier * order.qty;
    totalBill += itemTotalPrice;
    
    // แสดงผลลัพธ์ของแต่ละรายการสั่งอาหาร
    if (basePrice === 0) {
         console.log(`${order.menu} (${order.size}) x${order.qty} = ${itemTotalPrice} บาท (ไม่มีเมนูนี้ในระบบ)`);
    } else {
         console.log(`${order.menu} (${order.size}) x${order.qty} = ${itemTotalPrice} บาท`);
    }
}
console.log("--------------------------");
console.log(`ราคารวมทั้งบิล: ${totalBill} บาท`);