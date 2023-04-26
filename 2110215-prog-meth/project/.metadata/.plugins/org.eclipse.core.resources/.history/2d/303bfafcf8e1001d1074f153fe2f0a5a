package controller;

public class GUIController {
	private static HBox root;
	private static GamePane gamePane;
	private static BoardGrid boardGrid;
	
	public static HBox initialize() {
        gamePane = new GamePane();
        boardGrid = gamePane.getBoardGrid();
        root = new HBox(gamePane);
        root.setPadding(new Insets(10));
        root.setSpacing(10);

        return root;
    }

}
