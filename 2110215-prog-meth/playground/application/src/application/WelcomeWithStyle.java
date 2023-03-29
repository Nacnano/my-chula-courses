package application;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class WelcomeWithStyle extends Application {

	@Override
	public void start(Stage primaryStage) {

		GridPane grid = new GridPane();
		grid.setAlignment(Pos.CENTER);
		grid.setHgap(10);
		grid.setVgap(10);
		grid.setPadding(new Insets(25, 25, 25, 25));

		Text scenetitle = new Text("Welcome");
		grid.add(scenetitle, 0, 0, 2, 1);

		Label userName = new Label("User Name:");
		grid.add(userName, 0, 1);

		TextField userTextField = new TextField();
		grid.add(userTextField, 1, 1);

		Label pw = new Label("Password:");
		grid.add(pw, 0, 2);

		PasswordField pwBox = new PasswordField();
		grid.add(pwBox, 1, 2);

		HBox hbBtn = new HBox(10);
		hbBtn.setAlignment(Pos.BOTTOM_RIGHT);
		Button signinBtn = new Button("Sign in");
		signinBtn.setPrefWidth(65);
		Button exitBtn = new Button("Exit");
		exitBtn.setPrefWidth(65);
		hbBtn.getChildren().addAll(signinBtn, exitBtn);
		grid.add(hbBtn, 1, 4);

		// set style
		grid.setStyle("-fx-background-color:lightgray;");
		scenetitle.setStyle("-fx-font-size: 32px; -fx-font-family:\"Arial Black\";-fx-fill: #555;");
		signinBtn.setStyle(
				"-fx-text-fill: white; -fx-font-weight: bold; -fx-font-family: \"Arial Narrow\"; -fx-background-color: darkgreen;");
		exitBtn.setStyle(
				"-fx-text-fill: white; -fx-font-weight: bold; -fx-font-family: \"Arial Narrow\"; -fx-background-color: darkred;");


		Scene scene = new Scene(grid, 350, 300);

		primaryStage.setScene(scene);
		primaryStage.setTitle("JavaFX Welcome");
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
