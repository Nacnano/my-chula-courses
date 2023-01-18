
public class CompoundExercise {

	public static void main(String[] args) {
		int x = 1;
		x = x + 1;
		System.out.println(x);

		x += 1;
		System.out.println(x);
		System.out.println(++x);
		System.out.println(x++);
		System.out.println(x);

		int y = x++ + 0;
		System.out.println(x + "," + y);

		double z = ++x + 0.0;
		System.out.println(x + "," + z);

        String s = x + "1" + z;
		System.out.println(s);
		System.out.println(x + "," + y + "," + z);

		x /= (x - 7);
		System.out.println(x);

	}

}
