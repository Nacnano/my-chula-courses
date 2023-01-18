import java.util.Scanner;

public class BaseAndHeight_Argu {
	public static void main(String[] args) {
		// Scanner s = new Scanner(System.in);
		// System.out.println("Type in the diagonal");

		double a = Double.parseDouble(args[0]);

		// System.out.println("Type in the angle, in degree");
		// double b = s.nextDouble();
		double b = Math.toRadians(Double.parseDouble(args[1]));

		double height, width;
		height = a * Math.sin(b);
		width = a * Math.cos(b);

		System.out.println("Height =" + height);
		System.out.println("Width =" + width);

	}
}
