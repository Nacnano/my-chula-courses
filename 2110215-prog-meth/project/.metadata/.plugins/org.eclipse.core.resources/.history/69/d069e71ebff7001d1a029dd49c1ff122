package game;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import controller.GameController;
import entity.building.BaseBuilding;
import entity.building.Field;
import entity.building.House;
import entity.building.MilitaryCamp;
import entity.building.Mine;
import entity.building.Resource;
import entity.building.Sawmill;
import entity.building.Smelter;
import entity.unit.Archer;
import entity.unit.BaseUnit;
import entity.unit.FieldSwordMan;
import entity.unit.ForestSwordMan;
import entity.unit.MountainSwordMan;
import entity.unit.SwordMan;
import utils.GameConfig;

public class GameLogic {
	/**
	 * The amount of wood in the game.
	 */
	private static int wood;

	/**
	 * The amount of stone in the game.
	 */
	private static int stone;

	/**
	 * The amount of iron ore in the game.
	 */
	private static int ironOre;

	/**
	 * The amount of iron in the game.
	 */
	private static int iron;

	/**
	 * The amount of money in the game.
	 */
	private static int money;

	/**
	 * The amount of food in the game.
	 */
	private static int food;

	/**
	 * The number of current poulation in the game.
	 */
	private static int currentPopulation;

	/**
	 * A map of our units and their positions.
	 */
	private static Map<BaseUnit, Position> ourUnits = new HashMap<>();

	/**
	 * A map of enemy units and their positions.
	 */
	private static Map<BaseUnit, Position> enemyUnits = new HashMap<>();

	/**
	 * A map of positions and the corresponding terrain.
	 */
	private static Map<Position, Terrain> map = new HashMap<>();

	private static int[][] territory = new int[GameConfig.getMapSize()][GameConfig.getMapSize()];

	/**
	 * The count of territories in the game.
	 */
	private static int territoryCount = 0;

	/**
	 * A map of positions and the corresponding buildings.
	 */
	private static Map<Position, BaseBuilding> buildings = new HashMap<>();

	/**
	 * Removes a building from the game.
	 *
	 * @param b The building to be removed.
	 */
	public static void removeBuilding(BaseBuilding b) {
		Position p = new Position(-1, -1);
		for(Position pos : buildings.keySet()) {
			if (buildings.get(pos).equals(b))
				p = pos;
		}

		updateTerritory(b, p, -1);
		removeBuildingUtil(p);

		if (b instanceof Field) {
			currentPopulation -= ((Field) b).getCurrentPeople() * ((Field) b).getFatalityRate();
		}
		else if (b instanceof Mine) {
			currentPopulation -= ((Mine) b).getCurrentPeople() * ((Mine) b).getFatalityRate();
		}
		else if (b instanceof Sawmill) {
			currentPopulation -= ((Sawmill) b).getCurrentPeople() * ((Sawmill) b).getFatalityRate();
		}
		else if (b instanceof Smelter) {
			currentPopulation -= ((Smelter) b).getCurrentPeople() * ((Smelter) b).getFatalityRate();
		}
		else if (b instanceof House)  {
		}
		else if (b instanceof MilitaryCamp) {
		}
	}

	/**
	 * Sets the number of workers for a building.
	 *
	 * @param building   The building to set the number of workers for
	 * @param newNumber  The new number of workers
	 */
	public static void setNumberOfWorkers(BaseBuilding building, int newNumber) {
		int currentPeople = ((Resource) building).getCurrentPeople();
		int maxPeople = ((Resource) building).getMaxPeople();
		if (newNumber < 0 || newNumber > maxPeople) return;

		if (newNumber > currentPeople) {
			// Enroll Job more than unemployed
			if (newNumber - currentPeople > getUnemployed()) return;
		}

		for (BaseBuilding b : buildings.values()) {
			if (b.equals(building))
				((Resource) b).setCurrentPeople(newNumber);
		}
	} 

	/**
	 * Gets the maximum population capacity based on the number of houses.
	 *
	 * @return The maximum population capacity
	 */
	public static int getMaxPopulation() {
		int countHouse = 0;
		for (BaseBuilding b : buildings.values()) {
			if (b instanceof House) 
				countHouse++;
		}
		return GameConfig.HOUSE_MAX_PEOPLE * countHouse;
	}

