public class MethodDemo1 {
	public static void main(String[] args) {
		double x1, x2, x3, x4;
		double y;
		x1 = 1.5;
		y = 0;
		for (int i = 1; i <= 3; i++) {
			y += i * Math.pow(x1, i);
		}
		System.out.println(y);
		
		x2 = 2.5;
		y = 0;
		for (int i = 1; i <= 3; i++) {
			y += i * Math.pow(x2, i);
		}
		System.out.println(y);
		
		x3 = 3.5;
		y = 0;
		for (int i = 1; i <= 3; i++) {
			y += i * Math.pow(x3, i);
		}
		System.out.println(y);
		
		x4 = 4.5;
		y = 0;
		for (int i = 1; i <= 3; i++) {
			y += i * Math.pow(x4, i);
		}
		System.out.println(y);
	}
}
