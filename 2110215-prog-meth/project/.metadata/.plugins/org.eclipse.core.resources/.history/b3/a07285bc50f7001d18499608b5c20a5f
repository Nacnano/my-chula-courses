package utils;

import gui.MessagePane;
import entity.unit.BaseUnit;
import scene.GameScene;

/**
 * The utility class that used for generating text which display in
 * {@link MessagePane}.
 */
public class MessageTextUtil {

	/**
	 * The maximum character of word.
	 */
	private static int wordMaxSize = 30;

	/**
	 * Generate the text when {@link BaseUnit} has attacked to another {@link BaseUnit}
	 * and add to {@link MessagePane}.
	 * @param attackValue the attack value which will appear in text
	 */
	public static void textWhenAttack(int attackValue) {
		String displayText = "%d damage".formatted(attackValue);
		writeMessage(displayText);
	}



	/**
	 * Utility method that check the word length is longer than {@link #wordMaxSize}
	 * or not if true then slice only first {@link #wordMaxSize} and append "...".
	 * 
	 * @param text the word that will make it shorten
	 * @return the result after shorten
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
	 * Append text to {@link MessagePane}.
	 * 
	 * @param text the text that will append to {@link MessagePane}
	 */
	private static void writeMessage(String text) {
//		text = "- " + text;
		GameScene.getMessagePane().addMessage(text);
	}

	public static void textWhenUnitAlreadyMoved() {
		String displayText = "This unit has already moved or attacked.";
		writeMessage(displayText);
	}
	
	public static void textWhenCameraOutofMap() {
		String displayText = "The camera cannot go outside the map.";
		writeMessage(displayText);
	}

	public static void textWhenSelectEnemyUnit() {
		String displayText = "This unit cannot be selected.";
		writeMessage(displayText);
	}

	public static void textWhenEnemyNotInAttackTerritory() {
		String displayText = "The enemy is not in your attack territory.";
		writeMessage(displayText);
	}

	public static void textWhenAttackOurUnit() {
		String displayText = "You cannot attack your own unit.";
		writeMessage(displayText);
	}

	public static void textWhenMovetoUnit() {
		String displayText = "That cell has a unit.";
		writeMessage(displayText);
	}

	public static void textWhenMoveOutsideMoveTerritory() {
		String displayText = "That cell is not oin your move territory.";
		writeMessage(displayText);
	}
}