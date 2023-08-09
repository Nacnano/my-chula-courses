package application;

import gui.GUIController;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

/**
 * Main class of the application.
 */
public class Main extends Application {

	 /**
     * JavaFX method. Called when the JavaFX application launches.
     * @param primaryStage The main stage of the application.
     */
    @Override
    public void start(Stage primaryStage) {

        HBox root = GUIController.initialize();
//        GameController.initialize("map_1");

        primaryStage.setTitle("GrimStroke");
        primaryStage.setScene(new Scene(root));
        primaryStage.setResizable(false);
        primaryStage.show();
    }

    /**
     * Launches the JavaFX application.
     * @param args Application arguments.
     */
    public static void main(String[] args) {
        launch(args);
    }
}