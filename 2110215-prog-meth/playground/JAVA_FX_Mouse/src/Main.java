import input.MouseUtility;
import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import render.GameScreen;

public class Main extends Application {
	public static void main(String[] args) {
		Application.launch(args);
	}

	@Override
	public void start(Stage stage) {
		StackPane root = new StackPane();
		GameScreen gameScreen = new GameScreen(root);
		stage.setScene(gameScreen);
		stage.setTitle("Click click click");

		stage.show();

		gameScreen.setOnMouseClicked(new EventHandler<MouseEvent>() {
			public void handle(MouseEvent event) {
				if(event.getButton() == MouseButton.PRIMARY)
					MouseUtility.mouseLeftDown();
			}
		});
		
		gameScreen.setOnMouseReleased(new EventHandler<MouseEvent>() {
			public void handle(MouseEvent event) {
				if(event.getButton() == MouseButton.PRIMARY)
					MouseUtility.mouseLeftRelease();
			}
		});
		
		AnimationTimer timer = new AnimationTimer() {
			public void handle(long now) {
				gameScreen.redraw();
				if(MouseUtility.isLeftClickTriggered()){
					MouseUtility.counter++;
				}
				MouseUtility.postUpdate();
			}
		};
		timer.start();
	}
}