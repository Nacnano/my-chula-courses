package controller;
import entity.building.House;
import entity.building.MilitaryCamp;
import entity.building.Mine;
import entity.building.Sawmill;
import entity.building.Smelter;
import entity.unit.BaseUnit;
import entity.unit.SwordMan;
import javafx.animation.FadeTransition;
import javafx.application.Platform;
import javafx.scene.media.MediaPlayer;
import game.Camera;
import game.Cell;
import game.ControlAction;
import game.GameLogic;
import game.GameMap;
import game.MapGenerator;
import game.MapRenderer;
import game.Position;
import game.Terrain;
import scene.CongratulationScene;
import scene.GameOverScene;
import scene.GameScene;
import scene.LandingScene;
import utils.AnimationUtil;
import utils.AudioUtil;
import utils.GameConfig;
import utils.MessageTextUtil;
import utils.TransitionUtil;

/**
 * The GameController class is the class that control about the {@link #gameMap}
 * which currently render and the changing of {@link #day} inside the game.
 */
public class GameController {

	/**
	 * Represent the {@link GameMap} of current map.
	 */
	private static GameMap gameMap;
	
	/**
	 * Represent the {@link BaseUnit} of selected unit.
	 */
	private static BaseUnit selectedUnit;


	/**
	 * The {@link MediaPlayer} represent the background music of GameScene.
	 */
	private static MediaPlayer bgm = AudioUtil.getGameSceneBGM();

	/**
	 * Represent the current {@link Camera} instance.
	 */
	private static Camera camera;
	
	/**
	 * Represent the current day.
	 */
	private static int day;
	
	/**
	 * The variable that stores the next action of the player for the purpose of
	 * delay optimization.
	 */
	private static Runnable nextAction = null;

	/**
	 * Setter of next action.
	 * 
	 * @param nextAction The action to be set
	 */
	public static void setNextAction(Runnable nextAction) {
		GameController.nextAction = nextAction;
	}

	/**
	 * Does next action if there is no {@link InterruptController interrupt}.
	 */
	public static void doNextAction() {
		if (InterruptController.isInterruptPlayerMovingInput()) {
			return;
		}
		if (nextAction != null) {
			nextAction.run();
		}
		nextAction = null;
	}

	/**
	 * Initialize new game.
	 */
	public static void start() {
		day = 1;
		
		initGameMap();

		makeNewCamera();

		sceneSetup();
		initialTransition();
	}
	
	/**
	 * Create init {@link GameMap}
	 * 
	 */
	private static void initGameMap() {
		gameMap = MapGenerator.generateMap("default");
		
		GameLogic.getBuildings().clear();
		GameLogic.SetCurrentPopulation(500);
		
		initBuildings();
		initMaterials();
		
		MapGenerator.generateEnemyOnMap(gameMap);
	}
	
	/**
	 * Init buildings to {@link GameMap}
	 * 
	 */
	private static void initBuildings() {
		Position mapCenter = new Position(GameConfig.getMapSize()/2, GameConfig.getMapSize()/2);
		while(getGameMap().get(mapCenter).getTerrain() == Terrain.WATER) {
			mapCenter = mapCenter.moveDown();
		}
		GameLogic.initBuilding(new House(), mapCenter);
		
//		Field field = new Field();
//		Position field_pos = new Position(10, 11);
//		gameMap.get(10, 11).setBuilding(field);
//		GameLogic.getBuildings().put(field_pos, field);
//		GameLogic.setNumberOfWorkers(field_pos, 10);
//		
		GameLogic.initBuilding(new Mine(), gameMap.get(9, 6).getPosition());
//		Mine mine = new Mine();
//		Position mine_pos = new Position(9, 6);
//		gameMap.get(9, 6).setBuilding(mine);
//		GameLogic.getBuildings().put(mine_pos, mine);
//		GameLogic.setNumberOfWorkers(mine_pos, 10);
//		
		GameLogic.initBuilding(new Sawmill(), gameMap.get(10, 4).getPosition());
//		Sawmill sawmill = new Sawmill();
//		Position sawmill_pos = new Position(10, 4);
//		gameMap.get(10, 4).setBuilding(sawmill);
//		GameLogic.getBuildings().put(sawmill_pos, sawmill);
//		GameLogic.setNumberOfWorkers(sawmill_pos, 10);
//		
		GameLogic.initBuilding(new Smelter(), gameMap.get(11, 13).getPosition());
//		Smelter smelter = new Smelter();
//		Position smelter_pos = new Position(11, 13);
//		gameMap.get(11, 13).setBuilding(smelter);
//		GameLogic.getBuildings().put(smelter_pos, smelter);
//		GameLogic.setNumberOfWorkers(smelter_pos, 10);
		
		Position militaryCamp_pos = gameMap.get(7, 10).getPosition();    // new Position(7, 10);
		GameLogic.initBuilding(new MilitaryCamp(), militaryCamp_pos);
		
//		SwordMan swordMan = new SwordMan();
//		GameLogic.addOurUnit(swordMan, militaryCamp_pos);
		
	}
	
