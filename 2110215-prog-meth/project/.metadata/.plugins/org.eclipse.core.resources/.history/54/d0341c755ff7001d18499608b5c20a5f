package scene;

import gui.BuildMilitaryPopUp;
import gui.BuildPopUp;
import gui.ChangeJobPopUp;
import gui.CurrentDay;
import gui.HelpMilitaryPopUp;
import gui.MaterialStatus;
import gui.MessagePane;
import gui.NextDay;
import gui.PausePane;
import gui.ResourceStatus;
import gui.ShopPopUp;
import gui.WorkerStatus;
import controller.GameController;
import controller.InterruptController;
import entity.building.BaseBuilding;
import entity.building.Resource;
import entity.unit.BaseUnit;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.WritableImage;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.StackPane;
import javafx.scene.media.AudioClip;
import javafx.scene.paint.Color;
import game.ControlAction;
import game.GameLogic;
import game.MapRenderer;
import game.Position;
//import game.MapRenderer;
import utils.DrawUtil;
import utils.AudioUtil;
import utils.GameConfig;

/**
 * The GameScene class provides a method to initialize the game scene and store
 * the components in the game scene.
 *
 */
public class GameScene {

	/**
	 * The game scene.
	 */
	private static Scene scene = null;

	/**
	 * The {@link PausePane pause pane} that will display when the player click
	 * pause button.
	 */
	private static PausePane pausePane;
	
	/**
	 * The {@link MessagePane} that will display message.
	 */
	private static MessagePane messagePane;
	
	/**
	 * The {@link MaterialStatus} that will display material.
	 */
	private static MaterialStatus materialStatus;
	
	/**
	 * The {@link ShopPopUp} that will display shop.
	 */
	private static ShopPopUp shopPopUp;
	
	/**
	 * The {@link ResourceStatus} that will display resource detail.
	 */
	private static ResourceStatus resourceStatus;
	
	/**
	 * The {@link ChangeJobPopUp} that will display a pop up for changing job.
	 */
	private static ChangeJobPopUp changeJobPopUp;
	
	/**
	 * The {@link WorkerStatus} that will display number of workers.
	 */
	private static WorkerStatus workerStatus;
	
	/**
	 * The {@link BuildMilitaryPopUp} that will display pop up for building military.
	 */
	private static BuildMilitaryPopUp buildMilitaryPopUp;
	
	/**
	 * The {@link HelpMilitaryPopUp} that will display pop up for building military.
	 */
	private static HelpMilitaryPopUp helpMilitaryPopUp;	
	
	/**
	 * The {@link BuildPopUp} that will display pop up for building a building.
	 */
	private static BuildPopUp buildPopUp;
	
	/**
	 * The {@link CurrentDay} that will display current day.
	 */
	private static CurrentDay currentDay;
	
	/**
	 * The {@link NextDay} that will go to the next day.
	 */
	private static NextDay nextDay;

	/**
	 * The pane for entity button.
	 */
	private static AnchorPane buttonPane;

	/**
	 * {@link GraphicsContext graphic context} of the map canvas.
	 */
	private static GraphicsContext gc;

	/**
	 * Pause sprite for the pause button.
	 */
	private static WritableImage pauseSprite = DrawUtil.getWritableImage("icon/pause.png");

	/**
	 * The pane that contains all of the component in game scene.
	 */
	private static StackPane gamePane;

	/**
	 * The root pane.
	 */
	private static StackPane root;

	/**
	 * Initialize game scene.
	 */
	public static void initScene() {
		root = new StackPane();
		root.setPadding(new Insets(0));
		root.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
		root.setMinSize(GameConfig.getScreenWidth(), GameConfig.getScreenHeight());
		root.setMaxSize(GameConfig.getScreenWidth(), GameConfig.getScreenHeight());
		scene = new Scene(root, GameConfig.getScreenWidth(), GameConfig.getScreenHeight());

		setupGamePane();
		setupGameUI();

		StackPane.setAlignment(new Group(pausePane), Pos.CENTER);
		StackPane.setAlignment(new Group(shopPopUp), Pos.CENTER);
		StackPane.setAlignment(new Group(changeJobPopUp), Pos.CENTER);
		StackPane.setAlignment(new Group(buildMilitaryPopUp), Pos.CENTER);
		StackPane.setAlignment(new Group(helpMilitaryPopUp), Pos.CENTER);
		StackPane.setAlignment(new Group(buildPopUp), Pos.CENTER);

		MapRenderer.render();
	}
	
	public static void updateScene() {
		workerStatus.update();
		materialStatus.update();
		resourceStatus.update(null);
	}

