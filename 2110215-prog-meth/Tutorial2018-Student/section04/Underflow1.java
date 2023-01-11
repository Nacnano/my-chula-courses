
public class Underflow1 {
	public static void main(String[] args) {
		double d = -1.0e-323;
		double p = d / 10 * 10;
		double g = 10 * d / 10;
		System.out.println("d        = " + d);
		System.out.println("d/10*10  = " + p);
		System.out.println("10*d/10  = " + g);
	}
}
