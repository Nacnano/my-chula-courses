public class CountSolution {
	// add method count here.
	public static int count(char[] a, char c) {
		int count = 0;
		for (int i = 0; i < a.length; i++) {
			if (a[i] == c)
				count++;
		}
		return count;
	}

	public static boolean member(int x, int[] b) {
		if (b == null)
			return false;
		for (int i = 0; i < b.length; i++) {
			if (x == b[i])
				return true;
		}
		return false;
	}

	public static boolean isPalinDrome(int[] a) {
		if (a == null || a.length ==1)
			return true;
		int i = 0;
		int j = a.length - 1;
		while (i <= j) {
			if (a[i] != a[j])
				return false;
			i++;
			j--;
		}
		return true;

	}

	public static void main(String[] args) {
		char[] c1 = { 'a', 'b', 'd', 'f', 'g', 'g', 'f', 'a', 'd', 'f', 'g', 'f' };

		int countA = count(c1, 'a');
		int countD = count(c1, 'd');
		int countG = count(c1, 'g');
		int countF = count(c1, 'f');

		System.out.println("The number of 'a' is " + countA + "(expected number is 2).");
		System.out.println("The number of 'd' is " + countD + "(expected number is 2).");
		System.out.println("The number of 'g' is " + countG + "(expected number is 3).");
		System.out.println("The number of 'f' is " + countF + "(expected number is 4).");

	}
}