	/**
	 * Initialize game pane.
	 */
	private static void setupGamePane() {
		gamePane = new StackPane();
		root.getChildren().add(gamePane);

		Canvas canvas = new Canvas(GameConfig.getScreenWidth(), GameConfig.getScreenHeight());
		gc = canvas.getGraphicsContext2D();
		gamePane.getChildren().add(canvas);

		buttonPane = new AnchorPane();
		
		buttonPane.setPrefWidth(GameConfig.getScreenWidth());
		buttonPane.setPrefHeight(GameConfig.getScreenHeight());
		
		gamePane.getChildren().add(buttonPane);
		addEventListener();
	}

	/**
	 * Initialize user interface.
	 */
	private static void setupGameUI() {
		AnchorPane ui = new AnchorPane();
		ui.setPickOnBounds(false);
		gamePane.getChildren().add(ui);

		addPauseButton(ui);

		messagePane = new MessagePane();
		pausePane = new PausePane();
		shopPopUp = new ShopPopUp();
		changeJobPopUp = new ChangeJobPopUp();
		buildMilitaryPopUp = new BuildMilitaryPopUp();
		helpMilitaryPopUp = new HelpMilitaryPopUp();
		buildPopUp = new BuildPopUp();
		
		currentDay = new CurrentDay();
		AnchorPane.setTopAnchor(currentDay, 5.0 * GameConfig.getScale());
		AnchorPane.setLeftAnchor(currentDay, 5.0 * GameConfig.getScale());
		
		nextDay = new NextDay();
		AnchorPane.setTopAnchor(nextDay, 5.0 * GameConfig.getScale());
		AnchorPane.setRightAnchor(nextDay, 25.0 * GameConfig.getScale());
		
		workerStatus = new WorkerStatus();
		AnchorPane.setBottomAnchor(workerStatus, 0.0);
		
		resourceStatus = new ResourceStatus();
		AnchorPane.setBottomAnchor(resourceStatus, 0.0);
		AnchorPane.setLeftAnchor(resourceStatus, 50.0 * GameConfig.getScale());
		
		materialStatus = new MaterialStatus();
		AnchorPane.setBottomAnchor(materialStatus, 0.0);
		AnchorPane.setLeftAnchor(materialStatus, 100.0 * GameConfig.getScale());
		
		materialStatus.setOnMouseClicked((event) -> {
			if (InterruptController.isPauseOpen() || InterruptController.isTransition()) {
				return;
			}
			if (InterruptController.isShopOpen()) {
				shopPopUp.remove();
				return;
			}
			
			
			gamePane.getChildren().add(shopPopUp);
			shopPopUp.requestFocus();
			InterruptController.setIsShopOpen(true);
		});
		
		resourceStatus.setOnMouseClicked((event) -> {
//			if (resourceStatus.getCurrentPeople().equals("People: -")) return;
			if (resourceStatus.getBuilding() == null) return;
			if (resourceStatus.getName().equals("Building: House")) return;
			
			if (InterruptController.isPauseOpen() || InterruptController.isShopOpen() || InterruptController.isTransition()) {
				return;
			}
			
			if (resourceStatus.getName().equals("Building: MilitaryCamp")) {
				if (InterruptController.isBuildMilitaryOpen()) {
					buildMilitaryPopUp.remove();
					return;
				}
				buildMilitaryPopUp.update(resourceStatus.getBuilding());
				gamePane.getChildren().add(buildMilitaryPopUp);
				buildMilitaryPopUp.requestFocus();
				InterruptController.setIsBuildMilitaryOpen(true);
			}
			else {
				if (InterruptController.isChangeJobOpen()) {
					changeJobPopUp.remove();
					return;
				}
				changeJobPopUp.update(resourceStatus.getBuilding());
				gamePane.getChildren().add(changeJobPopUp);
				changeJobPopUp.requestFocus();
				InterruptController.setIsChangeJobOpen(true);
			}
		});
		

		ui.getChildren().addAll(currentDay, nextDay, workerStatus, resourceStatus, materialStatus, messagePane);
	}



