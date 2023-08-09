package test.grader;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import fighters.*;
import fighters.base.*;
import fighters.derived.Guildmaster;
import fighters.derived.Tank;
import fighters.derived.Wizard;

public class WizardTest {
	
	Guildmaster guildmasterdummy;
	
	@BeforeEach
	void setUp() throws Exception{
		guildmasterdummy = new Guildmaster(100, 1, 0, 0, 9);
	}
	
	@Test
	void testWizardConstructor() {
		Wizard wizard = new Wizard(20, 3, 12, 3);
		assertEquals("Wizard", wizard.getName());
		assertEquals("w", wizard.getSymbol());
		assertEquals(20, wizard.getMaxHealth());
		assertEquals(3, wizard.getSpeed());
		assertEquals(12, wizard.getPower());
		assertEquals(2, wizard.getRange());
		assertEquals(0, wizard.getDefense());
		assertEquals(false, wizard.isOnGuard());
		assertEquals(3, wizard.getLocation());
		assertEquals(true, wizard.isPlayerControlled());
	}
	
	@Test
	void testWizardDealDamage() {
		Wizard wizard = new Wizard(30, 1, 14, 4);
		guildmasterdummy.setLocation(6);
		guildmasterdummy.setDefense(1000);
		int damage = wizard.attack(guildmasterdummy);
		assertEquals(14, damage);
	}
	
	@Test
	void testWizardNoFriendlyFire() {
		Wizard wizard = new Wizard(20, 3, 18, 7);
		Tank tank = new Tank(40, 2, 3, 5);
		int damage = wizard.attack(tank);
		assertEquals(-1, damage);
	}
	
	@Test
	void testWizardRange() {
		Wizard wizard = new Wizard(25, 1, 20, 7);
		int damage = wizard.attack(guildmasterdummy);
		assertEquals(20, damage);
		
		wizard.setLocation(6);
		damage = wizard.attack(guildmasterdummy);
		assertEquals(-1, damage);
	}
	
	@Test
	void testWizardNoGuard() {
		Wizard wizard = new Wizard(50, 2, 21, 6);
		assertThrows(ClassCastException.class, ()->{
			Guardable g = (Guardable) wizard;
			g.guard();
		});
		
	}
	
	@Test
	void testWizardAttackable() {
		Tank tank1 = new Tank(50, 1, 7, 4);
		Tank tank2 = new Tank(40, 2, 5, 5);
		Tank tank3 = new Tank(80, 1, 3, 6);
		Wizard wizard1 = new Wizard(20, 3, 10, 0);
		Wizard wizard2 = new Wizard(30, 2, 15, 3);
		
		guildmasterdummy.setLocation(2);
		
		ArrayList<Unit> unitList = new ArrayList<Unit>();
		
		unitList.add(tank1);
		unitList.add(tank2);
		unitList.add(tank3);
		unitList.add(wizard1);
		unitList.add(wizard2);
		
		
		
		Attackable a1 = (Attackable) unitList.get(3);
		Attackable a2 = (Attackable) unitList.get(4);
		
		int timesAttacked = 0;
		
		for(Unit u : unitList) {
			
			if(u instanceof Attackable) {
				Attackable a = (Attackable) u;
				a.attack(guildmasterdummy);
				timesAttacked++;
			}
			
		}
		
		assertEquals(2, timesAttacked);
		assertEquals(true, wizard1.equals((Wizard) a1));
		assertEquals(true, wizard2.equals((Wizard) a2));
	}
}
