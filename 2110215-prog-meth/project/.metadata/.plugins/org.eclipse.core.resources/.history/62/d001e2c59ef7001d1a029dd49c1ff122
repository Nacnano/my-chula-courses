package entity.building;

import game.Terrain;
import utils.GameConfig;

public class Smelter extends Resource {

	public Smelter() {
		super(GameConfig.SMELTER_DURABILITY, GameConfig.SMELTER_MAX_PEOPLE, GameConfig.SMELTER_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.MOUNTAIN;
	}

}
