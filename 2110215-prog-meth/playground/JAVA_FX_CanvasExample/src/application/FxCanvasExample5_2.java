package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample5_2 extends Application {
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
		drawCroppedImage(gc, image_path);
		
		stage.show();
	}

	public void setBackGround(GraphicsContext gc) {
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
	}
	
	public void drawCroppedImage(GraphicsContext gc, String image_path) {
		System.out.println(image_path);
		Image javafx_logo = new Image(image_path);
		
		
		//pixelreader, x, y, width height
		WritableImage croppedImage = new WritableImage(javafx_logo.getPixelReader(), 50, 50, 200, 100);
		gc.drawImage(croppedImage, 40, 100);
		gc.drawImage(javafx_logo, 40, 250);
	}
	
	
}
