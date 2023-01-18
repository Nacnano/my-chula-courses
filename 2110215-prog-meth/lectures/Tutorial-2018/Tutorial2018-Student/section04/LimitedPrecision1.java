
public class LimitedPrecision1 {
	public static void main(String[] args) {
		double d = 0.0;
		double increment = 0.1;
		System.out.println("Original d \t\t=" + d);
		d += increment;
		System.out.println("d + 1 increments \t=" + d);
		d += increment;
		System.out.println("d + 2 increments \t=" + d);
		d += increment;
		System.out.println("d + 3 increments \t=" + d);
		d += increment;
		System.out.println("d + 4 increments \t=" + d);
		d += increment;
		System.out.println("d + 5 increments \t=" + d);
		d += increment;
		System.out.println("d + 6 increments \t=" + d);
		d += increment;
		System.out.println("d + 7 increments \t=" + d);
		d += increment;
		System.out.println("d + 8 increments \t=" + d);
		d += increment;
		System.out.println("d + 9 increments \t=" + d);
		d += increment;
		System.out.println("d + 10 increments \t=" + d);
		System.out.print(Math.abs(d - 1.0) < 1e-6);
	}
}
