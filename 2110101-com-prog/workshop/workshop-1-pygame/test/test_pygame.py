import pygame

width = 500
height = 300
FPS = 60

pygame.init()
clock = pygame.time.Clock()
screen = pygame.display.set_mode((width,height))
pygame.display.set_caption("Test_Pygame")

blackpink_img = pygame.image.load("source/BlackPink/blackpink.jpg").convert_alpha()
blackpink_img = pygame.transform.scale(blackpink_img, (500, 300))
blackpink_rect = blackpink_img.get_rect()

while True:
    clock.tick(FPS)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

    screen.fill((0,0,0))

    screen.blit(blackpink_img, blackpink_rect)
    pygame.display.flip()
