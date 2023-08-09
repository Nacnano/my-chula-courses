package game;

/**
 * The Direction class provides a set of values for describing the direction of
 * the entity and useful methods for moving.
 *
 */
public class Direction {

	/**
	 * Represents up direction.
	 */
	public static final int UP = 0;

	/**
	 * Represents right direction.
	 */
	public static final int RIGHT = 1;

	/**
	 * Represents down direction.
	 */
	public static final int DOWN = 2;

	/**
	 * Represents left direction.
	 */
	public static final int LEFT = 3;

	/**
	 * Get the index change in the X-axis when moving in the specified direction for
	 * the specified distance.
	 * 
	 * @param direction The direction to move
	 * @param step      The distance to move
	 * @return The index change in X-axis
	 */
	public static int getMoveX(int direction, int step) {
		if (direction == Direction.LEFT) {
			return -step;
		}
		if (direction == Direction.RIGHT) {
			return step;
		}
		return 0;
	}

	/**
	 * Get the index change in the Y-axis when moving in the specified direction for
	 * the specified distance.
	 * 
	 * @param direction The direction to move
	 * @param step      The distance to move
	 * @return The index change in Y-axis
	 */
	public static int getMoveY(int direction, int step) {
		if (direction == Direction.UP) {
			return -step;
		}
		if (direction == Direction.DOWN) {
			return step;
		}
		return 0;
	}

	/**
	 * Get the sprite index of an entity in the specified direction.
	 * 
	 * @param direction The direction of an entity
	 * @return Sprite index
	 */
	public static int getSpriteIndex(int direction) {
		if (direction == Direction.LEFT) {
			return 1;
		}
		if (direction == Direction.RIGHT) {
			return 2;
		}
		if (direction == Direction.UP) {
			return 3;
		}
		return 0;
	}
}