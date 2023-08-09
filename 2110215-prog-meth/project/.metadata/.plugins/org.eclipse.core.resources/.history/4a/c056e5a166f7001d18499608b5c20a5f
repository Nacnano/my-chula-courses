package utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import items.base.Armor;
import items.base.Potion;
import items.base.Weapon;

/**
 * The CSVUtil is the class that provide the method for reading and parsing the
 * CSV file.
 */
public class CSVUtil {

	/**
	 * Represent the base path URL for CSV file path.
	 */
	private static final String baseUrl = "csv/";

	/**
	 * Reading a CSV file by path.
	 * 
	 * @param filename the CSV filename
	 * @return the result as array of String
	 */
	public static String[][] readCSV(String filename) {
		try {
			InputStream inputStream = ClassLoader.getSystemResourceAsStream(filename);

			assert inputStream != null;

			InputStreamReader streamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
			BufferedReader in = new BufferedReader(streamReader);

			ArrayList<String[]> output = new ArrayList<>();
			String row = null;

			while ((row = in.readLine()) != null) {
				String[] data = row.split(",");
				output.add(data);
			}

			in.close();
			output.remove(output.size() - 1);
			return output.toArray(new String[output.size()][]);
		} catch (Exception e) {
			System.out.println("Failed to read %s".formatted(filename));
			return new String[0][0];
		}
	}

	/**
	 * Read the {@link MonsterLevelFilter} CSV data and parsing for each line.
	 * 
	 * @return the parsing result as {@link ArrayList} of {@link MonsterLevelFilter}
	 */
	public static ArrayList<MonsterLevelFilter> readMonsterFilterCSV() {
		String[][] monsterLevelData = readCSV(baseUrl + "MonsterFloor.csv");

		ArrayList<MonsterLevelFilter> filterList = new ArrayList<>();
		int sz = monsterLevelData.length;

		for (int i = 0; i < sz; i++) {
			try {
				int level = Integer.parseInt(monsterLevelData[i][0]);
				boolean darkMage = Boolean.parseBoolean(monsterLevelData[i][1]);
				boolean hauntedMaid = Boolean.parseBoolean(monsterLevelData[i][2]);
				boolean pumpkinHead = Boolean.parseBoolean(monsterLevelData[i][3]);
				boolean reaper = Boolean.parseBoolean(monsterLevelData[i][4]);
				boolean skeleton = Boolean.parseBoolean(monsterLevelData[i][5]);
				boolean soul = Boolean.parseBoolean(monsterLevelData[i][6]);

				filterList
						.add(new MonsterLevelFilter(level, darkMage, hauntedMaid, pumpkinHead, reaper, skeleton, soul));
			} catch (Exception e) {
				System.out.println("Failed to parse MonsterFilter data in line %d".formatted(i + 1));
			}
		}

		return filterList;
	}

	/**
	 * Read the {@link Potion} CSV data and parsing for each line.
	 * 
	 * @return the parsing result as {@link ArrayList} of {@link Potion}
	 */
	public static ArrayList<Potion> readPotionCSV() {
		String[][] potionData = readCSV(baseUrl + "PotionData.csv");
		ArrayList<Potion> output = new ArrayList<>();

		int sz = potionData.length;

		for (int i = 0; i < sz; i++) {
			try {
				String type = potionData[i][0];
				String name = potionData[i][1];
				String description = potionData[i][2];

				int value = Integer.parseInt(potionData[i][3]);
				int duration = Integer.parseInt(potionData[i][4]);
				boolean isPermanant = Boolean.parseBoolean(potionData[i][5]);
				int spriteIndex = Integer.parseInt(potionData[i][6]);

				Potion parsePotionResult = Potion.parsePotion(type, name, description, value, duration, isPermanant,
						spriteIndex);
				output.add(parsePotionResult);
			} catch (Exception e) {
				System.out.println("Failed to parse Potion data in line %d".formatted(i + 1));
			}
		}

		return output;
	}

	/**
	 * Read the {@link Armor} CSV data and parsing for each line.
	 * 
	 * @return the parsing result as {@link ArrayList} of {@link Armor}
	 */
	public static ArrayList<Armor> readArmorCSV() {
		String[][] armorData = readCSV(baseUrl + "ArmorData.csv");
		ArrayList<Armor> output = new ArrayList<>();

		int sz = armorData.length;

		for (int i = 0; i < sz; i++) {
			try {
				String type = armorData[i][0];
				String name = armorData[i][1];
				String description = armorData[i][2];

				int defense = Integer.parseInt(armorData[i][3]);

				Armor parseArmorResult = Armor.parseArmor(type, name, description, defense);
				output.add(parseArmorResult);
			} catch (Exception e) {
				System.out.println("Failed to parse Armor data in line %d".formatted(i + 1));
			}
		}

		return output;
	}

	/**
	 * Read the {@link Weapon} CSV data and parsing for each line.
	 * 
	 * @return the parsing result as {@link ArrayList} of {@link Weapon}
	 */
	public static ArrayList<Weapon> readWeaponCSV() {
		String[][] weaponData = readCSV(baseUrl + "WeaponData.csv");
		ArrayList<Weapon> output = new ArrayList<>();

		int sz = weaponData.length;

		for (int i = 0; i < sz; i++) {
			try {
				String type = weaponData[i][0];
				String name = weaponData[i][1];
				String description = weaponData[i][2];

				int attack = Integer.parseInt(weaponData[i][3]);
				int spriteIndex = Integer.parseInt(weaponData[i][4]);

				Weapon parseWeaponResult = Weapon.parseWeapon(type, name, description, attack, spriteIndex);
				output.add(parseWeaponResult);
			} catch (Exception e) {
				System.out.println("Failed to parse Weapon data in line %d".formatted(i + 1));
			}

		}
		return output;
	}

}
