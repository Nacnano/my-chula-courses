package entity.unit;

import game.Terrain;
import utils.GameConfig;

/**
 * The SwordMan class represents Swordman unit. They can attack and move.
 *
 */
public class SwordMan extends BaseUnit implements Movable, Attackable{

	/**
	 * The constructor of this class.
	 * 
	 */
	public SwordMan () {
		super(GameConfig.MILITARY_SIZE, GameConfig.SWORDMAN_ATTACK_RANGE, GameConfig.SWORDMAN_MOVE_RANGE, GameConfig.SWORDMAN_ATTACK_MULTIPLIER);
	}
	
	/**
	 * The constructor of this class.
	 * 
	 * @param people 			People of this unit
	 * @param attackRange		Attack range of this unit
	 * @param moveRange 		Move rangeof this unit
	 * @param attackMultiplier 	Attack multiplier of this unit
	 */
	public SwordMan(int people, int attackRange, int moveRange, float attackMultiplier) {
		super(people, attackRange, moveRange, attackMultiplier);
	}
	
	public void buffByTerrain(Terrain t) {
//		System.out.println("1)");
		setAttackMultiplier(GameConfig.SWORDMAN_ATTACK_MULTIPLIER);
		setMoveRange(GameConfig.SWORDMAN_MOVE_RANGE);
	}
	
}
