import os
import pygame as pg

dirname = os.path.dirname(__file__)

# initialize game engine
pg.init()

window_width=1280//2
window_height=720//2

animation_increment=10
clock_tick_rate=20

# Open a window
size = (window_width, window_height)
screen = pg.display.set_mode(size)

# Set title to the window
pg.display.set_caption("Test pygame lib")

dead=False

clock = pg.time.Clock()
background_image = pg.image.load(os.path.join(dirname, 'test_img.jpg')).convert()
background_image = pg.transform.scale(background_image, (1280//2, 720//2))

while(dead==False):
    for event in pg.event.get():
        if event.type == pg.QUIT:
            dead = True

    screen.blit(background_image, [0, 0])

    pg.display.flip()
    clock.tick(clock_tick_rate)