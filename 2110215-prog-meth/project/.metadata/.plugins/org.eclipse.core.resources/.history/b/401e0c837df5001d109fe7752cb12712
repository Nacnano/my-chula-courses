package game;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import entity.unit.BaseUnit;
import javafx.util.Pair;
import utils.GameConfig;

/**
 * The GameMap class represents a level of the game. It stores data of each
 * {@link Cell}, room position, and {@link Monster} on this level.
 *
 */
public class GameMap {

	/**
	 * The Array of {@link Cell} on this level.
	 */
	private Cell gameMap[][];

	/**
	 * The List of room position on this level.
	 */
	private List<Pair<Integer, Integer>> roomList;

	/**
	 * The List of {@link Monster} on this level.
	 */
	private List<BaseUnit> enemyList;

	/**
	 * Creates an empty map.
	 */
	public GameMap() {
		gameMap = new Cell[GameConfig.getMapSize() + 10][GameConfig.getMapSize()+ 10];
		enemyList = new CopyOnWriteArrayList<BaseUnit>();
		roomList = new CopyOnWriteArrayList<Pair<Integer, Integer>>();
	}

	/**
	 * Prints map in the console. (For debugging purposes)
	 * <ul>
	 * <li>{@code '.'} represents VOID</li>
	 * <li>{@code '#'} represents WALL</li>
	 * <li>{@code ' '} represents PATH</li>
	 * </ul>
	 */
	public void printMap() {
		for (int i = 0; i <= GameConfig.getMapSize(); i++) {
			for (int j = 0; j <= GameConfig.getMapSize(); j++) {
				if (gameMap[i][j].getTerrain() == Terrain.PLAIN) {
					System.out.print(".");
				} else if (gameMap[i][j].getTerrain() == Terrain.WATER) {
					System.out.print("W");
				} else {
					System.out.print("#");
				}
			}
			System.out.print("\n");
		}
	}

	/**
	 * Getter for array of {@link Cell} on this level.
	 * 
	 * @return An array of {@link Cell} on this level
	 */
	public Cell[][] getGameMap() {
		return gameMap;
	}

	/**
	 * Getter for {@link Cell} of the specified position.
	 * 
	 * @param i Position of the cell in Y-axis
	 * @param j Position of the cell in X-axis
	 * @return Cell at the specified position
	 */
	public Cell get(int i, int j) {
		if (i < 0 || i > GameConfig.getMapSize() || j < 0 || j > GameConfig.getMapSize()) {
			return new Cell();
		}
		return gameMap[i][j];
	}

	/**
	 * Getter for monsterList.
	 * 
	 * @return This level's monsterListss
	 */
	public List<BaseUnit> getEnemyList() {
		return enemyList;
	}

}