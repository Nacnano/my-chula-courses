package fighters.base;

import logic.GameManager;

public abstract class Unit {
	protected String name;
	protected String symbol;
	protected int maxHealth;
	protected int health;
	protected int speed;
	protected int power;
	protected int range;
	protected int defense;
	protected boolean onGuard;
	protected int location;
	protected boolean playerControlled;
	
	public Unit(String name, String symbol, int maxHealth, int speed, int location, boolean playerControlled) {
		super();
		this.setName(name);
		this.setSymbol(symbol);
		this.setMaxHealth(maxHealth);
		this.setHealth(maxHealth);
		this.setSpeed(speed);
		this.setPower(0);
		this.setRange(0);
		this.setDefense(0);
		this.setOnGuard(false);
		this.setLocation(location);
		this.setPlayerControlled(playerControlled);
	}
	
	public boolean move(int spaces) {
		if(Math.abs(spaces) > speed) return false;
		if(spaces == 0) return false;
		if(this.getLocation() + spaces < 0) return false;
		if(this.getLocation() + spaces >= GameManager.BOARD_SIZE) return false;
		if(!GameManager.gb.getCell(this.getLocation() + spaces).isEmpty()) return false;
		for(int i = 1; i < spaces; i ++) {
			if(!GameManager.gb.getCell(this.getLocation() + i).isEmpty()) {
				Unit otherUnit = GameManager.gb.getCell(this.getLocation() + i).getUnit();
				if(!this.sameTeam(otherUnit)) {
					return false;
				}
			}
		}
		
		this.setLocation(this.getLocation() + spaces);
		return true;
	}
	
	public boolean sameTeam(Unit unit) {
		return this.isPlayerControlled() == unit.isPlayerControlled();
	}
	
	public void remove() {
		GameManager.allUnits.remove(GameManager.gb.getCell(this.getLocation()).getUnit());
		GameManager.gb.getCell(this.getLocation()).emptyCell();;
	}
	
	public int getMaxHealth() {
		return maxHealth;
	}
	public void setMaxHealth(int maxHealth) {
		this.maxHealth = maxHealth;
	}
	public int getHealth() {
		return health;
	}
	public void setHealth(int health) {
		this.health = health;
	}
	public int getPower() {
		return power;
	}
	public void setPower(int power) {
		this.power = power;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public boolean isPlayerControlled() {
		return playerControlled;
	}
	public void setPlayerControlled(boolean playerControlled) {
		this.playerControlled = playerControlled;
	}
	
	public int getDefense() {
		return defense;
	}
	
	public void setDefense(int defense) {
		this.defense = defense;
	}
	
	public boolean isOnGuard() {
		return onGuard;
	}
	
	public void setOnGuard(boolean onGuard) {
		this.onGuard = onGuard;
	}
	
	public int getRange() {
		return this.range;
	}

	public void setRange(int range) {
		this.range = range;
	}

	public int getLocation() {
		return location;
	}

	public void setLocation(int location) {
		this.location = location;
	}
	
}
