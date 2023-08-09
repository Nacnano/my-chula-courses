package entity.unit;

import game.GameLogic;
import game.Position;
import game.Terrain;
import utils.GameConfig;

/**
 * The FieldSwordMan class represents Field Swordman unit. They can attack and move.
 *
 */
public class FieldSwordMan extends SwordMan implements Attackable, Movable{

	/**
	 * The constructor of this class.
	 * 
	 * @param people 			People of this unit
	 * @param attackRange		Attack range of this unit
	 * @param moveRange 		Move rangeof this unit
	 * @param attackMultiplier 	Attack multiplier of this unit
	 */
	public FieldSwordMan(int people, int attackRange, int moveRange, float attackMultiplier) {
		super(people, attackRange, moveRange, attackMultiplier);
	}
	
	/**
	 * The constructor of this class.
	 */
	public FieldSwordMan() {
		super();
	}
	
	/**
     * Buffs the unit based on the terrain it is on.
     * If the unit is on a plain terrain, its attack multiplier and move range are set to field swordman values
     * defined in the GameConfig. Otherwise, they are set to the default swordman values.
     *
     * @param terrain The terrain on which the unit is located.
     */
	public void buffByTerrain(Terrain T) {
		if (GameLogic.getOurUnitTerrain(this) == Terrain.PLAIN) {
			this.setAttackMultiplier(GameConfig.FIELDSWORDMAN_ATTACK_MULTIPLIER);
			this.setMoveRange(GameConfig.FIELDSWORDMAN_MOVE_RANGE);
		}
		else {
			this.setAttackMultiplier(GameConfig.SWORDMAN_ATTACK_MULTIPLIER);
			this.setMoveRange(GameConfig.SWORDMAN_MOVE_RANGE);
		}
	}

}
