package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample6 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Drawing - Pixel");

		Canvas canvas = new Canvas(1000, 1000);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawPixel(gc);
		
		stage.show();
	}

	public void drawPixel(GraphicsContext gc) {
		gc.setFill(Color.LIGHTBLUE);
		gc.setLineWidth(2.0);
		
		for(int i = 0; i< 5; i++){
			gc.fillRoundRect(500, 100, 50, 50, 10, 10);
//			gc.strokeRoundRect(400 + i * 50, 100, 50, 50, 10, 10);
			gc.rotate(45);	
		}
		
		
	}
}
