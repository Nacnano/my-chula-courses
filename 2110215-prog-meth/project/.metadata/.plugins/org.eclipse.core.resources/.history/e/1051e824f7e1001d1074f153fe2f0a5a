package application;

import javafx.application.Application;

public class Main extends Application{
	
	@Override
    public void start(Stage primaryStage) {

        HBox root = GUIController.initialize();
        GameController.initialize("map_1");

        primaryStage.setTitle("GrimStroke");
        primaryStage.setScene(new Scene(root));
//      primaryStage.initStyle(StageStyle.TRANSPARENT);
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
