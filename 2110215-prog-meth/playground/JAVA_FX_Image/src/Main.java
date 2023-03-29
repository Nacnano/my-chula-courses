import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class Main extends Application {

	@Override
	public void start(Stage primaryStage) throws Exception {
		
		StackPane root = new StackPane();
		root.setPadding(new Insets(15));
		
		/* Not using class loader */
		//ImageView imageView = new ImageView(new Image("file:res/images/homestay.jpg"));
		
		/* Using class loader */
		String image_path = ClassLoader.getSystemResource("images/homestay.jpg").toString();
		ImageView imageView = new ImageView(new Image(image_path));
		
		imageView.setPreserveRatio(true);
		imageView.setFitWidth(1000);
		
		root.getChildren().add(imageView);
		
		Scene scene = new Scene(root);
		
		primaryStage.setScene(scene);
		primaryStage.setTitle("Image Loader");
		primaryStage.show();
	}
	
	public static void main(String [] args) {
		launch(args);
	}

}
