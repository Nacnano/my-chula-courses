package logic;

import java.util.ArrayList;

import fighters.base.Unit;

public class GameManager {
	public static GameBoard gb;
	public static final int  BOARD_SIZE = 10;
	public static ArrayList<Unit> allUnits;
	
	public static void initializeGameManager(ArrayList<Unit> fighters) {
		gb = new GameBoard(BOARD_SIZE);
		allUnits = new ArrayList<Unit>();
		allUnits.addAll(fighters);
		updateGameBoard();
	}
	
	public static void updateGameBoard() {
		for(int i = 0; i < BOARD_SIZE; i++) {
			gb.getCell(i).emptyCell();
		}
		
		for(Unit e : allUnits) {
			gb.getCell(e.getLocation()).setUnit(e);
		}
	}

}
