package game;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import controller.GameController;
import entity.unit.Movable;
import javafx.util.Pair;
import game.Cell;
import scene.GameScene;
import utils.GameConfig;
import utils.MessageTextUtil;

/**
 * The Player class is used to represent the player. It stores status, equipped
 * armor, equipped weapon, and items that the player has.
 *
 */
public class Camera implements Movable {

	/**
	 * Position of the camera.
	 */
	private Position position;
	
	/**
	 * Moving status of the camera.
	 */
	private boolean isMoving;

	
	/**
	 * move the camera to the destination
	 */
	public void move(Position destination) {
		setPosition(destination);
	}



	/**
	 * Getter for position.
	 * 
	 * @return The camera's position
	 */
	public Position getPosition() {
		return position;
	}

	/**
	 * Setter for position.
	 * 
	 * @param position The position to be set
	 */
	public void setPosition(Position position) {
		// TODO: add logic to control the camera to be only in the map
		this.position = position;
	}



	public boolean isMoving() {
		return isMoving;
	}



	public void setMoving(boolean isMoving) {
		this.isMoving = isMoving;
	}
}