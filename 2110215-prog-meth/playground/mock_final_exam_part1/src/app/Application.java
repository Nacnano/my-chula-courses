package app;

import logic.GameManager;
import fighters.*;
import fighters.base.*;
import fighters.derived.Guildmaster;
import fighters.derived.Tank;
import fighters.derived.Wizard;

import java.util.ArrayList;
import java.util.Scanner;

public class Application {

	public static void main(String[] args) {
		
		//character initializations below
		//feel free to adjust these for testing
		
		//for reference when testing:
		//tank constructor: (HP, movement, defense, starting point)
		//guildmaster constructor: (HP, speed, power, defense, starting point)
		//wizard constructor: (HP, speed, power, starting point)
		
		//the map is 10 spaces long and looks like this:
		//0123456789
		//----------
		
		Tank tank = new Tank(30, 1, 5, 1);
		Wizard wizard = new Wizard(20, 2, 7, 0);
		Guildmaster guildmaster = new Guildmaster(50, 1, 7, 2, 9);
		
		ArrayList<Unit> fighters = new ArrayList<Unit>();
		
		fighters.add(wizard);
		fighters.add(tank);
		fighters.add(guildmaster);
		
		GameManager.initializeGameManager(fighters);
		System.out.println("==Fight the Guildmaster==");
		GameManager.gb.printGameBoard();
		
		Scanner sc = new Scanner(System.in);
		
		boolean continueGame = true;
		
		while(continueGame) {
			for(int i = 0; i < GameManager.allUnits.size(); i++) {
				Unit u = GameManager.allUnits.get(i);
				for(Unit livingCharacter : GameManager.allUnits) {
					System.out.println(livingCharacter.getName() + ": " + livingCharacter.getHealth() + "/" + livingCharacter.getMaxHealth());
				}
				System.out.println("");
				System.out.println("It is now " + u.getName() + "'s turn.");
				System.out.println("");
				if(u.isPlayerControlled()) {
					boolean choosingAction = true;
					while(choosingAction) {

						System.out.println("Choose your Action:");
						System.out.println("1) Move");
						System.out.println("2) Attack");
						System.out.println("3) Guard");
						System.out.println("4) Wait");
						
						String action = sc.nextLine();
						
						switch(action){
						case "1":
							System.out.println("Move how many spaces? (+ for right, - for left)");
							System.out.println("Speed: " + u.getSpeed());
							String space = sc.nextLine();
							try {
								int space2 = Integer.parseInt(space);
								boolean move = u.move(space2);
								if(move) {
									System.out.println(u.getName() + " moved!");
									choosingAction = false;
									break;
								}else {
									System.out.println("Cannot move there!");
									break;
								}
							}catch (Exception e){
								System.out.println("Not a valid input!");
								break;
							}
						case "2":
							if(!(u instanceof Attackable)) {
								System.out.println(u.getName() + " cannot attack!");
								break;
							}else{
								Attackable a = (Attackable) u;
								System.out.println("Attack how many spaces away? (+ for right, - for left)");
								System.out.println("Range: " + u.getRange());
								String attack = sc.nextLine();
								try {
									int attack2 = u.getLocation() + Integer.parseInt(attack);
									
									if(GameManager.gb.getCell(attack2).isEmpty()) {
										System.out.println("There's nothing to attack here!");
										break;
									}else {
										Unit target = GameManager.gb.getCell(attack2).getUnit();
										int damage = a.attack(target);
										if(damage == -1) {
											System.out.println("Can't attack that!");
											break;
										}else {
											target.setHealth(target.getHealth() - damage);
											System.out.println(u.getName() + " deals " + damage + " damage to " + target.getName());
											//System.out.println(target.getName() + " has " + target.getHealth() + " HP Left");
											if(target.getHealth() <= 0) {
												System.out.println(target.getName() + " is defeated!");
												target.remove();
											}
											
											choosingAction = false;
											break;
										}
									}
								}catch (Exception e){
									System.out.println("Not a valid input!");
									break;
								}
							}
						case "3":
							if(!(u instanceof Guardable)) {
								System.out.println(u.getName() + " cannot guard!");
								break;
							}else{
								u.setOnGuard(true);
								System.out.println(u.getName() + " is on guard!");
								choosingAction = false;
								break;
							}
						case "4":
							System.out.println(u.getName() + " is waiting!");
							choosingAction = false;
							break;
						default:
							System.out.println("Not a valid action! Choose something else!");
						}
					}
					
				}else {
					if(u.move(-1)) {
						System.out.println(u.getName() + " moves!");
					}else if (u.getLocation() == 0){
						System.out.println(u.getName() + " has reached your base! You lose!");
						continueGame = false;
						break;
					}else {
						Attackable a = (Attackable) u;
						if(!GameManager.gb.getCell(u.getLocation() - 1).isEmpty()) {
							Unit target = GameManager.gb.getCell(u.getLocation() - 1).getUnit();
							int damage = a.attack(target);
							if(damage == -1) {
								System.out.println(u.getName() + " cannot attack!");
							}else{
								target.setHealth(target.getHealth() - damage);
								System.out.println(u.getName() + " deals " + damage + " damage to " + target.getName());
								//System.out.println(target.getName() + " has " + target.getHealth() + " HP Left");
								if(target.getHealth() <= 0) {
									System.out.println(target.getName() + " is defeated!");
									target.remove();
								}
							}
						}else {
							System.out.println(u.getName() + " does nothing!");
						}
						
					}
					
				}
				System.out.println("=========END TURN=========");
				GameManager.updateGameBoard();
				GameManager.gb.printGameBoard();
				
				if(guildmaster.getHealth() <= 0) {
					System.out.println("The Guildmaster is defeated! You win!");
					continueGame = false;
					break;
				}
			}
		}
	}

}
