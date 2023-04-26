package application;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class FxCanvasExample8 extends Application {
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
		drawRotatedText(gc);

		stage.show();
	}

	public void setBackGround(GraphicsContext gc) {
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, gc.getCanvas().getWidth(), gc.getCanvas().getHeight());
	}

	public void drawRotatedText(GraphicsContext gc) {
		gc.translate(gc.getCanvas().getWidth() / 2, gc.getCanvas().getHeight() / 2);
		gc.setFont(Font.font(50));
		gc.setFill(Color.RED);

		gc.fillOval(0, 0, 20, 20);
		
		
		int total_angle = 0;
		int angle = 30;
		while (total_angle < 360) {
			total_angle += angle;
			
			//rotate in degree
			gc.rotate(angle);
			gc.fillText("" + total_angle, 150, 0);
		}
		gc.restore();

	}

}
