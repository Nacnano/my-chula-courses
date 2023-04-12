package application;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class FxCanvasExample7_2 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("AnimationTimer");

		Canvas canvas = new Canvas(400, 400);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawRectanglesAnimation(gc);

		stage.show();
	}

	public void drawRectanglesAnimation(GraphicsContext gc) {
		new AnimationTimer() {
			double alpha = 0.0;
			boolean increase = true;

			public void handle(long currentNanoTime) {
				double t = 200;
				if (increase)
					alpha += 1.0 / t;
				else
					alpha -= 1.0 / t;
				if (alpha > 1.0) {
					alpha = 2 - alpha;
					increase = false;
				} else if (alpha < 0.0) {
					alpha = Math.abs(alpha);
					increase = true;
				}
				gc.setFill(Color.BLUE);
				gc.setGlobalAlpha(alpha);
				gc.clearRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
				gc.fillRect(0 + alpha * 300, 0 + alpha * 300, 100, 100);
				gc.setFill(Color.RED);
				gc.fillText(alpha + "", 100, 100);
			}
		}.start();
	}
}
