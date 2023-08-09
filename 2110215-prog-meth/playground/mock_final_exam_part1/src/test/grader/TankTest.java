package test.grader;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.util.ArrayList;
import logic.GameManager;
import fighters.*;
import fighters.base.*;
import fighters.derived.Guildmaster;
import fighters.derived.Tank;
import fighters.derived.Wizard;

public class TankTest {
	
	Guildmaster guildmasterdummy;
	
	@BeforeEach
	void setUp() throws Exception{
		guildmasterdummy = new Guildmaster(100, 1, 0, 0, 9);
	}
	
	@Test
	void testTankConstructor() {
		Tank tank = new Tank(50, 2, 7, 4);
		assertEquals("Tank", tank.getName());
		assertEquals("t", tank.getSymbol());
		assertEquals(50, tank.getMaxHealth());
		assertEquals(2, tank.getSpeed());
		assertEquals(0, tank.getPower());
		assertEquals(0, tank.getRange());
		assertEquals(7, tank.getDefense());
		assertEquals(false, tank.isOnGuard());
		assertEquals(4, tank.getLocation());
		assertEquals(true, tank.isPlayerControlled());
	}
	
	@Test
	void testTankTakeDamage() {
		Tank tank = new Tank(50, 2, 4, 4);
		guildmasterdummy.setLocation(5);
		guildmasterdummy.setPower(10);
		int damage = guildmasterdummy.attack(tank);
		assertEquals(6, damage);
	}
	
	@Test
	void testTankGuard() {
		Tank tank = new Tank(70, 1, 3, 4);
		guildmasterdummy.setLocation(5);
		guildmasterdummy.setPower(10);
		int damage = guildmasterdummy.attack(tank);
		assertEquals(7, damage);
		
		tank.guard();
		damage = guildmasterdummy.attack(tank);
		assertEquals(4, damage);
	}
	
	@Test
	void testTankGuardBreakFromMoving() {
		Tank tank = new Tank(40, 1, 5, 4);
		guildmasterdummy.setLocation(5);
		guildmasterdummy.setPower(20);
		
		ArrayList<Unit> fighters = new ArrayList<Unit>();
		fighters.add(tank);
		fighters.add(guildmasterdummy);
		GameManager.initializeGameManager(fighters);
		
		
		tank.guard();
		int damage = guildmasterdummy.attack(tank);
		assertEquals(10, damage);
		
		tank.move(-1);
		GameManager.updateGameBoard();
		guildmasterdummy.move(-1);
		damage = guildmasterdummy.attack(tank);
		assertEquals(15, damage);
		
	}
	
	@Test
	void testTankNoAttack() {
		Tank tank = new Tank(40, 1, 5, 4);
		assertThrows(ClassCastException.class, ()->{
			Attackable a = (Attackable) tank;
			a.attack(tank);
		});
		
	}
	
	@Test
	void testTankGuardable() {
		Tank tank1 = new Tank(50, 1, 7, 4);
		Tank tank2 = new Tank(40, 2, 5, 5);
		Tank tank3 = new Tank(80, 1, 3, 6);
		Wizard wizard1 = new Wizard(20, 3, 10, 0);
		Wizard wizard2 = new Wizard(30, 2, 15, 3);
		
		ArrayList<Unit> unitList = new ArrayList<Unit>();
		
		unitList.add(tank1);
		unitList.add(tank2);
		unitList.add(tank3);
		unitList.add(wizard1);
		unitList.add(wizard2);
		
		
		
		Guardable g1 = (Guardable) unitList.get(0);
		Guardable g2 = (Guardable) unitList.get(1);
		Guardable g3 = (Guardable) unitList.get(2);
		
		int timesGuarded = 0;
		
		for(Unit u : unitList) {
			
			if(u instanceof Guardable) {
				Guardable g = (Guardable) u;
				g.guard();
				timesGuarded++;
			}
			
		}
		
		assertEquals(3, timesGuarded);
		assertEquals(true, tank1.equals((Tank) g1));
		assertEquals(true, tank2.equals((Tank) g2));
		assertEquals(true, tank3.equals((Tank) g3));
	}
}
