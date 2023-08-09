package application;

import gui.GUIController;
import javafx.application.Application;
import javafx.geometry.Rectangle2D;
import javafx.scene.image.Image;
import javafx.stage.Screen;
import javafx.stage.Stage;
import scene.LandingScene;
import utils.GameConfig;

/**
 * Main class launches the JavaFX application.
 *
 */
public class Main extends Application {

	/**
	 * Initialize primary stage and set application size scale.
	 * 
	 * @param primaryStage Application's main stage
	 */
	@Override
	public void start(Stage primaryStage) {

		String iconPath = ClassLoader.getSystemResource(GameConfig.ICON_NAME).toString();
		Rectangle2D screenBound = Screen.getPrimary().getBounds();
		double MaxX = screenBound.getMaxX() * GameConfig.SCREEN_SCALING;
		double MaxY = screenBound.getMaxY() * GameConfig.SCREEN_SCALING;
		double rectangleSize = Math.min(MaxX, MaxY);

		GameConfig.setScreenWidth((int) rectangleSize);
		GameConfig.setScreenHeight((int) rectangleSize);
		if (rectangleSize > GameConfig.SCREEN_RESPONSIVE) {
			GameConfig.setScale(3);
		}

		primaryStage.getIcons().add(new Image(iconPath));
		primaryStage.setTitle(GameConfig.GAME_TITLE);
		primaryStage.setResizable(GameConfig.STAGE_SCALABLE);

		SceneController.setMainStage(primaryStage);
		SceneController.setSceneToStage(LandingScene.getScene());

		SceneController.showStage();
	}

	/**
	 * Launches JavaFX application.
	 * 
	 * @param args Arguments
	 */
	public static void main(String[] args) {
		launch(args);
	}

}