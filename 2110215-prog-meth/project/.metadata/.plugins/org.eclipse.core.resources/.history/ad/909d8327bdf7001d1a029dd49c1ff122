package entity.unit;

import game.GameLogic;
import game.Terrain;
import utils.GameConfig;

/**
 * The ForestSwordMan class represents Forest Swordman unit. They can attack and move.
 *
 */
public class ForestSwordMan extends SwordMan implements Attackable, Movable{
	
	/**
	 * The constructor of this class.
	 */
	public ForestSwordMan() {
		super();
	}
	
	/**
	 * The constructor of this class.
	 * 
	 * @param people 			People of this unit
	 * @param attackRange		Attack range of this unit
	 * @param moveRange 		Move rangeof this unit
	 * @param attackMultiplier 	Attack multiplier of this unit
	 */
	public ForestSwordMan(int people, int attackRange, int moveRange, float attackMultiplier) {
		super(people, attackRange, moveRange, attackMultiplier);
	}
	
	public void buffByTerrain(Terrain T) {
		if (GameLogic.getOurUnitTerrain(this) == Terrain.PLAIN) {
			this.setAttackMultiplier(GameConfig.FORESTSWORDMAN_ATTACK_MULTIPLIER);
			this.setMoveRange(GameConfig.FORESTSWORDMAN_MOVE_RANGE);
		}
		else {
			this.setAttackMultiplier(GameConfig.SWORDMAN_ATTACK_MULTIPLIER);
			this.setMoveRange(GameConfig.SWORDMAN_MOVE_RANGE);
		}
	}

	public void attack() {
		// some logic to check terrain
		// if(GameLogic.)
	}
	
	public void move() {
		// some logic to check terrain
		// if(GameLogic.)
	}
}
