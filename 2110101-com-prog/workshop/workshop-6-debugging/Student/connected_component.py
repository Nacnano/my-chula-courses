# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import random
import numpy as np


def check_neighbours(rows, cols, color):
    # check whether upper cell is black
    if rows-1 >= 0:
        if matrix[rows-1][cols] == 1:
            matrix[rows-1][cols] = color
            # call checkNeighbours function from within itself
            check_neighbours(rows-1, cols, color)

    # check whether lower cell is black
    if rows+1 < len(matrix):
        if matrix[rows+1][cols] == 1:
            matrix[rows+1][cols] = color
            # call checkNeighbours function from within itself
            check_neighbours(rows+1, cols, color)

    # check whether left cell is black
    if cols-1 >= 0:
        if matrix[rows][cols-1] == 1:
            matrix[rows][cols-1] = color
            # call checkNeighbours function from within itself
            check_neighbours(rows, cols-1, color)

    # check whether right cell is black
    if cols+1 < len(matrix[rows]):
        if matrix[rows][cols+1] == 1:
            matrix[rows][cols+1] = color
            # call checkNeighbours function from within itself
            check_neighbours(rows, cols+1, color)


# Create a random hexcolor code
def random_color(colorset):
    while True:
        random_color = "#"+''.join([random.choice('0123456789ABCDEF') for i in range(6)])
        if random_color != '#FFFFFF' and random_color not in colorset:
            colorset.add(random_color)
            return random_color


def neighbours(matrix):
    # Create for loop that run through every cell in matrix
    # Generate color, assign color to the cell and call check_neighbours when find an uncolored black cell.
    # Assign white color when find a white cell with mcolors.to_rgb('#FFFFFF').
    colorset = set()
    for row in range(0, len(matrix)):
        for column in range(0, len(matrix[row])):
            # found uncolored black cell
            if matrix[row][column] == 1:
                # create random color with
                color = mcolors.to_rgb(random_color(colorset))
                matrix[row][column] = color
                # expands color to neighbours
                check_neighbours(row, column, color)
            # found uncolored white cell
            elif matrix[row][column] == 0:
                matrix[row][column] = mcolors.to_rgb('#FFFFFF')


if __name__ == '__main__':
    """
    Define Input Matrix :
      0 : white
      1 : black
    Instructions!!:
      This program will colorize input matrix by grouping adjacency cells into the same color.
    """

    # Initialized input matrix
    matrix = [[0, 1, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1], [1, 0, 0, 1, 0, 1], [0, 0, 1, 1, 1, 0], [1, 0, 1, 0, 0, 1], [1, 1, 1, 0, 1, 1]]
    neighbours(matrix)
    plt.imshow(matrix)
    plt.show()

    # Create random matrix
    matrix = np.random.choice([0, 1], size=(20, 20), p=[2./4, 2./4]).tolist()
    neighbours(matrix)
    plt.figure(figsize=(8, 8))
    plt.imshow(matrix)
    plt.show()
