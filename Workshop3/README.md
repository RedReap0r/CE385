## ex1-callback.js
ไฟล์นี้ฝึกการทำงานแบบ Callback โดยใช้รูปแบบ error-first callback
มีฟังก์ชันค้นหานักศึกษาตามรหัส และทดสอบกรณีพบข้อมูล ไม่พบข้อมูล และรหัสไม่ถูกต้อง

## ex2-promise.js
ไฟล์นี้ฝึกการใช้งาน Promise ด้วย `new Promise`
มีการจัดการผลลัพธ์ด้วย `.then`, `.catch`, `.finally` และการต่อ Promise หลายขั้นตอนด้วย chaining
นอกจากนี้ยังมีฟังก์ชัน `promisify` สำหรับแปลงฟังก์ชันแบบ callback ให้ใช้งานเป็น Promise

## ex3-async-await.js
ไฟล์นี้ฝึกการใช้งาน `async/await`
เปรียบเทียบการดึงข้อมูลแบบทำทีละรายการด้วย `for...of` กับการดึงข้อมูลพร้อมกันด้วย `Promise.all`
มีการจัดการข้อผิดพลาดด้วย `try-catch-finally`

## ex4-combinators.js
ไฟล์นี้ฝึกใช้ Promise Combinators ได้แก่
	`Promise.all` สำหรับงานที่ต้องสำเร็จครบทุกส่วน
	`Promise.allSettled` สำหรับสรุปผลของทุกงานทั้งที่สำเร็จและล้มเหลว
	`Promise.any` สำหรับเลือกผลลัพธ์จากงานแรกที่สำเร็จ
	`Promise.race` สำหรับจำกัดเวลาและเลือกผลลัพธ์ที่เกิดขึ้นก่อน
