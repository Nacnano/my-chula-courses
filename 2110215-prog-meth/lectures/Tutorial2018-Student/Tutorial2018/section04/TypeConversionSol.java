
public class TypeConversionSol {

	public static void main(String[] args) {
		String a = (3 / 4) + "5";
		System.out.println(a);

		String b = (int) 3 / 4 + "5";
		System.out.println(b);

		String c = 4 / (int) 4.0 + "5";
		System.out.println(c);

		boolean d = 2 == 3 && true;
		System.out.println(d);

		boolean e = 3 == 3 && true;
		System.out.println(e);

		int f = 6 / 2 * 3;
		System.out.println(f);

		double g = 6.0 / 2 * 3;
		System.out.println(g);

		double h = 6 / 2.0 * 3;
		System.out.println(h);

		double i = 18 / 4 * 9.0;
		System.out.println(i);

		double j = 6.0 / 4 * (float) 4;
		System.out.println(j);

		byte k = (byte) -31;
		System.out.println(k);

		int l = (byte) 133;
		System.out.println(l);

		double m = 9F - 1.0 + 4;
		System.out.println(m);

		boolean n = 4 - 5.0 == 7 - 8;
		System.out.println(n);

	}

}
