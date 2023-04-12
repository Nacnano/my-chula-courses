import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class TaskOnJavaFXThread extends Application{
	public static void main(String[] args) {
		launch(args);
	}
	@Override
	public void start(Stage primaryStage) throws Exception {
		// TODO Auto-generated method stub
		BorderPane root = new BorderPane();
		BorderPane topPane = new BorderPane();
		
		TextField textField = new TextField("");
		Button button = new Button("Run long running task");
		Label displayLabel = new Label("Hello World");
		displayLabel.setPrefSize(400, 400);
		displayLabel.setFont(new Font(40));
		displayLabel.setAlignment(Pos.CENTER);
		
		topPane.setPrefWidth(400);
		topPane.setCenter(textField);
		topPane.setRight(button);
		
		root.setTop(topPane);
		root.setCenter(displayLabel);
		
		Scene scene = new Scene(root);
		primaryStage.setScene(scene);
		primaryStage.setTitle("Long running Task Test");
		primaryStage.show();
		
		button.setOnAction(new EventHandler<ActionEvent>() {
			
			@Override
			public void handle(ActionEvent event) {
				// TODO Auto-generated method stub
				try {
					Thread.sleep(5000);
					displayLabel.setText(textField.getText());
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
	}
}
