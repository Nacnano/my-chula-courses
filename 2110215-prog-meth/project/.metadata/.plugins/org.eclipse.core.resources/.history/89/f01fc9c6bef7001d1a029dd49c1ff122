package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The Field class represent Field building
 *
 */
public class Field extends Resource {
	
	/**
	 * The constructor for this class
	 */
	public Field() {
		super(GameConfig.FIELD_DURABILITY, GameConfig.FIELD_MAX_PEOPLE, GameConfig.FIELD_FATALITY_RATE);
	}

	/**
	 * Check can build on plain
	 * 
	 * @param t
	 * @return true if terrain is plain otherwise
	 * false
	 */
	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN;
	}
}
