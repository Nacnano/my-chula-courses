package logic;

import fighters.base.Unit;

public class Cell {
	private Unit unit;
	private boolean isEmpty;
	
	public Cell() {
		this.setEmpty(true);
	}
	
	public void emptyCell() {
		setUnit(null);
		this.setEmpty(true);
	}

	public boolean isEmpty() {
		return isEmpty;
	}

	public void setEmpty(boolean isEmpty) {
		this.isEmpty = isEmpty;
	}

	public Unit getUnit() {
		return unit;
	}

	public void setUnit(Unit unit) {
		this.unit = unit;
		this.setEmpty(false);
	}
	
	public String toString() {
		if (this.isEmpty()) return "-";
		return unit.getSymbol();
	}
}