	/**
	 * Gets the number of unemployed workers.
	 *
	 * @return The number of unemployed workers
	 */
	public static int getUnemployed() {
		int sumEmployed = 0;
		for (BaseBuilding b : buildings.values()) {
			if (b instanceof Resource) 
				sumEmployed += ((Resource) b).getCurrentPeople();
		}
		for (BaseUnit u : ourUnits.keySet()) {
			sumEmployed += u.getPeople();
		}
		return currentPopulation - sumEmployed;
	}


	/**
	 * Updates resoures in the game.
	 */
	public static void updateResources() {
		for (BaseBuilding b : buildings.values()) {
			int currentPeople = 0;
			try {
				currentPeople = ((Resource) b).getCurrentPeople();
			}catch (ClassCastException e){
				continue;
			}

			if (b instanceof Field) {
				food += GameConfig.FIELD_WORK_RATE * currentPeople;
			}
			else if (b instanceof Mine) {
				stone += GameConfig.MINE_WORK_RATE * currentPeople;
				ironOre += GameConfig.MINE_WORK_RATE * currentPeople;
			}
			else if (b instanceof Sawmill) {
				wood += GameConfig.SAWMILL_WORK_RATE * currentPeople;
			}
			else if (b instanceof Smelter) {
				int tmp = Math.min(ironOre, (int) GameConfig.SMELTER_WORK_RATE * currentPeople);
				iron += tmp;
				ironOre -= tmp;
			}
		}
	}

	/**
	 * Updates current population in the game.
	 */
	public static void updateCurrentPopulation() {
		if (currentPopulation >= getMaxPopulation()) return;
		int newPopulation = currentPopulation + (int) (currentPopulation * GameConfig.HOUSE_BORN_RATE);
		currentPopulation = Math.min(getMaxPopulation(), newPopulation);
	}

	/**
	 * Check whether the player is ready to build a building.
	 * 
	 * @param b The building that the player wants to build
	 * @return true If the player has enough resources for building 
	 * otherwise false
	 */
	private static boolean hasEnoughMaterial(BaseBuilding b) {
		if (b instanceof Field) {
			return money >= GameConfig.FIELD_REQUIRE_MONEY &&
					wood >= GameConfig.FIELD_REQUIRE_WOOD &&
					stone >= GameConfig.FILED_REQUIRE_STONE &&
					iron >= GameConfig.FIELD_REQUIRE_IRON;
		}
		else if (b instanceof Mine) {
			return money >= GameConfig.MINE_REQUIRE_MONEY &&
					wood >= GameConfig.MINE_REQUIRE_WOOD &&
					stone >= GameConfig.MINE_REQUIRE_STONE &&
					iron >= GameConfig.MINE_REQUIRE_IRON;
		}
		else if (b instanceof Sawmill) {
			return money >= GameConfig.SAWMILL_REQUIRE_MONEY &&
					wood >= GameConfig.SAWMILL_REQUIRE_WOOD &&
					stone >= GameConfig.SAWMILL_REQUIRE_STONE &&
					iron >= GameConfig.SAWMILL_REQUIRE_IRON;
		}
		else if (b instanceof Smelter) {
			return money >= GameConfig.SMELTER_REQUIRE_MONEY &&
					wood >= GameConfig.SMELTER_REQUIRE_WOOD &&
					stone >= GameConfig.SMELTER_REQUIRE_STONE &&
					iron >= GameConfig.SMELTER_REQUIRE_IRON;
		}
		else if (b instanceof House) {
			return money >= GameConfig.HOUSE_REQUIRE_MONEY &&
					wood >= GameConfig.HOUSE_REQUIRE_WOOD &&
					stone >= GameConfig.HOUSE_REQUIRE_STONE &&
					iron >= GameConfig.HOUSE_REQUIRE_IRON;
		}
		else if (b instanceof MilitaryCamp) {
			return money >= GameConfig.MILITARYCAMP_REQUIRE_MONEY &&
					wood >= GameConfig.MILITARYCAMP_REQUIRE_WOOD &&
					stone >= GameConfig.MILITARYCAMP_REQUIRE_STONE &&
					iron >= GameConfig.MILITARYCAMP_REQUIRE_IRON;
		}
		else return false;
	}

