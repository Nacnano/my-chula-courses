package utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import entity.unit.Archer;
import entity.unit.BaseUnit;
import entity.unit.FieldSwordMan;
import entity.unit.ForestSwordMan;
import entity.unit.MountainSwordMan;
import entity.unit.SwordMan;


/**
 * The RandomUtil is the class that provide the random method and random the
 * status of {@link Potion}, {@link Armor} and {@link Weapon} from pool.
 *
 */
public class RandomUtil {

	/**
	 * Represent the {@link Random} instance.
	 */
	private static Random rand = new Random();
	
	/**
	 * Represent the {@link Random} instance.
	 */
	private static int allEnemyNumber;

	/**
	 * Random the integer in range st and ed (inclusive).
	 * 
	 * @param st the starting of range
	 * @param ed the ending of range
	 * @return the random integer in range
	 */
	public static int random(int st, int ed) {
		if (st > ed)
			return 0;
		return st + rand.nextInt(ed - st + 1);
	}
	
	/**
	 * Random the float in range st and ed (inclusive).
	 * 
	 * @param st the starting of range
	 * @param ed the ending of range
	 * @return the random float in range
	 */
	public static float randomFloat(float st, float ed) {
		if(st > ed)
			return 0;
		return (float) (st + Math.random()*(ed-st));
	}

	/**
	 * The utility method that shuffle the {@link Integer} array.
	 * 
	 * @param intArray the integer array that will be shuffled
	 */
	public static void shuffle(Integer[] intArray) {
		List<Integer> intList = Arrays.asList(intArray);
		Collections.shuffle(intList);

		intList.toArray(intArray);
	}

	/**
	 * The utility method that shuffle the two-dimensional integer array.
	 * 
	 * @param array the two-dimensional integer array that will be shuffled
	 */
	public static void shuffle(int[][] array) {
		List<int[]> list = Arrays.asList(array);
		Collections.shuffle(list);
		list.toArray(array);
	}
	
	public static ArrayList<BaseUnit> randomEnemyList(int enemyWave) {
		
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		
		allEnemyNumber = enemyWave*5;

		enemyList.addAll(randomSwordManList(enemyWave));
		enemyList.addAll(randomArcherList(enemyWave));
		enemyList.addAll(randomForestSwordManList(enemyWave));
		enemyList.addAll(randomFieldSwordManList(enemyWave));
		enemyList.addAll(randomMountainSwordManList(enemyWave));
		
		return enemyList;
	}
	
	private static ArrayList<BaseUnit> randomSwordManList(int enemyWave){
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		int enemyNumber = RandomUtil.random(1, allEnemyNumber/4);
		
		int enemyMinPeople = enemyWave * 3;
		int enemyMaxPeople = enemyWave * 6;

		float enemyMinAttackMultiplier = (float) 0.1;
		float enemyMaxAttackMultiplier = (float) Math.min(0.75, enemyWave*0.1);
		
		for (int i = 0; i < enemyNumber; i++) {
			int randomPeople = random(enemyMinPeople, enemyMaxPeople);
			float randomAttackMultiplier = randomFloat(enemyMinAttackMultiplier, enemyMaxAttackMultiplier);
			enemyList.add(new SwordMan(randomPeople, GameConfig.SWORDMAN_ATTACK_RANGE, GameConfig.SWORDMAN_MOVE_RANGE, randomAttackMultiplier));
		}
		allEnemyNumber -= enemyNumber;
		
		return enemyList;
	}
	
	private static ArrayList<BaseUnit> randomArcherList(int enemyWave){
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		int enemyNumber = RandomUtil.random(1, allEnemyNumber/4);
		
		int enemyMinPeople = enemyWave * 3;
		int enemyMaxPeople = enemyWave * 6;

		float enemyMinAttackMultiplier = (float) 0.1;
		float enemyMaxAttackMultiplier = (float) Math.min(0.75, enemyWave*0.1);
		
		for (int i = 0; i < enemyNumber; i++) {
			int randomPeople = random(enemyMinPeople, enemyMaxPeople);
			float randomAttackMultiplier = randomFloat(enemyMinAttackMultiplier, enemyMaxAttackMultiplier);
			enemyList.add(new Archer(randomPeople, GameConfig.ARCHER_ATTACK_RANGE, GameConfig.ARCHER_MOVE_RANGE, randomAttackMultiplier));
		}
		allEnemyNumber -= enemyNumber;
		
		return enemyList;
	}
	
	private static ArrayList<BaseUnit> randomForestSwordManList(int enemyWave){
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		int enemyNumber = RandomUtil.random(1, allEnemyNumber/4);
		
		int enemyMinPeople = enemyWave * 3;
		int enemyMaxPeople = enemyWave * 6;

		float enemyMinAttackMultiplier = (float) 0.1;
		float enemyMaxAttackMultiplier = (float) Math.min(0.75, enemyWave*0.1);
		
		for (int i = 0; i < enemyNumber; i++) {
			int randomPeople = random(enemyMinPeople, enemyMaxPeople);
			float randomAttackMultiplier = randomFloat(enemyMinAttackMultiplier, enemyMaxAttackMultiplier);
			enemyList.add(new ForestSwordMan(randomPeople, GameConfig.ARCHER_ATTACK_RANGE, GameConfig.ARCHER_MOVE_RANGE, randomAttackMultiplier));
		}
		allEnemyNumber -= enemyNumber;
		
		return enemyList;
	}
	
	private static ArrayList<BaseUnit> randomFieldSwordManList(int enemyWave){
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		int enemyNumber = RandomUtil.random(1, allEnemyNumber/4);
		
		int enemyMinPeople = enemyWave * 3;
		int enemyMaxPeople = enemyWave * 6;

		float enemyMinAttackMultiplier = (float) 0.1;
		float enemyMaxAttackMultiplier = (float) Math.min(0.75, enemyWave*0.1);
		
		for (int i = 0; i < enemyNumber; i++) {
			int randomPeople = random(enemyMinPeople, enemyMaxPeople);
			float randomAttackMultiplier = randomFloat(enemyMinAttackMultiplier, enemyMaxAttackMultiplier);
			enemyList.add(new FieldSwordMan(randomPeople, GameConfig.ARCHER_ATTACK_RANGE, GameConfig.ARCHER_MOVE_RANGE, randomAttackMultiplier));
		}
		allEnemyNumber -= enemyNumber;
		
		return enemyList;
	}
	
	private static ArrayList<BaseUnit> randomMountainSwordManList(int enemyWave){
		ArrayList<BaseUnit> enemyList = new ArrayList<>();
		int enemyNumber = RandomUtil.random(1, allEnemyNumber/4);
		
		int enemyMinPeople = enemyWave * 3;
		int enemyMaxPeople = enemyWave * 6;

		float enemyMinAttackMultiplier = (float) 0.1;
		float enemyMaxAttackMultiplier = (float) Math.min(0.75, enemyWave*0.1);
		
		for (int i = 0; i < enemyNumber; i++) {
			int randomPeople = random(enemyMinPeople, enemyMaxPeople);
			float randomAttackMultiplier = randomFloat(enemyMinAttackMultiplier, enemyMaxAttackMultiplier);
			enemyList.add(new MountainSwordMan(randomPeople, GameConfig.ARCHER_ATTACK_RANGE, GameConfig.ARCHER_MOVE_RANGE, randomAttackMultiplier));
		}
		allEnemyNumber -= enemyNumber;
		
		return enemyList;
	}

}