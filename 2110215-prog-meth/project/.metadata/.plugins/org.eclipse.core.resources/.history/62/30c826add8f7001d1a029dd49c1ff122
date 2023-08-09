package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The Mine class represent Mine building
 *
 */
public class Mine extends Resource {

	/**
	 * The constructor for this class
	 */
	public Mine() {
		super(GameConfig.MINE_DURABILITY, GameConfig.MINE_MAX_PEOPLE, GameConfig.MINE_FATALITY_RATE);
	}

	/**
	 * Check can build on plain or mountain
	 * 
	 * @param t
	 * @return true if terrain is plain or mountain otherwise
	 * false
	 */
	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.MOUNTAIN;
	}

}
