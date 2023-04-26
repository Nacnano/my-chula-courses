package application;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample7 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("AnimationTimer");

		Canvas canvas = new Canvas(800, 400);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawScalableRectAnimation(gc);

		stage.show();
	}

	public void drawScalableRectAnimation(GraphicsContext gc) {
		final long startNanoTime = System.nanoTime();
		new AnimationTimer() {
			double width = 0;
			double height = 0;

			public void handle(long currentNanoTime) {
				double t = ((currentNanoTime - startNanoTime) / 1000000000.0) % 3;
				width = gc.getCanvas().getWidth() * t / 3;
				height = gc.getCanvas().getHeight() * t / 3;

				gc.setFill(Color.LIGHTBLUE);
				gc.setStroke(Color.BLUEVIOLET);
				gc.setLineWidth(5);
				gc.clearRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
				gc.fillRect(0, 0, width, height);
				gc.strokeRect(0, 0, width, height);
			}
		}.start();
	}
}
