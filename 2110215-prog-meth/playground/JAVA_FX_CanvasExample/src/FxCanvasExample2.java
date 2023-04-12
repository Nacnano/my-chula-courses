package application;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.ArcType;
import javafx.stage.Stage;

public class FxCanvasExample2 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Drawing - Basic Shapes");

		Canvas canvas = new Canvas(500, 500);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawRoundRect(gc);
		drawOval(gc);
		drawArc(gc);
		drawLine(gc);
//		clearRect(gc);

		stage.show();
	}

	public void drawRoundRect(GraphicsContext gc) {
		gc.setLineWidth(2.0);
		gc.setFill(Color.RED);
		// Draw a rounded Rectangle
		// x,y,w,h,arcWidth,arcHeight
		gc.strokeRoundRect(10, 10, 50, 50, 10, 10);
		// Draw a filled rounded Rectangle
		gc.fillRoundRect(100, 10, 50, 50, 10, 10);
	}

	public void drawOval(GraphicsContext gc) {
		gc.setLineWidth(2.0);
		gc.setFill(Color.BLUE);
		// Draw an Oval
		// x,y,w,h
		gc.strokeOval(10, 70, 50, 30);
		// Draw a filled Oval
		gc.fillOval(100, 70, 50, 30);
	}

	public void drawLine(GraphicsContext gc) {
		gc.setLineWidth(2.0);
		gc.setFill(Color.BLACK);
		// Draw a Line
		// x1,y1,x2,y2
		gc.strokeLine(10, 190, 200, 190);
	}

	public void drawArc(GraphicsContext gc) {
		gc.setLineWidth(2.0);
		gc.setFill(Color.YELLOW);
		// Draw an Arc
		// x,y,w,h,startAngle,arcExtent,closure
		//startAngle - the starting angle of the arc in degrees.
		//arcExtent - arcExtent the angular extent of the arc in degrees.
		//closure - closure type (Round, Chord, Open) or null
		gc.strokeArc(10, 130, 50, 50, 40, 80, ArcType.ROUND);
		// Draw a filled Arc
		gc.fillArc(100, 130, 50, 50, 00, 120, ArcType.ROUND);
	}

	public void clearRect(GraphicsContext gc) {
		gc.clearRect(0, 0, gc.getCanvas().getWidth() / 9, gc.getCanvas().getHeight());
	}
}
