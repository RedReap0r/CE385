import express from "express";

// สร้าง Express application และเปิดให้รับข้อมูล JSON จาก request body
const app = express();

app.use(express.json());

// ข้อมูล todo ตัวอย่างที่เก็บไว้ในหน่วยความจำชั่วคราว
const TODOS = [
    {id: "2762", title: "Express", done: true, priority: "high" },
    {id: "2763", title: "LAb", done: false, priority: "high" },
    {id: "2764", title: "movie", done: false, priority: "normal" },
    {id: "2765", title: "cooking", done: false, priority: "low" }
];


const PRIORITIES = ["high", "normal", "low"];

// ตรวจสอบข้อมูลก่อนส่งต่อให้ handler ของการสร้าง todo
function validateTodo(req, res, next) {
    const {title, priority} = req.body ?? {};

    if (typeof title !== "string" || title.trim() === ""){
        return res.status(400).json({error: "ต้องมี title เป็นข้อความ"});
    }
    
    if (priority !== undefined && !PRIORITIES.includes(priority)) {
        return res.status(400).json({error: "priority ไม่ถูกต้อง"});
    }
    
    return next();
}

// endpoint สำหรับตรวจสอบว่า server ยังทำงานอยู่
app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

// รวม endpoint ที่เกี่ยวข้องกับ todo ไว้ใน router เดียวกัน
const todoRouter = express.Router(); 

// ส่งคืน todo ทั้งหมด โดยสร้าง object ใหม่เพื่อป้องกันข้อมูลต้นฉบับถูกแก้จากภายนอก
todoRouter.get("/", (req, res) => {
    res.json(TODOS.map((t) => ({...t})));
});

// ค้นหา todo ตาม id และแจ้ง 404 หากไม่พบรายการ
todoRouter.get("/:id", (req, res) => {
    const todo = TODOS.find((t) => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
    }
    return res.json({...todo}); 
});

// สร้าง todo ใหม่ หลังจากผ่าน middleware validateTodo แล้ว
todoRouter.post("/", validateTodo, (req, res) => {

    // ดึงข้อมูลรายการสุดท้ายใน Array ออกมา
    const lastTodo = TODOS[TODOS.length - 1];

    // เอา ID ของรายการสุดท้ายมาแปลงเป็นตัวเลข แล้วบวก 1 จากนั้นแปลงกลับเป็น String
    const nextId = String(Number(lastTodo.id) + 1);


    const created = {
        id: nextId, 
        title: req.body.title,         
        done: false,                   
        priority: req.body.priority ?? "normal", 
    };
    
    TODOS.push(created); 

    res.status(201).json({...created});
});

// กำหนด version ของ API เพื่อรองรับการพัฒนา version ใหม่ในอนาคต
const v1Router = express.Router(); 

v1Router.use("/todos", todoRouter);

// ทุก endpoint ใน v1Router จะขึ้นต้นด้วย /api/v1
app.use("/api/v1", v1Router);

// เริ่มต้น server ที่ port 3000
app.listen(3000, () => {
    console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
    console.log("ทดสอบ API ได้ที่ http://localhost:3000/api/v1/todos"); 
});