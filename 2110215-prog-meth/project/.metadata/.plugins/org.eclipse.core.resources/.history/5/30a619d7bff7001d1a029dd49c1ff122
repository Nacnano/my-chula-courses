package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The House class represent House building
 *
 */
public class House extends BaseBuilding {

	/**
	 * The constructor for this class
	 */
	public House() {
		super(GameConfig.HOUSE_DURABILITY);
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