	/**
	 * Deduct the material after building.
	 * 
	 * @param b The building that the player wants to build
	 */
	private static void deductMaterial(BaseBuilding b) {
		if (b instanceof Field) {
			money -= GameConfig.FIELD_REQUIRE_MONEY;
			wood -= GameConfig.FIELD_REQUIRE_WOOD;
			stone -= GameConfig.FILED_REQUIRE_STONE;
			iron -= GameConfig.FIELD_REQUIRE_IRON;
		}
		else if (b instanceof Mine) {
			money -= GameConfig.MINE_REQUIRE_MONEY;
			wood -= GameConfig.MINE_REQUIRE_WOOD;
			stone -= GameConfig.MINE_REQUIRE_STONE;
			iron -= GameConfig.MINE_REQUIRE_IRON;
		}
		else if (b instanceof Sawmill) {
			money -= GameConfig.SAWMILL_REQUIRE_MONEY;
			wood -= GameConfig.SAWMILL_REQUIRE_WOOD;
			stone -= GameConfig.SAWMILL_REQUIRE_STONE;
			iron -= GameConfig.SAWMILL_REQUIRE_IRON;
		}
		else if (b instanceof Smelter) {
			money -= GameConfig.SMELTER_REQUIRE_MONEY;
			wood -= GameConfig.SMELTER_REQUIRE_WOOD;
			stone -= GameConfig.SMELTER_REQUIRE_STONE;
			iron -= GameConfig.SMELTER_REQUIRE_IRON;
		}
		else if (b instanceof House) {
			money -= GameConfig.HOUSE_REQUIRE_MONEY;
			wood -= GameConfig.HOUSE_REQUIRE_WOOD;
			stone -= GameConfig.HOUSE_REQUIRE_STONE;
			iron -= GameConfig.HOUSE_REQUIRE_IRON;
		}
		else if (b instanceof MilitaryCamp) {
			money -= GameConfig.MILITARYCAMP_REQUIRE_MONEY;
			wood -= GameConfig.MILITARYCAMP_REQUIRE_WOOD;
			stone -= GameConfig.MILITARYCAMP_REQUIRE_STONE;
			iron -= GameConfig.MILITARYCAMP_REQUIRE_IRON;
		}
	}

	/**
	 * Checks if a building can be constructed at the specified position.
	 *
	 * @param b The building to be constructed.
	 * @param p The position to build the building.
	 * @return {@code true} if the building can be constructed, {@code false} otherwise.
	 */
	public static boolean canBuildBuilding(BaseBuilding b, Position p) {
		if (!b.canBuildOn(map.get(p))) return false;
		if (buildings.containsKey(p)) return false;
		if (!hasEnoughMaterial(b)) return false;
		if (territory[p.getRow()][p.getColumn()] == 0) return false;
		return true;
	}

	/**
	 * Builds a building at the specified position.
	 *
	 * @param b The building to be constructed.
	 * @param p The position to build the building.
	 */
	public static void buildBuilding(BaseBuilding b, Position p) {
		if (!canBuildBuilding(b, p)) return;

		b.setPosition(p);
		GameController.getGameMap().get(p).setBuilding(b);
		updateTerritory(b, p, 1);
		deductMaterial(b);
		buildings.put(p, b);
	}

	/**
	 * Initializes a building at the specified position.
	 *
	 * @param b The building to be initialized.
	 * @param p The position to initialize the building.
	 */
	public static void initBuilding(BaseBuilding b, Position p) {
		b.setPosition(p);
		GameController.getGameMap().get(p).setBuilding(b);
		updateTerritory(b, p, 1);
		buildings.put(p, b);
	}

