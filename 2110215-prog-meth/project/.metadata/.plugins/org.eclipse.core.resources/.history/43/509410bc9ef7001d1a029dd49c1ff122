package entity.building;

import game.Terrain;
import utils.GameConfig;

public class Sawmill extends Resource {

	public Sawmill() {
		super(GameConfig.SAWMILL_DURABILITY, GameConfig.SAWMILL_MAX_PEOPLE, GameConfig.SAWMILL_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.FOREST;
	}

}
