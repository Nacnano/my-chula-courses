package logic;

import fighters.base.Guardable;
import fighters.base.Unit;

public class BattleUtils {
	public static int calculateDamage(int power, Unit e) {
		int deduct = 0;
		if(e instanceof Guardable) {
			deduct = e.getDefense();
			if (e.isOnGuard()) deduct *= 2;
		}
		
		return Math.max((power - deduct), 0);
	}
	
	public static boolean validRange(int range, int myLocation, int targetLocation) {
		return Math.abs(myLocation - targetLocation) <= range; 
	}
}
