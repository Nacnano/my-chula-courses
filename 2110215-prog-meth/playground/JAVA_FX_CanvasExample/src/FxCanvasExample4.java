package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample4 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Drawing - Paths");

		Canvas canvas = new Canvas(400, 400);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawLine(gc);
		drawCloseLine(gc);
		drawCurve(gc);
		
		stage.show();
	}

	public void drawLine(GraphicsContext gc) {
		// Start the Path
		gc.beginPath();
		// Make different Paths
		gc.moveTo(50, 50);
		gc.lineTo(100, 100);
		gc.lineTo(75, 100);
		// Draw the Path
		gc.stroke();
	}

	public void drawCloseLine(GraphicsContext gc) {
		// Start the Path
		gc.beginPath();
		// Make different Paths
		gc.moveTo(50, 150);
		gc.lineTo(100, 200);
		gc.lineTo(75, 200);
		// End the Path
		gc.closePath();
		// Draw the Path
		gc.stroke();
	}
	
	public void drawCurve(GraphicsContext gc) {
		// Start the Path
		gc.setFill(Color.LIGHTCYAN);
		gc.beginPath();
		// Make different Paths
		gc.moveTo(50, 300);
		
		//x control point ,y control point, x end point, y end point
		gc.quadraticCurveTo(50, 220, 150, 350);
		gc.fill();
		// End the Path
		gc.stroke();
	}
}
