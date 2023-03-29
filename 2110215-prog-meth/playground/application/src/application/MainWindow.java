package application;


import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.layout.FlowPane;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class MainWindow extends Application {
    
    @Override
    public void start(Stage primaryStage) {
    	// create the flow pane as root node
    	FlowPane root = new FlowPane();
    	root.setPadding(new Insets(5));
    	root.setHgap(5);
    	root.setVgap(5);
    	
        Button exitButton = new Button(" Exit ");
        exitButton.setPrefWidth(70);
        Button showButton = new Button(" Show ");
        showButton.setPrefWidth(70);
        
        TextField text = new TextField("This is a text field.");
        text.setPrefWidth(250);
        
        root.getChildren().addAll(showButton,text,exitButton);
        
        Scene scene = new Scene(root, 410, 200);

        primaryStage.setTitle("Main Window");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}