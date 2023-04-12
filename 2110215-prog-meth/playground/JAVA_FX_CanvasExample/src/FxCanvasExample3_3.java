package application;




//import javafx.FontLoader;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

public class FxCanvasExample3_3 extends Application {
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

		gc.setLineWidth(2.0);
		gc.setFill(Color.RED);
		
		
		FontLoader fontLoader = Toolkit.getToolkit().getFontLoader();
		double font_width = fontLoader.computeStringWidth("This is a filled Text", gc.getFont());
		double font_height = fontLoader.getFontMetrics(gc.getFont()).getLineHeight();
		// Draw a rounded Rectangle
		gc.strokeRect(10, 75 - font_height, font_width, font_height);
	
	}

}
