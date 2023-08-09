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


public class GuildmasterTest {
	
	Guildmaster knightdummy;
	
	@BeforeEach
	void setUp() throws Exception{
		
		//there is no knight. in order to test attack without piercing
		//we create a second guildmaster to attack the guildmaster
		//then change his team so his attacks can hit
		
		knightdummy = new Guildmaster(100, 1, 0, 0, 0);
		knightdummy.setPlayerControlled(true);
	}
	
	@Test
	void testGuildmasterConstructor() {
		Guildmaster guildmaster = new Guildmaster(100, 1, 8, 3, 9);
		assertEquals("Guildmaster", guildmaster.getName());
		assertEquals("G", guildmaster.getSymbol());
		assertEquals(100, guildmaster.getMaxHealth());
		assertEquals(1, guildmaster.getSpeed());
		assertEquals(8, guildmaster.getPower());
		assertEquals(1, guildmaster.getRange());
		assertEquals(3, guildmaster.getDefense());
		assertEquals(false, guildmaster.isOnGuard());
		assertEquals(9, guildmaster.getLocation());
		assertEquals(false, guildmaster.isPlayerControlled());
	}
	
	@Test
	void testGuildmasterTakeDamage() {
		Guildmaster guildmaster = new Guildmaster(70, 1, 12, 4, 5);
		knightdummy.setLocation(4);
		knightdummy.setPower(10);
		int damage = knightdummy.attack(guildmaster);
		assertEquals(6, damage);
	}
	
	@Test
	void testGuildmasterGuard() {
		Guildmaster guildmaster = new Guildmaster(50, 1, 7, 4, 6);
		knightdummy.setLocation(5);
		knightdummy.setPower(15);
		int damage = knightdummy.attack(guildmaster);
		assertEquals(11, damage);
		
		guildmaster.guard();
		damage = knightdummy.attack(guildmaster);
		assertEquals(11, damage);
	}
	
	@Test
	void testGuildmasterNoFriendlyFire() {
		Guildmaster guildmaster = new Guildmaster(80, 1, 10, 5, 8);
		Guildmaster guildmasterdummy = new Guildmaster(100, 1, 0, 0, 9);
		int damage = guildmaster.attack(guildmasterdummy);
		assertEquals(-1, damage);
	}
	
	@Test
	void testGuildmasterRange() {
		Guildmaster guildmaster = new Guildmaster(70, 1, 11, 3, 1);
		int damage = guildmaster.attack(knightdummy);
		assertEquals(11, damage);
		
		guildmaster.setLocation(2);
		damage = guildmaster.attack(knightdummy);
		assertEquals(-1, damage);
	}
	
	@Test
	void testGuildmasterMove() {
		Guildmaster guildmaster = new Guildmaster(100, 1, 10, 3, 9);
		
		ArrayList<Unit> fighters = new ArrayList<Unit>();
		fighters.add(guildmaster);
		GameManager.initializeGameManager(fighters);
		
		for (int i = 0; i <= 3; i++) {
			assertEquals(guildmaster.getLocation(), 9 - i);
			guildmaster.move(7);
			GameManager.updateGameBoard();
		}
	}
	
	@Test
	void testGuildmasterAttackable() {
		Guildmaster guildmaster1 = new Guildmaster(100, 1, 10, 3, 9);
		Guildmaster guildmaster2 = new Guildmaster(80, 1, 15, 1, 7);
		Tank tank = new Tank(100, 1, 8, 8);
		
		ArrayList<Unit> unitList = new ArrayList<Unit>();
		unitList.add(guildmaster1);
		unitList.add(guildmaster2);
		unitList.add(tank);
		
		Attackable a1 = (Attackable) guildmaster1;
		Attackable a2 = (Attackable) guildmaster2;
		
		int timesAttacked = 0;
		
		for(Unit u : unitList) {
			
			if(u instanceof Attackable) {
				Attackable a = (Attackable) u;
				a.attack(tank);
				timesAttacked++;
			}
			
		}
		
		assertEquals(2, timesAttacked);
		assertEquals(true, guildmaster1.equals((Guildmaster) a1));
		assertEquals(true, guildmaster2.equals((Guildmaster) a2));
	}
	
	@Test
	void testGuildmasterGuardable() {
		Guildmaster guildmaster1 = new Guildmaster(100, 1, 10, 3, 9);
		Guildmaster guildmaster2 = new Guildmaster(80, 1, 15, 1, 7);
		Wizard wizard = new Wizard(50, 3, 25, 8);
		
		ArrayList<Unit> unitList = new ArrayList<Unit>();
		unitList.add(guildmaster1);
		unitList.add(guildmaster2);
		unitList.add(wizard);
		
		Guardable g1 = (Guardable) guildmaster1;
		Guardable g2 = (Guardable) guildmaster2;
		
		int timesGuarded = 0;
		
		for(Unit u : unitList) {
			
			if(u instanceof Guardable) {
				Guardable g = (Guardable) u;
				g.guard();
				timesGuarded++;
			}
			
		}
		
		assertEquals(2, timesGuarded);
		assertEquals(true, guildmaster1.equals((Guildmaster) g1));
		assertEquals(true, guildmaster2.equals((Guildmaster) g2));
	}
}