	/**
	 * Init materials to {@link GameLogic}
	 * 
	 */
	public static void initMaterials() {
		GameLogic.setFood(1000);
		GameLogic.setWood(1000);
		GameLogic.setStone(1000);
		GameLogic.setIron(1000);
		GameLogic.setMoney(1000);
	}

	/**
	 * Stop the game background music then making fade transition to
	 * {@link LandingScene}.
	 */
	public static void exitToMainMenu() {
		FadeTransition fadeOut = TransitionUtil.makeFadingNode(GameScene.getGamePane(), 1.0, 0.0);

		bgm.stop();

		fadeOut.setOnFinished((event) -> SceneController.backToMainMenu());

		fadeOut.play();
	}

	/**
	 * Checking condition that {@link #GameLogic.get} is currently Game Over or not by
	 * checking nuimber of {@link #BaseBuilding} in bulidings.
	 * 
	 * @return true if number of {@link #BaseBuilding} is less than or equals 0 otherwise
	 *         false
	 */
	public static boolean isGameOver() {
		if (GameLogic.isGameOver()) {
			bgm.stop();
			FadeTransition fadeOut = TransitionUtil.makeFadingNode(GameScene.getGamePane(), 1.0, 0.0);

			InterruptController.setTransition(true);
			fadeOut.setOnFinished((event) -> {
				SceneController.setSceneToStage(GameOverScene.getScene());
			});

			fadeOut.play();
			return true;
		}
		return false;
	}
	
	/**
	 * Checking condition that day passes the last day of attack or
	 * checking whether the territory covers the whole map or not
	 * 
	 * @return true the condition satisfies otherwise
	 *         false
	 */
	public static boolean isGameClear() {
		if (GameLogic.isGameClear()) {
			bgm.stop();
			FadeTransition fadeOut = TransitionUtil.makeFadingNode(GameScene.getGamePane(), 1.0, 0.0);

			InterruptController.setTransition(true);
			fadeOut.setOnFinished((event) -> {
				SceneController.setSceneToStage(CongratulationScene.getScene());
			});

			fadeOut.play();
			return true;
		}
		return false;
	}

	/**
	 * Getter for {@link #gameMap}.
	 * 
	 * @return {@link #gameMap}
	 */
	public static GameMap getGameMap() {
		return gameMap;
	}

	/**
	 * Setter for {@link #gameMap}.
	 * 
	 * @param gameMap the new {@link #gameMap}
	 */
	public static void setGameMap(GameMap gameMap) {
		GameController.gameMap = gameMap;
	}

	/**
	 * Getter for {@link #camera}.
	 * 
	 * @return {@link #camera}
	 */
	public static Camera getCamera() {
		return camera;
	}

	/**
	 * Setter for {@link #camera}.
	 * 
	 * @param newCamera for the new {@link #camera}
	 */
	public static void setCamera(Camera newCamera) {
		camera = newCamera;
	}

	/**
	 * Getter for {@link #day}.
	 * 
	 * @return {@link #day}
	 */
	public static int getDay() {
		return day;
	}
	
	/**
	 * Setter for {@link #day}.
	 * 
	 * @param newDaythe new {@link #day}
	 */
	public static void setDay(int newDay) {
		day = newDay;
	}


