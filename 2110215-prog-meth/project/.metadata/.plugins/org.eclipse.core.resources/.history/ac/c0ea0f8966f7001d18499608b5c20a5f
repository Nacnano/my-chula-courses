package game;

import entity.unit.Movable;
import utils.GameConfig;

/**
 * The Player class is used to represent the player. It stores status, equipped
 * armor, equipped weapon, and items that the player has.
 *
 */
public class Camera {

	/**
	 * Position of the camera.
	 */
	private Position position;
	
	/**
	 * Moving status of the camera.
	 */
	private boolean isMoving;
	
	private Position direction = new Position(0, 0);

	
	/**
	 * move the camera to the destination
	 */
	public boolean move(Position destination) {
		if(destination.getColumn() < 0 || destination.getColumn() >= GameConfig.getMapSize() || destination.getRow() < 0 || destination.getRow() >= GameConfig.getMapSize())
			return false;
		setDirection(destination.directionFrom(getPosition()));
		setMoving(true);
		setPosition(destination);
		return true;
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



	public Position getDirection() {
		return direction;
	}



	public void setDirection(Position direction) {
		this.direction = direction;
	}
}