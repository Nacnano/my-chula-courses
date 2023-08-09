package entity.building;

import game.Terrain;
import utils.GameConfig;

/**
 * The MilitaryCamp class represent Military Camp
 *
 */
public class MilitaryCamp extends BaseBuilding {
	
	/**
	 * The constructor for this class
	 */
	public MilitaryCamp() {
		super(GameConfig.MILITARYCAMP_DURABILITY);
	}
	
	/**
	 * Check cannot build on water
	 * 
	 * @param t
	 * @return true if terrain is not water otherwise
	 * false
	 */
	public boolean canBuildOn(Terrain t) {
		return t != Terrain.WATER;
	}
	
}