	/**
	 * Setup {@link GameScene} when start or restart game.
	 */
	private static void sceneSetup() {
		SceneController.setSceneToStage(GameScene.getScene());
		GameScene.getMessagePane().resetMessage();
		InterruptController.resetInterruptState();
		
		GameScene.getWorkerStatus().update();
		GameScene.getMaterialStatus().update();
		GameScene.getResourceStatus().update(null);
	}
	
	/**
	 * Create new {@link Camera} instance and register to the {@link GameMap}.
	 * 
	 * @return {@link Camera} new camera instance
	 */
	private static void makeNewCamera() {
		Camera newCamera = new Camera();
		newCamera.setPosition(new Position(GameConfig.getMapSize()/2, GameConfig.getMapSize()/2));

		camera = newCamera;
	}
	
	/**
	 * Move camera action.
	 * 
	 * @param action  The {@link ControlAction action} to set direction of {@link Camera} 
	 * and update if the camera moves
	 */
	public static void gameUpdate(ControlAction action) {
		Position cameraPosition = camera.getPosition();
		boolean isMoved = false;
		switch (action) {
		case CAMERA_MOVE_UP:
			isMoved = camera.move(cameraPosition.moveUp());
			break;
		case CAMERA_MOVE_DOWN:
			isMoved = camera.move(cameraPosition.moveDown());
			break;
		case CAMERA_MOVE_LEFT:
			isMoved = camera.move(cameraPosition.moveLeft());
			break;
		case CAMERA_MOVE_RIGHT:
			isMoved = camera.move(cameraPosition.moveRight());
			break;
		default:
			break;
		}
		if(isMoved) {
			InterruptController.setStillAnimation(true);
			new Thread(() -> {
				try {
					AnimationUtil.playAnimation(2).join();
				} catch (InterruptedException e) {
					System.out.println("Move animation interrupted");
				}
				Platform.runLater(() -> {
					postMoveUpdate(true);
					postGameUpdate();
				});
			}).start();
		}
	}
	
	/**
	 * check whether the camera is at the map border or not 
	 * if yes, then add alert message
	 * 
	 * @param isMove Tell whether the move is a success or not
	 */
	public static void postMoveUpdate(boolean isMove) {
		Camera camera = GameController.getCamera();
		
		Position cameraPosition = camera.getPosition();
		
		if(cameraPosition.getRow() == 0 || cameraPosition.getRow() == GameConfig.getMapSize()-1){
			MessageTextUtil.textWhenCameraOutofMap();
		}
		else if (cameraPosition.getColumn() == 0 || cameraPosition.getColumn() == GameConfig.getMapSize()-1) {
			MessageTextUtil.textWhenCameraOutofMap();
		}
	}
	
	/**
	 * Select unit action that handle various cases for further action
	 * 
	 * @param unit The target unit
	 */
	public static void gameUpdate(BaseUnit unit) {
		if (InterruptController.isStillAnimation()) {
			return;
		}

		if(unit.isMoved()) {
			MessageTextUtil.textWhenUnitAlreadyMoved();
			return;
		}
		
		if(!GameLogic.isOurUnit(unit)) {
			MessageTextUtil.textWhenSelectEnemyUnit();
			return;
		}
		
		selectedUnit = unit;
		GameLogic.updateAttackTerritory(unit, true);
		GameLogic.updateMoveTerritory(unit, true);

		InterruptController.setStillAnimation(true);

		new Thread() {
			@Override
			public void run() {
				Platform.runLater(() -> {
					postGameUpdate();
				});
			}
		}.start();

	}

