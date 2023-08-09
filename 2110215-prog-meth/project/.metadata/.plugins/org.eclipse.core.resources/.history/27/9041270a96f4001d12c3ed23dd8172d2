package controller;

import gui.PausePane;
import gui.SettingPane;

/**
 * The InterruptController is controller which control the user input that
 * currently interrupted by specific condition or not.
 */
public class InterruptController {

	/**
	 * Represent that {@link PausePane} is currently opened or not.
	 */
	private static boolean isPauseOpen;

	/**
	 * Represent that {@link InventoryPane} is currently opened or not.
	 */
	private static boolean isInventoryOpen;

	/**
	 * Represent that {@link SettingPane} is currently opened or not.
	 */
	private static boolean isSettingOpen;

	/**
	 * Represent that the scene is currently transition or not.
	 */
	private static boolean isTransition;

	/**
	 * Represent that player currently has {@link Immobilize} effect or not.
	 */
	private static boolean isImmobilize;

	/**
	 * Represent that the scene is still animating or not.
	 */
	private static boolean isStillAnimation;

	/**
	 * Reset all interrupted state.
	 */
	public static void resetInterruptState() {
		isPauseOpen = false;
		isInventoryOpen = false;
		isSettingOpen = false;
		isTransition = false;
		isImmobilize = false;
		isStillAnimation = false;
	}

	/**
	 * Checking condition that currently is interrupting input which involving with
	 * moving or not.
	 * 
	 * <p>
	 * <b>The field which will be checked in condition</b>
	 * </p>
	 * <ul>
	 * <Li>{@link #isImmobilize}</li>
	 * <li>{@link #isInventoryOpen}</li>
	 * <li>{@link #isTransition}</li>
	 * <li>{@link #isStillAnimation}</li>
	 * </ul>
	 * 
	 * @return true if at least one field in the list have a true value otherwise
	 *         false
	 */
	public static boolean isInterruptPlayerMovingInput() {
		return isPauseOpen || isInventoryOpen || isTransition || isStillAnimation;
	}

	/**
	 * Getter for {@link #isPauseOpen}.
	 * 
	 * @return {@link #isPauseOpen}
	 */
	public static boolean isPauseOpen() {
		return isPauseOpen;
	}

	/**
	 * Setter for {@link #isPauseOpen}.
	 * 
	 * @param isPauseOpen new state of {@link #isPauseOpen}
	 */
	public static void setPauseOpen(boolean isPauseOpen) {
		InterruptController.isPauseOpen = isPauseOpen;
	}

	/**
	 * Getter for {@link #isInventoryOpen}.
	 * 
	 * @return {@link #isInventoryOpen}
	 */
	public static boolean isInventoryOpen() {
		return isInventoryOpen;
	}

	/**
	 * Setter for {@link #isInventoryOpen}.
	 * 
	 * @param isInventoryOpen new state of {@link #isInventoryOpen}
	 */
	public static void setInventoryOpen(boolean isInventoryOpen) {
		InterruptController.isInventoryOpen = isInventoryOpen;
	}

	/**
	 * Getter for {@link #isSettingOpen}.
	 * 
	 * @return {@link #isSettingOpen}
	 */
	public static boolean isSettingOpen() {
		return isSettingOpen;
	}

	/**
	 * Setter for {@link #isSettingOpen}.
	 * 
	 * @param isSettingOpen new state of {@link #isSettingOpen}
	 */
	public static void setSettingOpen(boolean isSettingOpen) {
		InterruptController.isSettingOpen = isSettingOpen;
	}

	/**
	 * Getter for {@link #isTransition}.
	 * 
	 * @return {@link #isTransition}
	 */
	public static boolean isTransition() {
		return isTransition;
	}

	/**
	 * Setter for {@link #isTransition}.
	 * 
	 * @param isTransition new state of {@link #isTransition}
	 */
	public static void setTransition(boolean isTransition) {
		InterruptController.isTransition = isTransition;
	}

	/**
	 * Getter for {@link #isImmobilize}.
	 * 
	 * @return {@link #isImmobilize}
	 */
	public static boolean isImmobilize() {
		return isImmobilize;
	}

	/**
	 * Setter for {@link #isImmobilize}.
	 * 
	 * @param isImmobilize new state of {@link #isImmobilize}
	 */
	public static void setImmobilize(boolean isImmobilize) {
		InterruptController.isImmobilize = isImmobilize;
	}

	/**
	 * Getter for {@link #isStillAnimation}.
	 * 
	 * @return {@link #isStillAnimation}
	 */
	public static boolean isStillAnimation() {
		return isStillAnimation;
	}

	/**
	 * Setter for {@link #isStillAnimation}.
	 * 
	 * @param isStillAnimation new state of {@link #isStillAnimation}
	 */
	public static void setStillAnimation(boolean isStillAnimation) {
		InterruptController.isStillAnimation = isStillAnimation;
	}

}