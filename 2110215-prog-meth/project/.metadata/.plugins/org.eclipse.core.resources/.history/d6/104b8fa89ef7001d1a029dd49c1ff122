package entity.building;

import game.Terrain;
import utils.GameConfig;

public class Mine extends Resource {

	public Mine() {
		super(GameConfig.MINE_DURABILITY, GameConfig.MINE_MAX_PEOPLE, GameConfig.MINE_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN || t == Terrain.MOUNTAIN;
	}

}
