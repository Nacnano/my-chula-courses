package entity.building;

import game.Terrain;
import utils.GameConfig;

public class Field extends Resource {
	
	public Field() {
		super(GameConfig.FIELD_DURABILITY, GameConfig.FIELD_MAX_PEOPLE, GameConfig.FIELD_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN;
	}
}
