package entity.building;

import config.Config;
import game.Terrain;

public class Sawmill extends Resource {

	public Sawmill() {
		super(Config.SAWMILL_DURABILITY, Config.SAWMILL_MAX_PEOPLE, Config.SAWMILL_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.FOREST;
	}

}
