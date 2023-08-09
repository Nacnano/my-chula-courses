package game;

import javafx.scene.control.skin.TextInputControlSkin.Direction;
import utils.GameConfig;

/**
 * The Camera class is used to represent the camera. It stores position,
 * isMoving, and direction.
 * 
 * @author nacnano
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
	
	/**
	 * Moving direction of the camera.
	 */
	private Position direction = new Position(0, 0);

	
	/**
	 * move the camera to the destination
	 * 
	 * @param destination Destinationof the camera
	 * @return true if the camera can move otherwise
	 * false
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
	 * Getter for {@link Position}
	 * 
	 * @return The camera's position
	 */
	public Position getPosition() {
		return position;
	}

	/**
	 * Setter for {@link Position}
	 * 
	 * @param position The position to be set
	 */
	public void setPosition(Position position) {
		this.position = position;
	}

	/**
	 * Getter for {@link #isMoving}
	 * @return isMoving The moving state of the camera
	 */
	public boolean isMoving() {
		return isMoving;
	}

	/**
	 * Setter for {@link #isMoving}
	 * @param isMoving The moving state of the camera
	 */
	public void setMoving(boolean isMoving) {
		this.isMoving = isMoving;
	}

	/**
	 * Getter for {@link Direction}
	 * @return direction The moving direction of the camera
	 */
	public Position getDirection() {
		return direction;
	}

	/**
	 * Setter for {@link Direction}
	 * @param direction The moving state of the camera
	 */
	public void setDirection(Position direction) {
		this.direction = direction;
	}
}