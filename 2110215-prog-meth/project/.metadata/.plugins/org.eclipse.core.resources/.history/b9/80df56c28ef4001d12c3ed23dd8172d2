package entity.building;

import config.Config;
import game.Terrain;

public class Mine extends Resource {

	public Mine() {
		super(Config.MINE_DURABILITY, Config.MINE_MAX_PEOPLE, Config.MINE_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.MOUNTAIN;
	}

}
