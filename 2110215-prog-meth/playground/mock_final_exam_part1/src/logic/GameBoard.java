package logic;

public class GameBoard {
	private Cell[] field;
	
	public GameBoard(int size) {
		field = new Cell[size];
		for(int i = 0; i < field.length; i++) {
			field[i] = new Cell();
		}
	}
	
	public Cell getCell(int index) {
		return field[index];
	}
	
	public void printGameBoard() {
		for(int i = 0; i < field.length; i++) {
			System.out.print(i);
		}
		System.out.println();
		for(int i = 0; i < field.length; i++) {
			System.out.print(field[i]);
		}
		System.out.println();
	}
}