	/**
	 * Add pause button to the user interface pane.
	 * 
	 * @param ui The user interface pane.
	 */
	private static void addPauseButton(AnchorPane ui) {
		Canvas pauseBtn = new Canvas(16 * GameConfig.getScale(), 16 * GameConfig.getScale());
		ui.getChildren().add(pauseBtn);

		AnchorPane.setTopAnchor(pauseBtn, 5.0 * GameConfig.getScale());
		AnchorPane.setRightAnchor(pauseBtn, 5.0 * GameConfig.getScale());

		pauseBtn.getGraphicsContext2D().drawImage(DrawUtil.scaleUp(pauseSprite, GameConfig.getScale()), 0, 0);
		
		pauseBtn.setOnMouseClicked((event) -> {
			if (InterruptController.isShopOpen() || InterruptController.isTransition()) {
				return;
			}
			if (InterruptController.isPauseOpen()) {
				pausePane.remove();
				return;
			}
			gamePane.getChildren().add(pausePane);
			pausePane.requestFocus();
			InterruptController.setPauseOpen(true);
		});
	}
	
	public static void addHelpMilitaryPopUp(BaseUnit unit) {
		helpMilitaryPopUp.update(unit);
		gamePane.getChildren().add(helpMilitaryPopUp);
		helpMilitaryPopUp.requestFocus();
		InterruptController.setIsHelpMilitaryOpen(true);
	}
	
	public static void addBuildPopUp(Position pos) {
		buildPopUp.update(pos);
		gamePane.getChildren().add(buildPopUp);
		buildPopUp.requestFocus();
		InterruptController.setIsHelpMilitaryOpen(true);
	}

	/**
	 * Add keyboard listener.
	 */
	private static void addEventListener() {
		scene.setOnKeyPressed((event) -> {
//			if (InterruptController.isInterruptPlayerMovingInput() && !InterruptController.isStillAnimation()) {
//				return;
//			}
			KeyCode keycode = event.getCode();
			switch (keycode) {
			case W:
				GameController.gameUpdate(ControlAction.CAMERA_MOVE_UP);
				break;
			case S:
				GameController.gameUpdate(ControlAction.CAMERA_MOVE_DOWN);
				break;
			case A:
				GameController.gameUpdate(ControlAction.CAMERA_MOVE_LEFT);
				break;
			case D:
				GameController.gameUpdate(ControlAction.CAMERA_MOVE_RIGHT);
				break;
			default:
				GameController.gameUpdate(ControlAction.CAMERA_STAY_STILL);
				break;
			}
		});
	}

	/**
	 * Getter for game scene.
	 * 
	 * @return Game scene
	 */
	public static Scene getScene() {
		if (scene == null) {
			initScene();
		}
		return scene;

	}


	/**
	 * Getter for message pane.
	 * 
	 * @return Message pane
	 */
	public static MessagePane getMessagePane() {
		if (messagePane == null) {
			initScene();
		}
		return messagePane;
	}


	/**
	 * Getter for pause pane.
	 * 
	 * @return Pause pane
	 */
	public static PausePane getPausePane() {
		if (pausePane == null) {
			initScene();
		}
		return pausePane;
	}
	
	/**
	 * Getter for Shop Pop Up.
	 * 
	 * @return Shop Pop Up
	 */
	public static ShopPopUp getShopPopUp() {
		if (shopPopUp == null) {
			initScene();
		}
		return shopPopUp;
	}

	/**
	 * Getter for button pane.
	 * 
	 * @return Button pane
	 */
	public static AnchorPane getButtonPane() {
		if (buttonPane == null) {
			initScene();
		}
		return buttonPane;
	}
	
	/**
	 * Getter for Material Status.
	 * 
	 * @return Material Status
	 */
	public static MaterialStatus getMaterialStatus() {
		if (materialStatus == null) {
			initScene();
		}
		return materialStatus;
	}
	
	/**
	 * Getter for Resource Status.
	 * 
	 * @return Resource Status
	 */
	public static ResourceStatus getResourceStatus() {
		if (resourceStatus == null) {
			initScene();
		}
		return resourceStatus;
	}

	/**
	 * Getter for Worker Status.
	 * 
	 * @return Worker Status
	 */
	public static WorkerStatus getWorkerStatus() {
		if (workerStatus == null) {
			initScene();
		}
		return workerStatus;
	}
	
	/**
	 * Getter for Change Job Pop Up.
	 * 
	 * @return Change Job Pop Up
	 */
	public static ChangeJobPopUp getChangeJobPopUp() {
		if (changeJobPopUp == null) {
			initScene();
		}
		return changeJobPopUp;
	}
	
	/**
	 * Getter for graphic context of the map canvas.
	 * 
	 * @return Graphic context of the map canvas
	 */
	public static GraphicsContext getGraphicsContext() {
		if (gc == null) {
			initScene();
		}
		return gc;
	}

	/**
	 * Getter for game pane.
	 * 
	 * @return Game pane
	 */
	public static StackPane getGamePane() {
		if (gamePane == null) {
			initScene();
		}
		return gamePane;
	}

}