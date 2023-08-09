package utils;

import gui.MessagePane;
import entity.unit.BaseUnit;
import scene.GameScene;

/**
 * The utility class used for generating text to be displayed in the {@link MessagePane}.
 */
public class MessageTextUtil {

	/**
	 * The maximum character size of a word.
	 */
	private static int wordMaxSize = 30;

	/**
	 * Generates the text when a {@link BaseUnit} attacks another {@link BaseUnit} and adds it to the {@link MessagePane}.
	 *
	 * @param attackValue the attack value to be displayed in the text
	 */
	public static void textWhenAttack(int attackValue) {
		String displayText = "%d damage".formatted(attackValue);
		writeMessage(displayText);
	}

	/**
	 * Utility method that checks if the word length is longer than {@link #wordMaxSize}.
	 * If it is, the method shortens the word by taking only the first {@link #wordMaxSize} characters and appends "...".
	 *
	 * @param text the word to be shortened
	 * @return the shortened word
	 */
	public static String shortenWord(String text) {
		int sz = Math.min(wordMaxSize, text.length());

		String newText = text.substring(0, sz);
		if (sz != text.length()) {
			newText += "...";
		}
		return newText;
	}

	/**
	 * Appends text to the {@link MessagePane}.
	 *
	 * @param text the text to be appended to the {@link MessagePane}
	 */
	private static void writeMessage(String text) {
		GameScene.getMessagePane().addMessage(text);
	}

	/**
	 * Generates the text when our {@link BaseUnit} has already moved and adds it to the {@link MessagePane}.
	 */
	public static void textWhenUnitAlreadyMoved() {
		String displayText = "This unit has already moved or attacked.";
		writeMessage(displayText);
	}
	
	/**
	 * Generates the text when the camera goes outside the map boundaries and adds it to the {@link MessagePane}.
	 */
	public static void textWhenCameraOutofMap() {
		String displayText = "The camera cannot go outside the map.";
		writeMessage(displayText);
	}

	/**
	 * Generates the text when attempting to select an enemy unit and adds it to the {@link MessagePane}.
	 */
	public static void textWhenSelectEnemyUnit() {
		String displayText = "This unit cannot be selected.";
		writeMessage(displayText);
	}

	/**
	 * Generates the text when the enemy is not within the attack territory and adds it to the {@link MessagePane}.
	 */
	public static void textWhenEnemyNotInAttackTerritory() {
		String displayText = "The enemy is not in your attack territory.";
		writeMessage(displayText);
	}

	/**
	 * Generates the text when attempting to attack our own unit and adds it to the {@link MessagePane}.
	 */
	public static void textWhenAttackOurUnit() {
		String displayText = "You cannot attack your own unit.";
		writeMessage(displayText);
	}

	/**
	 * Generates the text when attempting to move to a cell with a unit and adds it to the {@link MessagePane}.
	 */
	public static void textWhenMovetoUnit() {
		String displayText = "That cell has a unit.";
		writeMessage(displayText);
	}

	/**
	 * Generates the text when attempting to move outside the move territory and adds it to the {@link MessagePane}.
	 */
	public static void textWhenMoveOutsideMoveTerritory() {
		String displayText = "That 	cell is not in your move territory.";
		writeMessage(displayText);
	}
}
