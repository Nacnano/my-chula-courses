package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The Smelter class represent Smelter building
 *
 */
public class Smelter extends Resource {

	/**
	 * The constructor for this class
	 */
	public Smelter() {
		super(GameConfig.SMELTER_DURABILITY, GameConfig.SMELTER_MAX_PEOPLE, GameConfig.SMELTER_FATALITY_RATE);
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
