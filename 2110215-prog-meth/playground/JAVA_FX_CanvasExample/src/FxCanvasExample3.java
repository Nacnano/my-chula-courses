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

public class FxCanvasExample3 extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.setTitle("Drawing - Text");

		Canvas canvas = new Canvas(800, 400);
		GraphicsContext gc = canvas.getGraphicsContext2D();
		root.getChildren().add(canvas);

		drawFilledText(gc);
		drawStrokedText(gc);
		drawText(gc);

		stage.show();
	}

	public void drawFilledText(GraphicsContext gc) {
		// Set line width
		gc.setLineWidth(2);
		// Set fill color
		gc.setFill(Color.RED);
		gc.setStroke(Color.BLACK);
		// set font
		Font theFont = Font.font("Times New Roman", FontWeight.LIGHT, 58);
		gc.setFont(theFont);
		

		// Draw a filled Text
		gc.fillText("This is a filled Text", 10, 75);
		
		//text,x,y,maxWidth - maximum width the text string can have.
		gc.fillText("This is a filled Text with Max Width 300 px", 10, 150, 400);
		gc.fillText("This is a filled Text with Max Width 300 pxxxxxxxxxxxxxxxxxxxxxxxxxx", 10, 225, 400);
	}

	public void drawStrokedText(GraphicsContext gc) {
		// Set line width
		gc.setLineWidth(2);
		// Set fill color
		gc.setFill(Color.RED);
		gc.setStroke(Color.BLUE);
		// set font
		Font theFont = Font.font("Times New Roman", FontWeight.LIGHT, 58);
		gc.setFont(theFont);

		// Draw a Text
		gc.strokeText("This is a stroked Text", 10, 300);
	}

	public void drawText(GraphicsContext gc) {
		// Set line width
		gc.setLineWidth(2);
		// Set fill color
		gc.setFill(Color.RED);
		gc.setStroke(Color.BLUE);
		// set font
		Font theFont = Font.font("Times New Roman", FontWeight.LIGHT, 58);
		gc.setFont(theFont);

		// draw filled and stroked Text
		gc.fillText("This is a filled and stroked Text", 10, 375);
		gc.strokeText("This is a filled and stroked Text", 10, 375);
	}

}
