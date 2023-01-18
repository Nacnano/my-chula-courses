
public class TypeConversionExercise {

	public static void main(String[] args) {
		a = (3 / 4) + "5";
		System.out.println(a);

		b = (int) 3 / 4 + "5";
		System.out.println(b);

		c = 4 / (int) 4.0 + "5";
		System.out.println(c);

		d = 2 == 3 && true;
		System.out.println(d);

		e = 3 == 3 && true;
		System.out.println(e);

		f = 6 / 2 * 3;
		System.out.println(f);

		g = 6.0 / 2 * 3;
		System.out.println(g);

		h = 6 / 2.0 * 3;
		System.out.println(h);

		i = 18 / 4 * 9.0;
		System.out.println(i);

		j = 6.0 / 4 * (float) 4;
		System.out.println(j);

		k = (byte) -31;
		System.out.println(k);

		l = (byte) 133;
		System.out.println(l);

		m = 9F - 1.0 + 4;
		System.out.println(m);

		n = 4 - 5.0 == 7 - 8;
		System.out.println(n);

	}

}
