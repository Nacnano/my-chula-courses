
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.media.AudioClip;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class Main extends Application {
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
		
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, canvas.getWidth(), canvas.getHeight());

		System.out.println(ClassLoader.getSystemResource("audio/Meow.wav").toString());
		AudioClip sound = new AudioClip(ClassLoader.getSystemResource("audio/Meow.wav").toString());
		
		scene.setOnMouseClicked((MouseEvent e) -> {
				createCat(gc);
				createCat(gc);
				createCat(gc);
				sound.play();
			}
		);
		
		stage.show();
	}

	public void createCat(GraphicsContext gc) {
		int random = (int) (Math.random() * 5 + 1);
		System.out.println(ClassLoader.getSystemResource("image/cat" + random + ".jpg").toString());
		Image image = new Image(ClassLoader.getSystemResource("image/cat" + random + ".jpg").toString(), 100, 100, false, false);
		double width = Math.random() * gc.getCanvas().getWidth();
		double height = Math.random() * gc.getCanvas().getHeight();
		gc.drawImage(image,width, height);
	}
}
