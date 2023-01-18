
public class partialArray {
	public static int[] partialArray(int[] a, int i, int j) {
		if (a == null || i >= j || i >= a.length || j > a.length)
			return null;
		int difference = j - i;
		int countB = a.length - difference;
		int[] b = new int[countB];

		int indexA = 0;
		int indexB = 0;
		for (indexA = 0; indexA < i; indexA++) {
			b[indexB++] = a[indexA];
		}
		for (; indexA < j; indexA++) { // i to , not including j

		}
		for (; indexA < a.length; indexA++) {
			b[indexB++] = a[indexA];
		}

		return b;

	}

}
