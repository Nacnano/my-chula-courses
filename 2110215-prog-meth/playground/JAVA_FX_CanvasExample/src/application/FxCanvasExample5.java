package application;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample5 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Drawing - Images");

		Canvas canvas = new Canvas(800, 800);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		setBackGround(gc);
		String image_path = "file:res/image/javafx_logo_color.jpg";
		drawImageFixSize(gc, image_path);
		drawImage(gc, image_path);
		
		stage.show();
	}

	public void setBackGround(GraphicsContext gc) {
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
	}
	
	public void drawImage(GraphicsContext gc, String image_path) {
		System.out.println(image_path);
		Image javafx_logo = new Image(image_path);
		gc.drawImage(javafx_logo, 40, 250);
	}
	
	public void drawImageFixSize(GraphicsContext gc, String image_path) {
		System.out.println(image_path);
		Image javafx_logo = new Image(image_path);
		
		//image, x ,y, width, height
		gc.drawImage(javafx_logo, 40, 40, 600, 200);
	}
	
	
}
