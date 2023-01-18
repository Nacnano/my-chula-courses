
public class Overflow2 {
	public static void main(String[] args) {
		double d = 1.0e308;
		double dSquare = d * d;
		System.out.println("d     = " + d);
		System.out.println("d^2   = " + dSquare);
		System.out.println("-d^2  = " + (-dSquare));
		System.out.println("sqrt(d^2) = " + Math.sqrt(dSquare));
	}
}