	/**
	 * Updates the territory when a building is added or removed.
	 *
	 * @param b   The building that was added or removed.
	 * @param p   The position of the building.
	 * @param add The value to add or subtract from the territory.
	 */
	private static void updateTerritory(BaseBuilding b, Position p, int add) {
		int radius = GameConfig.TERRITORY_RADIUS;
		int size = GameConfig.getMapSize();
		for (int i = Math.max(0, p.getRow() - radius); i <= Math.min(p.getRow() + radius, size); i++) {
			for (int j = Math.max(0, p.getColumn() - radius); j <= Math.min(p.getColumn() + radius, size); j++) {
				if (territory[i][j] == 0 && add == 1) territoryCount += 1;
				if (territory[i][j] == 1 && add == -1) territoryCount -= 1;
				territory[i][j] += add;
				GameController.getGameMap().get(i, j).increaseTerritoryBy(add);
			}
		}
	}

	/**
	 * Sells the player's materials for money
	 * 
	 * @param m
	 * @param amount
	 */
	public static void sellMaterial(Material m, int amount) {
		System.out.println("Selling " + m + "  amount = " + amount);
		if (m == Material.FOOD && food >= amount) {
			food -= amount;
			money += GameConfig.FOOD_PRICE * amount;
		}
		else if (m == Material.WOOD && wood >= amount) {
			wood -=  amount;
			money += GameConfig.WOOD_PRICE * amount;
		} 
		else if (m == Material.STONE && stone >= amount) {
			stone -= amount;
			money += GameConfig.STONE_PRICE * amount;
		}
		else if (m == Material.IRON && iron >= amount) {
			iron -= amount;
			money += GameConfig.IRON_PRICE * amount;
		}
	}

	/**
	 * Moves a building from one position to another.
	 *
	 * @param p1 The original position of the building.
	 * @param p2 The new position for the building.
	 */
	public void moveBuilding(Position p1, Position p2) {
		BaseBuilding b = buildings.get(p1);
		if (b.canBuildOn(map.get(p2)) && !buildings.containsKey(p2)) {
			buildings.remove(p1);
			buildings.put(p2, b);
		}
	}

	/**
	 * Removes a building from the specified position.
	 *
	 * @param pos The position of the building to be removed.
	 */
	public static void removeBuildingUtil(Position pos) {
		buildings.remove(pos);
		GameController.getGameMap().get(pos).setBuilding(null);
	}

	/**
	 * Attacks a unit from another unit.
	 *
	 * @param from The unit initiating the attack.
	 * @param to   The unit being attacked.
	 */
	public static void attackUnit(BaseUnit from, BaseUnit to) {
		from.attack(to);
	}

	/**
	 * Destroys a building using a unit.
	 *
	 * @param from The unit destroying the building.
	 * @param to   The building to be destroyed.
	 */
	public static void destroyBuilding(BaseUnit from, BaseBuilding to) {
		from.destroy(to);
	}

	/**
	 * Moves a unit to a specified destination.
	 *
	 * @param unit        The unit to be moved.
	 * @param destination The destination position to move the unit to.
	 */
	public static void moveUnit(BaseUnit unit, Position destination) {
		unit.move(destination);
	}

	/**
	 * Checks if a military unit is present in a military camp.
	 *
	 * @param camp The military camp to check.
	 * @param unit The unit to check if it is in the camp.
	 * @return {@code true} if the unit is in the camp, {@code false} otherwise.
	 */
	public static boolean militaryIsInCamp(MilitaryCamp camp, BaseUnit unit) {
		if (!isOurUnit(unit)) return false;
		Position unitPos = unit.getPosition();
		return buildings.get(unitPos) == camp;
	}

	/**
	 * Pays the price for upgrading military units.
	 *
	 * @return {@code true} if the payment was successful, {@code false} if there is not enough money.
	 */
	public static boolean payToUpgradeMilitary() {
		if (money < GameConfig.MILITARY_UPGRADE_PRICE) return false;
		money -= GameConfig.MILITARY_UPGRADE_PRICE;
		return true;
	}


	/**
	 * Changes a military unit from an old unit to a new unit.
	 *
	 * @param unit_old The old unit to be replaced.
	 * @param unit_new The new unit to replace the old unit.
	 */
	public static void changeMilitary(BaseUnit unit_old, BaseUnit unit_new) {
		if (!isOurUnit(unit_old)) return;
		Position pos = unit_old.getPosition();
		unit_new.setPeople(unit_old.getPeople());
		unit_new.setMoved(unit_old.isMoved());
		removeOurUnit(unit_old);
		addOurUnit(unit_new, pos);
	}

