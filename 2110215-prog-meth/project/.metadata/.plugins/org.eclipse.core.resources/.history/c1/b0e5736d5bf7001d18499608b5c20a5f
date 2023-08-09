package entity.unit;

import entity.building.BaseBuilding;
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
	
	@Override
	public void attack(BaseUnit to) {
		to.setPeople(to.people - (int)(getPeople()*getAttackMultiplier()));
	}
	
	@Override
	public void destroy(BaseBuilding building) {
		building.setDurability(building.getDurability() - (int)(getPeople()*getAttackMultiplier()) );
		
	}
	
	@Override
	public void move (Position destination) {
		if(GameLogic.getOurUnits().containsKey(this)) {
			GameLogic.removeOurUnit(this);
			GameLogic.addOurUnit(this, destination);
		}
		else if(GameLogic.getEnemyUnits().containsKey(this)) {
			GameLogic.removeEnemyUnit(this);
			GameLogic.addEnemyUnit(this, destination);
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
