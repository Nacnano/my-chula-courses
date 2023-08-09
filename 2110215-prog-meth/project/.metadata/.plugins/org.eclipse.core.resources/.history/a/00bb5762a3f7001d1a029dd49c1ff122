package game;

import entity.unit.BaseUnit;
import entity.building.BaseBuilding;

/**
 * The Cell class is used to represent individual cells in {@link GameMap}. It
 * stores data of {@link Terrain}, {@link BaseUnit} and {@link BaseBuilding} on this cell.
 *
 */
public class Cell {
	
	/**
	 * The position of this cell.
	 */
	private Position position;
	

	/**
	 * The type of this cell.
	 */
	private Terrain terrain;
	/**
	 * The entity on this cell.
	 */
	private BaseUnit unit;

	/**
	 * The building on this cell.
	 */
	private BaseBuilding building;
	
	/**
	 * The territory state.
	 */
	private int territory;
	
	/**
	 * The attack territory state.
	 */
	private boolean attackTerritory;
	
	/**
	 * The moving territory state.
	 */
	private boolean moveTerritory;

	/**
	 * Creates a new cell with void type.
	 */
	public Cell() {
		this(Terrain.PLAIN);
	}

	/**
	 * Creates a new cell with a specified type.
	 * 
	 * @param terrain Type of the new cell
	 */
	public Cell(Terrain terrain) {
		setTerrain(terrain);
		setUnit(null);
		setBuilding(null);
	}

	/**
	 * Getter for terrain.
	 * 
	 * @return This cell's terrain
	 */
	public Terrain getTerrain() {
		return terrain;
	}
	
	/**
	 * Setter for unit.
	 * 
	 * @param unit The unit to be set.
	 */
	public void setTerrain(Terrain terrain) {
		this.terrain = terrain;
	}

	/**
	 * Getter for unit.
	 * 
	 * @return This cell's unit
	 */
	public BaseUnit getUnit() {
		return unit;
	}

	/**
	 * Setter for unit.
	 * 
	 * @param unit The unit to be set.
	 */
	public void setUnit(BaseUnit unit) {
		this.unit = unit;
	}

	/**
	 * Getter for building.
	 * 
	 * @return This cell's building
	 */
	public BaseBuilding getBuilding() {
		return building;
	}

	/**
	 * Setter for building.
	 * 
	 * @param building The building to be set.
	 */
	public void setBuilding(BaseBuilding building) {
		this.building = building;
	}

	public int getTerritory() {
		return territory;
	}

	public void setTerritory(int isTerritory) {
		this.territory = isTerritory;
	}
	
	public void increaseTerritoryBy(int add) {
		setTerritory(getTerritory() + add);
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	public boolean isAttackTerritory() {
		return attackTerritory;
	}

	public void setAttackTerritory(boolean attackTerritory) {
		this.attackTerritory = attackTerritory;
	}

	public boolean isMoveTerritory() {
		return moveTerritory;
	}

	public void setMoveTerritory(boolean moveTerritory) {
		this.moveTerritory = moveTerritory;
	}

}