	/**
	 * Retrieves the terrain of a unit belonging to the player.
	 *
	 * @param unit The unit to retrieve the terrain for.
	 * @return The terrain of the unit's position.
	 */
	public static Terrain getOurUnitTerrain(BaseUnit unit) {
		Position pos = unit.getPosition();
		return map.get(pos);
	}

	/**
	 * Upgrades a SwordMan unit based on the terrain it is on.
	 *
	 * @param unit The SwordMan unit to be upgraded.
	 */
	public static void upgradeSwordMan(BaseUnit unit) {
		Position pos = ourUnits.get(unit);
		if (!payToUpgradeMilitary()) return;

		Terrain terrain = map.get(pos);
		if (terrain == Terrain.FOREST) {
			BaseUnit new_unit = new ForestSwordMan();
			GameLogic.changeMilitary(unit, new_unit);
		} else if (terrain == Terrain.MOUNTAIN) {
			BaseUnit new_unit = new MountainSwordMan();
			GameLogic.changeMilitary(unit, new_unit);
		} else if (terrain == Terrain.PLAIN) {
			BaseUnit new_unit = new FieldSwordMan();
			GameLogic.changeMilitary(unit, new_unit);
		}
	}

	/**
	 * Builds a military unit in a military camp.
	 *
	 * @param building      The building where the military unit is being built.
	 * @param militaryType  The type of military unit to build ("SwordMan" or "Archer").
	 */
	public static void buildMilitary(BaseBuilding building, String militaryType) {
		if (!(building instanceof MilitaryCamp)) return;
		if (getUnemployed() < GameConfig.MILITARY_SIZE) return;
		BaseUnit unit;
		if (militaryType.equals("SwordMan"))
			unit = new SwordMan();
		else
			unit = new Archer();

		for (Position pos : buildings.keySet()) {
			if (buildings.get(pos).equals(building)) {
				addOurUnit(unit, pos);
				unit.setPosition(pos);
			}
		}
		System.out.println("Successfully built " + unit.getClass().getSimpleName() + " on " + getOurUnitTerrain(unit));
	}

	/**
	 * Heals a military unit by setting its population to the maximum allowed size.
	 *
	 * @param unit The military unit to be healed.
	 */
	public static void heal(BaseUnit unit) {
		Position pos = ourUnits.get(unit);
		if (!(buildings.get(pos) instanceof MilitaryCamp)) return;
		unit.setPeople(Math.min(getUnemployed(), GameConfig.MILITARY_SIZE));
	}

	/**
	 * Adds a unit to the game.
	 *
	 * @param unit The unit to be added.
	 * @param pos  The position where the unit is added.
	 */
	public static void addUnit(BaseUnit unit, Position pos) {
		if (isOurUnit(unit)) {
			addOurUnit(unit, pos);
		} else {
			addEnemyUnit(unit, pos);
		}
	}

	/**
	 * Adds an owned unit to the game at the specified position.
	 *
	 * @param unit The unit to be added.
	 * @param pos  The position where the unit is added.
	 */
	public static void addOurUnit(BaseUnit unit, Position pos) {
		GameController.getGameMap().get(pos).setUnit(unit);
		unit.setPosition(pos);
		ourUnits.put(unit, pos);
	}

	/**
	 * Adds an enemy unit to the game at the specified position.
	 *
	 * @param unit The unit to be added.
	 * @param pos  The position where the unit is added.
	 */
	public static void addEnemyUnit(BaseUnit unit, Position pos) {
		GameController.getGameMap().get(pos).setUnit(unit);
		unit.setPosition(pos);
		enemyUnits.put(unit, pos);
	}

	/**
	 * Removes a unit from the game.
	 *
	 * @param unit The unit to be removed.
	 */
	public static void removeUnit(BaseUnit unit) {
		if (isOurUnit(unit)) {
			removeOurUnit(unit);
		} else {
			removeEnemyUnit(unit);
		}
	}

