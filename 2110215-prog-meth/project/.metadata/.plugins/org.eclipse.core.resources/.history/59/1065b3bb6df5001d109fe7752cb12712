package scene;

import gui.SettingPane;
import gui.StyledButton;
import controller.SceneController;
import controller.GameController;
import javafx.animation.FadeTransition;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.WritableImage;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.Border;
import javafx.scene.layout.BorderStroke;
import javafx.scene.layout.BorderStrokeStyle;
import javafx.scene.layout.BorderWidths;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.media.MediaPlayer;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import javafx.util.Duration;
import utils.AudioUtil;
import utils.DrawUtil;
import utils.FontUtil;
import utils.GameConfig;
import utils.TransitionUtil;

/**
 * The LandingPane class represent the {@link Scene} which display for the first.
 */
public class LandingScene {

	/**
	 * Represent the width of the pane.
	 */
	private static int widthBox = 100;

	/**
	 * Represent the height of the pane.
	 */
	private static int heightBox = 60;

	/**
	 * Represent {@link VBox} which is the root container for containing components.
	 */
	private static StackPane root;

	/**
	 * The {@link VBox} that contain titleText and buttonBox.
	 */
	private static VBox container;

	/**
	 * The {@link Text} that display as a title.
	 */
	private static Text titleText;

	/**
	 * The {@link VBox} that contain the start, option and exit button.
	 */
	private static VBox buttonBox;

	/**
	 * The {@link FadeTransition} which is using for making the fade transition
	 * while switch to {@link GameScene}.
	 */
	private static FadeTransition fading;

	/**
	 * The {@link Button} that used to start the game.
	 */
	private static Button startBtn;

	/**
	 * The {@link Button} that used to open {@link SettingPane}.
	 */
	private static Button optionBtn;

	/**
	 * The {@link Button} that used for exit the game.
	 */
	private static Button exitBtn;

	/**
	 * The {@link SettingPane} that used when click on {@link #optionBtn}.
	 */
	private static SettingPane settingPane = new SettingPane();

	/**
	 * Represent the cached scene so that it does not need to have a multiple
	 * initialize.
	 */
	private static Scene cachedScene = null;

	/**
	 * Represent the background music of main page / landing page.
	 */
	private static MediaPlayer bgm = AudioUtil.getLandingSceneBGM();

	/**
	 * Get the {@link #cachedScene landingScene}.
	 * 
	 * @return the {@link Scene} which used for display in first page
	 */
	public static Scene getScene() {
		bgm.play();

		// If it have already cached then return the cache
		if (cachedScene != null) {
			return cachedScene;
		}

		root = new StackPane();
		root.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));

		setupContainer();
		setupButtonBox();
		setupTitleText();
		setupFadingAnimation();
		setupStartButton();
		setupSettingButton();
		setupExitButton();

		root.getChildren().add(container);
		container.getChildren().addAll(titleText, buttonBox);
		buttonBox.getChildren().addAll(startBtn, optionBtn, exitBtn);

		cachedScene = SceneController.makeNewScene(root);
		return cachedScene;
	}

	/**
	 * Initialize the {@link VBox} that contain buttonBox and titleText.
	 */
	private static void setupContainer() {
		container = new VBox();

		BackgroundSize bgSize = new BackgroundSize(GameConfig.getScreenWidth(), GameConfig.getScreenHeight(), false,
				false, false, false);

		WritableImage bgImg = DrawUtil.getWritableImage("landingBG.jpg");

		container.setAlignment(Pos.CENTER);
		container.setBackground(new Background(new BackgroundImage(bgImg, null, null, null, bgSize)));
	}

	/**
	 * Initialize the {@link VBox} that contain only button.
	 */
	private static void setupButtonBox() {
		buttonBox = new VBox();

		buttonBox.setBorder(new Border(
				new BorderStroke(Color.WHITE, BorderStrokeStyle.SOLID, CornerRadii.EMPTY, BorderWidths.DEFAULT)));
		buttonBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
		buttonBox.setSpacing(10.0);
		buttonBox.setAlignment(Pos.CENTER);
		buttonBox.setPadding(new Insets(15));

		buttonBox.setMaxHeight(heightBox * GameConfig.getScale());
		buttonBox.setPrefHeight(heightBox * GameConfig.getScale());

		buttonBox.setMaxWidth(widthBox * GameConfig.getScale());
		buttonBox.setPrefWidth(widthBox * GameConfig.getScale());
	}

	/**
	 * Initialize the title text.
	 */
	private static void setupTitleText() {
		titleText = new Text(GameConfig.GAME_TITLE);
		titleText.setFont(FontUtil.getFont("large"));
		titleText.setFill(Color.WHITE);
		VBox.setMargin(titleText, new Insets(0, 0, 15, 0));
		titleText.setTextAlignment(TextAlignment.CENTER);
	}

	/**
	 * Initialize Fade Animation by using makeFadingNode and setup event when fading
	 * finish.
	 * 
	 * @see utils.TransitionUtil#makeFadingNode(Node, double, double) makeFadingNode
	 */
	private static void setupFadingAnimation() {
		fading = TransitionUtil.makeFadingNode(container, 1.0, 0.0);

		fading.setOnFinished((event) -> {
			bgm.stop();
			bgm.seek(Duration.ZERO);
			GameController.start();
			container.setOpacity(1.0);
		});
	}

	/**
	 * Initialize {@link StyledButton} which used for start button.
	 */
	private static void setupStartButton() {
		startBtn = new StyledButton(widthBox, "Start", Color.WHITE, Color.BLACK);
		startBtn.setTextFill(Color.WHITE);

		startBtn.setOnMouseClicked((event) -> fading.play());
	}

	/**
	 * Initialize {@link StyledButton} which used for setting button.
	 */
	private static void setupSettingButton() {
		optionBtn = new StyledButton(widthBox, "Setting", Color.WHITE, Color.BLACK);
		optionBtn.setTextFill(Color.WHITE);
		optionBtn.setOnMouseClicked((event) -> {
			settingPane.updateSetting();
			root.getChildren().add(settingPane);
			settingPane.requestFocus();
		});
	}

	/**
	 * Initialize {@link StyledButton} which used for exit button.
	 */
	private static void setupExitButton() {
		exitBtn = new StyledButton(widthBox, "Exit", Color.WHITE, Color.BLACK);
		exitBtn.setTextFill(Color.WHITE);
		exitBtn.setOnMouseClicked((event) -> SceneController.exitGame());
	}

}