	/**
	 * Unit attack action that handle cases for attacking enemy unit
	 * 
	 * @param from The selected unit
	 * @param to The target unit
	 */
	public static void gameUpdate(BaseUnit from, BaseUnit to) {
		if (InterruptController.isStillAnimation()) {
			return;
		}

		if(from == to) {
			GameLogic.updateAttackTerritory(from, false);
			GameLogic.updateMoveTerritory(from, false);
			setSelectedUnit(null);
			new Thread() {
				@Override
				public void run() {
					Platform.runLater(() -> {
						postGameUpdate();
					});
				}
			}.start();
			return;
		}
		
		if(GameLogic.isOurUnit(to)) {
			MessageTextUtil.textWhenAttackOurUnit();
			return;
		}
		
		if(!getGameMap().get(to.getPosition()).isAttackTerritory()) {
			MessageTextUtil.textWhenEnemyNotInAttackTerritory();
			return;
		}
		
		if(from.isMoved()) {
			MessageTextUtil.textWhenUnitAlreadyMoved();
			return;
		}
		
		InterruptController.setStillAnimation(true);
		
		from.setMoved(true);
		to.setAttacked(true);
		setSelectedUnit(null);
		GameLogic.updateAttackTerritory(from, false);
		GameLogic.updateMoveTerritory(from, false);
		GameLogic.attackUnit(from, to);

		new Thread() {
			@Override
			public void run() {
				try {
					AnimationUtil.playAnimation(2).join();
				} catch (InterruptedException e) {
					System.out.println("Attack animation interrupted");
				}
				Platform.runLater(() -> {
					postGameUpdate();
				});
			}
		}.start();
	}
	

	/**
	 * Unit move action handle cases for moving to another cell
	 * 
	 * @param unit The selected unit
	 * @param toCell The destination cell
	 */
	public static void gameUpdate(BaseUnit unit, Cell toCell) {
		if (InterruptController.isStillAnimation()) {
			return;
		}

		if(!getGameMap().get(toCell.getPosition()).isMoveTerritory()) {
			MessageTextUtil.textWhenMoveOutsideMoveTerritory();
			return;
		}
		
		if(toCell.getUnit() != null) {
			MessageTextUtil.textWhenMovetoUnit();
			return;
		}
		
		
		
		if(unit.isMoved()) {
			MessageTextUtil.textWhenUnitAlreadyMoved();
			return;
		}
		
		unit.setMoved(true);
		GameLogic.updateMoveTerritory(unit, false);
		GameLogic.updateAttackTerritory(unit, false);
		GameLogic.moveUnit(unit, toCell.getPosition());
		setSelectedUnit(null);
		
		InterruptController.setStillAnimation(true);
		new Thread() {
			@Override
			public void run() {
				try {
					AnimationUtil.playAnimation(2).join();
				} catch (InterruptedException e) {
					System.out.println("Attack animation interrupted");
				}
				Platform.runLater(() -> {
					postGameUpdate();
				});
			}
		}.start();

	}
	
	/**
	 * Updates user interface action.
	 */
	public static void postGameUpdate() {

		// Updates user interface
		GameScene.updateScene();

		// Play animations
		new Thread(() -> {
			try {
				AnimationUtil.playAnimation(2).join();
			} catch (InterruptedException e) {
				System.out.println("Post game animation interrupted");
			}
			Platform.runLater(() -> {
				if (GameController.isGameOver() || GameController.isGameClear()) {
					return;
				}
				InterruptController.setStillAnimation(false);
				doNextAction();
			});
		}).start();

	}

	
	/**
	 * Create new {@link FadeTransition} then play transition along with background
	 * music.
	 */
	private static void initialTransition() {
		GameScene.getGamePane().setOpacity(0.0);

		InterruptController.setTransition(true);
		FadeTransition fadeIn = TransitionUtil.makeFadingNode(GameScene.getGamePane(), 0.0, 1.0);

		MapRenderer.render();

		fadeIn.play();
		fadeIn.setOnFinished((event) -> InterruptController.setTransition(false));

		bgm.play();
	}
	
	
	/**
	 * Getter for {@link #selectedUnit}
	 * 
	 * @return {@link #selectedUnit}
	 */
	public static BaseUnit getSelectedUnit() {
		return selectedUnit;
	}

	/**
	 * Setter for {@link #selectedUnit}
	 * 
	 * @param selectedUnit The selected unit of {@link #selectedUnit}
	 */
	public static void setSelectedUnit(BaseUnit selectedUnit) {
		GameController.selectedUnit = selectedUnit;
	}

	/**
	 * Next day for changing day after the 
	 * player finish playing the current day
	 * 
	 */
	public static void nextDay() {
		setDay(getDay() + 1);
		GameLogic.updateDay();
		initialTransition();
		
	}
}