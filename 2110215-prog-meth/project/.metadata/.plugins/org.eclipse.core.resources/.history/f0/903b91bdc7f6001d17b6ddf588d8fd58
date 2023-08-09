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
		text = "- " + text;
		GameScene.getMessagePane().addMessage(text);
	}
}