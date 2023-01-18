
public class CountEven {
	public static int countEven(int[] a) {

		int counter = 0;

		for (int i = 0; i < a.length; i++) {
			if (a[i] % 2 == 0) {
				counter++;
			}
		}
		return counter;
	}
}
