package game;

import entity.building.BaseBuilding;
import entity.unit.BaseUnit;
import utils.GameConfig;

/**
 * The Position class provides a set of values for describing the position of
 * an entity and useful methods for moving and calculating distances.
 */
public class Position {

    /**
     * Represents the row number.
     */
    private int row;

    /**
     * Represents the column number.
     */
    private int column;

    /**
     * Creates a new Position object with the specified row and column.
     *
     * @param row    The row number of the position.
     * @param column The column number of the position.
     */
    public Position(int row, int column) {
        setRow(row);
        setColumn(column);
    }

    /**
     * Sets the row number of the position.
     *
     * @param row The row number to be set.
     */
    public void setRow(int row) {
        this.row = row;
    }

    /**
     * Sets the column number of the position.
     *
     * @param column The column number to be set.
     */
    public void setColumn(int column) {
        this.column = column;
    }

    /**
     * Gets the row number of the position.
     *
     * @return The row number of the position.
     */
    public int getRow() {
        return this.row;
    }

    /**
     * Gets the column number of the position.
     *
     * @return The column number of the position.
     */
    public int getColumn() {
        return this.column;
    }

    /**
     * Calculates the Manhattan distance between this position and the specified position.
     *
     * @param p The position to calculate the distance from.
     * @return The Manhattan distance between the two positions.
     */
    public int getDistanceFrom(Position p) {
        if (p == null) {
            return 2 * GameConfig.getMapSize();
        }
        return Math.abs(this.row - p.row) + Math.abs(this.column - p.column);
    }

    /**
     * Calculates the Manhattan distance between this position and the position of the specified building.
     *
     * @param b The building to calculate the distance from.
     * @return The Manhattan distance between this position and the building's position.
     */
    public int getDistanceFrom(BaseBuilding b) {
        if (b == null) {
            return getDistanceFrom((Position) null);
        }
        return getDistanceFrom(b.getPosition());
    }

    /**
     * Calculates the Manhattan distance between this position and the position of the specified unit.
     *
     * @param u The unit to calculate the distance from.
     * @return The Manhattan distance between this position and the unit's position.
     */
    public int getDistanceFrom(BaseUnit u) {
        if (u == null) {
            return getDistanceFrom((Position) null);
        }
        return getDistanceFrom(u.getPosition());
    }

    /**
     * Calculates the maximum perpendicular distance between this position and the specified position.
     *
     * @param p The position to calculate the maximum perpendicular distance from.
     * @return The maximum perpendicular distance between the two positions.
     */
    public int getMaxPerpendicularDistance(Position p) {
        if (p == null) {
            return 2 * GameConfig.getMapSize();
        }
        return Math.max(Math.abs(this.row - p.row), Math.abs(this.column - p.column));
    }
    /**
     * Moves the position up (decreases the row number) and returns the new position.
     *
     * @return The new position after moving up.
     */
    public Position moveUp() {
        return new Position(getRow() - 1, getColumn());
    }

    /**
     * Moves the position down (increases the row number) and returns the new position.
     *
     * @return The new position after moving down.
     */
    public Position moveDown() {
        return new Position(getRow() + 1, getColumn());
    }

    /**
     * Moves the position left (decreases the column number) and returns the new position.
     *
     * @return The new position after moving left.
     */
    public Position moveLeft() {
        return new Position(getRow(), getColumn() - 1);
    }

    /**
     * Moves the position right (increases the column number) and returns the new position.
     *
     * @return The new position after moving right.
     */
    public Position moveRight() {
        return new Position(getRow(), getColumn() + 1);
    }

    /**
     * Calculates the direction from this position to the specified position.
     *
     * @param p The position to calculate the direction from.
     * @return The position representing the direction vector from this position to the specified position.
     */
    public Position directionFrom(Position p) {
        return new Position(getRow() - p.getRow(), getColumn() - p.getColumn());
    }

    /**
     * Returns a string representation of the position in the format "Position: [row] [column]".
     *
     * @return The string representation of the position.
     */
    @Override
    public String toString() {
        return String.format("Position: %d %d", getRow(), getColumn());
    }
}
