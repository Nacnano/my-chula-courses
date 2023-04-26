package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

public class FxCanvasExample1 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Creation of a Canvas");

		Canvas canvas = new Canvas(400, 200);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		setBackGround(gc);
		drawString(gc);

		stage.show();
	}

	public void setBackGround(GraphicsContext gc) {
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
	}

	public void drawString(GraphicsContext gc) {
		Font theFont = Font.font("Times New Roman", FontWeight.BOLD, 32);
		gc.setFont(theFont);
		
		gc.setFill(Color.RED);
		gc.fillText("Valor", 60, 50);

		gc.setFill(Color.BLUE);
		gc.fillText("Mystic", 60, 100);
		
		gc.setFill(Color.YELLOW);
		gc.fillText("Instinct", 60, 150);
	}
}




