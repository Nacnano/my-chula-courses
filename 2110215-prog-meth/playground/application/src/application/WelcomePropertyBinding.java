package application;

/*
 * modified from: http://docs.oracle.com/javafx/2/get_started/form.htm
 */

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
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class WelcomePropertyBinding extends Application {

	@Override
	public void start(Stage primaryStage) {

		GridPane grid = new GridPane();
		grid.setAlignment(Pos.CENTER);
		grid.setHgap(10);
		grid.setVgap(10);
		grid.setPadding(new Insets(25, 25, 25, 25));
		
		Text scenetitle = new Text("Welcome");
		scenetitle.setFont(Font.font("Tahoma", FontWeight.NORMAL, 20));
		grid.add(scenetitle, 0, 0, 2, 1);

		Label userName = new Label("User Name:");
		grid.add(userName, 0, 1);
		TextField userTextField = new TextField();
		grid.add(userTextField, 1, 1);
		
		Label userName1 = new Label("User Name:");
		grid.add(userName1, 0, 2);
		Label userNameOut = new Label();
		grid.add(userNameOut, 1, 2);

		// Unidirectional bindings
		userNameOut.textProperty().bind(userTextField.textProperty());
		
		Label pw1 = new Label("Password:");
		grid.add(pw1, 0, 3);
		PasswordField pwBox1 = new PasswordField();
		grid.add(pwBox1, 1, 3);
		
		Label pw2 = new Label("Visible Password:");
		grid.add(pw2, 0, 4);
		TextField pwBox2 = new TextField();
		grid.add(pwBox2, 1, 4);
		
		// Bidirectional bindings
		pwBox1.textProperty().bindBidirectional(pwBox2.textProperty());
		
		HBox hbBtn = new HBox(10);
		hbBtn.setAlignment(Pos.BOTTOM_RIGHT);
		Button signinBtn = new Button("Sign in");
		Button exitBtn = new Button("Exit");
		hbBtn.getChildren().addAll(signinBtn,exitBtn);
		grid.add(hbBtn, 1, 5);
		
		Scene scene = new Scene(grid, 450, 300);
		
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
