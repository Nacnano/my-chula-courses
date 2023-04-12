package render;

import input.CodeUtility;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;

public class GameScreen extends Scene {
	private Canvas canvas;

	public GameScreen(Pane parent) {
		super(parent);
		
		canvas = new Canvas(420, 200);
		parent.getChildren().add(canvas);
	}
	
	public void redraw(){
		GraphicsContext gc = canvas.getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.setFont(Font.font(40));
		gc.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
		gc.fillText("TEST SetOnKeyPressed", 10, 50);
		gc.fillText(CodeUtility.code + "\n" + CodeUtility.counter, 200, 100);
	}
	
}


