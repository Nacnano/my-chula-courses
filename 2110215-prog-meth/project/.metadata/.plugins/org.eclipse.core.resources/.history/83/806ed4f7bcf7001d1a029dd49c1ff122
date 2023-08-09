package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The Sawmill class represent Sawmill building
 *
 */
public class Sawmill extends Resource {

	/**
	 * The constructor for this class
	 */
	public Sawmill() {
		super(GameConfig.SAWMILL_DURABILITY, GameConfig.SAWMILL_MAX_PEOPLE, GameConfig.SAWMILL_FATALITY_RATE);
	}

	/**
	 * Check can build on plain or forest
	 * 
	 * @param t
	 * @return true if terrain is plain or forest otherwise
	 * false
	 */
	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.FOREST;
	}

}
