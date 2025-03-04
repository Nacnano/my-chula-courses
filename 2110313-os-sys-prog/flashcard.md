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

### Scenario-Based Questions

<details>
  <summary>12. ถ้า OS ไม่มีระบบจัดการหน่วยความจำ (Memory Management) จะส่งผลต่อประสิทธิภาพของระบบอย่างไร</summary>
  หน่วยความจำใช้ไม่เต็มที่ ระบบล่มบ่อย
</details>

<details>
  <summary>13. ถ้า Time Quantum ใน Round Robin Scheduling มีค่าน้อยมาก (เช่น 1 ms) จะเกิดผลดีและผลเสียอย่างไร</summary>
  ดี: กระจายงานยุติธรรม | เสีย: โอเวอร์เฮดสวิงสูง
</details>

<details>
  <summary>14. หากระบบไม่มี Interrupts จะส่งผลต่อการทำงานของ OS อย่างไร</summary>
  ระบบตอบสนองช้า จัดการงานเร่งด่วนไม่ได้
</details>

<details>
  <summary>15. ถ้า Process หนึ่งใช้ CPU 100% ตลอดเวลา (CPU-bound) จะส่งผลต่อกระบวนการอื่นในระบบแบบ Time-Sharing อย่างไร</summary>
  โปรเซสอื่นได้ CPU น้อยลง ประสิทธิภาพลด
</details>

---

### Conceptual Definitions

<details>
  <summary>16. อธิบายความแตกต่างระหว่าง Process และ Thread</summary>
  Process: ทำงานแยกหน่วยความจำ | Thread: แชร์หน่วยความจำใน Process เดียวกัน
</details>

<details>
  <summary>17. Race Condition คืออะไร? ยกตัวอย่างสถานการณ์ในชีวิตจริงที่อาจเกิดปัญหาแบบนี้</summary>
  การแข่งขันแก้ไขข้อมูลพร้อมกัน เช่น แก้ไฟล์เดียวกันพร้อมกัน
</details>

<details>
  <summary>18. Semaphore และ Mutex Lock แตกต่างกันอย่างไร</summary>
  Semaphore ควบคุมหลายเธรดด้วยตัวนับ | Mutex ควบคุมทีละเธรด
</details>

<details>
  <summary>19. อธิบายหลักการทำงานของ CPU Scheduling แบบ Shortest-Job-First (SJF)</summary>
  เลือกงานที่ใช้เวลา CPU สั้นที่สุดก่อน เพื่อลดเวลารอคอย
</details>

---

### Advanced Analysis

<details>
  <summary>20. หากระบบมี CPU หลายตัว (Multi-core) การออกแบบ OS ต้องปรับตัวอย่างไรเพื่อให้ใช้ทรัพยากรได้เต็มที่</summary>
  ต้องกระจายงานและสมดุลโหลดระหว่างคอร์
</details>

<details>
  <summary>21. เหตุใดการเลือก Scheduling Algorithm จึงขึ้นอยู่กับประเภทของ workload (เช่น I/O-bound หรือ CPU-bound)</summary>
  เพื่อเพิ่มประสิทธิภาพตามลักษณะงาน (I/O-bound เน้นตอบสนอง | CPU-bound เน้นประมวลผล)
</details>

<details>
  <summary>22. อธิบายสาเหตุที่ทำให้ Priority Scheduling อาจนำไปสู่ปัญหา Starvation</summary>
  งานความสำคัญต่ำอาจไม่มีโอกาสทำงานถ้างานสำคัญสูงรันตลอด
</details>

---

### Real-World Examples

<details>
  <summary>23. ยกตัวอย่างสถานการณ์ที่ต้องใช้ Semaphore ในการแก้ปัญหา</summary>
  ควบคุมการเข้าถึงฐานข้อมูลเพื่อป้องกันข้อมูลซ้ำซ้อน
</details>

<details>
  <summary>24. อธิบายว่าทำไมโปรแกรมประเภท Web Server ถึงเหมาะกับการใช้ Multi-threading</summary>
  รองรับผู้ใช้หลายคนพร้อมกันโดยไม่ดีเลย์
</details>

<details>
  <summary>25. เหตุใดระบบปฏิบัติการแบบ Real-Time (เช่นในรถยนต์หรือหุ่นยนต์) จึงต้องมี Scheduling ที่รวดเร็วและแม่นยำ</summary>
  ต้องตอบสนองทันเวลาเพื่อความปลอดภัย (เช่น หยุดรถฉุกเฉิน)
</details>
