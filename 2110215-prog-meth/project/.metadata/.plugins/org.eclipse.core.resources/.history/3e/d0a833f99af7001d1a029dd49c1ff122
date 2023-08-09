package entity.building;

import game.Position;

public abstract class BaseBuilding implements Buildable {

	private int durability;
	private boolean isAttacked;
	private Position position;
	
	public BaseBuilding(int durability) {
		setDurability(durability);
	}

	public int getDurability() {
		return durability;
	}

	public void setDurability(int durability) {
		// TODO: also remove building for GUI
		if(getDurability() <= 0) {
//			GameLogic.removeBuilding(this);
		}
		this.durability = Math.max(0, durability);
	}

	public boolean isAttacked() {
		return isAttacked;
	}

	public void setAttacked(boolean isAttacked) {
		this.isAttacked = isAttacked;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}
	

}
