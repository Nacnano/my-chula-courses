import input.CodeUtility;
import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.scene.input.KeyEvent;
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

		gameScreen.setOnKeyPressed((KeyEvent event) -> {
			String new_code = event.getCode().toString();
			if (!CodeUtility.getPressed())
				CodeUtility.setTriggered(new_code, true);
			CodeUtility.setPressed(true);
		});

		gameScreen.setOnKeyReleased((KeyEvent event) -> {
			CodeUtility.setPressed(false);
		});

		AnimationTimer timer = new AnimationTimer() {
			public void handle(long now) {
				gameScreen.redraw();
				CodeUtility.postUpdate();
			}
		};
		timer.start();
	}
}

