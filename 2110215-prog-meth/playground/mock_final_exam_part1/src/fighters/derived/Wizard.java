package fighters.derived;

import fighters.base.Attackable;
import fighters.base.Unit;
import logic.BattleUtils;

public class Wizard extends Unit implements Attackable{
	public Wizard(int maxHealth, int speed, int power, int location) {
		super("Wizard", "w", maxHealth, speed, location, true);
		this.setRange(2);
		this.setPower(power);
	}
	
	public int attack(Unit e) {
		if (this.sameTeam(e)) return -1;
		if (!BattleUtils.validRange(range, location, e.getLocation())) return -1;
		return power;
	}
}
