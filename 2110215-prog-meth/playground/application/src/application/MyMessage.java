package application;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MyMessage extends Application {

	// Create the TextField for the input
	private TextField inputArea;
	// Create the TextArea for the Output
	private TextArea outputArea;

	@Override
	public void start(Stage primaryStage) {
		// Create the BorderPane as root node
		BorderPane root = new BorderPane();
		root.setPadding(new Insets(10));

		// Label for the Header
		Label headerLbl = new Label("Please insert your Message in the TextArea!");
		root.setTop(headerLbl);
		// Set the alignment
		BorderPane.setAlignment(headerLbl, Pos.CENTER);

		// Label for the Input
		Label inputLbl = new Label("Input: ");
		root.setLeft(inputLbl);

		// OK-Button
		Button okBtn = new Button("OK");
		root.setRight(okBtn);

		// Input area
		inputArea = new TextField();
		root.setCenter(inputArea);

		// Output area
		outputArea = new TextArea();
		root.setBottom(outputArea);

		// Create the Scene
		Scene scene = new Scene(root);
		// Add the scene to the Stage
		primaryStage.setScene(scene);
		// Set the title of the Stage
		primaryStage.setTitle("My Message");
		// Display the Stage
		primaryStage.show();
	}

	/**
	 * @param args
	 *            the command line arguments
	 */
	public static void main(String[] args) {
		launch(args);
	}

}