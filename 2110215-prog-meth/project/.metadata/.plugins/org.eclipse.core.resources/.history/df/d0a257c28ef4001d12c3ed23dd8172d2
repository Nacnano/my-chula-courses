package entity.building;

import config.Config;
import game.Terrain;

public class Smelter extends Resource {

	public Smelter() {
		super(Config.SMELTER_DURABILITY, Config.SMELTER_MAX_PEOPLE, Config.SMELTER_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.MOUNTAIN;
	}

}
