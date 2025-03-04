### Linux Commands

<details>
  <summary>1. เขียนคำสั่ง LINUX เพื่อแสดงรายการไฟล์ทั้งหมดในโฟลเดอร์ปัจจุบัน (รวมถึงไฟล์ที่ซ่อนไว้) พร้อมแสดงสิทธิ์การเข้าถึง (permissions) และขนาดไฟล์</summary>
  <code>ls -la</code>
</details>

<details>
  <summary>2. เขียนคำสั่ง LINUX เพื่อค้นหาไฟล์ทั้งหมดที่มีนามสกุล `.txt` ในโฟลเดอร์ `/home/user/documents`</summary>
  <code>find /home/user/documents -name "*.txt"</code>
</details>

<details>
  <summary>3. เขียนคำสั่ง LINUX เพื่อตรวจสอบการใช้หน่วยความจำ (RAM) และ CPU ของระบบในปัจจุบัน</summary>
  <code>top</code> หรือ <code>htop</code>
</details>

---

### Analysis Questions

<details>
  <summary>4. วิเคราะห์ข้อดี-ข้อเสียของการใช้ Virtual Memory ในระบบปฏิบัติการ</summary>
  ข้อดี: ขยายหน่วยความจำได้ | ข้อเสีย: ช้าลงจาก swapping
</details>

<details>
  <summary>5. การใช้งาน Multi-threading ในแอปพลิเคชันมีข้อดีและความเสี่ยงอย่างไร</summary>
  ข้อดี: เพิ่มประสิทธิภาพ | ข้อเสีย: เสี่ยง race condition
</details>

<details>
  <summary>6. ถ้าไม่มีระบบไฟล์ (File System) ใน OS จะเกิดปัญหาอะไรบ้าง</summary>
  ข้อมูลจัดเก็บไม่เป็นระบบ เข้าถึงยาก
</details>

<details>
  <summary>7. เปรียบเทียบข้อดี-ข้อเสียของ Preemptive Scheduling vs. Nonpreemptive Scheduling</summary>
  Preemptive: ยุติธรรมแต่โอเวอร์เฮดสูง | Nonpreemptive: น้อยโอเวอร์เฮดแต่เสี่ยงดีเลย์
</details>

---

### Mechanism Explanations

<details>
  <summary>8. ทำไม OS ต้องจัดการกับ Deadlock? จะเกิดอะไรขึ้นหาก OS ไม่มีกลไกป้องกัน Deadlock</summary>
  ป้องกันการติดขัดของระบบ; ระบบจะค้างถ้าไม่จัดการ
</details>

<details>
  <summary>9. อธิบายเหตุผลที่ OS ต้องใช้ระบบ Paging หรือ Segmentation</summary>
  เพื่อจัดการหน่วยความจำอย่างมีประสิทธิภาพ ลด fragmentation
</details>

<details>
  <summary>10. เหตุใดการ Synchronization ระหว่างกระบวนการ (Process Synchronization) จึงสำคัญ</summary>
  ป้องกันข้อมูลผิดพลาดเมื่อโปรเซสใช้ทรัพยากรร่วมกัน
</details>

<details>
  <summary>11. ทำไมโปรเซสในสถานะ "Waiting" จึงไม่สามารถถูกเลือกโดย CPU Scheduler ได้</summary>
  โปรเซสยังไม่พร้อมทำงาน เลือกโปรเซสที่พร้อมแทน
</details>

---

### Scenario-Based Questions (and others...)

<!-- Continue this pattern for the remaining questions -->
