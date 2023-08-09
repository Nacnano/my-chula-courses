package entity.unit;

import game.GameLogic;
import game.Position;

public class BaseUnit implements Attackable, Movable{
	private int people;
	private int attackRange;
	private int moveRange;
	private float attackMultiplier;
	private boolean isMoved;
	private boolean isAttacked;
	private Position position;
	
	public BaseUnit(int people, int attackRange, int moveRange, float attackMultiplier) {
		setPeople(people);
		setAttackRange(attackRange);
		setMoveRange(moveRange);
		setAttackMultiplier(attackMultiplier);
		setMoved(false);
		setIsAttacked(false);
	}
	
	public void attack(BaseUnit enemy) {
		// if(getAttackRange() <= getPosition.getDistanceFrom(enemy.getPosition))
		enemy.setPeople(enemy.people - (int)(getPeople()*getAttackMultiplier()) );
	}
	
	public void move (Position destination) {
		// if(getMoveRange() <= getPosition.getDistanceFrom(destination))
		if(GameLogic.getOurUnits().containsKey(this)) {
			GameLogic.removeOurUnit(this);
			GameLogic.addOurUnit(this, destination);
		}
		else if(GameLogic.getEnemyUnits().containsKey(this)) {
			GameLogic.removeOurUnit(this);
			GameLogic.addOurUnit(this, destination);
		}
	}
	
	
	
	public void setPeople(int people) {
		this.people = Math.max(0, people);
	}
	
	public void setAttackRange(int attackRange) {
		this.attackRange = attackRange;
	}
	
	public void setMoveRange(int moveRange) {
		this.moveRange = moveRange;
	}
	
	public void setAttackMultiplier(float attackMultiplier) {
		this.attackMultiplier = attackMultiplier;
	}

	public void setIsAttacked(boolean isAttacked) {
		this.setAttacked(isAttacked);
	}
	
	public int getPeople () {
		return this.people;
	}
	
	public int getAttackRange() {
		return this.attackRange;
	}
	
	public int getMoveRange() {
		return this.moveRange;
	}
	
	public float getAttackMultiplier() {
		return this.attackMultiplier;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public boolean isAttacked() {
		return isAttacked;
	}

	public void setAttacked(boolean isAttacked) {
		this.isAttacked = isAttacked;
	}

	public boolean isMoved() {
		return isMoved;
	}

	public void setMoved(boolean isMoved) {
		this.isMoved = isMoved;
	}

}
