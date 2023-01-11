
public class Sum {

	public static void main(String[] args) {
		// while
		int i = 1;
		int sum = 0;

		while (i <= 100000) {
			sum = sum + i;
			i++;
		}
		System.out.println("Sum is " + sum + ".");

		// do while
		i = 1;
		sum = 0;
		do {
			sum = sum + i;
			i++;
		} while (i <= 100000);
		System.out.println("Sum is " + sum + ".");

		// for
		i = 1;
		sum = 0;
		for (i = 1; i <= 100000; i++) {
			sum = sum + i;
		}
		System.out.println("Sum is " + sum + ".");
	}

}
