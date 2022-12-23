import pygame as pg  # import library

pg.init()  # initialize pygame modules

# initialize screen resolution and variable
width = 320
height = 240
FPS = 60

speed = [2, 2]
black = 0, 0, 0

# นำเอาค่าในตัวแปร size ใช้ในการสร้าง screen resolution
screen = pg.display.set_mode((width, height))

# โหลดภาพจากภายนอกเข้ามาใช้
ball = pg.image.load("source/img/intro_ball.gif")
clock = pg.time.Clock()
running = True
'''
ภาพ intro_ball ที่โหลดเข้ามาเก็บไว้ใน ball เป็นเพียง surface
การจะนำ surface มาใช้นั้นต้องเปลี่ยนให้เป็น object ที่มี attribute 
เนื่องจากรูปเป็นสี่เหลี่ยมเราจึงเลือกใช้ .get_rect() 
จะได้ object ที่มี height และ width เท่ากับภาพและมีจุดเริ่มต้นอยู่ที่บนซ้ายสุด 
(แต่ไม่มีภาพ มีแค่ attribute เหมือนเป็นกล่องสี่เหลี่ยนเปล่าวๆที่สามารถทำอะไรต่างๆได้)
ทำให้ทุกครั้งที่มีการเรียกใช้คำสั่ง pygame.image.load("...") มักจะใช้คำสั่ง .get_rect() ตามมาด้วย
'''
ballrect = ball.get_rect()
'''
รู้ไว้หน่อย! : attribute หลักๆของ object ที่ได้จาก .get_rect() 
เช่น .left   (ค่า x ซ้ายสุดสุดของ object) 
    .right  (ค่า x ขวาสุดของ object)
    .top    (ค่า y ด้านบนสุดของ object)
    .bottom (ค่า y ด้านล่างของ object)
'''

# เข้า while loop เพื่อเริ่มวงวนการทำงาน
while running:

    # set ให้ตัวเกมส์แสดงผลด้วยความเร็วที่เหมาะสม
    clock.tick(FPS)

    # วน loop การรับ event จาก mouse หรือ keyboard
    for event in pg.event.get():
        # ตรวจสอบว่า ถ้า event นั้นเป็นการคลิกปุ่มปิด x ให้ทำการปิดโปรแกรม
        if event.type == pg.QUIT:
            running = False
            pg.quit()

    if running:
        # เนื่องจากเราแปลง ballrect กลายเป็น object แล้วเราสามารถให้มันขยับได้ด้วย คำสั่ง .move(...)
        ballrect = ballrect.move(speed)

        # สร้าง condition ว่า ถ้า ball ทะลุกรอบซ้ายของจอ หรือ ทะลุกรอบขวาของจอให้กลับ
        if ballrect.left < 0 or ballrect.right > width:
            speed[0] = -speed[0]

        ###########################################################################
        # TO DO 1 : จงทำให้บอลชิ่งไปมาในกรอบสี่เหลี่ยม (ไม่ตกกรอบ บน-ล่าง) [ top , bottom ]
        # Hint [ทำคล้ายๆกับข้างบน speed[0] หมายถึงแกน x และ speed[1] หมายถึงแกน y]
        if ballrect.top < 0 or ballrect.bottom > height:
            speed[1] = -speed[1]

        ###########################################################################

        # ล้างทุกอย่างในจอโดยการให้จอเป็นสีดำ (ลอง comment code ดูสิจะเกิดอะไรขึ้น)
        screen.fill(black)

        # เอาภาพ ball ใส่ใน object ballrect (ลอง comment code ดูสิว่าเกิดอะไรขึ้น)
        screen.blit(ball, ballrect)

        # อัพเดท content ลงใน screen -> ในที่นี้คือการ นำเอา screen และ ballrect ใส่ลงใน window
        # (ลอง comment code ดูสิว่าเกิดอะไรขึ้น)
        pg.display.flip()
