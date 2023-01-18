import java.util.Scanner;

public class ContinueDemo1 {
	public static void main(String[] args) {
		int len, max = 0;
		String s;
		Scanner stdin = new Scanner(System.in);
		System.out.print("Enter any string with digits : ");
		s = stdin.nextLine();
		len = s.length();
		for (int i = 0; i < len; i++) {
			char c = s.charAt(i);
			if (!(c >= '0' && c <= '9'))
				continue;
						
			int digit = Character.digit(c, 10);
			if (digit > max)
				max = digit;
		}
		System.out.println("Max digit --> " + max);
	}
}