	/**
	 * Removes an owned unit from the game.
	 *
	 * @param unit The unit to be removed.
	 */
	public static void removeOurUnit(BaseUnit unit) {
		GameController.getGameMap().get(unit.getPosition()).setUnit(null);
		ourUnits.remove(unit);
	}

	/**
	 * Removes an enemy unit from the game.
	 *
	 * @param unit The unit to be removed.
	 */
	public static void removeEnemyUnit(BaseUnit unit) {
		GameController.getGameMap().get(unit.getPosition()).setUnit(null);
		enemyUnits.remove(unit);
	}

	/**
	 * Checks if a unit belongs to the player.
	 *
	 * @param unit The unit to check.
	 * @return {@code true} if the unit belongs to the player, {@code false} otherwise.
	 */
	public static boolean isOurUnit(BaseUnit unit) {
		return getOurUnits().containsKey(unit);
	}

	/**
	 * Updates the attack territory based on the unit's position and attack range.
	 *
	 * @param unit             The unit for which to update the attack territory.
	 * @param isAttackTerritory {@code true} to set the tiles in the attack territory, {@code false} to clear them.
	 */
	public static void updateAttackTerritory(BaseUnit unit, boolean isAttackTerritory) {
		Position p = unit.getPosition();

		if (unit instanceof SwordMan)
			((SwordMan) unit).buffByTerrain(map.get(p));

		int radius = unit.getAttackRange();
		int size = GameConfig.getMapSize();
		for (int i = Math.max(0, p.getRow() - radius); i <= Math.min(p.getRow() + radius, size); i++) {
			for (int j = Math.max(0, p.getColumn() - radius); j <= Math.min(p.getColumn() + radius, size); j++) {
				GameController.getGameMap().get(i, j).setAttackTerritory(isAttackTerritory);
			}
		}
	}

	/**
	 * Updates the move territory based on the unit's position and move range.
	 *
	 * @param unit           The unit for which to update the move territory.
	 * @param isMoveTerritory {@code true} to set the tiles in the move territory, {@code false} to clear them.
	 */
	public static void updateMoveTerritory(BaseUnit unit, boolean isMoveTerritory) {
		Position p = unit.getPosition();

		if (unit instanceof SwordMan)
			((SwordMan) unit).buffByTerrain(map.get(p));

		int radius = unit.getMoveRange();
		int size = GameConfig.getMapSize();
		for (int i = Math.max(0, p.getRow() - radius); i <= Math.min(p.getRow() + radius, size); i++) {
			for (int j = Math.max(0, p.getColumn() - radius); j <= Math.min(p.getColumn() + radius, size); j++) {
				GameController.getGameMap().get(i, j).setMoveTerritory(isMoveTerritory);
			}
		}
	}

	/**
	 * Updates the game state at the start of a new day.
	 * This includes enemy movement, resetting unit move status, and updating resources and population.
	 */
	public static void updateDay() {
		enemyMove();
		resetUnitMove();
		updateResources();
		updateCurrentPopulation();
	}

	/**
	 * Resets the move status of all units.
	 * Sets the "moved" status of all units to false.
	 */
	public static void resetUnitMove() {
		for (BaseUnit unit : ourUnits.keySet()) {
			unit.setMoved(false);
		}
		for (BaseUnit unit : enemyUnits.keySet()) {
			unit.setMoved(false);
		}
	}

	/**
	 * Checks if a position is within the attack range of a unit.
	 *
	 * @param from The attacking unit.
	 * @param pos  The target position.
	 * @return {@code true} if the position is within the attack range, {@code false} otherwise.
	 */
	public static boolean isInAttackRange(BaseUnit from, Position pos) {
		return from.getPosition().getMaxPerpendicularDistance(pos) <= from.getAttackRange();
	}

