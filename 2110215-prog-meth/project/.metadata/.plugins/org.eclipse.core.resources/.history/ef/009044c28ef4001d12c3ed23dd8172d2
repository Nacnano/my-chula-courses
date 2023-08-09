package entity.building;

import game.Terrain;

import config.Config;

public class Field extends Resource {
	
	public Field() {
		super(Config.FIELD_DURABILITY, Config.FIELD_MAX_PEOPLE, Config.FIELD_FATALITY_RATE);
	}

	public boolean canBuildOn(Terrain t) {
		return t == Terrain.PLAIN;
	}
}
