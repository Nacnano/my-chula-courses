import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Convert {
	public static String[] convert(String[] s) throws FileNotFoundException {
		int indexAnswer = 0;
		String[] answer = new String[s.length];

		String[][] table = map();
		for (int indexInput = 0; indexInput < s.length; indexInput++) {
			boolean matchFound = false;
			for (int indexTable = 0; indexTable < table.length; indexTable++) {
				if (table[indexTable][0].equals(s[indexInput])) {
					answer[indexAnswer] = table[indexTable][1];
					indexAnswer++;
					matchFound = true;
					break;
				} else if (table[indexTable][1].equals(s[indexInput])) {
					answer[indexAnswer] = table[indexTable][0];
					indexAnswer++;
					matchFound = true;
					break;
				}
			}
			if (!matchFound) {
				answer[indexAnswer++] = "No match";
			}
		}
		return answer;

	}

	public static String[][] map() throws FileNotFoundException {
		String[][] map;
		Scanner countLineScanner = new Scanner(new File("src/mapping.txt"));
		int lineCount = 0;
		while (countLineScanner.hasNext()) {
			countLineScanner.nextLine();
			lineCount++;
		}

		map = new String[lineCount][2];

		Scanner fileScanner = new Scanner(new File("src/mapping.txt"));

		int indexRow = 0;
		while (fileScanner.hasNext()) {
			Scanner line = new Scanner(fileScanner.nextLine());
			line.useDelimiter(",");

			String currentAlphabet = line.next().trim();
			String currentNumber = line.next().trim();
			map[indexRow][0] = currentAlphabet;
			map[indexRow][1] = currentNumber;
			indexRow++;
		}

		fileScanner.close();
		return map;

	}

}