	/**
	 * Executes enemy movement. Each enemy unit selects the closest target unit or building and either attacks or moves towards it.
	 */
	public static void enemyMove() {
		for (BaseUnit enemy : new ArrayList<BaseUnit>(getEnemyUnits().keySet()) ) {
			BaseUnit targetUnit = closestOurUnitFrom(enemy);
			BaseBuilding targetBuilding = closestOurBuildingFrom(enemy);
			
			int distanceFromUnit = enemy.getPosition().getDistanceFrom(targetUnit);
			int distanceFromBuilding= enemy.getPosition().getDistanceFrom(targetBuilding);
			
			
			if( distanceFromUnit <= distanceFromBuilding && targetUnit != null ) {
				if(isInAttackRange(enemy, targetUnit.getPosition())) {
					attackUnit(enemy, targetUnit);
				}
				else {
					moveUnitUsingShortestPath(enemy, targetUnit.getPosition());
				}
				
			}
			else if (targetBuilding != null) {
				if(isInAttackRange(enemy, targetBuilding.getPosition())) {
					destroyBuilding(enemy, targetBuilding);
				}
				else {
					moveUnitUsingShortestPath(enemy, targetBuilding.getPosition());
				}
			}
		}
	}

	/**
	 * Moves a unit towards a target position using the shortest path.
	 *
	 * @param unit The unit to move.
	 * @param pos  The target position.
	 */
	public static void moveUnitUsingShortestPath(BaseUnit unit, Position pos) {
	    int moveRange = unit.getMoveRange();
	    int bestRow = getBestPointFromMove(unit.getPosition().getRow(), pos.getRow(), moveRange);
	    int bestColumn = getBestPointFromMove(unit.getPosition().getColumn(), pos.getColumn(), moveRange);
	    moveUnit(unit, new Position(bestRow, bestColumn));
	}

	/**
	 * Calculates the best point to move to given the current position, target position, and movement range.
	 * This ensures that the unit moves towards the target while staying within its movement range.
	 *
	 * @param from  The current position coordinate.
	 * @param to    The target position coordinate.
	 * @param range The movement range of the unit.
	 * @return The best coordinate to move to.
	 */
	public static int getBestPointFromMove(int from, int to, int range) {
	    if (to > from) {
	        return to - Math.max(0, -from - range + to);
	    } else {
	        return to + Math.max(0, from + range - to);
	    }
	}

	/**
	 * Finds the closest unit among our units to a given enemy unit.
	 *
	 * @param enemy The enemy unit.
	 * @return The closest unit among our units.
	 */
	public static BaseUnit closestOurUnitFrom(BaseUnit enemy) {
	    BaseUnit targetUnit = null;
	    int min = 2 * GameConfig.getMapSize();
	    for (BaseUnit ourUnit : getOurUnits().keySet()) {
	        int distance = ourUnit.getPosition().getDistanceFrom(enemy.getPosition());
	        if (distance < min) {
	            min = distance;
	            targetUnit = ourUnit;
	        }
	    }
	    return targetUnit;
	}

	/**
	 * Finds the closest building among our buildings to a given enemy unit.
	 *
	 * @param enemy The enemy unit.
	 * @return The closest building among our buildings.
	 */
	public static BaseBuilding closestOurBuildingFrom(BaseUnit enemy) {
	    BaseBuilding targetBuilding = null;
	    int min = 2 * GameConfig.getMapSize();
	    for (BaseBuilding building : getBuildings().values()) {
	        int distance = building.getPosition().getDistanceFrom(enemy.getPosition());
	        if (distance < min) {
	            min = distance;
	            targetBuilding = building;
	        }
	    }
	    return targetBuilding;
	}

	/**
	 * Checks if the game is over.
	 * The game is over if there are no buildings remaining and the current day has exceeded the preparation wave number times the day per wave.
	 *
	 * @return {@code true} if the game is over, {@code false} otherwise.
	 */
	public static boolean isGameOver() {
		return buildings.isEmpty();
	}

	/**
	 * Checks if the game is cleared.
	 * The game is cleared if all tiles on the map are covered or if the current day has exceeded the sum of the preparation wave number and enemy wave number times the day per wave.
	 *
	 * @return {@code true} if the game is cleared, {@code false} otherwise.
	 */
	public static boolean isGameClear() {
	    boolean isCoverAllMap = territoryCount == (GameConfig.getMapSize() * GameConfig.getMapSize());
	    return isCoverAllMap || GameController.getDay() >= (GameConfig.getPreparationWaveNumber() + GameConfig.getEnemyWaveNumber()) * GameConfig.getDayPerWave();
	}

