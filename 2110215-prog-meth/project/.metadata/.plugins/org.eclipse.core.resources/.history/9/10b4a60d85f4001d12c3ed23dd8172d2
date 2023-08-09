package gui;

import javafx.geometry.Insets;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;

public class GUIController {
    private static HBox root;
    private static GamePane gamePane;
    private static BoardGrid boardGrid;
    public static final Background BG_TOWER_UNSELECTED = new Background(new BackgroundFill(Color.WHITE, CornerRadii.EMPTY, Insets.EMPTY));
    public static final Background BG_TOWER_SELECTED = new Background(new BackgroundFill(Color.BLUE, CornerRadii.EMPTY, Insets.EMPTY));
    public static final Background BG_TOWER_HOVER = new Background(new BackgroundFill(Color.LIMEGREEN.desaturate(), CornerRadii.EMPTY, Insets.EMPTY));


    public static HBox initialize() {
        gamePane = new GamePane();
        boardGrid = gamePane.getBoardGrid();
        root = new HBox(gamePane);
        root.setPadding(new Insets(10));
        root.setSpacing(10);

        return root;
    }

    /**
     * Gets the {@link #root}.
     * @return The {@link #root}.
     */
    public static HBox getRoot() { return root; }

    /**
     * Gets the {@link #gamePane}.
     * @return The {@link #gamePane}.
     */
    public static GamePane getGamePane() {
        return gamePane;
    }

    /**
     * Gets the {@link #boardGrid}.
     * @return The {@link #boardGrid}.
     */
    public static BoardGrid getBoardGrid() {
        return boardGrid;
    }
}