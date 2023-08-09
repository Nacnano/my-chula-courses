package main;

import gui.ControlPane;
import gui.NumberGrid;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

public class Main extends Application {

	@Override
	public void start(Stage primaryStage) {

		HBox root = new HBox();
		root.setPadding(new Insets(10));
		root.setSpacing(10);
		NumberGrid numberGrid = new NumberGrid();
		root.getChildren().add(numberGrid);
		root.getChildren().add(new ControlPane(numberGrid));

		Scene scene = new Scene(root);

		primaryStage.setTitle("Bingo");
		primaryStage.setScene(scene);
		primaryStage.sizeToScene();
		primaryStage.setResizable(false);
		primaryStage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}

}
