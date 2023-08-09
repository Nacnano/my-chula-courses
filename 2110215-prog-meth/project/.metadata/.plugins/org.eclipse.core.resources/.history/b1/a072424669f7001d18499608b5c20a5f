package scene;

import gui.StyledButton;
import controller.SceneController;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import utils.FontUtil;
import utils.GameConfig;

/**
 * The CongratulationScene class represent the {@link Scene} that show when
 * pthe player reaches {@link GameConfig#LEVEL_BOUND wave bound}.
 */
public class CongratulationScene {

	/**
	 * Represent the height of the pane.
	 */
	private static int heightBox = 40;

	/**
	 * Represent the width of the pane.
	 */
	private static int widthBox = 80;

	/**
	 * Represent {@link VBox} which is the root container for containing components.
	 */
	private static VBox root;

	/**
	 * Represent {@link Text} which is the title text in this pane.
	 */
	private static Text congratsTitle;

	/**
	 * Represent {@link Text} which is the description text in this pane.
	 */
	private static Text congratsDescription;

	/**
	 * Represent {@link VBox} which contains all buttons in this pane.
	 */
	private static VBox buttonBox;

	/**
	 * Represent the cached scene that it does not need to have a multiple
	 * initialize.
	 */
	private static Scene cachedScene = null;

	/**
	 * Get the {@link #cachedScene gameOverScene}.
	 * 
	 * @return the {@link Scene} which used for display when game over
	 */
	public static Scene getScene() {
		// If it have already cached then return the cache
		if (cachedScene != null) {
			return cachedScene;
		}

		styleSetup();
		addCongratsDetail();
		addButtonBox();
		addButtontoBox();

		root.getChildren().addAll(congratsTitle, congratsDescription, buttonBox);

		cachedScene = SceneController.makeNewScene(root);
		return cachedScene;
	}

	/**
	 * Setup the pane style.
	 */
	private static void styleSetup() {
		root = new VBox();
		root.setPrefHeight(heightBox * GameConfig.getScale());
		root.setPrefWidth(widthBox * GameConfig.getScale());
		root.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
		root.setAlignment(Pos.CENTER);
		root.setSpacing(20.0);
	}

	/**
	 * Initialize the {@link #congratsTitle} and {@link #congratsDescription}.
	 */
	private static void addCongratsDetail() {
		congratsTitle = new Text("Congratulation");
		congratsTitle.setFont(FontUtil.getFont("large"));
		congratsTitle.setFill(Color.BURLYWOOD);
		congratsTitle.setTextAlignment(TextAlignment.CENTER);

		congratsDescription = new Text("You have reached the bottom of the dungeon (for now)");
		congratsDescription.setFont(FontUtil.getFont("small"));
		congratsDescription.setFill(Color.BURLYWOOD);
		congratsDescription.setTextAlignment(TextAlignment.CENTER);
	}

	/**
	 * Initialize the buttonBox.
	 */
	private static void addButtonBox() {
		buttonBox = new VBox();
		buttonBox.setSpacing(8.0 * GameConfig.getScale());
		buttonBox.setAlignment(Pos.CENTER);
	}

	/**
	 * Initialize all {@link Button} that register text, add event handler to each
	 * button and adding to buttonBox.
	 */
	private static void addButtontoBox() {
		Button backToMenuBtn = new StyledButton(widthBox * GameConfig.getScale(), "Back To Menu", Color.WHITE,
				Color.BLACK);
		backToMenuBtn.setTextFill(Color.WHITE);
		backToMenuBtn.setOnMouseClicked((event) -> SceneController.backToMainMenu());

		Button exitBtn = new StyledButton(widthBox * GameConfig.getScale(), "Exit Game", Color.WHITE, Color.BLACK);
		exitBtn.setTextFill(Color.WHITE);
		exitBtn.setOnMouseClicked((event) -> SceneController.exitGame());

		buttonBox.getChildren().addAll(backToMenuBtn, exitBtn);
	}
}