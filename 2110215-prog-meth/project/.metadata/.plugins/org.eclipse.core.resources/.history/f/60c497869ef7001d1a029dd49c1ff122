package entity.building;

import game.Terrain;
import utils.GameConfig;

public class MilitaryCamp extends BaseBuilding {
	
	public MilitaryCamp() {
		super(GameConfig.MILITARYCAMP_DURABILITY);
	}
	
	public boolean canBuildOn(Terrain t) {
		return t != Terrain.WATER;
	}
	
}
