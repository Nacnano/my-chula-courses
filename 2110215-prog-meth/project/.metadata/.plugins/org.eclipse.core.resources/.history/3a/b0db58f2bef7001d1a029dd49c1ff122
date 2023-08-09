package utils;

import javafx.scene.text.Font;

/**
 * The FontUtil class provides methods about font.
 *
 */
public class FontUtil {

	/**
	 * Extra small size font.
	 */
	private static Font extraSmallFont;
	
	/**
	 * Small size font.
	 */
	private static Font smallFont;

	/**
	 * Medium size font.
	 */
	private static Font mediumFont;

	/**
	 * Large size font.
	 */
	private static Font largeFont;

	/**
	 * Loads fonts
	 */
	static {
		extraSmallFont = Font.loadFont(ClassLoader.getSystemResourceAsStream("font.ttf"), 6 * GameConfig.getScale());
		smallFont = Font.loadFont(ClassLoader.getSystemResourceAsStream("font.ttf"), 12 * GameConfig.getScale());
		mediumFont = Font.loadFont(ClassLoader.getSystemResourceAsStream("font.ttf"), 18 * GameConfig.getScale());
		largeFont = Font.loadFont(ClassLoader.getSystemResourceAsStream("font.ttf"), 30 * GameConfig.getScale());
	}

	/**
	 * Getter for font.
	 * 
	 * @param size Size of the font (small, medium, large)
	 * @return The font at the specified size
	 */
	public static Font getFont(String size) {
		if (size == "extraSmall") {
			return extraSmallFont;
		}
		if (size == "small") {
			return smallFont;
		}
		if (size == "medium") {
			return mediumFont;
		}
		return largeFont;
	}

}