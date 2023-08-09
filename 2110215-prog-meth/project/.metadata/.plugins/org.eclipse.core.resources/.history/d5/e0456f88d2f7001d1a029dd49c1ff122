package game;

import java.util.ArrayList;

import controller.GameController;
import entity.unit.BaseUnit;
import utils.GameConfig;
import utils.RandomUtil;
import utils.TextFileUtil;

/**
 * The MapGenerator class is used to generate {@link GameMap}.
 * 
 */
public class MapGenerator {

	private static GameMap gameMap;


	/**
	 * Generates new {@link GameMap}.
	 * 
	 * @param mapName The String of map name
	 * @return Randomly generated {@link GameMap}
	 */
	public static GameMap generateMap(String mapName) {
		GameMap gameMap = buildNewEmptyMap();
		buildNewMap(gameMap, mapName);

		return gameMap;
	}
	
	/**
	 * Generates new empty map.
	 * 
	 * @return  generated empty map
	 */
	private static GameMap buildNewEmptyMap() {
		gameMap = new GameMap();
		for (int i = 0; i <= GameConfig.getMapSize(); i++) {
			for (int j = 0; j <= GameConfig.getMapSize(); j++) {
				Cell newCell = new Cell();
				newCell.setPosition(new Position(i, j));
				gameMap.getGameMap()[i][j] = newCell;
			}
		}
		return gameMap;
	}

	/**
	 * Creates {@link Cell} array from array of cell type
	 * 
	 * @param gameMap The array of {@link Cell} to store the result in
	 */
	private static void buildNewMap(GameMap gameMap, String mapName) {
		
		String[] mapContents = TextFileUtil.readTextFile("map/" + mapName + ".txt");
				
		for (int i = 0; i < GameConfig.getMapSize(); i++) {
			for (int j = 0; j < GameConfig.getMapSize(); j++) {

				switch (Character.toString(mapContents[i].charAt(j))) {
					case "P":
						gameMap.get(i, j).setTerrain(Terrain.PLAIN);
						break;
					case "M":
						gameMap.get(i, j).setTerrain(Terrain.MOUNTAIN);
						break;
					case "F":
						gameMap.get(i, j).setTerrain(Terrain.FOREST);
						break;
					case "W":
						gameMap.get(i, j).setTerrain(Terrain.WATER);
						break;
					default:
						System.out.println(mapContents[i].charAt(j));
						System.out.println("Text file invalid for map: " + mapName);
				}
				
			}
		}
	}


	/**
	 * Generate new set of {@link BaseUnit} which will assign to {@link GameMap}
	 * 
	 * @param gameMap the {@link GameMap} that assign {@link BaseUnit} to
	 * be on a random part of the map
	 */
	public static void generateEnemyOnMap(GameMap gameMap) {
		int day = GameController.getDay();
		if(day <= GameConfig.getPreparationWaveNumber() * GameConfig.getDayPerWave()) {
			return;
		}
		
		if(day%GameConfig.getDayPerWave() != 0) {
			return;
		}
		
		System.out.println(day);
		ArrayList<BaseUnit> enemyList = RandomUtil.randomEnemyList(day);

		for (BaseUnit enemy : enemyList) {
			boolean isAdd = false;
			int randomCount = 0;
			do {
				int randomX = RandomUtil.random(0, GameConfig.getMapSize() - 1);
				int randomY = RandomUtil.random(0, GameConfig.getMapSize() - 1);

				Cell currentCell = gameMap.get(randomY, randomX);

				if (currentCell.getTerrain() == Terrain.WATER && currentCell.getUnit() == null && currentCell.getTerritory() == 0) {
					GameLogic.addEnemyUnit(enemy, currentCell.getPosition());
					isAdd = true;
				}
				randomCount += 1;
			} while (!isAdd && randomCount <= 10);
		}
	}

}