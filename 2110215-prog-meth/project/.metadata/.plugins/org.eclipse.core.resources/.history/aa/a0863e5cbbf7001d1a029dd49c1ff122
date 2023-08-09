package controller;

import javafx.scene.Cursor;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import scene.GameScene;
import scene.LandingScene;
import utils.GameConfig;

/**
 * The controller class that control the scene which registered to
 * {@link #mainStage} including bring user back to main menu or exit the program.
 *
 */
public class SceneController {

	/**
	 * Represent the {@link Stage} that is currently used for display in window.
	 */
	private static Stage mainStage;

	/**
	 * Setter for {@link #mainStage}.
	 * 
	 * @param mainStage the new {@link #mainStage}
	 */
	public static void setMainStage(Stage mainStage) {
		if (mainStage == null) {
			return;
		}
		SceneController.mainStage = mainStage;
	}

	/**
	 * This method will set new {@link Scene} to {@link #mainStage}.
	 * 
	 * @param newScene the scene which will be set {@link #mainStage}
	 */
	public static void setSceneToStage(Scene newScene) {
		if (newScene == null) {
			return;
		}
		if (mainStage.getScene() != null) {
			mainStage.getScene().setCursor(Cursor.DEFAULT);
		}
		mainStage.setScene(newScene);
		newScene.setCursor(Cursor.DEFAULT);
	}

	/**
	 * This method will call {@link Stage#show() show()} to display current stage to
	 * window.
	 */
	public static void showStage() {
		mainStage.show();
	}

	/**
	 * Handler method that will bring back to main menu when called.
	 * 
	 * @see LandingScene
	 */
	public static void backToMainMenu() {
		GameScene.getPausePane().remove();
		setSceneToStage(LandingScene.getScene());
	}

	/**
	 * Handler method that will exit the program when called.
	 */
	public static void exitGame() {
		System.exit(0);
	}

	/**
	 * Utility method for creating new scene from {@link Parent node}.
	 * 
	 * @param node the node that want to build new scene
	 * @return new {@link Scene}
	 */
	public static Scene makeNewScene(Parent node) {
		Scene scene = new Scene(node, GameConfig.getScreenWidth(), GameConfig.getScreenHeight());
		return scene;
	}
}