


import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class MousePress extends Application {

	@Override
	public void start(Stage primaryStage) {
		VBox root = new VBox();
		root.setPadding(new Insets(5));
		root.setPrefSize(250, 280);

		TextArea area = new TextArea();
		area.setWrapText(true); // important property for a text area
		area.setPrefSize(250, 280);
		
		ScrollPane scrollPane = new ScrollPane(); // interesting!
        scrollPane.setContent(area);
        scrollPane.setFitToWidth(true);
        scrollPane.setPrefWidth(200);
        scrollPane.setPrefHeight(180);
        
		Button ok = new Button("Ora!");
		ok.setPrefWidth(60);
		Button clear = new Button("Clear");
		clear.setPrefWidth(60);
		
		HBox row = new HBox();
		row.getChildren().addAll(ok,clear);
		
		root.getChildren().addAll(scrollPane,row);
		
		Scene scene = new Scene(root, 250, 280);
		primaryStage.setScene(scene);
		primaryStage.setTitle("Ora Ora!");
		primaryStage.show();
		
		MyKeyHandler areaKeyHandler = new MyKeyHandler(area);
		area.setOnKeyPressed(areaKeyHandler);
		
		area.setOnKeyReleased(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				areaKeyHandler.setTrigger(false);
			}
		});
		
		area.setOnMousePressed(new EventHandler<MouseEvent>() {//it does not do anything.
			@Override
			public void handle(MouseEvent event) {
				area.setText(area.getText()+ "Ora! ");
			}	
		});
		
		area.setOnMouseReleased(new EventHandler<MouseEvent>() {//it does not do anything.
			@Override
			public void handle(MouseEvent event) {
				area.setText(area.getText()+ "Ora! ");
			}	
		});
		
		ok.setOnAction(new EventHandler<ActionEvent>() {//it detects once.
			@Override
			public void handle(ActionEvent event) {
				area.setText(area.getText()+ "Ora! ");
			}
		});
		
		clear.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				area.setText("");
			}
		});
		
		
	}

	public static void main(String[] args) {
		launch(args);
	}
}
