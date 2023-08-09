package entity.building;

import game.GameLogic;
import game.Position;

public abstract class BaseBuilding implements Buildable {

	/**
	 * Durability of this building
	 */
	private int durability;
	
	/**
	 * Attacked state of this building
	 */
	private boolean isAttacked;
	
	/**
	 * Position of this building
	 */
	private Position position;
	
	/**
	 * The constructor of this class.
	 * 
	 * @param durability 	Durability of this building
	 */
	public BaseBuilding(int durability) {
		setDurability(durability);
	}

	/**
	 * Getter for {@link #durability}
	 * 
	 * @return {@link #durability}
	 */
	public int getDurability() {
		return durability;
	}
	
	/**
	 * Setter for {@link #durability}
	 * 
	 * @param durability for {@link #durability}
	 */
	public void setDurability(int durability) {
		// TODO: also remove building for GUI
		if(getDurability() <= 0) {
			GameLogic.removeBuilding(this);
		}
		this.durability = Math.max(0, durability);
	}

	/**
	 * Getter for {@link #isAttacked}
	 * 
	 * @return {@link #isAttacked}
	 */
	public boolean isAttacked() {
		return isAttacked;
	}

	/**
	 * Setter for {@link #isAttacked}
	 * 
	 * @param isAttacked for {@link #isAttacked}
	 */
	public void setAttacked(boolean isAttacked) {
		this.isAttacked = isAttacked;
	}

	/**
	 * Getter for {@link #position}
	 * 
	 * @return {@link #position}
	 */
	public Position getPosition() {
		return position;
	}

	/**
	 * Setter for {@link #position}
	 * 
	 * @param position for {@link #position}
	 * 
	 */
	public void setPosition(Position position) {
		this.position = position;
	}
}
