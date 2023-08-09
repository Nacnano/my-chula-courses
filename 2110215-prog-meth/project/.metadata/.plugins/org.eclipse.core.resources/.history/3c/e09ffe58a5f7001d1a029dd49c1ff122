package game;

import entity.building.BaseBuilding;
import entity.unit.BaseUnit;
import utils.GameConfig;

public class Position {
	private int row;
	private int column;
	
	public Position(int row, int column) {
		setRow(row);
		setColumn(column);
	}
	
	public void setRow(int row) {
		this.row = row;
	}
	
	public void setColumn(int column) {
		this.column = column;
	}
	
	public int getRow() {
		return this.row;
	}
	
	public int getColumn() {
		return this.column;
	}
	public int getDistanceFrom(Position p) {
		if(p == null) {
			return 2*GameConfig.getMapSize();
		}
		return Math.abs(this.row-p.row) + Math.abs(this.column - p.column);
	}
	
	public int getDistanceFrom(BaseBuilding b) {
		if(b == null) {
			return getDistanceFrom((Position) null);
		}
		return getDistanceFrom(b.getPosition());
	}
	
	public int getDistanceFrom(BaseUnit u) {
		if(u == null) {
			return getDistanceFrom((Position) null);
		}
		return getDistanceFrom(u.getPosition());
	}
	
	public int getMaxPerpendicularDistance(Position p) {
		if(p == null) {
			return 2*GameConfig.getMapSize();
		}
		return Math.max(Math.abs(this.row-p.row), Math.abs(this.column - p.column));
	}
	
	public Position moveUp() {
		return new Position(getRow()-1, getColumn());
	}
	
	public Position moveDown() {
		return new Position(getRow()+1, getColumn());
	}
	
	public Position moveLeft() {
		return new Position(getRow(), getColumn()-1);
	}
	
	public Position moveRight() {
		return new Position(getRow(), getColumn()+1);
	}
	
	public Position directionFrom(Position p) {
		return new Position(getRow()-p.getRow(),getColumn() - p.getColumn());
	}
	
	public String toString() {
		return String.format("Position: %d %d", getRow(), getColumn());
	}
}
