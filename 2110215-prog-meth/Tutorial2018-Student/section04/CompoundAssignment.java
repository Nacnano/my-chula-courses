
public class CompoundAssignment {
	public static void main(String[] args) {
		int a = 1, b = 5;
		double d = 2.5;
		a += 2;
		b += a;
		d += 2.3;
		String s = "Hello";
		s += " World!";

		System.out.println(a);
		System.out.println(b);
		System.out.println(d);
		System.out.println(s);

		// complex expression
		int x = 2, y = 2;
		y *= x + y; // y * (x+y)
		System.out.println(y);

		// right associative
		int x2, y2;
		x2 = y2 = 10;
		System.out.println(x2 + "," + y2);

		x2 = 5 * (y2 = 6);
		// x2 = 5*y2 = 6; //error
		System.out.println(x2 + "," + y2);

		int y3 = 2;
		int z3 = 3;
		int x3 = y3 += z3 *= 2;
		System.out.println(x3);

	}
}
