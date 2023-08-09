package gui;

import game.Terrain;
import javafx.scene.layout.GridPane;

/**
 * The BoardGrid class represents the grid of {@link BoardCell BoardCells} in the {@link GamePane}.
 */
public class BoardGrid extends GridPane {

    public BoardCell addCell(int bgSprite, int row, int col, Terrain terrain) {
        BoardCell boardCell = new BoardCell(bgSprite, row, col, buildable);
        this.getChildren().add(boardCell);
        BoardGrid.setColumnIndex(boardCell, col);
        BoardGrid.setRowIndex(boardCell, row);
        return boardCell;
    }

}