	/**
	 * Gets the current amount of wood.
	 *
	 * @return The current amount of wood
	 */
	public static int getWood() {
		return wood;
	}

	/**
	 * Sets the amount of wood.
	 *
	 * @param wood The new amount of wood
	 */
	public static void setWood(int wood) {
		GameLogic.wood = wood;
	}

	/**
	 * Gets the current amount of stone.
	 *
	 * @return The current amount of stone
	 */
	public static int getStone() {
		return stone;
	}

	/**
	 * Sets the amount of stone.
	 *
	 * @param stone The new amount of stone
	 */
	public static void setStone(int stone) {
		GameLogic.stone = stone;
	}

	/**
	 * Gets the current amount of iron ore.
	 *
	 * @return The current amount of iron ore
	 */
	public static int getIronOre() {
		return ironOre;
	}

	/**
	 * Sets the amount of iron ore.
	 *
	 * @param ironOre The new amount of iron ore
	 */
	public static void setIronOre(int ironOre) {
		GameLogic.ironOre = ironOre;
	}

	/**
	 * Gets the current amount of iron.
	 *
	 * @return The current amount of iron
	 */
	public static int getIron() {
		return iron;
	}

	/**
	 * Sets the amount of iron.
	 *
	 * @param iron The new amount of iron
	 */
	public static void setIron(int iron) {
		GameLogic.iron = iron;
	}

	/**
	 * Gets the current amount of money.
	 *
	 * @return The current amount of money
	 */
	public static int getMoney() {
		return money;
	}

	/**
	 * Sets the amount of money.
	 *
	 * @param money The new amount of money
	 */
	public static void setMoney(int money) {
		GameLogic.money = money;
	}

	/**
	 * Gets the current amount of food.
	 *
	 * @return The current amount of food
	 */
	public static int getFood() {
		return food;
	}

	/**
	 * Sets the amount of food.
	 *
	 * @param food The new amount of food
	 */
	public static void setFood(int food) {
		GameLogic.food = food;
	}

	// Get number of workers

	/**
	 * Gets the total number of workers for the specified resource.
	 *
	 * @param resourceName The name of the resource to count the workers for
	 * @return The total number of workers for the specified resource
	 */
	public static int getNumberOfWorkers(String resourceName) {
		int cnt = 0;
		for (BaseBuilding b : buildings.values()) {
			if (!(b instanceof Resource)) continue;
			if (b.getClass().getSimpleName().equals(resourceName))
				cnt += ((Resource) b).getCurrentPeople();
		}
		return cnt;
	}

	/**
	 * Gets the map of buildings.
	 *
	 * @return The map of buildings
	 */
	public static Map<Position, BaseBuilding> getBuildings() {
		return buildings;
	}

	/**
	 * Gets the map of terrain.
	 *
	 * @return The map of terrain
	 */
	public static Map<Position, Terrain> getMap() {
		return map;
	}

	/**
	 * Gets the map of our units.
	 *
	 * @return The map of our units
	 */
	public static Map<BaseUnit, Position> getOurUnits() {
		return ourUnits;
	}

	/**
	 * Sets the current population amount.
	 *
	 * @param amount The new current population amount
	 */
	public static void setCurrentPopulation(int amount) {
		currentPopulation = amount;
	}

	/**
	 * Gets the map of enemy units.
	 *
	 * @return The map of enemy units
	 */
	public static Map<BaseUnit, Position> getEnemyUnits() {
		return enemyUnits;
	}

	/**
	 * Sets the map of enemy units.
	 *
	 * @param enemyUnits The map of enemy units
	 */
	public static void setEnemyUnits(Map<BaseUnit, Position> enemyUnits) {
		GameLogic.enemyUnits = enemyUnits;
	}

	/**
	 * Gets the count of territories.
	 *
	 * @return The count of territories
	 */
	public static int getTerritoryCount() {
		return territoryCount;
	}

	/**
	 * Sets the count of territories.
	 *
	 * @param territoryCount The new count of territories
	 */
	public static void setTerritoryCount(int territoryCount) {
		GameLogic.territoryCount = territoryCount;
	}

}
