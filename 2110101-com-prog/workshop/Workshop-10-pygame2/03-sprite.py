import pygame as pg

pg.init()

green = (20, 255, 140)
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
teal = (0, 128, 128)

width = 400
height = 400

screen = pg.display.set_mode((width, height))
pg.display.set_caption("ShipSpace")


class Ship(pg.sprite.Sprite):
    def __init__(self, color, width, height):
        super().__init__()

        # สร้าง Surface ขึ้นมาจากนั้นวาด "ยาน" ขึ้นมาด้วยสี่เหลี่ยมผืนผ้า
        # self.image = pg.Surface([30, 40])
        # self.image.fill(red)

        # TO DO 1 : แทนที่เราจะใช้ shape เราสามารถใช้ภาพแทนได้
        # [Hint] : pg.image.load สำหรับโหลดภาพ , pg.transform.scale สำหรับปรับขนาดภาพ
        self.image = pg.image.load("source/img/Ship.png")
        self.image = pg.transform.scale(self.image, (width, height))

        # แปลง Surface เป็น object
        self.rect = self.image.get_rect()

    def moveRight(self, d):
        self.rect.x += d

    def moveLeft(self, d):
        self.rect.x -= d

    # TO DO 2 : สร้าง function ที่สามารถทำให้ยาน ขยับขึ้น - ลง ได้
    def moveUp(self, d):
        self.rect.y -= d

    def moveDown(self, d):
        self.rect.y += d


# TO DO 4 : สร้าง Class Meteor
# โดยกำหนด attribute .image ไปยัง "source/img/meteor_med.png"
# และกำหนด attribute .rect สำหรับ object
class Meteor(pg.sprite.Sprite):
    def __init__(self, color, width, height):
        super().__init__()

        # self.image = pg.Surface([30, 40])
        # self.image.fill(red)
        self.image = pg.image.load("source/img/meteor_med.png")
        self.image = pg.transform.scale(self.image, (width, height))

        self.rect = self.image.get_rect()


# จะได้ list ที่ภายในมี sprites ที่ใช้ในเกมอยู่
all_sprites = pg.sprite.Group()

# TO DO 5-1 : สร้าง sprite Group ของ Meteor
meteors = pg.sprite.Group()

# สร้าง Object ของยาน ขึ้นมา [ w = 50 , h = 38]
myShip = Ship(red, 50, 38)
# กำหนดพิกัดเริ่มต้นของยาน
myShip.rect.x = 200
myShip.rect.y = 350


# TO DO 5-2 : สร้าง Object meteor
meteor = Meteor(red, 50, 50)

# TO DO 5-3 : กำหนดพิกัดเริ่มต้นให้ Meteor [ x = 110 , y = 170]
meteor.rect.x = 110
meteor.rect.y = 170

# เอา object Ship ที่สร้างขึ้นมาใส่ลงใน all_sprites
all_sprites.add(myShip)

# TO DO 5-4 : เอา object meteor ที่สร้างขึ้นมาใส่ลงใน all_sprites และ sprite group ที่เก็บ meteor
all_sprites.add(meteor)
meteors.add(meteor)

# สร้าง clock
clock = pg.time.Clock()

while True:
    # Set FPS
    clock.tick(60)

    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
        elif event.type == pg.KEYDOWN:
            if event.key == pg.K_x:
                pg.quit()

    keystate = pg.key.get_pressed()
    if keystate[pg.K_LEFT]:
        myShip.moveLeft(5)
    elif keystate[pg.K_RIGHT]:
        myShip.moveRight(5)

    # TO DO 3 : ถ้ากด arrow ขึ้น ให้ขยับยานขึ้นไป 5 หน่วย และ ถ้ากด arrow ลง ให้ขยับยานลงมา 5 หน่วย
    if keystate[pg.K_UP]:
        myShip.moveUp(5)
    elif keystate[pg.K_DOWN]:
        myShip.moveDown(5)

    # TO DO 6 : ตรวจสอบว่าถ้ายานชนหิน ให้ทำลายหินก้อนนั้นซะ
    pg.sprite.spritecollide(myShip, meteors, True)

    # ใส่พื้นหลังสีเขียว
    screen.fill(green)
    # วาดถนน
    pg.draw.rect(screen, teal, [100, 0, 200, 400])
    # วาดเส้นกลางถนน
    pg.draw.line(screen, white, [200, 0], [200, 400], 5)

    # วาดทุก object ที่อยู่ใน all_sprites
    all_sprites.draw(screen)

    # อัพเดท content ลงใน screen [ห้ามลืมเด็ดขาด]
    pg.display.flip()
